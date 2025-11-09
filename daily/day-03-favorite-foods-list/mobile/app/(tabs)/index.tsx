import useFoodStore from "@/store/useFood";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import "../../global.css";

type AddFoodModalProps = {
  shouldBeVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type NoFoodsProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddFoodModal = ({ shouldBeVisible, setVisible }: AddFoodModalProps) => (
  <Modal visible={shouldBeVisible} transparent animationType="slide">
    <View className="flex-1 bg-black/50 justify-end">
      <View className="bg-white rounded-t-3xl px-6 pt-20 pb-8">
        <View className=" items-center justify-center">
          <View className="flex-row">
            <Text className="font-bold text-4xl">Add Favorite Food</Text>
            <Pressable
              className="bg-gray-500 p-6"
              onPress={() => setVisible(false)}
            >
              <Text className="text-white">x</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

const NoFoods = ({ setVisible }: NoFoodsProps) => (
  <View className="flex-1 items-center justify-center">
    <Text className="font-bold text-primary text-8xl">🍽️</Text>
    <Text className="font-bold text-3xl">No Foods Yet!</Text>
    <Text>Tap the + button below to add your favorite foods to the list</Text>
    <Pressable
      className="bg-blue-700 rounded-full p-12 mt-5"
      onPress={() => setVisible(true)}
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
        <NoFoods setVisible={setVisible} />
      )}
      {visible && (
        <AddFoodModal shouldBeVisible={visible} setVisible={setVisible} />
      )}
    </View>
  );
}
