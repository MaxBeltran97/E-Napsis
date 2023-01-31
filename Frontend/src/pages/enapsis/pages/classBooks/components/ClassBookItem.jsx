import enapsisApi from '@api/enapsisApi'
import { getEnvVariables } from '@helpers/getEnvVariables'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { CLASS_BOOKS, SETTINGS } from '@models/privateRoutes'
import { CloudUploadOutlined, ImportContacts, MenuBook, ModeOutlined } from '@mui/icons-material'
import { Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function createData(rowName, value) {
  return { rowName, value }
}

export const ClassBookItem = ({ calendarCourse }) => {

  const navigate = useNavigate()
  const { startChangeCalendarCourseWithoutAdd } = useCalendarCourseStore()

  const { internalCode, internalName, startDate, endDate } = calendarCourse
  const startDateFormat = new Date(startDate).toLocaleDateString('es-es')
  const endDateFormat = new Date(endDate).toLocaleDateString('es-es')
  
  const [pdfData, setPdfData] = useState(null)
  const { VITE_API_URL } = getEnvVariables()

  const downloadPdfRef = useRef()

  const handleDownloadPdf = async () => {
    const response = await fetch(`${VITE_API_URL}/classBook/${calendarCourse._id}`)
    const pdfBlob = await response.blob()
    setPdfData(URL.createObjectURL(pdfBlob))
  }

  useEffect(() => {
    if(pdfData !== null) {
      downloadPdfRef.current.click()
      setPdfData(null)
    }
  }, [pdfData])

  const rows = [
    createData('Código Interno', internalCode),
    createData('Fecha de Inicio', startDateFormat),
    createData('Fecha de Termino', endDateFormat),
    createData('Nombre Interno', internalName),
  ]

  const routeEvaluations = () => {
    navigate(`${CLASS_BOOKS}/${calendarCourse._id}/evaluaciones`, { replace: true })
  }

  const routeAttendances = () => {
    navigate(`${CLASS_BOOKS}/${calendarCourse._id}/asistencia`, {replace: true})
  }

  return (
    <>
      <Grid item xs={12}>
        <Grid container columnSpacing={1}>
          <Grid item xs={4}>
            <Typography sx={{ pl: 1, fontSize: 18 }} >{internalName}</Typography>
            <Grid item xs={12} sx={{ mt: 1.5, pl: 1, pr: 1 }}>
              <TableContainer 
                sx={{ 
                  border: '1px solid rgba(224, 224, 224, 1)', borderRadius: 1.5,
                }}
              >
                <Table>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.rowName}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align='left' width={'35%'} sx={{ p: 1.5 }}>
                          {row.rowName}
                        </TableCell>
                        <TableCell align='left' width={'65%'} sx={{ p: 1.5 }}>
                          {row.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Grid container alignItems={'center'} direction={'column'} rowSpacing={1}>
              <Grid item>
                <Button variant='outlined'
                  color='buttonSecondary'
                  startIcon={<ImportContacts />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Generar Libro
                </Button>
              </Grid>
              <Grid item>
                <a ref={downloadPdfRef} href={pdfData} target='_blank' rel='noopener noreferrer' download={`${calendarCourse.internalName}-LibroConContenido.pdf`}></a>
                <Button onClick={handleDownloadPdf}
                  variant='outlined'
                  color='buttonSecondary'
                  startIcon={<MenuBook />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Generar Libro con Contenido
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Grid container alignItems={'center'} direction={'column'} rowSpacing={1}>
              <Grid item>
                <Button onClick={routeAttendances}
                  variant='outlined'
                  startIcon={<ModeOutlined />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Asistencia Presencial
                </Button>
              </Grid>
              <Grid item>
                <Button variant='outlined'
                  startIcon={<ModeOutlined />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Asistencia Online
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Grid container alignItems={'center'} direction={'column'} rowSpacing={1}>
              <Grid item>
                <Button onClick={routeEvaluations}
                  variant='outlined'
                  startIcon={<ModeOutlined />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Ingresar Notas
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Grid container alignItems={'center'} direction={'column'} rowSpacing={1}>
              <Grid item>
                <Button variant='outlined'
                  startIcon={<CloudUploadOutlined />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Subir Archivos
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Divider />
        </Grid>
      </Grid>
    </>
  )
}
