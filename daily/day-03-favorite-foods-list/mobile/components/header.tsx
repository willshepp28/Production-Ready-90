import { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  const [numberOfFoods, setNumberOfFoods] = useState(0);
  return (
    <SafeAreaView className="h-40 bg-blue-700 justify-center items-start pl-3">
      <Text className="text-white font-bold text-3xl">
        🍕 My Favorite Foods
      </Text>
      <Text className="text-white">{numberOfFoods} delicious items</Text>
    </SafeAreaView>
  );
};

export default Header;
