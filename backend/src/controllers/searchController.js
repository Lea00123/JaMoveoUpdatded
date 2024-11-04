import { searchTab4U } from '../utils/searchTab4U.js';

export const search = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }
    try {
        const results = await searchTab4U(query);
        res.json(results);
    } catch (error) {
        console.error('Error in search:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

