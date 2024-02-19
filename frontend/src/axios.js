import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001' // Use your backend server URL here
});

export default instance;
