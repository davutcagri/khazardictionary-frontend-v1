import axios from 'axios';

export const signup = (body) => {
    return axios.post('/api/users', body);
};

export const login = (creds) => {
    return axios.post('/api/auth/token', creds);
};

export const logout = () => {
    return axios.post('/api/logout');
};

export const changeLanguage = (language) => {
    axios.defaults.headers['accept-language'] = language;
};

export const getUsers = (page = 0, size = 5) => {
    return axios.get(`/api/users?page=${page}&size=${size}`);
};

export const setAuthorizationHeader = ({ isLoggedIn, token }) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Bearer ${token}`
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
};

export const getUser = (username) => {
    return axios.get(`/api/users/${username}`);
};

export const updateUser = (username, body) => {
    return axios.put(`/api/users/${username}`, body);
};

export const sharePost = (item) => {
    return axios.post('/api/posts', item);
};

export const getPostByUsernameAndId = (username, id) => {
    const path = `/api/posts/${username}/${id}`;
    return axios.get(path);
};

export const getPost = (username, page = 0, size = 5) => {
    const path = username ? `/api/users/${username}/posts?page=${page}&size=${size}` : `/api/posts?page=${page}&size=${size}`;
    return axios.get(path);
};

export const getPostsByCategory = (category) => {
    return axios.get(`/api/${category}/posts`);
};

export const getOldPosts = (id, username) => {
    const path = username ? `/api/users/${username}/posts/${id}` : `/api/posts/${id}`
    return axios.get(path);
};

export const getNewHoaxCount = (id, username) => {
    const path = username ? `/api/users/${username}/posts/${id}?count=true` : `/api/posts/${id}?count=true`;
    return axios.get(path);
};

export const getNewPosts = (id, username) => {
    const path = username ? `/api/users/${username}/posts/${id}?direction=after` : `/api/posts/${id}?direction=after`;
    return axios.get(path);
};

export const sharePostAttachment = (attachment) => {
    return axios.post('/api/post-attachments', attachment);
};

export const deletePost = (id) => {
    return axios.delete(`/api/posts/${id}`);
};

export const deleteProfile = (username) => {
    return axios.delete(`/api/users/${username}`);
};

export const addLike = (id) => {
    return axios.post(`/api/posts/${id}/likes`);
};

export const sendVerificationCode = (email) => {
    return axios.post(`/api/verification/${email}`);
};

export const getVerificationCode = (email) => {
    return axios.get(`/api/verification/${email}`);
};

export const deleteVerification = (email) => {
    return axios.delete(`/api/verification/${email}`);
};

export const sendComment = (body, id) => {
    return axios.post(`/api/posts/${id}/comments`, body);
};

export const getCommentsByPost = (id, page = 0) => {
    return axios.get(`/api/posts/${id}/comments?page=${page}`);
};

export const deleteComment = (id) => {
    return axios.delete(`/api/comments/${id}`)
};