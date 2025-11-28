import mongoose from 'mongoose';
import crypto from 'crypto';
import cookie from 'cookie-parser';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import sendMail from '../utils/mail.js';

export const signUp = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, password, confirmPassword } = req.body;
  console.log('email :', email);
  if (password != confirmPassword) {
    throw new ApiError(400, "Password doesn't match!");
  }

  const existingUser = await User.findOne({
    $or: [{ email }],
  });

  if (existingUser) {
    throw new ApiError(409, 'User already exists');
  }

  let avatarData = {
    url: '',
    localPath: '',
  };

  if (req.file) {
    const fileUrl = await uploadOnCloudinary(req.file.buffer, req.file.originalname);

    avatarData.url = fileUrl.secure_url;
    avatarData.localPath = fileUrl.public_id;
  }

  const user = await User.create({
    email,
    firstName,
    lastName,
    avatar: avatarData,
    password,
  });

  if (!user) {
    throw new ApiError(500, 'Failed to create user');
  }

  const { unhashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });
  await sendMail({
    senderEmail: user.email,
    subject: 'Email Verification',
    text: `Verification Link:  http://localhost:5173/verify-email/${unhashedToken}`,
    html: `<p>Your Verification Link is  http://localhost:5173/verify-email/${unhashedToken}</p>`,
  });

  const createdUser = await User.findById(user._id)
    .select(
      '-password -otp -otpExpiry -forgotPasswordExpiry -emailVerificationToken -emailVerificationTokenExpiry',
    )
    .lean();

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        'You have registered successfully. Please verify your email to activate your account.',
        createdUser,
      ),
    );
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const emailVerificationToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    emailVerificationToken,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(404, 'User not found or token is invalid');
  }

  if (user.isEmailVerified) {
    return res.status(200).json(
      new ApiResponse(200, 'Email is already verified', {
        _id: user._id,
        username: user.username,
        email: user.email,
        isEmailVerified: true,
      }),
    );
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpiry = undefined;

  await user.save();

  res.status(200).json(new ApiResponse(200, 'Email verified successfully', user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('-_v -id');

  if (!user) {
    throw new ApiError(404, 'Invalid email or password!');
  }
  if (!user.isEmailVerified) {
    throw new ApiError(404, 'Email is not verified!');
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw new ApiError(401, 'Invalid Password');
  }

  const cookiesOptions = {
    secure: false,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
  };

  const accessToken = await user.generateAccessToken();

  user.password = undefined;
  return res
    .status(200)
    .cookie('accessToken', accessToken, cookiesOptions)
    .json(new ApiResponse(200, 'Sign in successfully', user));
});

export const logOut = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorize Access!');
  }
  const cookiesOptions = {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
  };

  return res
    .status(200)
    .clearCookie('accessToken', cookiesOptions)
    .json(new ApiResponse(200, 'User logged out!'));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select(
    '-emailVerifiedToken -emailVerificationTokenExpiry',
  );
  if (!user) {
    throw new ApiError(400, `User not found`);
  }

  const { unhashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendMail({
    senderEmail: user.email,
    subject: 'Reset Password',
    text: `Reset password link : http://localhost:5173/reset-password/${unhashedToken}`,

    html: `Reset password link : http://localhost:5173/reset-password/${unhashedToken}`,
  });

  return res.status(200).json(
    new ApiResponse(200, 'Password forgot successfully', {
      _id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
      isEmailVerified: user.isEmailVerified,
    }),
  );
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  console.log('token :', token);
  const { newPassword, confirmPassword } = req.body;

  if (newPassword != confirmPassword) {
    throw new ApiError(400, 'Password and confirm password does not match!');
  }

  const forgotPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(404, 'Invalid token...');
  }

  user.password = newPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'password reset successfully. Please sign in.', user));
});

export const resendVerifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select(
    '-forgotPasswordToken -forgotPasswordTokenExpiry',
  );
  if (!user) {
    throw new ApiError(400, `Invalid email!`);
  }

  const { unhashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendMail({
    senderEmail: user.email,
    subject: 'Email verification',
    text: `Email verification link : http://localhost:5173/verify-email/${unhashedToken}`,

    html: `Email verification link : http://localhost:5173/verify-email/${unhashedToken}`,
  });

  return res.status(200).json(new ApiResponse(200, 'Email verification sent successfully!', user));
});

export const me = asyncHandler(async (req, res) => {
  const user = req.user.id;

  if (!user || !mongoose.Types.ObjectId.isValid(user.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const userDetails = await User.findById(user).select(
    '-password -emailVerificationToken -emailVerificationTokenExpiry -forgotPasswordExpiry -forgotPasswordToken -createdAt -updatedAt',
  );

  if (!userDetails) {
    throw new ApiError(404, 'User not found');
  }

  return res.status(200).json(new ApiResponse(200, 'user logged in', userDetails));
});

export const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }
  const { password, newPassword, confirmPassword } = req.body;

  if (newPassword != confirmPassword) {
    throw new ApiError(400, "Password doesn't match");
  }

  const user = await User.findById(userId).select('-avatar');

  if (!user) {
    throw new ApiError(400, 'User not found!');
  }

  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
    throw new ApiError(400, 'Invalid Password!');
  }

  if (await user.comparePassword(newPassword)) {
    throw new ApiError(400, 'New password cannot be the same as old password.');
  }

  user.password = newPassword;
  await user.save();


  return res.status(201).json(new ApiResponse(201, 'Password changed successfully'));
});
