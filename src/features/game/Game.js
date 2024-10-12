import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Board} from '../board/Board'

export function Game() {
    const [gameStatus, setGameStatus] = React.useState(false)

    const startGame = () => {
        setGameStatus(true)
    }

    return (
    <React.Fragment>
        <CssBaseline />
        <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
            <h1>Minesweeper</h1>
            {!gameStatus ? (
                <button onClick={startGame}>Start Game</button>
            ): (
                <Board rows={1} columns={2} mines={1} gameStatus={gameStatus}/>
            )}

        </Box>
        </Container>
    </React.Fragment>
    );
}