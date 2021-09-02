import axios from "axios";
const { VUE_APP_BACKEND_URL } = process.env;

class File {
  static upload(path, data) {
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
}

export default File;
