import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#262254'
        },
        secondary: {
            main: '#232323'
        },
        error: {
            main: red[400]
        },
        text: {
            active: '#1976d2'
        },
        background: {
            default: '#F4F7FC',
            component: '#FFF'
        }
    },
})