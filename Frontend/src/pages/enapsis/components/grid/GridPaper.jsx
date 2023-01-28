import { Grid, Paper } from "@mui/material"

export const GridPaper = ({ children, rowSpacing = 2, columnSpacing = 2 }) => {
  return (
    <Paper elevation={2}
      sx={{
        mt: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}
    >
      <Grid container columnSpacing={columnSpacing} rowSpacing={rowSpacing}>
        {children}
      </Grid>
    </Paper>
  )
}
