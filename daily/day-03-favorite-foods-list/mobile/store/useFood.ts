import { create } from "zustand";

type Food = {
  name: string;
};

type FoodStore = {
  favoriteFoods: Food[];
  foodCount: number;
  addNewFood: (name: Food) => void;
};

const useFoodStore = create<FoodStore>((set) => ({
  favoriteFoods: [],
  foodCount: 0,
  addNewFood: (food: Food) => {
    return set((state) => ({
      favoriteFoods: [...state.favoriteFoods, food]
    }));
  },
}));

export default useFoodStore;
