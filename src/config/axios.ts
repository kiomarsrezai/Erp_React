import axios from "axios";

const clientAxios = axios.create({
  baseURL: "https://info.ahvaz.ir/api/v1/",
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

export default clientAxios;
