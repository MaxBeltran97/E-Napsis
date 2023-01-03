import { radioInstructionModality } from "@assets/radio-data"
import { selectRegiones } from "@assets/select-regiones"
import { useCourseStore } from "@hooks/useCourseStore"
import { Close } from "@mui/icons-material"
import { Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"

function createData(rowName, value) {
  return { rowName, value }
}

export const CalendarCourseView = ({ calendarCourse, open, handleClose }) => {

  const { startGetCourse } = useCourseStore()
  const instructionObj = radioInstructionModality.find(element => element.value === calendarCourse.instruction)
  const regionObj = selectRegiones.find(element => element.value === calendarCourse.ejecutionRegion)
  const [course, setCourse] = useState('')

  const getCourseName = async () => {
    const courseData = await startGetCourse(calendarCourse.course_id)
    setCourse(courseData)
  }

  useEffect(() => {
    getCourseName()
  }, [])

  const rows = [
    createData('Código Interno', (calendarCourse.internalCode === '') ? 'Sin Datos' : calendarCourse.internalCode),
    createData('Nombre Interno', calendarCourse.internalName),
    createData('Curso Asociado', course.activityName),
    createData('Codigo Sence', course.sence),
    createData('Modalidad de Instrucción', instructionObj.name),
    createData('Horas Totales', calendarCourse.courseTotalHours),
    createData('Fecha de Inicio', new Date(calendarCourse.startDate).toLocaleDateString('es-es')),
    createData('Fecha de Término', new Date(calendarCourse.endDate).toLocaleDateString('es-es')),
    createData('Valor por Participante', `$ ${calendarCourse.participantValue}`),
    createData('Lugar de Ejecución', calendarCourse.ejecutionPlace),
    createData('Ciudad de Ejecución', (calendarCourse.ejecutionCity === '') ? 'Sin Datos' : calendarCourse.ejecutionCity),
    createData('Región de Ejecución', (calendarCourse.ejecutionRegion === '') ? 'Sin Datos' : regionObj.name),
  ]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle sx={{ pr: 6 }}>
        Datos de {calendarCourse.internalName}
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 12, top: 12 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              {
                rows.map((row) => (
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

          {
            ((calendarCourse.evaluationDates)?.length > 0)
              ? (
                <>
                  <Typography variant="h6" sx={{ pt: 2, pb: 2 }} >Fechas de Evaluaciones</Typography>
                  <TableContainer sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: 1.5,}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width={'40%'} sx={{ p: 1, fontSize: 16 }}>
                            Fecha
                          </TableCell>
                          <TableCell align="center" width={'60%'} sx={{ p: 1, fontSize: 16 }}>
                            % de Ponderación
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          calendarCourse.evaluationDates.map((evaluation) => (
                            <TableRow key={evaluation._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell align='center' width={'40%'} sx={{ p: 1, fontSize: 16 }}>
                                {new Date(evaluation.evaluationDate).toLocaleDateString('es-es')}
                              </TableCell>
                              <TableCell align='center' width={'60%'} sx={{ p: 1, fontSize: 16 }}>
                                {evaluation.percentage}%
                              </TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )
              : null
          }
      </DialogContent>
    </Dialog>
  )
}
