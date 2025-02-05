import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { createTheme, extendTheme, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SelectClass from "./SelectClass";
import Alist from "./AList";
import AListXs from "./AListXs";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {
  classAtom,
  currentSelectedCourse as currentSelectedCourseAtom,
} from "../../../../recoil/atoms/classAtom";
import {
  studentListState,
  isUpdateOrEditAttendanceStateAtom,
  attendanceType,
} from "../../../../recoil/atoms/attendanceAtom";
import { useRecoilState } from "recoil";
import { BACKEND_URL } from "../../../../globals";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const Attendence = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [currentSelectedCourse, setCurrentSelectedCourse] = useRecoilState(
    currentSelectedCourseAtom
  );
  const [type, setType] = useRecoilState(attendanceType);
  const [isUpdateOrEditAttendanceState, setIsUpdateOrEditAttendanceState] =
    useRecoilState(isUpdateOrEditAttendanceStateAtom);
  const [studentList, setStudentList] = useRecoilState(studentListState);

  const handleGoback = () => {};
  const handleTakeNewAttendance = async () => {
    // alert("jjj");
    try {
      setType("new");
      setIsUpdateOrEditAttendanceState(true);
      console.log({
        courseId: currentSelectedCourse._id,
        className: currentSelectedCourse.className[0],
      });
      const response = await axios.post(
        `${BACKEND_URL}/staff/studentListForNewAttendance`,
        {
          courseId: currentSelectedCourse._id,
          className: currentSelectedCourse.className[0],
        }
      );
      console.log(response.data.data);
      setStudentList(response.data.data);
    } catch (error) {
      console.log("failed to take new attedance", error);
    }
  };
  return (
    <div>
      {/* <Button onClick={handleGoback}>sds</Button> */}
      {!isUpdateOrEditAttendanceState && <SelectClass />}

      <CssVarsProvider disableTransitionOnChange>
        {currentSelectedCourse ? (
          <>
            {!isUpdateOrEditAttendanceState && (
              <Box
                sx={{
                  display: "flex",
                  mb: 1,
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "start", sm: "center" },
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <Input
                  size="sm"
                  placeholder="Search"
                  startDecorator={<SearchIcon />}
                  sx={{ flexGrow: 1, padding: "10px" }}
                />
                <Button
                  color="primary"
                  startDecorator={<PlaylistAddIcon />}
                  size="sm"
                  // className="p-auto"
                  sx={
                    !isXs && {
                      padding: "10px",
                    }
                  }
                  onClick={handleTakeNewAttendance}
                >
                  Take Attendance
                </Button>
                <Button aria-label="Download XLSheet">
                  <DownloadRoundedIcon />
                </Button>
              </Box>
            )}
            <div> {isXs ? <AListXs /> : <Alist />}</div>
          </>
        ) : (
          <p className="pt-20 text-xl text-center">No Class Selected</p>
        )}
      </CssVarsProvider>
    </div>
  );
};

export default Attendence;
