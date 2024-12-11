import { atom } from "recoil";

export const studentListState = atom({
  key: "studentListState",
  default: {},
});

export const updatedStudentListState = atom({
  key: "updatedStudentListState",
  default: [],
});

export const studentSearchQueryState = atom({
  key: "studentSearchQueryState",
  default: "",
});

export const isUpdateOrEditAttendanceStateAtom = atom({
  key: "isUpdateOrEditAttendanceStateAtom",
  default: false,
});

export const attendanceType = atom({
  key: "attendanceType",
  default: "",
});
