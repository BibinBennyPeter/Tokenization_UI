import dotenv from 'dotenv';
import app from './app';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
});