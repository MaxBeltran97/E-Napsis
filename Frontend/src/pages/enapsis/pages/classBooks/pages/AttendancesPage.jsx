import { GridPaper } from "@components/grid"
import { SkeletonListItemV2 } from "@components/skeleton"
import { useCalendarCourseStore } from "@hooks/useCalendarCourseStore"
import { CLASS_BOOKS } from "@models/privateRoutes"
import { NavigateNext } from "@mui/icons-material"
import { TabContext, TabPanel } from "@mui/lab"
import { Box, Breadcrumbs, Divider, Grid, Link, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AddAttendance, AddRangeAttendance, AttendanceItem } from "../components"

function createData(rowName, value) {
  return { rowName, value }
}

export const AttendancesPage = () => {

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const {
    attendances, isLoadingAttendances,
    startGetCalendarCourse, startGetAttendances, startResetAttendances
  } = useCalendarCourseStore()

  const [calendarCourse, setCalendarCourse] = useState(null)
  const [tabValue, setTabValue] = useState('0')

  const getData = async (calendar_id) => {
    const calendar = await startGetCalendarCourse(calendar_id)
    setCalendarCourse(calendar)
    startGetAttendances(calendar._id)
  }

  useEffect(() => {
    const pathSplit = pathname.split('/')
    getData(pathSplit[2])
  }, [])

  const handleChangeTab = (event, newTabValue) => {
    setTabValue(newTabValue)
  }

  const routeClassBook = () => {
    startResetAttendances()
    navigate(`${CLASS_BOOKS}`, { replace: true })
  }

  const rowsLeft = [
    createData('Código Interno', calendarCourse?.internalCode),
    createData('Fecha Inicio', new Date(calendarCourse?.startDate).toLocaleDateString('es-es')),
  ]
  const rowsRight = [
    createData('Nombre Interno', calendarCourse?.internalName),
    createData('Fecha Término', new Date(calendarCourse?.endDate).toLocaleDateString('es-es')),
  ]

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNext />}
        sx={{ mt: 1, ml: 2 }}
      >
        <Link underline="hover" color="inherit" onClick={routeClassBook}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography variant="h5">Libro de Clases</Typography>
        </Link>
        <Typography variant='h5' color={'text.primary'} sx={{ userSelect: 'none' }}>{calendarCourse?.internalName}</Typography>
        <Typography variant='h5' color={'text.primary'} sx={{ userSelect: 'none' }}>Asistencia</Typography>
      </Breadcrumbs>

      {/* Detalles del Curso */}
      <GridPaper columnSpacing={0} rowSpacing={1}>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 18 }}>Detalle del Curso</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableBody>
                {
                  rowsLeft.map((row) => (
                    <TableRow key={row.rowName}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='left' width={'40%'} sx={{ p: 1, border: 0, fontSize: 16 }}>
                        {row.rowName}
                      </TableCell>
                      <TableCell align='left' width={'60%'} sx={{ p: 1, border: 0, fontSize: 16 }}>
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableBody>
                {
                  rowsRight.map((row) => (
                    <TableRow key={row.rowName}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='left' width={'40%'} sx={{ p: 1, border: 0, fontSize: 16 }}>
                        {row.rowName}
                      </TableCell>
                      <TableCell align='left' width={'60%'} sx={{ p: 1, border: 0, fontSize: 16 }}>
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </GridPaper>

      {/* Agregar una fecha de asistencia */}
      <Paper elevation={2}
        sx={{
          mt: 2, pl: 2, pb: 2, pr: 2, bgcolor: 'background.paper', borderRadius: 2
        }}
      >
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleChangeTab}>
              <Tab label={'Agregar Día'}          value={'0'} sx={{ textTransform: 'none', fontSize: 16 }}/>
              <Tab label={'Agregar Varios Días'}  value={'1'} sx={{ textTransform: 'none', fontSize: 16 }}/>
            </Tabs>
          </Box>
          <TabPanel value={'0'} sx={{ pr: 0, pl: 0, pb: 0, pt: 2 }}>
            <AddAttendance calendarCourse_id={calendarCourse?._id} />
          </TabPanel>
          <TabPanel value={'1'} sx={{ pr: 0, pl: 0, pb: 0, pt: 2 }}>
            <AddRangeAttendance calendarCourse_id={calendarCourse?._id} />
          </TabPanel>
        </TabContext>
      </Paper>

      {/* Mostrar dias */}
      <GridPaper rowSpacing={1}>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} columnSpacing={1}>
            <Grid item xs={4}>
              <Typography sx={{ userSelect: 'none', pt: 1, pb: 1, textAlign: 'center' }} >Fecha</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ userSelect: 'none', textAlign: 'center' }} >Día de la Semana</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ userSelect: 'none', textAlign: 'center' }} >Acciones</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Divider />
          </Grid>
        </Grid>

        {
          isLoadingAttendances
            ? <SkeletonListItemV2 />
            : (
              attendances.map((attendance) => (
                <AttendanceItem key={attendance._id} attendance={attendance} calendarCourse_id={calendarCourse?._id} />
              ))
            )
        }
      </GridPaper>
    </>
  )
}
