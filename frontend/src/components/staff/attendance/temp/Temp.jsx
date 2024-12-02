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
} from "../../../../recoil/atoms/attendanceAtom";

const sampleData = [
  {
    id: "S-101",
    usn: "1IS20IS001",
    name: "Arjun Reddy",
    attendance: "Present",
  },
  {
    id: "S-102",
    usn: "1IS20IS002",
    name: "Riya Sharma",
    attendance: "Absent",
  },
  {
    id: "S-103",
    usn: "1IS20IS003",
    name: "Kiran Patil",
    attendance: "Excused",
  },
  {
    id: "S-104",
    usn: "1IS20IS004",
    name: "Priya Nair",
    attendance: "Present",
  },
  {
    id: "S-105",
    usn: "1IS20IS005",
    name: "Vikram Rao",
    attendance: "Absent",
  },
  {
    id: "S-106",
    usn: "1IS20IS006",
    name: "Sneha Iyer",
    attendance: "Present",
  },
  {
    id: "S-107",
    usn: "1IS20IS007",
    name: "Aditya Menon",
    attendance: "Absent",
  },
  {
    id: "S-108",
    usn: "1IS20IS008",
    name: "Meera Kapoor",
    attendance: "Present",
  },
  {
    id: "S-109",
    usn: "1IS20IS009",
    name: "Rohan Desai",
    attendance: "Excused",
  },
  {
    id: "S-110",
    usn: "1IS20IS010",
    name: "Pooja Joshi",
    attendance: "Absent",
  },
  {
    id: "S-111",
    usn: "1IS20IS011",
    name: "Ankit Verma",
    attendance: "Present",
  },
  {
    id: "S-112",
    usn: "1IS20IS012",
    name: "Neha Gupta",
    attendance: "Present",
  },
  {
    id: "S-113",
    usn: "1IS20IS013",
    name: "Siddharth Rao",
    attendance: "Absent",
  },
  {
    id: "S-114",
    usn: "1IS20IS014",
    name: "Ishita Jain",
    attendance: "Excused",
  },
  {
    id: "S-115",
    usn: "1IS20IS015",
    name: "Rajiv Sharma",
    attendance: "Present",
  },
  {
    id: "S-116",
    usn: "1IS20IS016",
    name: "Tanvi Aggarwal",
    attendance: "Present",
  },
  {
    id: "S-117",
    usn: "1IS20IS017",
    name: "Aman Khan",
    attendance: "Absent",
  },
  {
    id: "S-118",
    usn: "1IS20IS018",
    name: "Deepa Pillai",
    attendance: "Excused",
  },
  {
    id: "S-119",
    usn: "1IS20IS019",
    name: "Mohit Gupta",
    attendance: "Present",
  },
  {
    id: "S-120",
    usn: "1IS20IS020",
    name: "Sanya Singh",
    attendance: "Absent",
  },
];

export default function Temp() {
  const theme = useTheme();
  // console.log("hhhht", theme.palette.mode);

  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const attendanceId = type === "update" ? searchParams.get("id") : null;

  const [studentList, setStudentList] = useRecoilState(studentListState);
  const [searchQuery, setSearchQuery] = useRecoilState(studentSearchQueryState);

  setStudentList(sampleData);

  useEffect(() => {
    if (type == "update") {
    } else {
    }
  }, []);

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
          <Box className="flex items-center justify-start mb-2">
            <h1 className="text-4xl font-extrabold pr-5">7 ISE B </h1>
            <h3 className="text-gray-600">
              16<sup>th</sup> January '24
            </h3>
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
          <div>
            {" "}
            {isXs ? (
              <OrderList studentData={studentList} />
            ) : (
              <OrderTable theme={theme} studentData={studentList} />
            )}
          </div>
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
