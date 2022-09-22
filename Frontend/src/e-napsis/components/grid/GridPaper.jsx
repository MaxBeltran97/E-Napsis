import { Grid, Paper } from "@mui/material"

export const GridPaper = ({ children }) => {
    return (
        <Paper elevation={2} 
            sx={{
                mt: 2,
                p: 2,
                bgcolor: 'background.component',
                borderRadius: 2
            }}
        >
            <Grid container columnSpacing={2} rowSpacing={2}>
                {children}
            </Grid>
        </Paper>
    )
}
