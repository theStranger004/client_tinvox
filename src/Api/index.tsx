import axios from 'axios';
import config from '../lib/config';

// ----------------------------------------------------------------------
// Base Response Handler
// ----------------------------------------------------------------------
function handleResp(response: any, status: 'success' | 'error') {
    if (status === 'success' && response?.data !== undefined) {
        return { status, data: response, message: response.message };
    }
    if (status === 'error' && response?.response?.data !== undefined) {
        return { status, data: response.response.data, message: response.response.data.message || response.message };
    }
    return { status, data: response, message: response?.message || 'Unknown error' };
}

// ----------------------------------------------------------------------
// Auth & Login
// ----------------------------------------------------------------------
export const login = async (credentials: { email: string; password: string }) => {
    try {
        const baseUrl = config.API_BASE_URL;
        const respData = await axios.post(`${baseUrl}/admin/login`, credentials, {
            headers: { 'Content-Type': 'application/json' },
        });
        return handleResp(respData.data, 'success');
    } catch (error: any) {
        return handleResp(error, 'error');
    }
};

// ----------------------------------------------------------------------
// Public Endpoints
// ----------------------------------------------------------------------
export const getPublicApiData = async (endpoint: string) => {
    try {
        const baseUrl = config.API_BASE_URL;
        const respData = await axios.get(`${baseUrl}/${endpoint}`);
        return handleResp(respData.data, 'success');
    } catch (error: any) {
        return handleResp(error.response?.data || error.message, 'error');
    }
};

// ----------------------------------------------------------------------
// Admin CRUD Endpoints
// ----------------------------------------------------------------------
export const adminGet = async (endpoint: string) => {
    try {
        const baseUrl = config.API_BASE_URL;
        
        // Get token from localStorage
        const token = localStorage.getItem("trueLuckAdmin");

        const respData = await axios.get(`${baseUrl}/admin/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        return handleResp(respData.data, 'success');
    } catch (error: any) {
        return handleResp(error.response?.data || error.message, 'error');
    }
};

export const adminPost = async (endpoint: string, data: any) => {
    try {
        const baseUrl = config.API_BASE_URL;
        
        // Get token from localStorage
        const token = localStorage.getItem("trueLuckAdmin");

        const respData = await axios.post(`${baseUrl}/admin/${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        return handleResp(respData.data, 'success');
    } catch (error: any) {
        return handleResp(error.response?.data || error.message, 'error');
    }
};

export const adminPut = async (endpoint: string, data: any) => {
    try {
        const baseUrl = config.API_BASE_URL;
        
        // Get token from localStorage
        const token = localStorage.getItem("trueLuckAdmin");

        const respData = await axios.put(`${baseUrl}/admin/${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        return handleResp(respData.data, 'success');
    } catch (error: any) {
        return handleResp(error.response?.data || error.message, 'error');
    }
};

export const adminDelete = async (endpoint: string) => {
    try {
        const baseUrl = config.API_BASE_URL;
        
        // Get token from localStorage
        const token = localStorage.getItem("trueLuckAdmin");

        const respData = await axios.delete(`${baseUrl}/admin/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        return handleResp(respData.data, 'success');
    } catch (error: any) {
        return handleResp(error.response?.data || error.message, 'error');
    }
};

// ----------------------------------------------------------------------
// Admin Upload
// ----------------------------------------------------------------------
export const adminUpload = async (file: File) => {
    try {
        const baseUrl = config.API_BASE_URL;
        
        // Get token from localStorage
        const token = localStorage.getItem("trueLuckAdmin");
        
        const formData = new FormData();
        formData.append('file', file);
        
        const respData = await axios.post(`${baseUrl}/admin/upload`, formData, {
            headers: {
                'Authorization': token
            }
        });
        return handleResp(respData.data, 'success');
    } catch (error: any) {
        return handleResp(error.response?.data || error.message, 'error');
    }
};