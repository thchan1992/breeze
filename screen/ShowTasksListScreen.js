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

const ShowTasksListScreen = () => {
  //task structure =  {task: string, completed: boolean   }

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
    completedTask.completed == true
      ? (completedTask["completed"] = false)
      : (completedTask["completed"] = true);
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

  return (
    <View>
      <SafeAreaView
        style={{
          width: windowWidth,
          height: windowHeight,
          justifyContent: "space-between",
        }}
      >
        <View style={{ padding: 7 }}>
          <Text>Breeze - To do List:</Text>
          <View style={{ padding: 5, flexDirection: "row" }}>
            <View style={{ flex: 3 }}>
              <PrimaryTextInput setText={setTask} text={task} />
            </View>
            <View style={{ flex: 1, height: 40, paddingLeft: 5 }}>
              <PrimaryButton
                onPress={() => {
                  taskAdditionHandler();
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
                <View
                  key={i}
                  style={{
                    padding: 10,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={[
                      {
                        flex: 4,
                        borderBottomColor: "grey",
                        borderBottomWidth: 1,
                        borderRadius: 5,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      onLongPress={() => {
                        taskCompletionHandler(i);
                      }}
                    >
                      {obj.completed ? (
                        <Text
                          style={{
                            textDecorationLine: "line-through",
                          }}
                        >
                          {obj.task}
                        </Text>
                      ) : (
                        <Text>{obj.task}</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={[{ flex: 0.5, paddingLeft: 5 }]}>
                    <TouchableOpacity
                      onPress={(i) => {
                        taskDeletionHandler(i);
                      }}
                    >
                      <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  <BouncyCheckbox
                    style={shadowStyle}
                    disableBuiltInState
                    size={20}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: "red" }}
                    innerIconStyle={{ borderWidth: 2 }}
                    isChecked={obj.completed}
                    onPress={() => {
                      taskCompletionHandler(i);
                    }}
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
});
export default ShowTasksListScreen;
