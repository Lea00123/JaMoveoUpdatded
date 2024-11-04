import React from 'react';

const AdminResults = React.memo(({ results, onSelectSong }) => { 
    return (
        <div className="background">
            <h2>Search Results:</h2> 
            {results.length > 0 ? ( 
                <ul>
                    {results.map((song, index) => (
                        <li 
                            /*change :  key={`${song.songName}-${song.artistName}`}*/
                            key={index} 
                            className="button" 
                            onClick={() => onSelectSong(song)}
                            /*we pass here becose the function not relevant, its can be directly*/
                        >
                            <div>
                                <h3>{song.songName}</h3>
                                <p>{song.artistName}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found. Please try a different search query.</p>
            )}
        </div>
    );
});

export default AdminResults;