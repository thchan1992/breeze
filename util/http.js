import axios from "axios";

const BACKEND_URL = "https://breeze-af726-default-rtdb.firebaseio.com/";
export const addTask = async (task) => {
  console.log(task);
  try {
    const res = await axios.post(BACKEND_URL + "tasks.json", task);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchTasks = async () => {
  try {
    const res = await axios.get(BACKEND_URL + "tasks.json");

    const tasks = [];
    for (const key in res.data) {
      const obj = {
        id: key,
        task: res.data[key].task,
        completed: res.data[key].completed,
      };
      tasks.push(obj);
    }

    return tasks;
  } catch (e) {
    console.error(e);
  }
};

export const updateTask = async (id, newData) => {
  try {
    console.log(id, newData);
    const res = await axios.put(BACKEND_URL + "tasks/" + id + ".json", newData);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteTask = async (id) => {
  try {
    const res = await axios.delete(BACKEND_URL + "tasks/" + id + ".json");

    return res.data;
  } catch (e) {
    console.error(e);
  }
};
