import express, { Express } from 'express';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
import kycRoutes from './routes/kyc.routes';
import propertyRoutes from './routes/property.routes';
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
    res.send("This is the backend page");
});

// Routes
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/kyc', kycRoutes);
app.use('/property',propertyRoutes);
// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;
