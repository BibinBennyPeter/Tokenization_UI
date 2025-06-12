import express from 'express';
import { authMiddleware } from './middlewares/auth.middleware'
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.router';

const app = express();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/', authMiddleware, userRouter);

export default app;