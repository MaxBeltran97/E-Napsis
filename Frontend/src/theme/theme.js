import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#232323'
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