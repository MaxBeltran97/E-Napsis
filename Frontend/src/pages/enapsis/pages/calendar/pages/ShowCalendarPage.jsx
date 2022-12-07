import { GridPaper } from "@components/grid"
import { SkeletonListItemV2 } from "@components/skeleton"
import { useCalendarCourseStore } from "@hooks/useCalendarCourseStore"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Button, Divider, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { CalendarCourseItem } from "../components"

export const ShowCalendarPage = () => {

  const { isLoading, calendarCourses, startGetCalendarCourses, sortedCalendarCoursesByName, sortedCalendarCoursesByCode, sortedCalendarCoursesByDate} = useCalendarCourseStore()

  const [acending, setAcending] = useState(true)
  const [legendActive, setLegendActive] = useState('name') //code - name - date

  useEffect(() => {
    startGetCalendarCourses()
  }, [])

  useEffect(() => {
    if (legendActive === 'code') {
      sortedCalendarCoursesByCode(acending)
    } else if (legendActive === 'name') {
      sortedCalendarCoursesByName(acending)
    } else if (legendActive === 'date') {
      sortedCalendarCoursesByDate(acending)
    }
  }, [isLoading ,legendActive, acending])

  const onClickLegend = (e, legend) => {
    if(legend === legendActive) {
      setAcending(!acending)
    }else {
      setLegendActive(legend)
      setAcending(true)
    }
  }

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Cursos Calendarizados</Typography>
      {/* Filtro */}
      <GridPaper>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={2}>
              {/* <Typography sx={{ textAlign: 'center' }}>Código Interno</Typography> */}
              <Button onClick={e => onClickLegend(e, 'code')}
                fullWidth 
                endIcon={ (legendActive == 'code') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'code') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Código Interno
              </Button>
            </Grid>
            <Grid item xs={5}>
              {/* <Typography sx={{ textAlign: 'center' }}>Nombre del Curso</Typography> */}
              <Button onClick={e => onClickLegend(e, 'name')}
                fullWidth 
                endIcon={ (legendActive == 'name') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'name') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Nombre del Curso
              </Button>
            </Grid>
            <Grid item xs={2}>
              {/* <Typography sx={{ textAlign: 'center' }}>Inicio / Término</Typography> */}
              <Button onClick={e => onClickLegend(e, 'date')}
                fullWidth 
                endIcon={ (legendActive == 'date') ? acending ? <ExpandMore /> : <ExpandLess /> : null}
                sx={{
                  textTransform: 'initial !important',
                  fontSize: 16,
                  color: (legendActive == 'date') ? 'text.active' : 'text.main',
                  fontWeight: 'regular',
                  ".MuiButton-endIcon": { marginLeft: 0 }
                }}
              >
                Inicio / Término
              </Button>
            </Grid>
            <Grid item xs={3}>
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
            calendarCourses.map((calendarCourse) => (
              <CalendarCourseItem key={calendarCourse._id} calendarCourse={calendarCourse} />
            ))
          )
        }
      </GridPaper>
    </>
  )
}
