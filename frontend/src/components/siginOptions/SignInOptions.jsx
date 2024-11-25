import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";

const SignInOptions = () => {
  const navigate = useNavigate();

  const signInOptions = [
    {
      title: "Admin",
      description:
        "Login as an administrator to access the dashboard to manage app data.",
      icon: <AdminPanelSettingsIcon sx={{ fontSize: "3em" }} />,
      path: "/signin/admin",
      boxbg: "bg-gray-400 dark:bg-gray-500",
    },
    {
      title: "Staff",
      description:
        "Login as a teacher to create courses, assignments, and track student progress.",
      icon: <GroupIcon sx={{ fontSize: "3em" }} />,
      path: "/signin/staff",
      boxbg: "bg-red-400 dark:bg-red-500",
    },
    {
      title: "Student",
      description:
        "Login as a student to explore course materials and assignments.",
      icon: <SchoolIcon sx={{ fontSize: "3em" }} />,
      path: "/signin/student",
      boxbg: "bg-blue-400 dark:bg-blue-500",
    },
  ];

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly bg-gray-100 dark:bg-gray-900 pb-16">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold pb-4 text-gray-800 dark:text-gray-200">
          Welcome to ISE Department
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-400">
          Select your role to sign in and access your dashboard.
        </p>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-14">
        {signInOptions.map((option, index) => (
          <div
            key={index}
            className={`w-64 h-72 rounded-lg flex items-center flex-col justify-center p-5 cursor-pointer ${option.boxbg} shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out`}
            onClick={() => navigate(option.path)}
          >
            {option.icon}
            <h1 className="text-center font-bold text-xl pb-7 dark:text-white">
              {option.title}
            </h1>
            <p className="text-center dark:text-gray-300">
              {option.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignInOptions;
