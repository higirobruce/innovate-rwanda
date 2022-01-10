import axios from 'axios';
const { VUE_APP_BACKEND_URL } = process.env;

const headers = {
  authorization: localStorage.token || null,
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': '*',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
};

const instance = axios.create({
  baseURL: VUE_APP_BACKEND_URL,
  timeout: 30000,
  headers: {
    authorization: localStorage.token || null,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
});

class AxiosHelper {
  static post(path, data) {
    return new Promise((resolve, reject) => {
      return instance
        .post(path, data)
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
      return instance
        .get(path)
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
      return instance
        .put(path, data, {
          headers,
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
      return instance
        .patch(path, data, {
          headers,
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
      return instance
        .delete(path, {
          headers,
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
