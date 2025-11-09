import useFoodStore from "@/store/useFood";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  const { favoriteFoods } = useFoodStore();
  const amountOfFavoriteFoods = favoriteFoods.length;
  return (
    <SafeAreaView className="h-40 bg-blue-700 justify-center items-start pl-3">
      <Text className="text-white font-bold text-3xl">
        🍕 My Favorite Foods
      </Text>
      <Text className="text-white">
        {amountOfFavoriteFoods} delicious items
      </Text>
    </SafeAreaView>
  );
};

export default Header;
