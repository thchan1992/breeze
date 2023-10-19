import { View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
const TaskItem = ({
  i,
  shadowStyle,
  obj,
  taskCompletionHandler,
  taskDeletionHandler,
}) => {
  return (
    <View style={[{ padding: 5 }]}>
      <View
        style={[
          {
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: "row",
            backgroundColor: "white",
            borderColor: "white",
          },
          shadowStyle,
        ]}
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
              //   taskCompletionHandler(i);
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
    </View>
  );
};

export default TaskItem;
