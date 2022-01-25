import { atom, selector } from "recoil";

interface ITodoState {
  [key: string]: string[];
}

export const todoState = atom<ITodoState>({
  key: "todoState",
  default: {
    To_do: ["a", "b", "c", "d", "e", "f"],
    doing: ["g", "h", "i", "j", "k", "l"],
    done: ["m", "n", "o", "p", "q", "r"],
  },
});
