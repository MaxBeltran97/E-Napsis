import { memo } from "react"
import { Grid, Typography } from "@mui/material"

export const InputForm = memo(({ name, active, error, textBoxSize = 7, children }) => {
  return (
    <Grid container direction={'row'} alignItems='center' sx={{ pt: 1 }}>
      <Grid item xs={5}>
        <Typography sx={{ color: (error) ? 'error.main' : (active) ? 'text.active' : '' }}>{name}</Typography>
      </Grid>
      <Grid item xs={7} md={textBoxSize}>
        {children}
      </Grid>
    </Grid>
  )
})
