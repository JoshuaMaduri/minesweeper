import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Board } from '../Board/Board';

export function Game() {

    const [gameStatus, setGameStatus] = React.useState(false)
    

    const startGame = () => {
        setGameStatus(true)
    }


  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed sx={{ border: 'black 10px solid' }}>
        <Box sx={{ justifyContent: 'center', alignItems: 'center', border: 'blue 11px solid' }}>
          <h1>MineSweeper</h1>
        </Box>
        {!gameStatus ? (
            <button onClick={startGame}>Start Game</button>
        ) : (
            <Board rows={8} columns={8} mines={10}/> 
        )}
        
      </Container>
    </React.Fragment>
  );
}