import { useTellerStore } from "@hooks/useTellerStore"
import { CloudUploadOutlined, DeleteOutlined, ModeOutlined, RadioButtonChecked, RadioButtonUnchecked, Send } from "@mui/icons-material"
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"

export const TellerItem = ({ teller }) => {

  const { startChangeTeller } = useTellerStore()
  const { situation, fullName, lastName, motherLastName, user } = teller

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
          <Typography>{user}</Typography>
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
      </Grid>
      
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Divider />
      </Grid>
    </Grid>
  )
}
