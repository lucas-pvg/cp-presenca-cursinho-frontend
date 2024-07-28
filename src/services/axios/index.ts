import Axios, { type AxiosResponse } from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8000/',
  responseType: 'json'
});

axios.interceptors.request.use(
  (config: any) => ({
    ...config,
    headers: {
      ...config.headers
    }
  }),
  (error: any) => Promise.reject(error)
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