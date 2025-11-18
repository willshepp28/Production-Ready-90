import { create } from "zustand";

export type Food = {
  id: number;
  photo: string;
  name: string;
};

type FoodStore = {
  favoriteFoods: Food[];
  addNewFood: (name: string) => void;
  removeFood: (id: number) => void;
  updateFood: (id: number, name: string) => void;
};

// Create a function that assignes random food emoji to each food
// returns a random emoji
const assignEmoji = () => {
  let foodEmojis = ["🍝", "🍔", "🍱", "🥘", "🍲", "🌮", "🌯"];

  return foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
};

const useFoodStore = create<FoodStore>((set) => ({
  favoriteFoods: [],
  addNewFood: (name: string) => {
    set((state) => {
      const id = state.favoriteFoods.length + 1;
      const photo = assignEmoji();
      const favoriteFood: Food = { id, photo, name };
      return { favoriteFoods: [...state.favoriteFoods, favoriteFood] };
    });
  },
  removeFood: (id: number) => {
    // Take the id
    // create a new filtered favoriteFoods array that excludes the food users wants removed with the given id
    set((state) => {
      const remainingFoods = state.favoriteFoods.filter((f) => f.id !== id);
      return { favoriteFoods: remainingFoods };
    });
  },
  updateFood: (id: number, newName: string) => {
    /*
      Update a specific food
      1. Input: number
      2. Output: void
    */
    set((state) => {
      let foodToUpdate: Food | undefined = state.favoriteFoods.find(
        (food) => food.id === id
      );
      if (foodToUpdate) {
        foodToUpdate.name = newName;
      }

      return { favoriteFoods: [...state.favoriteFoods] };
    });
  },
}));

export default useFoodStore;
