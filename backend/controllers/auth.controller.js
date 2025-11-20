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
    $or: [{ email }, { firstName }],
  });

  if (existingUser) {
    throw new ApiError(400, 'User already exists');
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
    throw new ApiError(400, 'Failed to create user');
  }

  const otp = user.generateTemporaryToken();

  await sendMail({
    senderEmail: user.email,
    subject: 'Email Verification',
    text: `Verification OTP: ${otp}`,

    html: `<p>Your OTP is <strong>${otp}</strong></p>`,
  });

  const createdUser = await User.findById(
    user.id,
    {
      password: 0,
      otp: 0,
      otpExpiry: 0,
      forgotPasswordExpiry: 0,
      isEmailVerified: 0,
    },
    { lean: true },
  );

  res.status(201).json(new ApiResponse(201, 'User registered successfully', createdUser));
});
