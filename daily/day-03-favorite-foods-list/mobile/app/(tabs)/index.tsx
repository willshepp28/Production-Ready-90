import useFoodStore from "@/store/useFood";
import { Text, TouchableOpacity, View } from "react-native";

import "../../global.css";

const NoFoods = () => (
  <View className="flex-1 items-center justify-center">
    <Text className="font-bold text-primary text-8xl">🍽️</Text>
    <Text className="font-bold text-3xl">No Foods Yet!</Text>
    <Text>Tap the + button below to add your favorite foods to the list</Text>
    <TouchableOpacity className="mt-4 rounded-xl bg-primary px-4 py-2">
      <Text className="text-white font-semibold">Get Started</Text>
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  const { favoriteFoods } = useFoodStore();
  const foodCount = favoriteFoods.length;
  return (
    <View className="flex-1 items-center justify-center">
      {foodCount ? (
        <Text className="text-red">You have foods</Text>
      ) : (
        <NoFoods />
      )}
    </View>
  );
}
