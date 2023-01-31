import { DialogDelete } from '@components/dialog'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { CLASS_BOOKS } from '@models/privateRoutes'
import { ArticleOutlined, DeleteOutline } from '@mui/icons-material'
import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AttendanceItem = ({ attendance, calendarCourse_id }) => {

  const navigate = useNavigate()
  const { startDeleteAttendance } = useCalendarCourseStore()

  const [weekday, setWeekday] = useState('')
  const [openDeleteView, setOpenDeleteView] = useState(false)

  useEffect(() => {
    const day = new Date(attendance.date).toLocaleDateString('es-es', {weekday: 'long'})
    setWeekday(day.charAt(0).toUpperCase() + day.slice(1))
  }, [])

  const routeParticipantAttendance = () => {
    navigate(`${CLASS_BOOKS}/${calendarCourse_id}/asistencia/${attendance._id}`, { replace: true })
  }
  
  const handleOpenDeleteView = () => {
    setOpenDeleteView(true)
  }
  const handleCloseDeleteView = () => {
    setOpenDeleteView(false)
  }
  const onDeleteAttendance = () => {
    startDeleteAttendance(attendance._id, calendarCourse_id)
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={4}>
          <Typography sx={{ textAlign: 'center' }}>{new Date(attendance.date).toLocaleDateString('es-es')}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ textAlign: 'center' }}>{weekday}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Ingresar Asistencia'}>
                <IconButton onClick={routeParticipantAttendance}>
                  <ArticleOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Eliminar'}>
                <IconButton onClick={handleOpenDeleteView} >
                  <DeleteOutline color='error' />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Divider />
      </Grid>

      <DialogDelete
        title={`Eliminar el día ${new Date(attendance.date).toLocaleDateString('es-es')}`}
        body={'¿Estás seguro de eliminar este día?'}
        open={openDeleteView}
        handleClose={handleCloseDeleteView}
        functionDelete={onDeleteAttendance}
      />
    </Grid>
  )
}
