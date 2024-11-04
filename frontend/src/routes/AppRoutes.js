import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from '../components/authForm/AuthForm';
import AdminMainPage from '../pages/admin/AdminMainPage';
import PlayerMainPage from '../pages/player/PlayerMainPage';
import AdminResults from '../pages/admin/AdminResultsPage';
import LandingPage from '../pages/landing/LandingPage';
import LivePage from '../pages/live/LivePage';

const AppRoutes = ({ 
    onSignupSuccess, 
    onLoginSuccess,     
    onSearch, 
    results, 
    onSelectSong 
}) => {
    return ( 
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
                path="/signup" 
                element={
                    <AuthForm 
                        type="signup" 
                        onSuccess={onSignupSuccess}
                        instruments={['Guitar', 'Drums', 'Bass', 'Saxophone', 'Vocals', 'Keyboards', 'Singer']}
                    />
                }           
            />
            <Route 
                path="/login" 
                element={<AuthForm type="login" onSuccess={onLoginSuccess} />} 
            />
            <Route 
                path="/admin/login" 
                element={<AuthForm type="admin" onSuccess={onLoginSuccess} />} 
            />
            <Route 
                path="/adminmain" 
                element={<AdminMainPage onSearch={onSearch} />} 
            />
            <Route 
                path="/adminresults" 
                element={
                    <AdminResults 
                        results={results} 
                        onSelectSong={onSelectSong} 
                    />
                } 
            />
            <Route 
                path="/playermain" 
                element={<PlayerMainPage onSelectSong={onSelectSong} />} 
            />
            <Route 
                path="/live" 
                element={<LivePage />}  
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
