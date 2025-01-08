import axios from 'axios';
import { constant } from 'views/constant.js';

export const postApi = async (path, data) => {
  try {
    let result = await axios.post(constant.baseurl + path, data);

    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

export const getApi = async (path, id) => {
  try {
    if (id) {
      let result = await axios.get(constant.baseurl + path + id);
      return result;
    } else {
      let result = await axios.get(constant.baseurl + path);
      return result;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const patchApi = async (path, data) => {
  try {
    let result = await axios.patch(constant.baseurl + path, data);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const putApi = async (path, data) => {
  try {
    let result = await axios.put(constant.baseurl + path, data);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const deleteApi = async (path, id) => {
  try {
    if (id) {
      let result = await axios.delete(constant.baseurl + path + id);
      return result;
    } else {
      let result = await axios.delete(constant.baseurl + path);
      return result;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};
