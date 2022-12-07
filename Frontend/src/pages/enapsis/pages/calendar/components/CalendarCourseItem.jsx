import { DialogDelete } from "@components/dialog"
import { useCalendarCourseStore } from "@hooks/useCalendarCourseStore"
import { CloudUploadOutlined, DeleteOutlined, ModeOutlined, Send } from "@mui/icons-material"
import { Button, Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import { CalendarCourseDocuments } from "./CalendarCourseDocuments"

export const CalendarCourseItem = ({ calendarCourse }) => {

  const { startChangeCalendarCourse, startDeleteCalendarCourse } = useCalendarCourseStore()

  const { internalCode, internalName, startDate, endDate } = calendarCourse
  const startDateFormat = new Date(startDate).toLocaleDateString('es-es')
  const endDateFormat = new Date(endDate).toLocaleDateString('es-es')
  
  const [openDocuments, setOpenDocuments] = useState(false)

  const handleOpenDocuments = () => {
    setOpenDocuments(true)
  }
  const handleCloseDocuments = () => {
    setOpenDocuments(false)
  }

  const [openDeleteView, setOpenDeleteView] = useState(false)

  const handleOpenDeleteView = () => {
    setOpenDeleteView(true)
  }
  const handleCloseDeleteView = () => {
    setOpenDeleteView(false)
  }
  const onDeleteCalendarCourse = () => {
    startDeleteCalendarCourse(calendarCourse._id)
  }


  const onChangeCalendarCourse = () => {
    startChangeCalendarCourse(calendarCourse)
  }

  return (
    <>
      <Grid item xs={12}>
        <Grid container alignItems={'center'} columnSpacing={1}>
          <Grid item xs={2}>
            <Typography sx={{ textAlign: 'center' }}>{internalCode}</Typography>
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
                  {/* <IconButton onClick={handleOpenDocuments} size="small"> */}
                  <IconButton>
                    <CloudUploadOutlined />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={'Enviar Clave a Participantes'}>
                  <IconButton>
                    <Send fontSize="small" sx={{ transform: 'rotate(-45deg)' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={'Modificar'}>
                  <IconButton onClick={onChangeCalendarCourse}>
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
        </Grid>
        
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Divider />
        </Grid>
      </Grid>

      <CalendarCourseDocuments calendarCourse={calendarCourse} open={openDocuments} handleClose={handleCloseDocuments} />
      
      <DialogDelete
        title={`Eliminar el curso calendarizado ${internalName}`}
        body={'¿Estás seguro de eliminar este curso calendarizado? Al eliminarlo, desvinculará todos los participantes asociados a él.'}
        open={openDeleteView}
        handleClose={handleCloseDeleteView}
        functionDelete={onDeleteCalendarCourse}
      />
    </>
  )
}
