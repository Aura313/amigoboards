import axios from '../middleware/axios';
import AuthService from '../Services/AuthenticationService';

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Define auth headers
    config.headers = AuthService.authHeader();
    return config;
  },
  function (error) {
    // Handle Errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Response Data
    return response;
  },
  function (error) {
    //R esponse error
    return Promise.reject(error);
  }
);

export default axios;
