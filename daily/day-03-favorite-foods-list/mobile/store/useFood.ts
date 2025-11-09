import { create } from "zustand";

export type Food = {
  id: number;
  name: string;
};

type FoodStore = {
  favoriteFoods: Food[];
  addNewFood: (name: string) => void;
};

const useFoodStore = create<FoodStore>((set) => ({
  favoriteFoods: [],
  addNewFood: (name) => {
    set((state) => {
      const id = state.favoriteFoods.length + 1;
      const favoriteFood: Food = { id, name };
      return { favoriteFoods: [...state.favoriteFoods, favoriteFood] };
    });
  },
}));

export default useFoodStore;
