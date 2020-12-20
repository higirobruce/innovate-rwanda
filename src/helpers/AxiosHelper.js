import axios from "axios";
const { VUE_APP_BACKEND_URL } = process.env;

class AxiosHelper {
  static post(path, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${VUE_APP_BACKEND_URL}${path}`, data, {
          headers: {
            authorization: localStorage.token || null,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
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
        .get(`${VUE_APP_BACKEND_URL}${path}`, {
          headers: {
            authorization: localStorage.token || null,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
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
        .put(`${VUE_APP_BACKEND_URL}${path}`, data, {
          headers: {
            authorization: localStorage.token || null,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
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
        .patch(`${VUE_APP_BACKEND_URL}${path}`, data, {
          headers: {
            authorization: localStorage.token || null,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static delete(path) {
    return new Promise((resolve, reject) => {
      return axios
        .delete(`${VUE_APP_BACKEND_URL}${path}`, {
          headers: {
            authorization: localStorage.token || null,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
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
