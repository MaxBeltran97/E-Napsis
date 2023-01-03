import { radioActivityType, radioInstructionModality } from "@assets/radio-data"
import { useTellerStore } from "@hooks/useTellerStore"
import { Close } from "@mui/icons-material"
import { Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"

function createData(rowName, value) {
  return { rowName, value }
}

export const CourseView = ({ course, open, handleClose }) => {

  const { startGetTeller } = useTellerStore()
  const instructionObj = radioInstructionModality.find(element => element.value === course.instruction)
  const activityTypeObj = radioActivityType.find(element => element.value === course.activityType)
  const [rowsTeller, setRowsTeller] = useState([])

  const getTellersName = async () => {
    let tellers = []

    if (course.tellers_id.length === 0) {
      tellers.push(createData('Relatores Asociados', 'Sin Relatores Asociados'))
    } else if (course.tellers_id.length === 1) {
      const { fullName, lastName, motherLastName } = await startGetTeller(course.tellers_id[0].teller_id)
      tellers.push(createData('Relator Asociado', `${fullName} ${lastName} ${motherLastName}`))
    } else {
      for (let i = 0; i < course.tellers_id.length; i++) {
        const { fullName, lastName, motherLastName } = await startGetTeller(course.tellers_id[i].teller_id)
        if (i === 0) {
          tellers.push(createData('Relatores Asociados', `${fullName} ${lastName} ${motherLastName}`))
        } else {
          tellers.push(createData('', `${fullName} ${lastName} ${motherLastName}`))
        }
      }
    }
    setRowsTeller(tellers)
  }

  useEffect(() => {
    getTellersName()
  }, [])

  const rowsTier1 = [
    createData('Código Sence / Interno', course.sence),
    createData('Modalidad de Instrucción', instructionObj.name),
    createData('Tipo de Actividad', activityTypeObj.name),
    createData('Nombre de Actividad', course.activityName),
    createData('Porcentaje de Asistencia', `${course.attendance} %`),
    createData('Nota Minima', (`${course.minCalification}`.length === 1) ? `${course.minCalification},0` : `${course.minCalification}`.replace('.', ',')),
    createData('Horas Minimas', course.minHours),
    createData('Horas Totales', course.totalHours),
    createData('N° de Participantes', (course.participantsNumber === null) ? 'Sin Datos' : course.participantsNumber),
    createData('Valor Efectivo por Participante', `$ ${course.participantValue}`),
    // createData('Fecha de Solicitud', new Date(course.requestDate).toLocaleDateString('es-es')),
  ]

  const rowsTier2 = [
    createData('Población Objetivo', (course.targetPopulation === '') ? 'Sin Datos' : course.targetPopulation),
    createData('Objetivos Generales', (course.generalObjectives === '') ? 'Sin Datos' : course.generalObjectives),
    createData('Método o Técnica de Enseñanza', (course.teachingTechnique === '') ? 'Sin Datos' : course.teachingTechnique),
    createData('Evaluación', (course.evaluation === '') ? 'Sin Datos' : course.evaluation),
    createData('Infraestructura', (course.infrastructure === '') ? 'Sin Datos' : course.infrastructure),
  ]



  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'md'}
    >
      <DialogTitle sx={{ pr: 6 }}>
        Datos de {course.activityName}
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 12, top: 12 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Tier 1 */}
        <TableContainer>
          <Table>
            <TableBody>
              {
                rowsTier1.map((row) => (
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

        {/* Relatores */}
        <TableContainer>
          <Table>
            <TableBody>
              {
                rowsTeller?.map((row) => (
                  <TableRow key={row.rowName}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:first-of-type td, &:first-of-type th': { pt: 1 }
                    }}
                  >
                    <TableCell align='left' width={'40%'} sx={{ p: 1, pt: 0, border: 0, fontSize: 16 }}>
                      {row.rowName}
                    </TableCell>
                    <TableCell align='left' width={'60%'} sx={{ p: 1, pt: 0, border: 0, fontSize: 16 }}>
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Tier 2 */}
        <TableContainer>
          <Table>
            <TableBody>
              {
                rowsTier2.map((row) => (
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

        {/* Acitividades-Contenidos-Horas */}
        {
          (course.activitiesContentHours.length > 0)
            ? (
              <>
                <Typography sx={{ p: 1 }}>Actividades - Contenidos - Desglose Horas</Typography>
                <TableContainer sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: 1.5, mb: 1 }} >
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align='center' colSpan={1} sx={{ p: 1, border: 0, fontSize: 16 }}>
                          Actividad
                        </TableCell>
                        <TableCell align='center' colSpan={1} sx={{ p: 1, border: 0, fontSize: 16 }}>
                          Contenido
                        </TableCell>
                        <TableCell align='center' colSpan={3} sx={{ p: 1, border: 0, fontSize: 16 }}>
                          Horas
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width={'33%'}></TableCell>
                        <TableCell width={'33%'}></TableCell>
                        <TableCell align="center" width={'11%'} sx={{ p: 1, pt: 0, fontSize: 16 }}>
                          Teórico
                        </TableCell>
                        <TableCell align="center" width={'11%'} sx={{ p: 1, pt: 0, fontSize: 16 }}>
                          Práctico
                        </TableCell>
                        <TableCell align="center" width={'12%'} sx={{ p: 1, pt: 0, fontSize: 16 }}>
                          E-learning
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        course.activitiesContentHours.map((row) => (
                          <TableRow key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align='left' width={'33%'} sx={{ p: 1, fontSize: 16 }}>
                              {row.activity}
                            </TableCell>
                            <TableCell align='left' width={'33%'} sx={{ p: 1, fontSize: 16 }}>
                              {row.content}
                            </TableCell>
                            <TableCell align='center' width={'11%'} sx={{ p: 1, fontSize: 16 }}>
                              {(row.theoreticalHour === null) ? '0' : row.theoreticalHour}
                            </TableCell>
                            <TableCell align='center' width={'11%'} sx={{ p: 1, fontSize: 16 }}>
                              {(row.practiceHour === null) ? '0' : row.practiceHour}
                            </TableCell>
                            <TableCell align='center' width={'12%'} sx={{ p: 1, fontSize: 16 }}>
                              {(row.eLearningHour === null) ? '0' : row.eLearningHour}
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

        {/* Medios relator */}
        {
          (course.tellerSupport.length > 0)
            ? (
              <>
                <Typography sx={{ p: 1 }}>Medios Didácticos de Apoyo al Relator</Typography>
                <TableContainer sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: 1.5, mb: 1 }} >
                  <Table>
                    <TableHead>
                      <TableRow >
                        <TableCell align="center" width={'80%'} sx={{ p: 1, fontSize: 16 }}>
                          Descripción
                        </TableCell>
                        <TableCell align="center" width={'20%'} sx={{ p: 1, fontSize: 16 }}>
                          Cantidad
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        course.tellerSupport.map((row) => (
                          <TableRow key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align='left' width={'80%'} sx={{ p: 1, fontSize: 16 }}>
                              {row.description}
                            </TableCell>
                            <TableCell align='center' width={'20%'} sx={{ p: 1, fontSize: 16 }}>
                              {(row.amount === null) ? '0' : row.amount}
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

        {/* Material participantes */}
        {
          (course.participantMaterial.length > 0)
            ? (
              <>
                <Typography sx={{ p: 1 }}>Material Didáctico a Quedar en Poder de los Participantes</Typography>
                <TableContainer sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: 1.5, mb: 1 }} >
                  <Table>
                    <TableHead>
                      <TableRow >
                        <TableCell align="center" width={'80%'} sx={{ p: 1, fontSize: 16 }}>
                          Descripción
                        </TableCell>
                        <TableCell align="center" width={'20%'} sx={{ p: 1, fontSize: 16 }}>
                          Cantidad
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        course.participantMaterial.map((row) => (
                          <TableRow key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align='left' width={'80%'} sx={{ p: 1, fontSize: 16 }}>
                              {row.description}
                            </TableCell>
                            <TableCell align='center' width={'20%'} sx={{ p: 1, fontSize: 16 }}>
                              {(row.amount === null) ? '0' : row.amount}
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

        {/* Equipamiento */}
        {
          (course.equipment.length > 0)
            ? (
              <>
                <Typography sx={{ p: 1 }}>Equipamiento</Typography>
                <TableContainer sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: 1.5, mb: 1 }} >
                  <Table>
                    <TableHead>
                      <TableRow >
                        <TableCell align="center" width={'80%'} sx={{ p: 1, fontSize: 16 }}>
                          Descripción
                        </TableCell>
                        <TableCell align="center" width={'20%'} sx={{ p: 1, fontSize: 16 }}>
                          Cantidad
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        course.equipment.map((row) => (
                          <TableRow key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align='left' width={'80%'} sx={{ p: 1, fontSize: 16 }}>
                              {row.description}
                            </TableCell>
                            <TableCell align='center' width={'20%'} sx={{ p: 1, fontSize: 16 }}>
                              {(row.amount === null) ? '0' : row.amount}
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

        {/* Fecha de Solicitud */}
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left' width={'40%'} sx={{ p: 1, border: 0, fontSize: 16 }}>
                  Fecha de Solicitud
                </TableCell>
                <TableCell align='left' width={'60%'} sx={{ p: 1, border: 0, fontSize: 16 }}>
                  {new Date(course.requestDate).toLocaleDateString('es-es')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  )
}
