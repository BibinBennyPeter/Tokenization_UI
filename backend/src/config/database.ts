import { Sequelize } from 'sequelize';

// Ensure environment variables are loaded first
import dotenv from 'dotenv';
dotenv.config();

// Debug: Check if env vars are loaded
console.log('DB_PASSWORD exists?', !!process.env.DB_PASSWORD);
console.log('DB_PASSWORD type:', typeof process.env.DB_PASSWORD);

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'your_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '', // Fallback to empty string if undefined
  dialectOptions: {
    ssl: false,
    // Explicit authentication configuration
    authentication: {
      type: 'scram-sha-256',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || ''
    }
  },
  logging: console.log, // Enable query logging
  define: {
    timestamps: true,
    underscored: true
  }
});

// Test the connection immediately
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Connection error:', err));

export default sequelize;
