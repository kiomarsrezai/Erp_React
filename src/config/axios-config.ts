import axios from "axios";
import { globalConfig } from "./global-config";

const clientAxios = axios.create({
  baseURL: globalConfig.BASE_API_URL,
});

export default clientAxios;
