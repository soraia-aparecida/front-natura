import React from 'react';
import Router from "./routes/Route";
import { ThemeProvider } from "@mui/material";
import theme from "./constants/theme";
import { createGlobalStyle } from 'styled-components';
import GlobalState from './contex/GlobalState';


const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif !important;
  button{
      cursor: pointer;
    }
}
`

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalState>
        <Router />
      </GlobalState>
    </ThemeProvider >
  );
};

export default App;
