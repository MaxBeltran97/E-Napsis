import { useCalendarCourseStore } from "@hooks/useCalendarCourseStore"
import { CloudUploadOutlined, DeleteOutlined, ModeOutlined, Send } from "@mui/icons-material"
import { Button, Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import { CalendarCourseDocuments } from "./CalendarCourseDocuments"

export const CalendarCourseItem = ({ calendarCourse }) => {

  const { startChangeCalendarCourse } = useCalendarCourseStore()

  const [openDocuments, setOpenDocuments] = useState(false)

  const { internalCode, internalName, startDate, endDate } = calendarCourse
  const startDateFormat = new Date(startDate).toLocaleDateString('es-es')
  const endDateFormat = new Date(endDate).toLocaleDateString('es-es')

  const handleOpenDocuments = () => {
    setOpenDocuments(true)
  }

  const handleCloseDocuments = () => {
    setOpenDocuments(false)
  }

  const onChangeCalendarCourse = () => {
    startChangeCalendarCourse(calendarCourse)
  }

  return (
    <>
      <Grid item xs={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={2}>
            <Typography sx={{ pl: 1 }}>{internalCode}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>{internalName}</Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center'}}>
            <Button variant="outlined" size="small">
              {startDateFormat} - {endDateFormat}
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
              <Grid item>
                <Tooltip title={'Documentos Internos'}>
                  <IconButton onClick={handleOpenDocuments} size="small">
                    <CloudUploadOutlined />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={'Enviar Clave a Participantes'}>
                  <IconButton size="small">
                    <Send fontSize="small" sx={{ transform: 'rotate(-45deg)' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={'Modificar'}>
                  <IconButton onClick={onChangeCalendarCourse} size="small">
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

      <CalendarCourseDocuments calendarCourse={calendarCourse} open={openDocuments} handleClose={handleCloseDocuments} />
    </>
  )
}
