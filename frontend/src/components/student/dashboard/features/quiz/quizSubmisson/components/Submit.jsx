import { Typography, Box } from "@mui/material";
import React from "react";

export const Submit = ({ score }) => {
  return (
    <Box
      className="flex flex-col items-center justify-center h-screen bg-gray-50"
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        padding: 4,
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#4caf50", fontWeight: "bold", mb: 2 }}
        className="text-center"
      >
        Thank You!
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "#555", textAlign: "center" }}
        className="text-gray-700"
      >
        Thank you for submitting the quiz! Your score is <strong>{score}</strong>
      </Typography>
    </Box>
  );
};
