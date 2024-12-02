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
import { useRecoilState } from "recoil";

const Attendence = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [currentSelectedCourse, setCurrentSelectedCourse] = useRecoilState(
    currentSelectedCourseAtom
  );
  return (
    <div>
      <SelectClass />

      <CssVarsProvider disableTransitionOnChange>
        {currentSelectedCourse ? (
          <>
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
              >
                Take Attendance
              </Button>
              <Button aria-label="Download XLSheet">
                <DownloadRoundedIcon />
              </Button>
            </Box>
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
