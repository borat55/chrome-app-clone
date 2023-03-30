import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const mainFocusState = atom({
  key: "mainFocus",
  default: "",
});

export const switchToFocusState = atom({
  key: "toSwitch",
  default: false,
});

export const focusMenuState = atom({
  key: "focusMenu",
  default: false,
});

export const strikethroughState = atom({
  key: "strikethrough",
  default: false,
});

export const speechBubbleState = atom({
  key: "speechBubble",
  default: false,
});
