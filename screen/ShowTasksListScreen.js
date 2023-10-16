import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrimaryTextInput from "../components/PrimaryTextInput";

const ShowTasksListScreen = () => {
  //task structure =  {task: string, completed: boolean   }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("to-do-list");
        const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : null;
        return parsedValue;
      } catch (e) {
        console.log("Loading failure");
      }
    };

    fetchData().then((data) => {
      if (data !== null) {
        setTodoList(data);
      }
    });
  }, []);
  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState("");

  const taskCompletionHandler = async (i) => {
    const newArr = [...todoList];
    const completedTask = newArr[i];
    completedTask["completed"] = true;
    newArr.splice(i, 1);
    newArr.push(completedTask);
    setTodoList(newArr);
    await storeData();
  };

  const taskAdditionHandler = async () => {
    const newTask = { task: task, completed: false };
    const newArr = [...todoList];
    newArr.push(newTask);
    setTodoList(newArr);
    await storeData();
  };

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(todoList);
      await AsyncStorage.setItem("to-do-list", jsonValue);
    } catch (e) {
      console.log("saving failure");
    }
  };

  return (
    <View>
      <Text>To do List:</Text>
      <PrimaryTextInput setText={setTask} text={task} />
      <PrimaryButton
        onPress={() => {
          taskAdditionHandler();
        }}
        text={"Add task"}
      />
      {todoList.map((obj, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              taskCompletionHandler(i);
            }}
          >
            <Text>
              {obj.task} {obj.completed ? "completed" : "incompleted"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default ShowTasksListScreen;
