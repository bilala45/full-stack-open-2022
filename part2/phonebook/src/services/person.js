import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const get = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject).then((response) => response.data);
};

export default { get, create };
