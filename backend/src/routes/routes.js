import { signup, login, adminLogin } from '../controllers/autoController.js';
import { search } from '../controllers/searchController.js';

export const setupRoutes = (app) => {
    app.post('/signup', signup);
    app.post('/login', login);
    app.post('/admin/login', adminLogin);
};