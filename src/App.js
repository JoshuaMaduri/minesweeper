import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Board } from './components/Board/Board';

export function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed sx={{ border: 'black 10px solid' }}>
        <Box sx={{ justifyContent: 'center', alignItems: 'center', border: 'blue 11px solid' }}>
          <h1>MineSweeper</h1>
        </Box>
        <Board rows={8} columns={8} mines={10}/> 
      </Container>
    </React.Fragment>
  );
}