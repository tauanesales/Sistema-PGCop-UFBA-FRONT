import axios from "axios";

import { useTokensStore } from "../../store/tokens";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(
  (config) => {
    const tokens = useTokensStore.getState();

    if (tokens.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
