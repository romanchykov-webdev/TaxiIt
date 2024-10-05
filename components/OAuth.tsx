import { View, Text, Image, Alert } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constans";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useCallback } from "react";
import { googleOAuth } from "@/lib/auth";
import { router } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handlerGooGleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);
      console.log("OAuth result:", result);

      // if (result.code === "session_exists") {
      if (result.code === "success") {
        Alert.alert("Success", "Session Exists. Redirecting to home page");
        router.push("/(root)/(tabs)/home");
      }

      Alert.alert(result.success ? "Success" : "Error", result.message);
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

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
