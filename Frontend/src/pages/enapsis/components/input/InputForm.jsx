import { memo } from "react"
import { Grid, Typography } from "@mui/material"

export const InputForm = memo(({ name, subName, active, error, textBoxSize = 7, direction = 'column', children }) => {
  return (
    <Grid container direction={'row'} alignItems='center' sx={{ pt: 1 }}>
      <Grid item xs={(direction === 'column') ? 5 : (direction === 'row') ? 12 : 5}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Typography sx={{ color: (error) ? 'error.main' : (active) ? 'text.active' : '' }}>{name}</Typography>
        <Typography sx={{ fontSize: 14, pl: '4px' }} >{subName}</Typography>
      </Grid>
      <Grid item xs={7} md={textBoxSize}>
        {children}
      </Grid>
    </Grid>
  )
})
