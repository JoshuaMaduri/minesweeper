import React from 'react';
import { Button } from '@mui/material';

export const NewGameButton = ({ onClick }) => (
  <Button
    variant="contained"
    color="secondary"
    onClick={onClick}
    sx={{ mt: 2 }}
  >
    New Game
  </Button>
);