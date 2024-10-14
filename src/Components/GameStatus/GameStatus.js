import React from 'react';
import { Typography } from '@mui/material';

export const GameStatus = ({ gameOver, win }) => (
  <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
    {gameOver && <span style={{ color: 'red' }}>Game Over!</span>}
    {win && <span style={{ color: 'green' }}>You Win!</span>}
  </Typography>
);
