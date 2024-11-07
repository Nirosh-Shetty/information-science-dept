import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
const AList = () => {
  return (
    <div>
      <div className="w-8/9 h-16 border-red-300 rounded-lg bg-blue-400 flex items-center justify-center mb-6 mt-6">
        <ul className="flex list-none items-center justify-around w-full">
          <li>Class Name</li>
          <li>Time</li>
          <li>Attendance</li>
          <li>Edit | Update</li>
        </ul>
      </div>
      <div className="flex flex-col h-auto w-full gap-5">
        {Array(6)
          .fill(0)
          .map((a, b) => {
            return (
              <div key={a} className=" flex items-center justify-center w-8/9 h-16 dark:bg-gray-800 bg-gray-200 rounded-lg hover:shadow-md border-2 border-opacity-5 dark:hover:border-gray-50 hover:border-gray-500">
                <ul className="flex list-none items-center justify-around w-full">
                  <li>7 ISE B</li>
                  <li>10:50 AM Jan 31 '24</li>
                  <li>67/80</li>
                  <li>
                    <CreateIcon sx={{ color: "black" }} />
                    &nbsp; &nbsp; &nbsp;
                    <DeleteIcon sx={{ color: "red" }} />
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AList;
