import { GridPaper } from '@components/grid'
import { useAuthStore } from '@hooks/useAuthStore'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { ClassBookItem } from '../components/ClassBookItem'

export const ClassBooksPage = () => {

  const { isLoading, calendarCourses, startGetClassBooks } = useCalendarCourseStore()

  useEffect(() => {
    startGetClassBooks()
  }, [])

  return (
    <>
      <Typography variant='h5' sx={{ mt: 1, ml: 1 }}>Libro de Clases</Typography>
      {/* Filtro */}
      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={4}>
              <Typography sx={{ textAlign: 'center' }}>Curso / Horarios</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }}>Libro de Clases</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }}>Asistencia</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }}>Evaluaciones</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }}>Archivos para Participantes</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Divider />
          </Grid>
        </Grid>

        {
          isLoading
          ? <Grid item xs={12}> <Typography sx={{ textAlign: 'center' }}>Cargando...</Typography> </Grid>
          : (
            calendarCourses?.map((calendarCourse) => (
              <ClassBookItem key={calendarCourse._id} calendarCourse={calendarCourse} />
            ))
          )
        }
      </GridPaper>
    </>
  )
}
