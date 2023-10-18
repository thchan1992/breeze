import { TextInput } from "react-native";

const PrimaryTextInput = ({ text, setText }) => {
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
    <TextInput
      style={[
        {
          borderBottomColor: "grey",
          height: 35,
          borderRadius: 2,
          borderBottomWidth: 2,
        },
        // shadowStyle,
      ]}
      onChangeText={setText}
      value={text}
    />
  );
};

export default PrimaryTextInput;
