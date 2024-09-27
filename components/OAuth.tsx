import { View, Text, Image } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constans";

const OAuth = () => {
  const handlerGooGleSignIn = async () => {};

  return (
    <View>
      <View className="flex-1 flex-row justify-center items-center mt-5 gap-x-5">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text>Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title="Log in wit Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            className="w-5 h-5 mx-5"
            resizeMode="contain"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handlerGooGleSignIn}
      />
    </View>
  );
};
export default OAuth;
