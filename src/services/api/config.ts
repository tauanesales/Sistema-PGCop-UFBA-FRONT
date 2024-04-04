import axios from "axios";

import { useTokensStore } from "../../store/tokens";

const api = axios.create({ baseURL: process.env.API_URL });

export default api;
