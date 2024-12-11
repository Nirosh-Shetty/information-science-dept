import React from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import DriveList from "./DriveList";
import PlacedCarousal from "./PlacedCarousal";

const Placement = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  return (
    <div
      style={{
        paddingLeft: "2rem",
        paddingRight: "2rem",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Header Section */}
      {/* <Typography
        variant="h4"
        align="center"
        style={{
          color:
            theme.palette.mode === "dark"
              ? "#d4af37" // Warm gold for dark mode
              : "#6a4c93", // Deep purple for light mode
          fontWeight: 700,
          marginBottom: "1.5rem",
          textShadow:
            theme.palette.mode === "dark" ? "1px 1px 3px #000" : "none", // Subtle shadow in dark mode
        }}
      >
        Congratulating Placed Students!
      </Typography> */}

      {/* Carousel Section */}
      <div>
        {/* <PlacedCarousal /> */}
      </div>

      {/* Drive Lists Section */}
      <div>
        <DriveList />
      </div>
    </div>
  );
};

export default Placement;
