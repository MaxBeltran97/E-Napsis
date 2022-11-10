import { GridPaper } from "@components/grid"
import { useCourseStore } from "@hooks/useCourseStore"
import { Divider, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { CourseItem } from "../components"

export const ShowCoursesPage = () => {

  const { isLoading, courses, startGetCourses } = useCourseStore()

  useEffect(() => {
    startGetCourses()
  }, [])

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Cursos</Typography>
      {/* Filtro */}
      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'}>
            <Grid item xs={4}>
              <Typography sx={{ textAlign: 'center' }}>Nombre</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center' }}>Código</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }}>Modalidad</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ textAlign: 'center' }}>Horas</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center' }}>Valor</Typography>
            </Grid>
            <Grid item xs={2}>
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
              courses.map((course) => (
                <CourseItem key={course._id} course={course} />
              ))
          )
        }
      </GridPaper>
    </>
  )
}
