import { CircularProgress } from '@mui/material';
import React from 'react';

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <CircularProgress />
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading quiz...</p>
    </div>
  );
};
