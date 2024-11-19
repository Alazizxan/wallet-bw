import axios from 'axios';
import useTelegram from "../hooks/telegram.js";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL+'api',
    timeout: 1000,
})


export const fetchUserTasks = async (telegramId) => {
    const response = await api.get(`/tasks/all/${telegramId}`);
    return response.data.data;
}

export const fetchTasks = async () => {
    const response = await api.get(`/tasks/all/`);
    return response.data.data;
}

export const fetchCountdown = async () => {
    const response = await api.get(`/countdown/get`);
    return response.data.data;
}

export const updateCountdown = async (data) => {
    const response = await api.post(`/countdown/update`, data);
    return response.data.data;
}

export const fetchUsersCount = async () => {
    const response = await api.get(`/users/count`);
    return response.data.data;
}

export const updateTask = async (taskId, data) => {
    const response = await api.post(`/tasks/update/${taskId}`, data);
    return response.data.data;
}

export const fetchTask = async (taskId) => {
    const response = await api.get(`/tasks/get/${taskId}`)
    return response.data.data;
}

export const deleteTask = async (taskId) => {
    const response = await api.get(`/tasks/delete/${taskId}`)
    return response.data.data;
}

export const createTask = async (taskData) => {
    const response = await api.post(`/tasks/create`, taskData);
    return response.data.data;
}

export const compleateTask = async (taskId, telegramId) => {
    const response = await api.post(`/tasks/pass/`, {telegramId, taskId})
    return response.data.data;
}


export const connectWallet = async (telegramId, walletAddress) => {
    const response = await api.post(`/wallet/create/`, {
        userId: telegramId,
        walletAddress: walletAddress
    });

    return response.data.data;
}



export const dissconnectWallet = async (walletAddress) => {
    await api.delete(`/wallet/delete/${walletAddress}`)
    return true
}

export const getStatus = async () => {
    const response = await api.get('/countdown/get')
    return response.data.data.status;
}

export const updateStatus = async (status) => {
    const response = await api.post('/countdown/update', { status: status });
    return response.data.data;
}

export const fetchFriends = async (referallId) => {
    const response = await api.get(`/users/friends/${referallId}`);
    return response.data.data;
}

export const register = async () => {
    const {user, referall } = useTelegram()


    const response = await api.post(`/users/register`, {
        firstName: user.first_name,
        telegramId: user.id,
        profileImage: user.photo_url,
        referall: referall,
    });

    return response.data.data;
}