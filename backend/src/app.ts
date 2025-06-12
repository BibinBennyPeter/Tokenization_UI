import express from 'express';
import { authMiddleware } from './middlewares/auth.middleware'
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.router';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/', authMiddleware, userRouter);
app.use("/kyc", userRouter);

export default app;