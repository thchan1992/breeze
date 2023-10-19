import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrimaryTextInput from "../components/PrimaryTextInput";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import TaskItem from "../components/TaskItem";

const ShowTasksListScreen = () => {
  //task structure =  {task: string, completed: boolean   }

  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState("");
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    },
    android: {
      elevation: 5,
    },
  });

  useEffect(() => {
    //get the data from the local storage when it loads
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

  //handle task completion
  const taskCompletionHandler = async (i) => {
    const newArr = [...todoList];
    const completedTask = newArr[i];
    completedTask.completed == true
      ? (completedTask["completed"] = false)
      : (completedTask["completed"] = true);
    newArr.splice(i, 1);
    newArr.push(completedTask);
    setTodoList(newArr);
    await storeData();
  };

  //handle task addition
  const taskAdditionHandler = async () => {
    const newTask = { task: task, completed: false };
    const newArr = [...todoList];
    newArr.push(newTask);
    setTodoList(newArr);
    await storeData();
    setTask("");
  };

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(todoList);
      await AsyncStorage.setItem("to-do-list", jsonValue);
    } catch (e) {
      console.log("saving failure");
    }
  };

  //handle task deletion
  const taskDeletionHandler = async (i) => {
    Alert.alert(
      "Delete a task",
      "Do you want to delete this task?",
      [
        {
          text: "OK",
          onPress: async () => {
            const newArr = [...todoList];
            newArr.splice(i, 1);
            setTodoList(newArr);
            await storeData();
          },
        },
        { text: "CANCEL" },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  };

  const emptyStringHandler = () => {
    Alert.alert("No task detected", "Please make sure the task is not empty", [
      { text: "OK" },
    ]);
  };

  return (
    <View>
      <SafeAreaView
        style={[
          {
            width: windowWidth,
            height: windowHeight,
          },
          styles.container,
        ]}
      >
        <View style={{ padding: 7 }}>
          <Text>Breeze - To do List:</Text>
          <View style={styles.inputContainer}>
            <View style={styles.textInputContainer}>
              <PrimaryTextInput setText={setTask} text={task} />
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                onPress={() => {
                  task !== "" ? taskAdditionHandler() : emptyStringHandler();
                }}
                text={"Add task"}
              />
            </View>
          </View>
        </View>
        <View style={[styles.listContainer, { height: windowHeight - 100 }]}>
          <ScrollView
            style={{
              width: windowWidth,
              padding: 10,
            }}
          >
            {todoList.map((obj, i) => {
              return (
                <View key={i}>
                  <TaskItem
                    i={i}
                    shadowStyle={shadowStyle}
                    obj={obj}
                    taskCompletionHandler={taskCompletionHandler}
                    taskDeletionHandler={taskDeletionHandler}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    justifyContent: "space-between",
  },
  inputContainer: { padding: 5, flexDirection: "row" },
  textInputContainer: { flex: 3 },
  buttonContainer: { flex: 1, height: 40, paddingLeft: 5 },
});
export default ShowTasksListScreen;
