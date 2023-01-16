import { useSettingStore } from '@hooks/useSettingStore'
import { SETTINGS, TEMPLATE_CONTRACTS } from '@models/privateRoutes'
import { ArticleOutlined } from '@mui/icons-material'
import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ContractItem = ({ contract }) => {

  const navigate = useNavigate()
  const { startChangeContract } = useSettingStore()

  const routeTemplate = () => {
    startChangeContract(contract)
    navigate(`${SETTINGS}${TEMPLATE_CONTRACTS}/${contract._id}`, {replace: true})
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={11}>
          <Typography sx={{ pl: 1 }}>{contract.title}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Ver Template'}>
                <IconButton onClick={routeTemplate}>
                  <ArticleOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Divider />
      </Grid>
    </Grid>
  )
}
