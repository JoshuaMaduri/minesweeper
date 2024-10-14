import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { GameStatus } from '../GameStatus/GameStatus';
import { NewGameButton } from '../NewGameButton/NewGameButton';
import { Board } from '../Board/Board';

const BOARD_SIZE = 10;
const NUM_MINES = 15;

export const Minesweeper = () => {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    
    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);
      if (newBoard[row][col] !== 'X') {
        newBoard[row][col] = 'X';
        minesPlaced++;
      }
    }

    // Calculate numbers
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (newBoard[row][col] !== 'X') {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (row + i >= 0 && row + i < BOARD_SIZE && col + j >= 0 && col + j < BOARD_SIZE) {
                if (newBoard[row + i][col + j] === 'X') count++;
              }
            }
          }
          newBoard[row][col] = count;
        }
      }
    }

    setBoard(newBoard.map(row => row.map(cell => ({ value: cell, revealed: false, flagged: false }))));
    setGameOver(false);
    setWin(false);
  };

  const revealCell = (row, col) => {
    if (gameOver || win || board[row][col].revealed || board[row][col].flagged) return;

    const newBoard = [...board];
    newBoard[row][col].revealed = true;

    if (board[row][col].value === 'X') {
      setGameOver(true);
    } else if (board[row][col].value === 0) {
      revealAdjacentCells(row, col, newBoard);
    }

    setBoard(newBoard);
    checkWin(newBoard);
  };

  const revealAdjacentCells = (row, col, newBoard) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (row + i >= 0 && row + i < BOARD_SIZE && col + j >= 0 && col + j < BOARD_SIZE) {
          if (!newBoard[row + i][col + j].revealed && !newBoard[row + i][col + j].flagged) {
            newBoard[row + i][col + j].revealed = true;
            if (newBoard[row + i][col + j].value === 0) {
              revealAdjacentCells(row + i, col + j, newBoard);
            }
          }
        }
      }
    }
  };

  const toggleFlag = (row, col) => {
    if (gameOver || win || board[row][col].revealed) return;

    const newBoard = [...board];
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    setBoard(newBoard);
  };

  const checkWin = (newBoard) => {
    const win = newBoard.every(row => 
      row.every(cell => 
        (cell.value === 'X' && !cell.revealed) || (cell.value !== 'X' && cell.revealed)
      )
    );
    setWin(win);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
        Minesweeper
      </Typography>
      <Paper elevation={3} sx={{ p: 1, mb: 2 }}>
        <Board 
          board={board}
          onCellClick={revealCell}
          onCellRightClick={toggleFlag}
        />
      </Paper>
      <GameStatus gameOver={gameOver} win={win} />
      <NewGameButton onClick={initializeBoard} />
    </Box>
  );
};