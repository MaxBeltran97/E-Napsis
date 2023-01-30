import { DialogDelete } from '@components/dialog'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { CLASS_BOOKS } from '@models/privateRoutes'
import { ArticleOutlined, DeleteOutline, ModeOutlined } from '@mui/icons-material'
import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const EvaluationItem = ({ evaluation, calendarCourse_id }) => {

  const navigate = useNavigate()
  const { startChangeEvaluation, startDeleteEvaluation } = useCalendarCourseStore()

  const [openDeleteView, setOpenDeleteView] = useState(false)

  const routeGrades = () => {
    navigate(`${CLASS_BOOKS}/${calendarCourse_id}/evaluaciones/${evaluation._id}`, { replace: true })
  }

  const onChangeEvaluation = () => {
    startChangeEvaluation(evaluation)
  }
  
  const handleOpenDeleteView = () => {
    setOpenDeleteView(true)
  }
  const handleCloseDeleteView = () => {
    setOpenDeleteView(false)
  }
  const onDeleteEvaluation = () => {
    startDeleteEvaluation(evaluation._id, calendarCourse_id)
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={4}>
          <Typography sx={{ pl: 1 }}>{evaluation.title}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'center' }}>{evaluation.percentage}%</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'center' }}>{ new Date(evaluation.evaluationDate).toLocaleDateString('es-es') }</Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Ingresar Notas'}>
                <IconButton onClick={routeGrades}>
                  <ArticleOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Modificar'}>
                <IconButton onClick={onChangeEvaluation}>
                  <ModeOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Eliminar'}>
                <IconButton onClick={handleOpenDeleteView}>
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
        title={`Eliminar la evaluación ${evaluation.title}`}
        body={'¿Estás seguro de eliminar esta evaluación?'}
        open={openDeleteView}
        handleClose={handleCloseDeleteView}
        functionDelete={onDeleteEvaluation}
      />
    </Grid>
  )
}
