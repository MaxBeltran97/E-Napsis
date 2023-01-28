import { GridPaper } from '@components/grid'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { CLASS_BOOKS } from '@models/privateRoutes'
import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Divider, Grid, Link, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function createData(rowName, value) {
  return { rowName, value }
}

export const EvaluationsPage = () => {

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { startGetCalendarCourse } = useCalendarCourseStore()

  const [calendarCourse, setCalendarCourse] = useState(null)

  const getData = async (calendar_id) => {
    const calendar = await startGetCalendarCourse(calendar_id)
    console.log({ calendar })
    setCalendarCourse(calendar)
  }

  useEffect(() => {
    const pathSplit = pathname.split('/')
    getData(pathSplit[2])
  }, [])

  const routeClassBook = () => {
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
        <Typography variant='h5' color={'text.primary'} sx={{ userSelect: 'none' }}>Evaluaciones</Typography>
      </Breadcrumbs>

      {/* Detalles del Curso */}
      <GridPaper columnSpacing={0} rowSpacing={1}>
        <Grid item xs={12}>
          <Typography  sx={{ fontSize: 18 }}>Detalle del Curso</Typography>
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

    </>
  )
}
