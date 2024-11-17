import { atom } from "recoil";

export const studentListState = atom({
  key: "studentListState",
  default: [],
});

export const studentSearchQueryState = atom({
  key: "studentSearchQueryState",
  default: "",
});
