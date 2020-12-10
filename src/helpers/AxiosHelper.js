import axios from "axios";
const { VUE_APP_BACKEND_URL } = process.env;
// const token = this.localStorage.getItem('token')
let config = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    'authorization': localStorage.token || '',
  },
};

class AxiosHelper {
  static post(path, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${VUE_APP_BACKEND_URL}${path}`, data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static get(path) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`${VUE_APP_BACKEND_URL}${path}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static put(path, data) {
    return new Promise((resolve, reject) => {
      return axios
        .put(`${VUE_APP_BACKEND_URL}${path}`, data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static patch(path, data) {
    return new Promise((resolve, reject) => {
      return axios
        .patch(`${VUE_APP_BACKEND_URL}${path}`, data, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default AxiosHelper;
