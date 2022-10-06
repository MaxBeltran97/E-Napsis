import { useEffect, useState } from "react"

import { DeleteOutlined, HistoryEdu, ModeOutlined, Send } from "@mui/icons-material"
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"

import { useCompanyStore } from "@hooks/useCompanyStore"

export const ParticipantItem = ({ participant }) => {

  const { getCompanyWithId } = useCompanyStore()
  const { company_id, rut, fullName, lastName, motherLastName } = participant
  const [companyName, setCompanyName] = useState('')

  useEffect(() => {
    if(!!company_id) {
      const { fantasyName } = getCompanyWithId(company_id)
      setCompanyName(fantasyName)
    }else {
      setCompanyName('Particular')
    }
  }, [])

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'}>
        <Grid item xs={3}>
          <Typography sx={{ pl: 1 }}>{fullName} {lastName} {motherLastName}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'center' }} >{rut}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{companyName}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Historial de Participante'}>
                <IconButton size="small">
                  <HistoryEdu />
                </IconButton>
              </Tooltip>
            </Grid>
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
        <Grid item xs={1}>
          <Grid container justifyContent={'center'}>
            <Grid item>
              <Tooltip title={'Enviar Clave'}>
                <IconButton size="small">
                  <Send fontSize="small" sx={{ transform: 'rotate(-45deg)' }} />
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
