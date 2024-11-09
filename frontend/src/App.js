import React, { useState, useEffect, useCallback } from 'react';
import AppRoutes from './routes/AppRoutes'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import socket from './services/socket';

const App = () => {    
    const navigate = useNavigate(); 
    const [results, setResults] = useState([]);
    const { userRole } = useAuth();

    const navigateByRole = useCallback((role) => {
        role === 'admin' ? navigate('/adminmain') : navigate('/playermain');
    }, [navigate]);

    const handleSearchResults = useCallback((data) => {
        setResults(data);
        navigate('/adminresults');
    }, [navigate]);

    useEffect(() => {
        socket.on('searchResults', handleSearchResults);
        socket.on('quit', () => navigateByRole(userRole));

        return () => {
            socket.off('searchResults', handleSearchResults);
            socket.off('quit');
        };
    }, [navigateByRole, userRole, handleSearchResults]); 

    const handleSignupSuccess = () => {
        navigate('/login'); 
    };

    const handleLoginSuccess = (role) => {
        navigateByRole(role);
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