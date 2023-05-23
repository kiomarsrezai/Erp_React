import axios from "axios";

import { globalConfig } from "./global-config";
import { enqueueSnackbar } from "notistack";

const token = localStorage.getItem("token-auth");

const clientAxios = axios.create({
  baseURL: globalConfig.BASE_API_URL,
  headers: {
    Authorization: "Bearer " + token,
  },
});

// global error manage
clientAxios.interceptors.response.use(
  (response) => {
    const errorMessage = response.data?.message?.[0];
    const isSuccess = response.data?.isSuccess;
    if (errorMessage && !isSuccess) {
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
      return Promise.reject(response);
    }

    return response;
  },
  (error: any) => {
    const statusCode = error?.response?.status;
    const errorMessage = error?.response?.message?.[0];
    const isSuccess = error?.response?.isSuccess;

    if (errorMessage && !isSuccess) {
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    }

    // network error
    if (errorMessage === "Network Error") {
      // enqueueSnackbar(globalConfig.NETWORK_ERROR_MESSAGE, {
      //   variant: "error",
      // });
    }
    // db error
    else if (errorMessage) {
      // enqueueSnackbar(errorMessage, {
      //   variant: "error",
      // });
    }

    return Promise.reject(error);
  }
);

export default clientAxios;
