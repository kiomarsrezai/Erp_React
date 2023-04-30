import axios from "axios";

import { globalConfig } from "./global-config";

const token = localStorage.getItem("token-auth");

const clientAxios = axios.create({
  baseURL: globalConfig.BASE_API_URL,
  headers: {
    Authorization: "Bearer " + token,
  },
});

export default clientAxios;
