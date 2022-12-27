import { DialogDelete } from "@components/dialog"
import { useUiStore } from "@hooks/useUiStore"
import { Autorenew, DeleteOutline, ModeOutlined } from "@mui/icons-material"
import { Divider, Grid, IconButton, Tooltip } from "@mui/material"
import { useState } from "react"

export const HolidayItem = ({ holiday }) => {

  const { startChangeHoliday, startDeleteHoliday, startUpdateHoliday } = useUiStore()
  const dayFormat = new Date(holiday.day).toLocaleDateString('es-es')

  const [openDeleteView, setOpenDeleteView] = useState(false)

  const onChangeHoliday = () => {
    startChangeHoliday(holiday)
  }
  
  const onUpdateHoliday = () => {
    startUpdateHoliday(holiday)
  }

  const handleOpenDeleteView = () => {
    setOpenDeleteView(true)
  }
  const handleCloseDeleteView = () => {
    setOpenDeleteView(false)
  }
  const onDeleteHoliday = () => {
    startDeleteHoliday(holiday._id)
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          {dayFormat}
        </Grid>
        <Grid item xs={6}>
          {
            (holiday.name === '')
            ? 'Sin nombre'
            : holiday.name
          }
        </Grid>
        <Grid item xs={3}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Modificar'}>
                <IconButton onClick={onChangeHoliday}>
                  <ModeOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Eliminar'}>
                <IconButton onClick={handleOpenDeleteView}>
                  <DeleteOutline color="error" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container justifyContent={'center'}>
            <Grid item>
              {/* <Tooltip title={'Actualizar al año actual'}> */}
                <IconButton onClick={onUpdateHoliday}
                  disabled={holiday.day.getFullYear() === new Date().getFullYear()}
                >
                  <Tooltip title={'Actualizar al año actual'}>
                    <Autorenew />
                  </Tooltip>
                </IconButton>
              {/* </Tooltip> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 2 }}>
        <Divider />
      </Grid>

      <DialogDelete 
        title={`Eliminar el feriado ${dayFormat}`}
        body={'¿Estás seguro de eliminar este feriado?'}
        open={openDeleteView}
        handleClose={handleCloseDeleteView}
        functionDelete={onDeleteHoliday}
      />
    </Grid>
  )
}
