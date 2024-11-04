import express from 'express';
import { setupMiddleware } from './middleware/middleware.js';
import { setupRoutes } from './routes/routes.js';
import { setupSocket } from './utils/socket.js'; 

const app = express();
const port = process.env.PORT || 5000;

setupMiddleware(app);
setupRoutes(app);

const server = app.listen(port);
setupSocket(server);

