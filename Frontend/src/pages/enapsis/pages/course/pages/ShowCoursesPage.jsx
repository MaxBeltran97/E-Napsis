import { GridPaper } from "@components/grid"
import { SkeletonListItemV2 } from "@components/skeleton"
import { useCourseStore } from "@hooks/useCourseStore"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Button, Divider, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { CourseFilter, CourseItem } from "../components"

export const ShowCoursesPage = () => {

  const { isLoading, courses, startGetCourses, sortedCoursesByName, sortedCoursesByCode, sortedCoursesByModality, sortedCoursesByHours, sortedCoursesByValue } = useCourseStore()

  const [acending, setAcending] = useState(true)
  const [legendActive, setLegendActive] = useState('name') //name - code - modality - hours - value

  useEffect(() => {
    startGetCourses()
  }, [])

  useEffect(() => {
    if (legendActive === 'name') {
      sortedCoursesByName(acending)
    } else if (legendActive === 'code') {
      sortedCoursesByCode(acending)
    } else if (legendActive === 'modality') {
      sortedCoursesByModality(acending)
    } else if (legendActive === 'hours') {
      sortedCoursesByHours(acending)
    } else if (legendActive === 'value') {
      sortedCoursesByValue(acending)
    }
  }, [isLoading ,legendActive, acending])

  const onClickLegend = (e, legend) => {
    if (legend === legendActive) {
      setAcending(!acending)
    } else {
      setLegendActive(legend)
      setAcending(true)
    }
  }

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Cursos</Typography>
      {/* Filtro */}
      <CourseFilter title={'Buscar por:'} />

      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={4}>
              {/* <Typography sx={{ textAlign: 'center' }}>Nombre</Typography> */}
              <Button onClick={e => onClickLegend(e, 'name')}
                fullWidth
                endIcon={(legendActive == 'name') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'name') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Nombre
              </Button>
            </Grid>
            <Grid item xs={1}>
              {/* <Typography sx={{ textAlign: 'center' }}>Código</Typography> */}
              <Button onClick={e => onClickLegend(e, 'code')}
                fullWidth
                endIcon={(legendActive == 'code') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'code') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Código
              </Button>
            </Grid>
            <Grid item xs={2}>
              {/* <Typography sx={{ textAlign: 'center' }}>Modalidad</Typography> */}
              <Button onClick={e => onClickLegend(e, 'modality')}
                fullWidth
                endIcon={(legendActive == 'modality') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'modality') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Modalidad
              </Button>
            </Grid>
            <Grid item xs={1}>
              {/* <Typography sx={{ textAlign: 'center' }}>Horas</Typography> */}
              <Button onClick={e => onClickLegend(e, 'hours')}
                fullWidth
                endIcon={(legendActive == 'hours') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'hours') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Horas
              </Button>
            </Grid>
            <Grid item xs={2}>
              {/* <Typography sx={{ textAlign: 'center' }}>Valor</Typography> */}
              <Button onClick={e => onClickLegend(e, 'value')}
                fullWidth
                endIcon={(legendActive == 'value') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'value') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Valor
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Acciones</Typography>
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
              courses.map((course) => (
                <CourseItem key={course._id} course={course} />
              ))
            )
        }
      </GridPaper>
    </>
  )
}
