import { GridPaper } from '@components/grid'
import { SkeletonListItemV2 } from '@components/skeleton'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Button, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { ClassBookItem } from '../components/ClassBookItem'

export const ClassBooksPage = () => {

  const { isLoading, calendarCourses, startGetClassBooks, sortedCalendarCoursesByName } = useCalendarCourseStore()

  const [acending, setAcending] = useState(true)

  useEffect(() => {
    startGetClassBooks()
  }, [])

  useEffect(() => {
    sortedCalendarCoursesByName(acending)
  }, [isLoading, acending])

  const onClickLegend = () => {
    setAcending(!acending)
  }

  return (
    <>
      <Typography variant='h5' sx={{ mt: 1, ml: 2 }}>Libro de Clases</Typography>
      {/* Filtro */}
      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={4}>
              {/* <Typography sx={{ textAlign: 'center' }}>Curso / Horarios</Typography> */}
              <Button onClick={onClickLegend}
                fullWidth 
                endIcon={ acending ? <ExpandMore /> : <ExpandLess /> }
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: 'text.active',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Curso / Horarios
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Libro de Clases</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Asistencia</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Evaluaciones</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Archivos para Participantes</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Divider />
          </Grid>
        </Grid>

        {
          isLoading
          ? <SkeletonListItemV2 />
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
