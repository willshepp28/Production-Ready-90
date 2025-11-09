import useFoodStore from "@/store/useFood";
import { useState } from "react";
import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";

import "../../global.css";

type AddFoodModalProps = {
  shouldBeVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  addNewFood: (name: string) => void;
};

type NoFoodsProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type AddFoodButtonProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddFoodButton = ({ setVisible }: AddFoodButtonProps) => {
  return (
    <Pressable
      className="bg-blue-700 rounded-full p-12 mt-5"
      onPress={() => setVisible(true)}
    >
      <Text className="text-white font-bold text-2xl">+</Text>
    </Pressable>
  );
};

const AddFoodModal = ({
  shouldBeVisible,
  setVisible,
  addNewFood,
}: AddFoodModalProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input) {
      Alert.alert("Please enter valid food");
      return;
    }

    addNewFood(input);
    setVisible(false);
  };

  return (
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
            <View>
              <Text className="font-bold text-2xl">Food Name</Text>
              <TextInput
                className="mb-5"
                placeholder="e.g., Pizza, Sushi, Tacos"
                value={input}
                onChangeText={(text) => setInput(text)}
              />
              <Pressable onPress={() => handleSubmit()}>
                <Text>Add to List</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const NoFoods = ({ setVisible }: NoFoodsProps) => (
  <View className="flex-1 items-center justify-center">
    <Text className="font-bold text-primary text-8xl">🍽️</Text>
    <Text className="font-bold text-3xl">No Foods Yet!</Text>
    <Text>Tap the + button below to add your favorite foods to the list</Text>
  </View>
);

export default function HomeScreen() {
  const { favoriteFoods, addNewFood } = useFoodStore();
  const [visible, setVisible] = useState(false);
  const foodCount = favoriteFoods.length;
  return (
    <View className="flex-1 items-center justify-center">
      {foodCount ? (
        <View>
          <Text className="text-red">You have foods</Text>
        </View>
      ) : (
        <NoFoods setVisible={setVisible} />
      )}
      <AddFoodButton setVisible={setVisible} />
      <AddFoodModal
        shouldBeVisible={visible}
        setVisible={setVisible}
        addNewFood={addNewFood}
      />
    </View>
  );
}
