import axios from "axios";
const baseURL = "/api/persons";

const getAll = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.log("error fetching notes");
  }
};

const createContact = async (newObject) => {
  try {
    const response = await axios.post(baseURL, newObject);
    return response.data;
  } catch (error) {
    console.log("error creating note");
  }
};

const deleteContact = async (id) => {
  try {
    await axios.delete(`${baseURL}/${id}`);
  } catch (error) {
    console.log("error deleting note");
  }
};

const updateNumber = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.log("error updating number");
  }
};

export default { getAll, createContact, deleteContact, updateNumber };
