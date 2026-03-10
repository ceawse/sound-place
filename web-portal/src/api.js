import axios from 'axios';
const API_URL = '/api/v1';
const api = axios.create({
    baseURL: API_URL,
});
export const trackApi = {
    getTracks: (search, type, genreId) => {
        const params = {};
        if (search) params.search = search;
        if (type) params.type = type;
        if (genreId && genreId !== 'Все') params.genreId = genreId;
        return api.get('/tracks', { params });
    },
    uploadTrack: (formData) => {
        return api.post('/tracks', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    deleteTrack: (id) => api.delete(`/tracks/${id}`)
};
export const genreApi = {
    getGenres: () => api.get('/genres'),
    createGenre: (name) => api.post(`/genres?name=${encodeURIComponent(name)}`)
};
export default api;