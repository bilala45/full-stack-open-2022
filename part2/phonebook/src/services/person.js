import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const createNote = (newObject) => {
  return axios.post(baseURL, newObject).then((response) => response.data);
};

const deleteNote = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export default { getAll, createNote, deleteNote };
