import { createTheme } from '@mui/material/styles';
import { primaryColors, secondaryColors, thirdColors } from './colors'

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColors,
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: thirdColors,
      contrastText: "#000000"
    },
    text: {
      primary: "#000000"
    },
    common: {
      white: '#FFFFFF', 
      brow: secondaryColors// Definindo a cor branca
    }
  }
})

export default theme