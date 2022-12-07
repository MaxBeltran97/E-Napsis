import { useEffect, useState } from "react"

import { DeleteOutlined, HistoryEdu, ModeOutlined, Send } from "@mui/icons-material"
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"

import { useCompanyStore } from "@hooks/useCompanyStore"
import { useParticipantStore } from "@hooks/useParticipantStore"
import { DialogDelete } from "@components/dialog"

export const ParticipantItem = ({ participant }) => {

  const { startGetCompany } = useCompanyStore()
  const { startChangeParticipant, startDeleteParticipant } = useParticipantStore()

  const { company_id, rut, fullName, lastName, motherLastName } = participant
  const [companyName, setCompanyName] = useState('')

  const [openDeleteView, setOpenDeleteView] = useState(false)

  const getCompanyName = async () => {
    //TODO Cambiar por getCompanyById para buscar en el store primero
    const { fantasyName } = await startGetCompany(company_id)
    setCompanyName(fantasyName)
  }

  useEffect(() => {
    if (!!company_id) {
      getCompanyName()
    } else {
      setCompanyName('Particular')
    }
  }, [])

  const handleOpenDeleteView = () => {
    setOpenDeleteView(true)
  }
  const handleCloseDeleteView = () => {
    setOpenDeleteView(false)
  }
  const onDeleteParticipant = () => {
    startDeleteParticipant(participant._id)
  }


  const onChangeParticipant = () => {
    startChangeParticipant(participant)
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
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
                <IconButton>
                  <HistoryEdu />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Modificar'}>
                <IconButton onClick={onChangeParticipant}>
                  <ModeOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Eliminar'}>
                <IconButton onClick={handleOpenDeleteView}>
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
                <IconButton>
                  <Send fontSize="small" sx={{ transform: 'rotate(-45deg)' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Divider />
      </Grid>

      <DialogDelete
        title={`Eliminar el participante ${fullName} ${lastName}`}
        body={'¿Estás seguro de eliminar este participante? Al eliminarlo, este se eliminará de su empresa en caso de estar en una.'}
        open={openDeleteView}
        handleClose={handleCloseDeleteView}
        functionDelete={onDeleteParticipant}
      />
    </Grid>
  )
}
