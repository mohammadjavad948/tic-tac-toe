import React from 'react';
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";

function App() {

  const light = createMuiTheme({
    palette: {
      type: 'light',
      background: {
        default: '#fef6e4'
      },
      secondary: {
        main: '#8bd3dd',
        contrastText: '#001858'
      },
      primary: {
        main: '#f3d2c1',
        contrastText: '#001858'
      }
    },
    typography: {
      allVariants: {color: '#001858'},
      body1: {color: '#172c66'},
      body2: {color: '#172c66'},
      button: {color: '#001858', backgroundColor: '#f582ae'}
    }
  });


  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
