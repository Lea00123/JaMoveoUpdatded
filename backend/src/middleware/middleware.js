import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { corsConfig } from '../config/config.js';

export const setupMiddleware = (app) => {
    app.use(cors(corsConfig));
    app.use(express.json());
    app.use(helmet()); 
    app.use(morgan('combined'));    // Logs http requests: IP, time, status..
};