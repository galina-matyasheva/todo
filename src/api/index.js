import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});


api.interceptors.request.use(
    config => {
       // 'axios interceptor'

        const token = localStorage.getItem('token');

        //token, 'axios interceptor';
            config.headers.authorization = `Bearer ${token}`;
            config.headers.token = token;

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const createNote = payload => api.post(`/note`, payload);
export const getNoteList = (userId) => api.get(`/notes/${userId}`);
export const updateNote = (id, payload) => api.put(`/note/${id}`, payload);
export const deleteNote = id => api.delete(`/note/${id}`);
export const getNoteById = id => api.get(`/note/${id}`);
export const  deleteClearNotes = () => api.delete(`/notes`);
export const  getFilter = (userId, completed) => api.get(`/note/filter/${userId}/${completed}`);
export const login = payload => api.post(`/user/login`, payload);
export const registerUser = payload => api.post(`/user/registerUser`, payload);

const apis = {
    createNote,
    updateNote,
    deleteNote,
    getNoteList,
    getNoteById,
    deleteClearNotes,
    getFilter,
    login,
    registerUser
};

export default apis