import Axios, { type AxiosResponse } from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: 'json'
});

axios.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh');
      if (refreshToken) {
        const response = await axios.post('token/refresh/', { refresh: refreshToken });
        localStorage.setItem('access', response.data.access);
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

const get = async (url: string, config?: any) => {
  const response: AxiosResponse = await axios.get(url, config || {});
  return response.data;
};

const patch = async (url: string, data: any, config?: any) => {
  const response: AxiosResponse = await axios.patch(url, data, config || {});
  return response.data;
};

const post = async (url: string, data: any, config?: any) => {
  const response: AxiosResponse = await axios.post(url, data, config || {});

  return response.data;
};

const destroy = async (url: string, config?: any) => {
  const response: AxiosResponse = await axios.delete(url, config || {});
  return response.data;
};

export { get, patch, post, destroy };