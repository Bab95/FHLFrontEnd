import axios from 'axios';
const KEY = 'AIzaSyBpLoAr-8UufNgq_ihErQk8fP5BFcpbISg'; // mention your youtube API key here

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})