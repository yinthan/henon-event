import axios from 'axios';

// Use environment variable or default to localhost
const baseURL = 'http://localhost:5001';

const instance = axios.create({
    baseURL: baseURL
});

export default instance;
