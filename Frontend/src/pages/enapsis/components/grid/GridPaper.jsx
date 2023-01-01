import { Grid, Paper } from "@mui/material"

export const GridPaper = ({ children, rowSpacing = 2 }) => {
  return (
    <Paper elevation={2}
      sx={{
        mt: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}
    >
      <Grid container columnSpacing={2} rowSpacing={rowSpacing}>
        {children}
      </Grid>
    </Paper>
  )
}
