import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { icons, images } from "@/constans";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";

const SignUn = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,

        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
      // console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // TODO: Create a database user!
        await setActive({ session: completeSignUp.createdSessionId });
        // router.replace("/(root)/(auth)/home");
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
        // console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.error[0].longMessage,
        state: "failed",
      });
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            className="z-0 w-full h-[250px]"
            // resizeMode="contain"
          />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />
          {/*    OAuth*/}
          <OAuth />
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10 mb-20"
          >
            <Text>Already have an account? {"  "} </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
          {/*    Verification modal verification code*/}
          <ReactNativeModal
            isVisible={verification.state === "pending"}
            onModalHide={() => {
              if (verification.state === "success") setShowSuccessModal(true);
            }}
          >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              {/*Back to state:"default"*/}
              <View className="w-full ">
                <TouchableOpacity
                  onPress={() =>
                    setVerification({ ...verification, state: "default" })
                  }
                  className="flex-row justify-start items-center mb-10"
                >
                  <Image
                    source={icons.backArrow}
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                  <Text> Back</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-2xl font-JakartaExtraBold mb-2">
                Verification
              </Text>
              <Text className="font-Jakarta mb-5">
                We`ve sent a verification code to {form.email}
              </Text>
              <InputField
                label="Code"
                icon={icons.lock}
                placeholder="12345"
                value={verification.code}
                keyboardType="numeric"
                onChangeText={(code) =>
                  setVerification({ ...verification, code })
                }
              />
              {verification.error && (
                <Text className="text-red-500 text-sm mt-1">
                  {verification.error}
                </Text>
              )}
              <CustomButton
                title="Verify Email"
                onPress={onPressVerify}
                className="mt-5 bg-success-500"
              />
            </View>
          </ReactNativeModal>
          {/*    Verification modal verification OK ! */}
          {/*<ReactNativeModal isVisible={verification.state === "success"}>*/}
          <ReactNativeModal isVisible={showSuccessModal}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              {/*Back to state:"default"*/}
              <View className="w-full ">
                <TouchableOpacity
                  onPress={() =>
                    setVerification({ ...verification, state: "default" })
                  }
                  className="flex-row justify-start items-center mb-10"
                >
                  <Image
                    source={icons.backArrow}
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                  <Text> Back</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={images.check}
                className="w-[110px] h-[110px] mx-auto my-5"
                resizeMode="contain"
              />

              <Text className="text-3xl font-JakartaBold text-center">
                Verified
              </Text>
              <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                You have successfully verified your account
              </Text>
              <CustomButton
                title="Browse Home"
                onPress={() => {
                  setShowSuccessModal(false);
                  router.push("/(root)/(tabs)/home");
                }}
                className="mt-5"
              />
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignUn;
