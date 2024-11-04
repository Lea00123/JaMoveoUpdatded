const API_URL = process.env.REACT_APP_SERVER_URL;

export const httpClient = {
    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data), 
            });

            let responseData;
            try {
                responseData = await response.json(); 
            } catch (error) {
                throw new Error('Failed to parse server response');
            }
            
            if (!response.ok) {
                throw new Error(responseData.message || 'An unknown error occurred');
            }

            return responseData;
        } catch (error) {
            throw error;
        }
    }
};


