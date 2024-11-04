import Axios, { type AxiosResponse } from 'axios';
import Services from '..';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: 'json',
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

    // impede redirects para requisições da area deslogada
    if (originalRequest.url.includes('token')) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh');

      if (refreshToken) {
        Services.refreshToken({
          refresh: refreshToken,
        })
          .then((response) => {
            localStorage.setItem('access', response.data.access);
            originalRequest.headers['Authorization'] =
              `Bearer ${response.data.access}`;
            return axios(originalRequest);
          })
          .catch((refreshError) => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          });
      } else {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
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
