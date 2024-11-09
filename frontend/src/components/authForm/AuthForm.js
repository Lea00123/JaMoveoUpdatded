import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext'; 
import styles from './authForm.module.css';

const AuthForm = ({
    type, // 'login', 'admin', or 'signup'
    onSuccess,
    instruments // for signup
}) => {
    const { setUserRole, setUserInstrument } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        ...(type === 'signup' ? { instrument: '' } : {})
    });

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target; 
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); 
        setErrorMessage('');

        try {
            switch(type) {
                case 'signup':
                    await authService.signUp(formData);
                    setUserInstrument(formData.instrument)
                    alert('Signup successful! Please log in.');  
                    onSuccess(); 
                    break;
                case 'login':
                    const data = await authService.login(formData);
                    setUserRole('user');
                    alert('Login successful!');
                    onSuccess(data.role, data.instrument); 
                    break;
                case 'admin':
                    await authService.adminLogin(formData);
                    setUserRole('admin');
                    alert('Login successful!'); 
                    onSuccess('admin'); 
                    break;
                default:
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage(error.message || `An error occurred during ${type}.`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <img src='/photos/band1.jpg' alt='welcome Logo' className={styles.logo} />
            <h2 className={styles.title}>
                {type === 'signup' ? 'Sign UP' : type === 'login'? 'Log In' : 'Admin Log In'}
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required 
                    aria-label="Username" 
                />
                <input
                    className={styles.input}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required 
                    aria-label="Password" 
                />
                {type === 'signup' && (
                    <select
                        className={styles.input}
                        name="instrument"
                        value={formData.instrument}
                        onChange={handleChange}
                        required 
                        aria-label="Instrument" 
                    >
                        <option value="" disabled>Select Instrument</option> 
                        {instruments.map((instrument, index) => (
                            <option key={index} value={instrument}>
                                {instrument}
                            </option>
                        ))}
                    </select>
                )}
                <button type="submit" className="button" disabled={loading}>
                    {type ==='signup' ? 'Sign Up' : 'Log In'}
                </button>
                {loading && <p>Signing up...</p>}
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default AuthForm;