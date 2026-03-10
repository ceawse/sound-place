import axios from 'axios';

const API_URL = 'http://localhost:8082/api/v1';

const api = axios.create({
    baseURL: API_URL,
});

export const trackApi = {
    // Получение всех треков с фильтрами
    getTracks: (search, genreId) => {
        const params = {};
        if (search) params.search = search;
        if (genreId && genreId !== 'Все') params.genreId = genreId;
        return api.get('/tracks', { params });
    },

    // Загрузка нового трека
    uploadTrack: (formData) => {
        return api.post('/tracks', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};

export const genreApi = {
    // Получение списка жанров
    getGenres: () => api.get('/genres'),
    // Создание нового жанра
    createGenre: (name) => api.post(`/genres?name=${encodeURIComponent(name)}`)
};

export default api;