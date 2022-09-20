import { Grid, Paper } from "@mui/material"

export const GridPaper = ({ children }) => {
    return (
        <Paper elevation={2} 
            sx={{
                mt: 2,
                pl: 2, pt: 2, pr: 2, pb: 2,
                bgcolor: 'background.component',
                borderRadius: 2
            }}
        >
            <Grid container>
                {children}
            </Grid>
        </Paper>
    )
}
