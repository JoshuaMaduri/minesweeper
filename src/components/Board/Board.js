import * as React from 'react';
import { Box } from '@mui/material';
import { Cell } from '../Cell/Cell';
import './board.css';

const initializeGrid = (rows, columns, mines) => {
  const grid = Array(rows).fill(null).map(() => 
    Array(columns).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
    }))
  );

  return calculateNeighborMines(placeMine(grid, rows, columns, mines), rows, columns);
};

const placeMine = (data, rows, columns, mines) => {
  let minesPlanted = 0;
  while (minesPlanted < mines) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomColumn = Math.floor(Math.random() * columns);
    if (!data[randomRow][randomColumn].isMine) {
      data[randomRow][randomColumn].isMine = true;
      minesPlanted++;
    }
  }
  return data;
};

const calculateNeighborMines = (grid, rows, columns) => {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], /* cell */ [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (grid[row][col].isMine) continue;

      let mineCount = 0;
      directions.forEach(([dRow, dCol]) => {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (
          newRow >= 0 && newRow < rows &&
          newCol >= 0 && newCol < columns &&
          grid[newRow][newCol].isMine
        ) {
          mineCount++;
        }
      });
      grid[row][col].neighborMines = mineCount;
    }
  }
  return grid;
};

const revealCell = (grid, row, col, rows, columns) => {
  if (grid[row][col].isRevealed || grid[row][col].isFlagged) return;

  grid[row][col].isRevealed = true;
  if (grid[row][col].neighborMines > 0) return;

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], /* cell */ [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  directions.forEach(([dRow, dCol]) => {
    const newRow = row + dRow;
    const newCol = col + dCol;
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns) {
      revealCell(grid, newRow, newCol, rows, columns);
    }
  });
};

const checkWin = (grid) => {
  return grid.every(row => 
    row.every(cell => 
      (cell.isMine && cell.isFlagged) || (!cell.isMine && cell.isRevealed)
    )
  );
};

export function Board({ rows, columns, mines, setGameStatus }) {
  const [grid, setGrid] = React.useState([]);

  React.useEffect(() => {
    const data = initializeGrid(rows, columns, mines);
    setGrid(data);
  }, [rows, columns, mines]);

  const handleClick = (row, col) => {
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    if (newGrid[row][col].isMine) {
      alert("Game Over!");
      setGameStatus(false);
      return;
    }
    
    revealCell(newGrid, row, col, rows, columns);
    setGrid(newGrid);

    if (checkWin(newGrid)) {
      alert("Congratulations, you won!");
      setGameStatus(false);
    }
  };
  

  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
    setGrid(newGrid);
  };

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 25px)`, 
      gridTemplateRows: `repeat(${rows}, 25px)`, 
      gap: '1px', 
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => handleClick(rowIndex, colIndex)}
            onRightClick={(e) => handleRightClick(e, rowIndex, colIndex)}
          />
        ))
      )}
    </Box>
  );
}
