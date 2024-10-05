import * as React from 'react';
import { Box } from '@mui/material';
import './board.css';

export function Board({ rows, columns }) {
  const createGridItems = () => {
    const gridItems = [];
    for (let i = 0; i < rows * columns; i++) {
      gridItems.push(

        <div className='board-block' key={i} onClick={() => {console.log({i})}}>
          
        </div>
      );
    }
    return gridItems;
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
      {createGridItems()} 
    </Box>
  );
}