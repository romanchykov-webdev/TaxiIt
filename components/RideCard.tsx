import { View, Text, Image } from "react-native";
import { Ride } from "@/types/type";
import { icons } from "@/constans";
import { formatDate, formatTime } from "@/lib/utils";

const RideCard = ({
  ride: {
    destination_latitude,
    destination_longitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-center justify-center p-3">
        {/*header*/}
        <View
          className="flex flex-row item-center justify-between
        {/*border-2*/}
        {/*border-red-500*/}
        "
        >
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg
            {/*border-2*/}
            {/*border-red-500*/}
            "
          />

          <View
            className="flex flex-col mx-5  flex-1 justify-center

            {/*gap-y-5*/}
            {/*border-2*/}
            {/*border-red-500*/}
          "
          >
            {/*origin_address*/}
            <View className="flex flex-row items-center gap-x-2 mb-5">
              <Image source={icons.to} className="w-5 h-5" />
              <Text numberOfLines={1} className="text-md font-JakartaMedium">
                {origin_address}
              </Text>
            </View>
            {/*destination_address*/}
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text numberOfLines={1} className="text-md font-JakartaMedium">
                {destination_address}
              </Text>
            </View>
          </View>
        </View>
        {/*header end*/}

        {/*body section*/}

        <View
          className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center
        {/*border-2*/}
        {/*border-red-500*/}
        "
        >
          {/*data time section*/}
          <View
            className="flex flex-row items-center w-full justify-between mb-5
          {/*border-2*/}
        {/*border-red-500*/}
          "
          >
            <Text className="text-md font-JakartaMedium text-gray-500">
              Data & Time
            </Text>
            <Text className="text-sm font-JakartaSemiBold text-black">
              {formatDate(created_at)}, {formatTime(ride_time)}
            </Text>
          </View>
          {/*data time section end*/}
          {/*info driver section*/}
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Driver
            </Text>
            <Text className="text-sm font-JakartaSemiBold text-black">
              {driver.first_name} {driver.last_name}
            </Text>
          </View>
          {/*info driver section end*/}

          {/*Car seats section */}
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Car seats
            </Text>
            <Text className="text-sm font-JakartaSemiBold text-black">
              {driver.car_seats}
            </Text>
          </View>
          {/*Car seats section end*/}

          {/*Payment Status section */}
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Payment Status
            </Text>
            <Text
              className={`text-sm capitalize font-JakartaSemiBold ${payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
            >
              {payment_status}
            </Text>
          </View>
          {/*Payment Status section end*/}
        </View>

        {/*body section end*/}
      </View>
    </View>
  );
};
export default RideCard;
