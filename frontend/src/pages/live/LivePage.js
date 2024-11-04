import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import socket from '../../services/socket';
import { SongControls, SongContent } from './SongUIComponents';
import './live.css';

const LivePage = React.memo(() => {
    const location = useLocation();
    const { userRole, userInstrument } = useAuth();
    const [songDetails, setSongDetails] = useState(null);
    const [scrolling, setScrolling] = useState(false);
    const { songUrl } = location.state || {};

    const scrollIntervalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (!songUrl) {
            console.error('No song URL provided');
            return;
        }

        const songDetailsListener = (scrapedData) => {
            if (scrapedData) {
                setSongDetails({
                    title: scrapedData.title,
                    artist: scrapedData.artist,
                    content: scrapedData.content || []
                });
            } else {
                console.error('Failed to load song details');
            }
        };

        socket.emit('scrapeSong', songUrl);
        socket.on('songDetails', songDetailsListener);

        return () => {
            socket.off('songDetails', songDetailsListener);
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
        };
    }, [songUrl]);

    const isHebrew = useCallback((text) => {
        return /[\u0590-\u05FF]/.test(text);
    }, []);

    const toggleScrolling = () => {
        setScrolling((prevScrolling) => {
            if (prevScrolling) {
                clearInterval(scrollIntervalRef.current);
                scrollIntervalRef.current = null;
            } else {
                scrollIntervalRef.current = setInterval(() => {
                    contentRef.current?.scrollBy({ top: 1, behavior: 'auto' });
                }, 60);
            }
            return !prevScrolling;
        });
    };

    const handleQuit = () => {
        socket.emit('adminQuit');
    };

    return (
        <div className="live-page">
            {songDetails ? (
                <>
                    <SongControls 
                        scrolling={scrolling}
                        onToggleScroll={toggleScrolling}
                        isAdmin={userRole === 'admin'}
                        onQuit={handleQuit}
                    />
                    
                    <div className="song-details">
                        <h1>{songDetails.title}</h1>
                        <h2>{songDetails.artist}</h2>
                    </div>

                    <SongContent 
                        content={songDetails.content}
                        userInstrument={userInstrument}
                        isHebrew={isHebrew}
                        contentRef={contentRef}
                    />

                    {scrolling && <div className="scrolling-indicator">Scrolling...</div>}
                </>
            ) : (
                <p>Loading song details...</p>
            )}
        </div>
    );
});

export default LivePage;