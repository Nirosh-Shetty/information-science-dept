import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRecoilState } from "recoil";
import {
  classAtom,
  currentSelectedCourse as currentSelectedCourseAtom,
} from "../../../../recoil/atoms/classAtom";
import axios from "axios";
import { BACKEND_URL } from "../../../../globals";

export default function SelectClass() {
  const [classes, setClasses] = useRecoilState(classAtom);
  const [currentSelectedCourse, setCurrentSelectedCourse] = useRecoilState(
    currentSelectedCourseAtom
  );
  console.log(classes);
  const handleValueChange = (value) => {
    console.log(value, "VVVVVVV");
    const selectedClass = classes.find((item) => item._id === value);
    console.log(selectedClass, "DHSGDHGDSHG");
    setCurrentSelectedCourse(selectedClass);
  };

  // console.log(classes);
  return (
    <div className="w-8/9 my-5">
      <Select className="w-full" onValueChange={handleValueChange}>
        <SelectTrigger className="text-xl p-5 text-gray-600 font-semibold dark:text-gray-100 dark:border-2">
          {currentSelectedCourse?.className ? (
            <SelectValue
              placeholder={`${currentSelectedCourse.name}  ${currentSelectedCourse.className}`}
            />
          ) : (
            <SelectValue placeholder="Select a Class" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="text-2xl">
            <SelectLabel>Class</SelectLabel>
            {classes.map((item, index) => (
              <SelectItem key={item._id} value={item._id}>
                {item.name} {item.className}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
