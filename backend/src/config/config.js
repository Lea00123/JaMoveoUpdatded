import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const corsConfig = {
    origin: [
        process.env.REACT_APP_PRODUCTION_URL,
        process.env.REACT_APP_DEV_URL,
        process.env.REACT_APP_DEV_URL_ALT
    ],
    methods: ['GET', 'POST'],
    credentials: true
};

const pool = mysql.createPool(dbConfig);

export { pool, corsConfig };
