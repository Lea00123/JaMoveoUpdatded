import React, { useState, useCallback } from 'react';

const AdminMainPage = React.memo(({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = useCallback((e) => {
        e.preventDefault(); 

        if (!searchQuery) {
            alert("Please enter a search query.");
            return;
        }

        setLoading(true);
        onSearch(searchQuery);
        setLoading(false);
    }, [searchQuery, onSearch]);

    return (
        <div className="container">
            <img src='/photos/band4.jpeg' alt='Rehearsal App Logo' className="logo" />
            <h1>Search any song...</h1>
            <div className="search-container">
                <form onSubmit={handleSearch}> 
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        placeholder="Enter song name"
                    />
                    <button className="button" type="submit">Search</button>
                </form>
            </div>

            {loading && <div>Loading...</div>}
        </div>
    );
});

export default AdminMainPage;
