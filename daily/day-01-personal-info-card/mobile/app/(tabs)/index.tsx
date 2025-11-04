import { Text, TouchableOpacity, View } from "react-native";

import "../../global.css";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold text-primary">
        Personal info Card
      </Text>
      <TouchableOpacity className="mt-4 rounded-xl bg-primary px-4 py-2">
        <Text className="text-white font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
