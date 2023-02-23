import axios from 'axios';
import { API } from './Urls';
import authHeader from './AuthHeader'


export const requestPost = async (url, data = {}, config = {}) => {
  try {
    const response = await axios.post(API + url, data, config);

    return response.data;
  } catch (error) {
    return console.log(error);
  }
};

export const requestGet = async (url) => {
  try {
    const response = await axios.get(API + url, { headers: authHeader() });

    return response;
  } catch (error) {
    return console.log(error);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};
