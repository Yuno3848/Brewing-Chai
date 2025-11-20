import express from 'express';
import cookie from 'cookie-parser';
import cors from 'cors';
import auth from './routes/auth.route.js';

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

app.use('/api/brewing-chai/', auth);
export default app;
