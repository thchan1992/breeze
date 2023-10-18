import { TouchableOpacity, Text, Platform, StyleSheet } from "react-native";

const PrimaryButton = ({ onPress, text }) => {
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

  return (
    <TouchableOpacity style={[styles.button, shadowStyle]} onPress={onPress}>
      <Text style={{ color: "white" }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
});

export default PrimaryButton;
