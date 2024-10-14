import React from 'react';
import { Box, Typography } from '@mui/material';
import { Cell } from "../Cell/Cell";

export const Board = ({ board, onCellClick, onCellRightClick }) => {
  if (!board || board.length === 0 || !Array.isArray(board[0])) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography>Loading board...</Typography>
      </Box>
    );
  }

  return (
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
};