import { Box } from "@mui/material"
import { Cell } from "../cell/Cell"
import './board.css'
import { useEffect, useState } from "react";

export const Board = ({rows, columns, mines, gameStatus}) => {

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

        return placeMine(grid, rows, columns, mines);
    };




    useEffect(() => {
        const data = initializeGrid(rows, columns, mines)
        setGrid(data)
        console.log(gameStatus)
    }, [rows, columns, mines, gameStatus])



    const handleClick = (row, col) => {
        const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
        
        if (newGrid[row][col].isMine) {
            newGrid[row][col].isRevaled=true;
            setGrid(newGrid)
            alert("Game Over!");
            gameStatus=false
            return;
        }

        if(!newGrid[row][col].isRevaled){
            newGrid[row][col].isRevealed=true;
            setGrid(newGrid);
        }
        console.log(newGrid[row][col])
    }

    const handleRightClick = (e, row, col) => {
        e.preventDefault();
        const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
        if (gameStatus){
            if (!newGrid[row][col].isRevealed) {
                newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
                setGrid(newGrid);
            }
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