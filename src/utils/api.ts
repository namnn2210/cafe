// api.ts
import BASE_API_URL from '../config/config';

export const fetchFromAPI = async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`${BASE_API_URL}/api${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return response.json();
};
