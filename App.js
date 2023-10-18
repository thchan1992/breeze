import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ShowTasksListScreen from "./screen/ShowTasksListScreen";

export default function App() {
  return (
    <View>
      <ShowTasksListScreen />
      <StatusBar style="auto" />
    </View>
  );
}
