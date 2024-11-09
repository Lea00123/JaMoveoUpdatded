import React, { useEffect } from 'react';
import socket from '../../services/socket';

const PlayerMainPage = ({ onSelectSong }) => {  

    useEffect(() => {
        const handleSongSelected = (songData) => {
            onSelectSong(songData);
        };

        socket.on('songSelected', handleSongSelected);

        return () => {
            socket.off('songSelected', handleSongSelected);
        };
    }, [onSelectSong]);

    return (
        <div className="container"> 
             <img src='/photos/band4.jpeg' alt='Rehearsal App Logo' className="logo" />
            <h1>Waiting for next song...</h1>
        </div>
    );
};

export default PlayerMainPage;
