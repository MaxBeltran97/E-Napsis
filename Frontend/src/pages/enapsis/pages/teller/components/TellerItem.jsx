import { DialogDelete } from "@components/dialog"
import { useTellerStore } from "@hooks/useTellerStore"
import { CloudUploadOutlined, DeleteOutlined, ModeOutlined, Preview, RadioButtonChecked, RadioButtonUnchecked, Send, Visibility } from "@mui/icons-material"
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { TellerView } from "."

export const TellerItem = ({ teller }) => {

  const { startChangeTeller, startDeleteTeller, startGetTellerUsername } = useTellerStore()
  const { situation, fullName, lastName, motherLastName } = teller
  const [usernameTeller, setUsernameTeller] = useState('')

  const [openDeleteView, setOpenDeleteView] = useState(false)
  const [openViewView, setOpenViewView] = useState(false)

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

  const handleOpenViewView = () => {
    setOpenViewView(true)
  }
  const handleCloseViewView = () => {
    setOpenViewView(false)
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
                      <IconButton>
                        <RadioButtonChecked fontSize="small" color="success" />
                      </IconButton>
                    </Tooltip>
                  )
                  : (
                    <Tooltip title={'Estado No Activo'}>
                      <IconButton>
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
                <IconButton>
                  <CloudUploadOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Ver Datos'}>
                <IconButton onClick={handleOpenViewView}>
                  <Visibility />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Modificar'}>
                <IconButton onClick={onChangeTeller}>
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
        title={`Eliminar el relator ${fullName} ${lastName}`}
        body={'¿Estás seguro de eliminar este relator? Al eliminarlo, este se eliminará de todos los cursos donde esté asignado.'}
        open={openDeleteView}
        handleClose={handleCloseDeleteView}
        functionDelete={onDeleteTeller}
      />
      <TellerView teller={teller} open={openViewView} handleClose={handleCloseViewView} />
    </Grid>
  )
}
