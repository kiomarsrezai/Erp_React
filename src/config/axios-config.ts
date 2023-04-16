import axios from "axios";
import { GLOBAL_CONFIG } from "./global-config";

const clientAxios = axios.create({
  baseURL: GLOBAL_CONFIG.BASE_API_URL,
});

export default clientAxios;
