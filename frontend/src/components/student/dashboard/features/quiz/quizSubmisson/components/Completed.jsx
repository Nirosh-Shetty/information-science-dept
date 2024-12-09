import { Typography, Box } from '@mui/material';
import React from 'react';

export const Completed = () => {
  return (
    <Box
      className="flex flex-col items-center justify-center h-screen bg-gray-50"
      sx={{
        padding: 4,
        borderRadius: 2,
        boxShadow: {
          xs: 2, // Subtle shadow on smaller screens
          md: 6, // Prominent shadow on larger screens
        },
        backgroundColor: '#fff',
        width: '90%', // Responsive width
        maxWidth: '600px', // Cap width for larger screens
        margin: 'auto',
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: '#ff5722', fontWeight: 'bold', mb: 2 }}
        className="text-center"
      >
        Quiz Completed
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: '#555', textAlign: 'center' }}
        className="text-gray-700"
      >
        You have already submitted the quiz!!
      </Typography>
    </Box>
  );
};
