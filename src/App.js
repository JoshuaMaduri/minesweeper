import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Minesweeper } from './Components/Minesweeper/Minesweeper';

export function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Minesweeper />

    </React.Fragment>
  );
}

