import { TextInput } from "react-native";

const PrimaryTextInput = ({ text, setText }) => {
  return <TextInput onChangeText={setText} value={text} />;
};

export default PrimaryTextInput;
