import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useMediaQuery } from "@mui/material";

import SelectClass from "./SelectClass";
import Alist from "./AList";
import AListXs from "./AListXs";

const Attendence = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <div>
      <SelectClass />

      <CssVarsProvider disableTransitionOnChange>
        <Box
          sx={{
            display: "flex",
            mb: 1,
            gap: 3,
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
            startDecorator={<DownloadRoundedIcon />}
            size="sm"
            sx={
              !isXs && {
                padding: "10px",
              }
            }
          >
            Download Report
          </Button>
        </Box>
        <div> {isXs ? <AListXs /> : <Alist />}</div>
      </CssVarsProvider>
    </div>
  );
};

export default Attendence;
