import axios from 'axios';

//const API_URL = 'http://24.152.42.107:8091/api/';
const API_URL = 'http://147.182.235.218:3000/api/';
const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Interceptor de solicitud para añadir el token JWT en los encabezados
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log(token.usuario); // Solo para depuración, elimina en producción
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// // Interceptor de respuesta para manejar errores de autenticación
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Manejar token expirado o inválido
//             localStorage.removeItem('authToken');
//             // Redirigir a la página de inicio de sesión o mostrar un mensaje de error
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
