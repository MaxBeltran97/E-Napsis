import { DeleteOutlined, ModeOutlined } from '@mui/icons-material'
import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'

export const CompanyItem = ({ company }) => {

  const { fantasyName, rut, contactName } = company

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'}>
        <Grid item xs={4}>
          <Typography sx={{ pl: 1 }} >{fantasyName}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'center' }}>{rut}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{contactName}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Modificar'}>
                <IconButton size="small">
                  <ModeOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Eliminar'}>
                <IconButton size="small">
                  <DeleteOutlined color="error" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>  
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  )
}
