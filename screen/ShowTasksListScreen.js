import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import PrimaryTextInput from "../components/PrimaryTextInput";
import TaskItem from "../components/TaskItem";
import { addTask, fetchTasks, deleteTask, updateTask } from "../util/http";

const ShowTasksListScreen = () => {
  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
        const data = await fetchTasks();
        return data;
      } catch (e) {
        console.error(e);
      }
    };
    fetchData().then((data) => {
      if (data !== null) {
        setTodoList(data);
      }
    });
    setIsLoading(false);
  }, [isLoading]);

  //handle task completion
  const taskCompletionHandler = async (i) => {
    let newData = todoList.find((item) => {
      return item.id === i;
    });
    newData.completed
      ? (newData.completed = false)
      : (newData.completed = true);
    updateTask(i, newData);
    setIsLoading(true);
  };

  //handle task addition
  const taskAdditionHandler = async () => {
    const newTask = { task: task, completed: false };
    const newArr = [...todoList];
    newArr.push(newTask);
    setTodoList(newArr);
    const res = await addTask(newTask);

    // await storeData();
    setIsLoading(true);
    setTask("");
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
            await deleteTask(i);
            setIsLoading(true);
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
            {todoList
              .filter((item) => item.completed === false)
              .map((obj, i) => {
                return (
                  <View key={i}>
                    <TaskItem
                      i={obj.id}
                      shadowStyle={shadowStyle}
                      obj={obj}
                      taskCompletionHandler={taskCompletionHandler}
                      taskDeletionHandler={taskDeletionHandler}
                    />
                  </View>
                );
              })}

            {todoList
              .filter((item) => item.completed === true)
              .map((obj, i) => {
                return (
                  <View key={i}>
                    <TaskItem
                      i={obj.id}
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
