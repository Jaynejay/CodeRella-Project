import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getUsers = async () => {
    const response = await api.get('/users'); 
    return response.data;
};

export default api
