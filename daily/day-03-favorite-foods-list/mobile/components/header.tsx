import useFoodStore from "@/store/useFood";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  const foodCount = useFoodStore((state) => state.foodCount);
  return (
    <SafeAreaView className="h-40 bg-blue-700 justify-center items-start pl-3">
      <Text className="text-white font-bold text-3xl">
        🍕 My Favorite Foods
      </Text>
      <Text className="text-white">{foodCount} delicious items</Text>
    </SafeAreaView>
  );
};

export default Header;
