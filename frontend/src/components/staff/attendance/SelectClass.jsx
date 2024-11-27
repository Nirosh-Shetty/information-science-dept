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
  currentSelectedClass as currentSelectedClassAtom,
} from "../../../../recoil/atoms/classAtom";

export default function SelectClass() {
  const [classes, setClasses] = useRecoilState(classAtom);
  const [currentSelectedClass, setCurrentSelectedClass] = useRecoilState(
    currentSelectedClassAtom
  );
  const handleValueChange = (value) => {
    console.log(value);
    const selectedClass = classes.find((item) => item._id === value);
    setCurrentSelectedClass(selectedClass);
  };
  React.useEffect(() => {
    //ftech the attendence list
  }, [currentSelectedClass]);

  // console.log(classes);
  return (
    <div className="w-8/9 my-5">
      <Select className="w-full" onValueChange={handleValueChange}>
        <SelectTrigger className="text-xl p-5 text-gray-600 font-semibold dark:text-gray-100 dark:border-2">
          <SelectValue placeholder="Select a Class" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="text-2xl">
            <SelectLabel>Class</SelectLabel>
            {classes.map((item, index) => (
              <SelectItem key={item._id} value={item._id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
