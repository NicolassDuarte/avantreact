import api from './api';

export const login = async (email, senha) => {
    try {
        const response = await api.post('/auth/login', { email, senha });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { error: 'Erro de conexão. Tente novamente.' };
    }
};

export const register = async (nome, email, senha) => {
    try {
        const response = await api.post('/auth/register', { nome, email, senha });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { error: 'Erro de conexão. Tente novamente.' };
    }
};

export const getProfile = async () => {
    try {
        const response = await api.get('/usuarios/profile');
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { error: 'Erro ao carregar perfil.' };
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};