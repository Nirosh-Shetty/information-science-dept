import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SaveIcon from "@mui/icons-material/Save";
// import Sidebar from './components/Sidebar';
import OrderTable from "./OrderTable";
import OrderList from "./OrderList";
// import Header from './components/Header';

import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";

import { useMediaQuery } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import TimePicker from "./TimePicker";

import { useTheme } from "@mui/joy/styles";
import { useRecoilState } from "recoil";
import {
  studentSearchQueryState,
  studentListState,
  updatedStudentListState,
  isUpdateOrEditAttendanceStateAtom,
  attendanceType,
} from "../../../../../recoil/atoms/attendanceAtom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import { BACKEND_URL } from "../../../../../globals";
// const sampleData = [
//   {
//     id: "S-101",
//     usn: "1IS20IS001",
//     name: "Arjun Reddy",
//     attendance: "Present",
//   },
//   {
//     id: "S-102",
//     usn: "1IS20IS002",
//     name: "Riya Sharma",
//     attendance: "Absent",
//   },
//   {
//     id: "S-103",
//     usn: "1IS20IS003",
//     name: "Kiran Patil",
//     attendance: "Excused",
//   },
//   {
//     id: "S-104",
//     usn: "1IS20IS004",
//     name: "Priya Nair",
//     attendance: "Present",
//   },
//   {
//     id: "S-105",
//     usn: "1IS20IS005",
//     name: "Vikram Rao",
//     attendance: "Absent",
//   },
//   {
//     id: "S-106",
//     usn: "1IS20IS006",
//     name: "Sneha Iyer",
//     attendance: "Present",
//   },
//   {
//     id: "S-107",
//     usn: "1IS20IS007",
//     name: "Aditya Menon",
//     attendance: "Absent",
//   },
//   {
//     id: "S-108",
//     usn: "1IS20IS008",
//     name: "Meera Kapoor",
//     attendance: "Present",
//   },
//   {
//     id: "S-109",
//     usn: "1IS20IS009",
//     name: "Rohan Desai",
//     attendance: "Excused",
//   },
//   {
//     id: "S-110",
//     usn: "1IS20IS010",
//     name: "Pooja Joshi",
//     attendance: "Absent",
//   },
//   {
//     id: "S-111",
//     usn: "1IS20IS011",
//     name: "Ankit Verma",
//     attendance: "Present",
//   },
//   {
//     id: "S-112",
//     usn: "1IS20IS012",
//     name: "Neha Gupta",
//     attendance: "Present",
//   },
//   {
//     id: "S-113",
//     usn: "1IS20IS013",
//     name: "Siddharth Rao",
//     attendance: "Absent",
//   },
//   {
//     id: "S-114",
//     usn: "1IS20IS014",
//     name: "Ishita Jain",
//     attendance: "Excused",
//   },
//   {
//     id: "S-115",
//     usn: "1IS20IS015",
//     name: "Rajiv Sharma",
//     attendance: "Present",
//   },
//   {
//     id: "S-116",
//     usn: "1IS20IS016",
//     name: "Tanvi Aggarwal",
//     attendance: "Present",
//   },
//   {
//     id: "S-117",
//     usn: "1IS20IS017",
//     name: "Aman Khan",
//     attendance: "Absent",
//   },
//   {
//     id: "S-118",
//     usn: "1IS20IS018",
//     name: "Deepa Pillai",
//     attendance: "Excused",
//   },
//   {
//     id: "S-119",
//     usn: "1IS20IS019",
//     name: "Mohit Gupta",
//     attendance: "Present",
//   },
//   {
//     id: "S-120",
//     usn: "1IS20IS020",
//     name: "Sanya Singh",
//     attendance: "Absent",
//   },
// ];

export default function StudentListForAttendance() {
  const theme = useTheme();
  // console.log("hhhht", theme.palette.mode);
  const [updatedlist, setUpdatedlist] = useRecoilState(updatedStudentListState);
  const [isUpdateOrEditAttendanceState, setIsUpdateOrEditAttendanceState] =
    useRecoilState(isUpdateOrEditAttendanceStateAtom);
  const [type, setType] = useRecoilState(attendanceType);

  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [studentList, setStudentList] = useRecoilState(studentListState);
  const [searchQuery, setSearchQuery] = useRecoilState(studentSearchQueryState);
  const handleGoBack = () => {
    setIsUpdateOrEditAttendanceState(false);
  };
  // setStudentList(sampleData);

  const handleAttendanceSaveOrUpdate = async () => {
    const originalFormat = {
      _id: studentList._id, // Assuming you're dealing with an object holding the student list
      class: studentList.class,
      course: studentList.course,
      date: studentList.date,
      session: studentList.session,
      attendance: updatedlist.map((record) => {
        // Find the matching student record by usn and get its _id
        const studentRecord = studentList.attendance.find(
          (att) => att.student.usn === record.usn
        );
        return {
          student: {
            _id: studentRecord.student._id, // Use the student's ID from the matched record
            fullName: record.name, // Use the student's full name
            usn: record.usn, // Use the student's USN
          },
          attendance: record.attendance,
          _id: record.id, // Use the attendance ID again
        };
      }),
    };

    // console.log("Original Format Data:", originalFormat);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/staff/saveOrUpdateAttendance/${type}`,
        originalFormat
      );

      setIsUpdateOrEditAttendanceState(false);
      console.log(response.data);
      console.log("hhhh");
    } catch (error) {
      console.log("error in save/update", error);
    }
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          minHeight: "100dvh",
          height: "auto",
        }}
      >
        {/* <TimePicker /> */}
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <Box className="flex items-center  justify-between mb-2">
            <div>
              {" "}
              <h1 className="text-4xl font-extrabold pr-5">7 ISE B </h1>
              <h3 className="text-gray-600">
                {studentList.date.toLocaleString()}
                {/* 16<sup>th</sup> January '24 */}
              </h3>
            </div>

            <Button
              className=""
              startDecorator={<ArrowBackIosIcon />}
              color="success"
              onClick={handleGoBack}
            >
              Go Back
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 3,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Input
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
              sx={{ flexGrow: 1, padding: "10px" }}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
              sx={
                !isXs && {
                  padding: "10px",
                }
              }
            >
              Download Sheet
            </Button>
          </Box>
          <div> {isXs ? <OrderList /> : <OrderTable theme={theme} />}</div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginY: "18px",
            }}
          >
            <Button variant="outlined" color="neutral">
              Cancel
            </Button>
            <Button
              color="success"
              startDecorator={<SaveIcon />}
              sx={{ paddingX: "25px" }}
              onClick={handleAttendanceSaveOrUpdate}
            >
              {type == "new" ? "Save" : "Update"}
            </Button>
          </Box>
          <br />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

//TODO:while updating the attendance , send a pop up with details of what have been updated(students with new update or time update)
// loading spinner while fetching the data and during the saving

//auto save option if needed
