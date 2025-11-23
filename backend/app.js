import express from 'express';
import cookie from 'cookie-parser';
import cors from 'cors';
import auth from './routes/auth.route.js';
import ApiError from './utils/ApiError.js';

const app = express();

app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:8080',
      'https://lms-nine-green-57.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);

app.use('/auth/brewing-chai', auth);

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  console.error('🔥 Unhandled Error:', err);

  return res.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error',
    errors: [err?.message],
  });
});

export default app;
