import { createTheme } from "@mui/material";
import { grey, orange, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#111'
    },
    buttonSecondary: {
      main: orange[400]
    },
    buttonTernary: {
      main: 'rgba(0, 0, 0, 0.54)'
    },  
    error: {
      main: red[400]
    },
    text: {
      main: '#000',
      active: '#1976d2'
    },
    background: {
      default: '#F4F7FC',
      main: '#FFF',
    }
  }
})