import axios from "axios";

const success = resp => resp;
const error = resp => {
  if (401 === resp.response.status) {
    window.location = "/";
  } else {
    return Promise.reject(resp);
  }
}

axios.interceptors.response.use(success, error);