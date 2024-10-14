import React from 'react';
import { Box } from '@mui/material';
import { Cell } from "../Cell/Cell";

export const Board = ({ board, onCellClick, onCellRightClick }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: `repeat(${board[0].length}, 32px)`,
      gap: 0,
      width: 'fit-content',
    }}
  >
    {board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          value={cell.value}
          revealed={cell.revealed}
          flagged={cell.flagged}
          onClick={() => onCellClick(rowIndex, colIndex)}
          onContextMenu={(e) => {
            e.preventDefault();
            onCellRightClick(rowIndex, colIndex);
          }}
        />
      ))
    )}
  </Box>
);