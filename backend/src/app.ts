import express from 'express';
import userRoutes from './routes/user.routes';
import kycRoutes from './routes/kycRoutes';
import amlRoutes from './routes/aml.routes';
import transactionRoutes from './routes/transaction.routes';
import auditRoutes from './routes/audit.routes';
import riskRoutes from './routes/risk.routes';
import reportRoutes from './routes/report.routes';
import regulatoryRoutes from './routes/regulatory.routes';
import cors from 'cors';


const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/api/aml', amlRoutes);
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/audit-logs', auditRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/regulatory', regulatoryRoutes);
export default app;
