import axios from 'axios';

const api = axios.create({
    // Адрес твоего будущего бэкенда на Spring Boot
    baseURL: 'http://localhost:8080/api/v1',
});

// Мы оставляем чистый экземпляр без логики авторизации
export default api;