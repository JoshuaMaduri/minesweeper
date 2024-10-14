import React from 'react';
import { Button } from '@mui/material';

export const Cell = ({ value, revealed, flagged, onClick, onContextMenu }) => (
  <Button
    variant={revealed ? "contained" : "outlined"}
    color={revealed && value === 'X' ? "error" : "primary"}
    sx={{
      minWidth: '32px',
      width: '32px',
      height: '32px',
      padding: 0,
      margin: '1px',
    }}
    onClick={onClick}
    onContextMenu={onContextMenu}
  >
    {revealed && value !== 0 && value !== 'X' && value}
    {revealed && value === 'X' && '💣'}
    {!revealed && flagged && '🚩'}
  </Button>
);

