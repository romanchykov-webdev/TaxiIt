import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { ReactNode, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { icons } from "@/constans";
import Map from "./Map";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const RideLayout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const bottomSheetRef = useRef(null);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View
            className="flex flex-row absolute z-10 top-16 items-center justify-start px-5
          {/*border-2*/}
          {/*border-red-500*/}
          "
          >
            <TouchableOpacity
              onPress={() => router.back()}
              className=" w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm shadow-neutral-300
                          {/*border-2*/}
                          {/*border-red-500*/}
                        "
            >
              <Image
                source={icons.backArrow}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text className="ml-5 text-xl font-JakartaSemiBold">
              {title || "Go Back"}
            </Text>
          </View>
          <Map />
        </View>

        <BottomSheet ref={bottomSheetRef} snapPoints={["40%", "85%"]} index={0}>
          <BottomSheetScrollView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
