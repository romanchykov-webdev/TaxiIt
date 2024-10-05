import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useFetch } from "@/lib/fetch";
import { images } from "@/constans";
import RideCard from "@/components/RideCard";
import { Ride } from "@/types/type";

const Rides = () => {
  const { user } = useUser();
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`,
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <FlatList
          data={recentRides}
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
              <Text className="text-2xl font-JakartaBold my-5">All rides</Text>
            </>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Rides;
