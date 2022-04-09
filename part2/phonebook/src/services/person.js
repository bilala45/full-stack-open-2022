import axios from "axios";
const baseURL = "http://localhost:3001/persons";

// const getAll = () => {
//   return axios.get(baseURL).then((response) => response.data);
// };

const getAll = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.log("error fetching notes");
  }
};

const createNote = async (newObject) => {
  try {
    const response = await axios.post(baseURL, newObject);
    return response.data;
  } catch (error) {
    console.log("error creating note");
  }
};

const deleteNote = async (id) => {
  try {
    await axios.delete(`${baseURL}/${id}`);
  } catch (error) {
    console.log("error deleting note");
  }
};

export default { getAll, createNote, deleteNote };
