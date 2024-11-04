// App.js
import React, { useState, useEffect, useCallback } from 'react';
import AppRoutes from './routes/AppRoutes'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import socket from './services/socket';

const App = () => {    
    const navigate = useNavigate(); 
    const [results, setResults] = useState([]);
    const { userRole } = useAuth();

    useEffect(() => {
        socket.on('searchResults', (data) => {
            setResults(data);
            navigate('/adminresults');
        });

        const quitListener = () => {
            userRole === 'admin' ? navigate('/adminmain') : navigate('/playermain');
        };

        socket.on('quit', quitListener);

        return () => {
            socket.off('searchResults');
            socket.off('quit', quitListener);
        };
    }, [navigate, userRole]);

    const handleSignupSuccess = () => {
        navigate('/login'); 
    };

    const handleLoginSuccess = (role) => {
        role === 'admin' ? navigate('/adminmain') : navigate('/playermain');
    };

    const handleSelectSong = useCallback((song) => {
        socket.emit('selectSong', song);
        navigate('/live', { state:{ songUrl: song.url } });
    }, [navigate]);

    const handleSearch = useCallback((query) => {
        socket.emit('searchSong', query);
    }, []);

    return (
        <AppRoutes
            onSignupSuccess={handleSignupSuccess}
            onLoginSuccess={handleLoginSuccess}
            onSearch={handleSearch}
            results={results}
            onSelectSong={handleSelectSong}
        />
    );
}

export default App;
