import { atom } from "recoil";

export const classAtom = atom({
  key: "classAtom",
  default: null,
});

export const currentSelectedCourse = atom({
  key: "selectedClass",
  default: null,
});

export const studentClassAtom = atom({
  key: "studentClassAtom",
  default: null,
});