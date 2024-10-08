import * as React from 'react';
import { Box } from '@mui/material';
import './board.css';

export function Board({ rows, columns, mines }) {
  
  const [grid, setGrid] = React.useState([])

  React.useEffect(() => {
    const initialGrid = initalizeGrid(rows, columns, mines);
    setGrid(initialGrid);
  }, [rows, columns, mines])

  const initalizeGrid = (rows, columns, mines) => {
    const grid = Array(rows).fill(null).map(() => 
      Array(columns).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    )

    // Place mines and calculate neighboring mines

    return grid;
  }

  const handleClick = (row, col) => {
    console.log("Left Click:", row, col)
  }

  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    console.log("right click (flag)", row, col)
  }

  const renderGridItems = () => {
    return grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <div
          className='board-block'
          key={`${rowIndex}-${colIndex}`}
          onClick={() => handleClick(rowIndex, colIndex)}
          onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
        >
          {/* Render cell based on state (isMine, isFlagged, isRevealed, neighborMines) */}
        </div>
      ))
    );
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 25px)`, 
        gridTemplateRows: `repeat(${rows}, 25px)`, 
        gap: '1px', 
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {renderGridItems()}
    </Box>
  );
}