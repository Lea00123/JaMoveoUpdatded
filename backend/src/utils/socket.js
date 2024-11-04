    import { Server } from 'socket.io';
    import { corsConfig } from '../config/config.js';
    import { searchTab4U } from './searchTab4U.js'; 
    import scrapeSong from './scrapeSong.js';

    export const setupSocket = (server) => {
        const io = new Server(server, {
            cors: corsConfig,
        });

        io.on('connection', (socket) => {
            
            socket.on('searchSong', async (query) => {
                try {
                    const results = await searchTab4U(query);
                    socket.emit('searchResults', results); 
                } catch (error) {
                    console.error('Error searching for songs:', error);
                    socket.emit('searchError', { message: 'Error retrieving song data. Please try again.' });
                }
            });

            socket.on('selectSong', (songData) => {
                io.emit('songSelected', songData);
            });

            socket.on('scrapeSong', async (url) => {
                try {
                    const songData = await scrapeSong(url); 
                    socket.emit('songDetails', songData); 
                } catch (error) {
                    console.error('Error scraping song details:', error);
                    socket.emit('scrapeError', { message: 'Error retrieving song details. Please try again.' });
                }
            });

            socket.on('adminQuit', () => {
                io.emit('quit');
            });

        });

        return io;
    };