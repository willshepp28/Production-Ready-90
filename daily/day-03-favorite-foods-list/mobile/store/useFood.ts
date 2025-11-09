import { create } from "zustand";

type Food = {
  id: number;
  name: string;
};

type FoodStore = {
  favoriteFoods: Food[];
  addNewFood: (name: Food) => void;
};

const useFoodStore = create<FoodStore>((set) => ({
  favoriteFoods: [],
  addNewFood: (food: Food) => {
    return set((state) => ({
      favoriteFoods: [...state.favoriteFoods, food],
    }));
  },
}));

export default useFoodStore;
