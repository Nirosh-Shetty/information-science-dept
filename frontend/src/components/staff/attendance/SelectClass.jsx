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

export default function SelectClass() {
  return (
    <div className="w-8/9 my-5">
      <Select className="w-full">
        <SelectTrigger className="text-xl p-5 text-gray-600 font-semibold dark:text-gray-100 dark:border-2">
          <SelectValue placeholder="Select a Class" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="text-2xl">
            <SelectLabel>Class</SelectLabel>
            <SelectItem value="apple">hhhhhhh</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
