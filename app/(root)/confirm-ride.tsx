import { View, Text, FlatList } from "react-native";
import RideLayout from "@/components/RideLayout";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  // console.log("selectedDriver", selectedDriver);

  return (
    <RideLayout title="Choose s Driver" snapPoints={["20%", "95%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            selected={selectedDriver === null ? 0 : selectedDriver}
            setSelected={() => setSelectedDriver(item.id ? Number(item.id) : 0)} // Проверяем, что item.id не null
            // setSelected={() => setSelectedDriver(Number(item.id ?? 0))} // Применение значения по умолчанию
            // setSelected={() => setSelectedDriver(Number(item.id)!)}
            item={item}
            // key={item.id}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              disabled={selectedDriver === null} // Кнопка неактивна, если selectedDriver равен null
              // disabled={selectedDriver === null ? false : true}
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
