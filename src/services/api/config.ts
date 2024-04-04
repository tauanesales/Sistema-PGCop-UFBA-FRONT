import axios from "axios";

import { useTokensStore } from "../../store/tokens";

const api = axios.create({ baseURL: process.env.API_URL });

api.interceptors.request.use(
  (config) => {
    const accessToken = useTokensStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
