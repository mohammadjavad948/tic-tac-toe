import React from 'react';
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import Container from "./Container";

function App() {

  const light = createMuiTheme({
    palette: {
      type: 'light',
      background: {
        default: '#fef6e4'
      },
      secondary: {
        main: '#ef9368',
        contrastText: '#092065'
      },
      primary: {
        main: '#8bd3dd',
        contrastText: '#001858'
      }
    },
    typography: {
      allVariants: {color: '#001858'},
      body1: {color: '#172c66'},
      body2: {color: '#172c66'}
    }
  });

  const dark = createMuiTheme({
    palette: {
      type: 'dark',
    }
  });

  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <Container />
    </ThemeProvider>
  );
}

export default App;
