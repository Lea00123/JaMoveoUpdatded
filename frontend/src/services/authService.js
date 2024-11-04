import { httpClient } from './httpClient';

export const authService = {
    signUp: async (signupData) => {
        const signupDataWithRole = { ...signupData, role: 'user' };
        return httpClient.post('/signup', signupDataWithRole);
    },

    login: async (loginData) => {
        return httpClient.post('/login', loginData);
    },

    adminLogin: async (loginData) => {
        return httpClient.post('/admin/login', loginData);
    }
};




