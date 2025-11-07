import { create } from "zustand";

type Food = {
  name: string;
};

type FoodStore = {
  favoriteFoods: Food[];
  foodCount: number;
};

const useFoodStore = create<FoodStore>((set) => ({
  favoriteFoods: [],
  foodCount: 0,
  addNewFood: (food: Food) => {
    return set((state) => ({
      favoriteFoods: [...state.favoriteFoods, food],
      foodCount: state.favoriteFoods.length + 1,
    }));
  },
}));

export default useFoodStore;
