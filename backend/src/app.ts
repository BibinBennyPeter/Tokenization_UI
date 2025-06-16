import express from 'express';
import { authMiddleware } from './middlewares/auth.middleware'
import userRouter from './routes/user.routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', authMiddleware, userRouter);
app.use("/kyc", userRouter);

export default app;