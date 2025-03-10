import { createPool, Pool } from 'mysql2/promise';
import config from './bdconfig';

let pool: Pool;

export const initDB = () => {
  try {
    console.log('Attempting to create database connection pool with config:', config.database);
    pool = createPool(config.database);
    console.log('Database connection pool created');
  } catch (error) {
    console.error('Error initializing database connection pool:', error);
    throw new Error('Error al iniciar base de datos');
  }
};

export const getPool = (): Pool => {
  if (!pool) {
    console.error('Database pool not initialized');
    throw new Error('Database pool not initialized');
  }
  return pool;
};

export const closePool = async () => {
  if (pool) {
    try {
      await pool.end();
      console.log('Database connection pool closed');
    } catch (error) {
      console.error('Error closing database connection pool:', error);
    }
  }
};
