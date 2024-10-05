import { SignedIn, useAuth, useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import {
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "@/components/RideCard";
import { images, icons } from "@/constans";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useFetch } from "@/lib/fetch";

export default function Page() {
  // get geo point
  const { user } = useUser();
  const { signOut } = useAuth();
  // const loading = false;
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermissions, setHasPermissions] = useState(false);

  const { data: recentRides, loading } = useFetch(`/(api)/ride/${user?.id}`);

  useEffect(() => {
    const requestLocation = async () => {
      // let { status } = await Location.requestForegroundPermissionAsync();
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };

    requestLocation();
  }, []);
  // get geo point end

  // console.log("user", user);

  const handleSignOut = () => {
    signOut();

    router.replace("/(auth)/sign-in");
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };

  return (
    <SafeAreaView className="bg-general-500 h-full">
      <FlatList
        // data={recentRides?.slice(0, 5)}
        data={Array.isArray(recentRides) ? recentRides.slice(0, 5) : []}
        // data={[]}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col% items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent ride found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent ride found</Text>
              </>
            ) : (
              <>
                <ActivityIndicator size="small" color="#000" />
                <Text className="">Loading</Text>
              </>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <View
                className="flex-wrap w-[80%] overflow-hidden
              {/*border-2*/}
              {/*border-red-500*/}
              "
              >
                <Text className="text-xl font-JakartaExtraBold ">Welcome</Text>
                <Text numberOfLines={1} className="capitalize">
                  {/*{user?.firstName || user?.emailAddresses[0].emailAddress}*/}
                  {user?.firstName ||
                    user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleSignOut}
                className="w-10 h-10 justify-center items-center rounded-full bg-white
                  {/*border-2*/}
                  {/*border-red-500*/}
                  "
              >
                <Image
                  source={icons.out}
                  className="w-6 h-6 "
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {/*    GoogleTextInput*/}
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your Current Location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
