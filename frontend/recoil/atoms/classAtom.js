import { atom } from "recoil";

export const classAtom = atom({
  key: "classAtom",
  default: null,
});

export const currentSelectedClass = atom({
  key: "selectedClass",
  default: null,
});
