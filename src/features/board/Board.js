import { Box } from "@mui/material"
import { Cell } from "../cell/Cell"
import './board.css'
import { useEffect, useState } from "react";

export const Board = ({rows, columns, mines}) => {

    const [grid, setGrid] = useState([]);

    const initializeGrid = (rows, columns, mines) => {
        const grid = Array(rows).fill(null).map(() => 
          Array(columns).fill(null).map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
          }))
        );
        console.log(grid)
        return grid;
    };

    useEffect(() => {
        const data = initializeGrid(rows, columns, mines)
        setGrid(data)
    }, [rows, columns, mines])



    const handleClick = (row, col) => {
        const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
        console.log(newGrid[row][col])
        
        if (newGrid[row][col].isMine) {
          alert("Game Over!");
          return;
        }

        if(!newGrid[row][col].isRevaled){
            newGrid[row][col].isRevealed=true;
            setGrid(newGrid);
        }

    }

    const handleRightClick = (e, row, col) => {
        e.preventDefault();
        const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
        
        if (!newGrid[row][col].isRevealed) {
            newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
            setGrid(newGrid);
        }
        
    };
    
    

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 25px)`, 
            gridTemplateRows: `repeat(${rows}, 25px)`, 
            gap: '1px', 
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid black'
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
    )


}