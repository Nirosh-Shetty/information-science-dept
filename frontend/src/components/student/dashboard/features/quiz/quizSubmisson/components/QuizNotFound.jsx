import { Typography } from '@mui/material';
import React from 'react';

export const QuizNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Typography variant="h6" style={{ color: '#555', fontWeight: 500 }}>
        Quiz not found.
      </Typography>
    </div>
  );
};
