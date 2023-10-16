import { TouchableOpacity, Text } from "react-native";

const PrimaryButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
