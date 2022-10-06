import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'

export const CompanyItem = ({ company }) => {

  const { _id, socialReason, fantasyName, rut } = company

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'}>
        <Grid item xs={1}>
          <Typography sx={{ pl: 1, textAlign: 'center' }}>{_id}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{socialReason}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{fantasyName}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'center' }}>{rut}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  )
}
