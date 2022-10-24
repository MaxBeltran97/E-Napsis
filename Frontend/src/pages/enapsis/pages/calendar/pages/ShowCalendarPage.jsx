import { GridPaper } from "@components/grid"
import { useCalendarCourseStore } from "@hooks/useCalendarCourseStore"
import { Divider, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { CalendarCourseItem } from "../components"

export const ShowCalendarPage = () => {

  const { isLoading, calendarCourses, startGetCalendarCourses} = useCalendarCourseStore()

  useEffect(() => {
    startGetCalendarCourses()
  }, [])

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Cursos Calendarizados</Typography>
      {/* Filtro */}
      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'}>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }}>Código Interno</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{ textAlign: 'center' }}>Nombre del Curso</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }}>Inicio / Término</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ textAlign: 'center' }}>Acciones</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>

        {
          isLoading
          ? <Grid item xs={12}> <Typography sx={{ textAlign: 'center' }}>Cargando...</Typography> </Grid>
          : (
            calendarCourses.map((calendarCourse) => (
              <CalendarCourseItem key={calendarCourse._id} calendarCourse={calendarCourse} />
            ))
          )
        }
      </GridPaper>
    </>
  )
}
