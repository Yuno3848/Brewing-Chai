import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: '',
        localPath: '',
      },
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      lowercase: true,
      minlength: [2, 'First name must be at least 2 characters'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required'],
      lowercase: true,
      minlength: [2, 'Last name must be at least 2 characters'],
    },

    role: {
      type: String,
      enum: ['user', 'instructor', 'admin'],
      default: 'user',
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 8 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiry: {
      type: Date,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },

    instructorProfile: {
      type: Schema.Types.ObjectId,
      ref: 'instructorProfile',
    },
    studentProfile: {
      type: Schema.Types.ObjectId,
      ref: 'studentProfile',
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: `${this.firstName} ${this.lastName}`,
      role: this.role,
      email: this.email,
    },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
  );
};

userSchema.methods.generateTemporaryToken = function () {
  const unhashedToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(unhashedToken).digest('hex');
  const tokenExpiry = Date.now() + 20 * 60 * 1000;
  return {unhashedToken, hashedToken,tokenExpiry};
};
const User = mongoose.model('User', userSchema);
export default User;
