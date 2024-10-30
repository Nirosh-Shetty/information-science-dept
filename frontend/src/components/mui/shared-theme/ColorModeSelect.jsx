import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

export default function ColorModeToggle() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="flex-start">
      <IconButton
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        aria-label="toggle color mode"
      >
        {mode === 'light' ? (
          <img src="/moon.svg" width={25} alt="Toggle to dark mode" />
        ) : (
          <img src="/sun.svg" width={25} alt="Toggle to light mode" />
        )}
      </IconButton>
    </Box>
  );
}
