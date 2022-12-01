import { radioInstructionModality } from "@assets/radio-data"
import { DialogDelete } from "@components/dialog"
import { useCourseStore } from "@hooks/useCourseStore"
import { DeleteOutlined, ModeOutlined } from "@mui/icons-material"
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { useState } from "react"

export const CourseItem = ({ course }) => {

  const { startChangeCourse, startDeleteCourse } = useCourseStore()

  const { activityName, sence, instruction, totalHours, participantValue } = course
  const instructionObj = radioInstructionModality.find( element => element.value === instruction )

  const [openDeleteView, setOpenDeleteView] = useState(false)

  const handleOpenDeleteView = () => {
    setOpenDeleteView(true)
  }
  const handleCloseDeleteView = () => {
    setOpenDeleteView(false)
  }
  const onDeleteCourse = () => {
    startDeleteCourse(course._id)
  }


  const onChangeCourse = () => {
    startChangeCourse(course)
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={4}>
          <Typography sx={{ pl: 1 }}>{activityName}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{ textAlign: 'center' }}>{sence}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'center' }}>{instructionObj.name}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{ textAlign: 'center' }}>{totalHours}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'center' }}>$ {participantValue}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Modificar'}>
                <IconButton onClick={onChangeCourse} size="small">
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
      </Grid>
      
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Divider />
      </Grid>

      <DialogDelete
        title={`Eliminar el curso ${activityName}`}
        body={'¿Estás seguro de eliminar este curso? Al eliminarlo, se eliminarán todas las calendarizaciones hechas de él.'}
        open={openDeleteView}
        handleClose={handleCloseDeleteView}
        functionDelete={onDeleteCourse}
      />
    </Grid>
  )
}
