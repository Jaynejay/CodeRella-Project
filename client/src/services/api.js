import axios from 'axios';
import toast from 'react-hot-toast';

// Correct way to access Vite env variable
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getUsers = async () => {
    const response = await api.get('/users'); // use `api`, not axios directly
    return response.data;
};

export default api
