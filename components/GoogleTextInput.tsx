import { View, Text } from "react-native";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

export default GoogleTextInput;
