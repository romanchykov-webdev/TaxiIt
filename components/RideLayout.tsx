import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { ReactNode, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { icons } from "@/constans";
import Map from "./Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const RideLayout = ({
  title,
  children,
  snapPoints,
}: {
  title: string;
  children: ReactNode;
  snapPoints: string[];
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

        <BottomSheet
          // keyboardBehavior="extend"
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["20%", "85%"]}
          // snapPoints={["20%", "85%"]}
          index={0}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
