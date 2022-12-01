import { DialogDelete } from "@components/dialog"
import { useTellerStore } from "@hooks/useTellerStore"
import { CloudUploadOutlined, DeleteOutlined, ModeOutlined, RadioButtonChecked, RadioButtonUnchecked, Send } from "@mui/icons-material"
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"

export const TellerItem = ({ teller }) => {

  const { startChangeTeller, startDeleteTeller, startGetTellerUsername } = useTellerStore()
  const { situation, fullName, lastName, motherLastName } = teller
  const [usernameTeller, setUsernameTeller] = useState('')

  const [openDeleteView, setOpenDeleteView] = useState(false)

  const getUsername = async () => {
    const { username } = await startGetTellerUsername(teller.user_id)
    setUsernameTeller(username)
  }

  useEffect(() => {
    getUsername()
  }, [])

  const handleOpenDeleteView = () => {
    setOpenDeleteView(true)
  }
  const handleCloseDeleteView = () => {
    setOpenDeleteView(false)
  }
  const onDeleteTeller = () => {
    startDeleteTeller(teller._id)
  }


  const onChangeTeller = () => {
    startChangeTeller(teller)
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={1}>
          <Grid container justifyContent={'center'}>
            <Grid item>
              {
                (situation === true)
                  ? (
                    <Tooltip title={'Estado Activo'}>
                      <IconButton size="small">
                        <RadioButtonChecked fontSize="small" color="success" />
                      </IconButton>
                    </Tooltip>
                  )
                  : (
                    <Tooltip title={'Estado No Activo'}>
                      <IconButton size="small">
                        <RadioButtonUnchecked fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  )
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Typography>{fullName} {lastName} {motherLastName}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'center' }} >{usernameTeller}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Subir Documentos'}>
                <IconButton size="small">
                  <CloudUploadOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Modificar'}>
                <IconButton onClick={onChangeTeller} size="small">
                  <ModeOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Eliminar'}>
                <IconButton onClick={handleOpenDeleteView} size="small">
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
      </Grid>
      
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Divider />
      </Grid>

      <DialogDelete
        title={`Eliminar el relator ${fullName} ${lastName}`}
        body={'¿Estás seguro de eliminar este relator? Al eliminarlo, este se eliminará de todos los cursos donde esté asignado.'}
        open={openDeleteView}
        handleClose={handleCloseDeleteView}
        functionDelete={onDeleteTeller}
      />
    </Grid>
  )
}
