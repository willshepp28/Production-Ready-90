import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import "../../global.css";

/**
 *
 * Create a counter app
 * `- Users should be able to increment count
 * - Users should be able to decrement count
 * - Users shoudl be able to reset count
 */

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  const decrement = () => {
    if (!count) {
      Alert.alert("you cant decrement zero");
    } else {
      setCount(count - 1);
    }
  };

  return (
    <View className="flex-1 justify-center items-center flex-col gap-4">
      <Text className="text-3xl font-bold">Counter Clicker</Text>
      <Text className="bg-yellow-500 p-4 text-2xl font-bold">{count}</Text>
      <Pressable onPress={() => setCount(count + 1)}>
        <Text>Increment Count</Text>
      </Pressable>
      <Pressable onPress={() => decrement()}>
        <Text>Decrement Count</Text>
      </Pressable>
    </View>
  );
}
