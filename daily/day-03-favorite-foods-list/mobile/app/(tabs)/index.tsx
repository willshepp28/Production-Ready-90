import useFoodStore from "@/store/useFood";
import { useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";

import "../../global.css";

type addFoodModalProps = {
  shouldBeVisible: boolean;
  setVisible: boolean;
};

const addFoodModal = ({ shouldBeVisible, setVisible }: addFoodModalProps) => (
  <Modal visible={shouldBeVisible}>
    <View>
      <Text>Hey there</Text>
    </View>
    <Pressable onPress={() => setVisible(false)}>
      <Text>Close Modal</Text>
    </Pressable>
  </Modal>
);

const NoFoods = () => (
  <View className="flex-1 items-center justify-center">
    <Text className="font-bold text-primary text-8xl">🍽️</Text>
    <Text className="font-bold text-3xl">No Foods Yet!</Text>
    <Text>Tap the + button below to add your favorite foods to the list</Text>
    <Pressable
      className="bg-blue-700 rounded-full p-12"
      onPress={() => Alert.alert("Adding Food")}
    >
      <Text className="text-white font-bold text-2xl">+</Text>
    </Pressable>
  </View>
);

export default function HomeScreen() {
  const { favoriteFoods } = useFoodStore();
  const [visible, setVisible] = useState(false);
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
