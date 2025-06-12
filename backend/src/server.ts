import dotenv from 'dotenv';
dotenv.config();
import app from './app';

// In your server.ts
const PORT = process.env.PORT || 3000; // Instead of 5432

// First connect to database, then start server

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
