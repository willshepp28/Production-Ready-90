import { create } from "zustand";

export type Food = {
  id: number;
  photo: string;
  name: string;
};

type FoodStore = {
  favoriteFoods: Food[];
  addNewFood: (name: string) => void;
};

// Create a function that assignes random food emoji to each food
// returns a random emoji
const assignEmoji = () => {
  let foodEmojis = ["🍝", "🍔", "🍱", "🥘", "🍲", "🌮", "🌯"];

  return foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
};

const useFoodStore = create<FoodStore>((set) => ({
  favoriteFoods: [],
  addNewFood: (name) => {
    set((state) => {
      const id = state.favoriteFoods.length + 1;
      const photo = assignEmoji();
      const favoriteFood: Food = { id, photo, name };
      return { favoriteFoods: [...state.favoriteFoods, favoriteFood] };
    });
  },
}));

export default useFoodStore;
