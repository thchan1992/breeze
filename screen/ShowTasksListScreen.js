import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrimaryTextInput from "../components/PrimaryTextInput";

const ShowTasksListScreen = () => {
  //task structure =  {task: string, completed: boolean   }

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);
  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState("");

  const taskAdditionHandler = async () => {
    const newTask = { task: task, completed: false };
    const newArr = [...todoList];
    newArr.push(newTask);
    setTodoList(newArr);

    try {
      const jsonValue = JSON.stringify(todoList);
      await AsyncStorage.setItem("to-do-list", jsonValue);
    } catch (e) {
      console.log("saving failure");
    }

    try {
      const jsonValue = await AsyncStorage.getItem("to-do-list");
      jsonValue != null ? JSON.parse(jsonValue) : null;

      console.log(jsonValue);
    } catch (e) {
      console.log("loading failure");
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
        return <Text key={i}>{obj.task}</Text>;
      })}
    </View>
  );
};
export default ShowTasksListScreen;
