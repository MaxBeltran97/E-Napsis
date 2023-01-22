import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { Close } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { checkListRadio } from '../assets'

function createData(rowName, value) {
  return { rowName, value }
}

export const CheckListView = ({ checkList, open, handleClose }) => {

  const { startGetCalendarCourse } = useCalendarCourseStore()

  const [calendarCourseName, setCalendarCourseName] = useState('')

  const getCalendarCourseName = async () => {
    const { internalCode, internalName } = await startGetCalendarCourse(checkList.calendarCourse_id)
    setCalendarCourseName(`${internalCode} - ${internalName}`)
  }

  useEffect(() => {
    getCalendarCourseName()
  }, [])

  let rows = [
    createData('Curso Asociado', calendarCourseName)
  ]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'md'}
    >
      <DialogTitle sx={{ pr: 6 }}>
        CheckList de {calendarCourseName}
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

        <TableContainer sx={{ mt: 1, border: '1px solid rgba(224, 224, 224, 1)', borderRadius: 1.5 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" width={'10%'} sx={{ p: 1, fontSize: 16 }}>
                  N°
                </TableCell>
                <TableCell align="center" width={'40%'} sx={{ p: 1, fontSize: 16 }}>
                  Actividad
                </TableCell>
                <TableCell align="center" width={'30%'} sx={{ p: 1, fontSize: 16 }}>
                  Estado
                </TableCell>
                <TableCell align="center" width={'20%'} sx={{ p: 1, fontSize: 16 }}>
                  Fecha
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {/* Coordinador */}
              <TableRow>
                <TableCell width={'10%'}></TableCell>
                <TableCell align='center' width={'40%'} sx={{ p: 1, fontSize: 16 }}>
                  Coordinador de capacitación
                </TableCell>
                <TableCell width={'30%'}></TableCell>
                <TableCell width={'20%'}></TableCell>
              </TableRow>

              {
                checkList.checkListActivities.map((activity) => (
                  <TableRow key={activity._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {
                      (activity.roleActivity === 'Coordinator')
                        ? (
                          <>
                            <TableCell align='center' width={'10%'} sx={{ p: 1, fontSize: 16 }}>
                              {activity.order}
                            </TableCell>
                            <TableCell align='center' width={'40%'} sx={{ p: 1, fontSize: 16 }}>
                              {activity.activity}
                            </TableCell>
                            <TableCell align='center' width={'30%'} sx={{ p: 1, fontSize: 16 }}>
                              {checkListRadio.filter((item) => { return item.value === activity.status })[0].name}
                            </TableCell>
                            <TableCell align='center' width={'20%'} sx={{ p: 1, fontSize: 16 }}>
                              {new Date(activity.date).toLocaleDateString('es-es')}
                            </TableCell>
                          </>
                        )
                        : null
                    }
                  </TableRow>
                ))
              }

              {/* ASistente */}
              <TableRow>
                <TableCell width={'10%'}></TableCell>
                <TableCell align='center' width={'40%'} sx={{ p: 1, fontSize: 16 }}>
                  Asistente
                </TableCell>
                <TableCell width={'30%'}></TableCell>
                <TableCell width={'20%'}></TableCell>
              </TableRow>

              {
                checkList.checkListActivities.map((activity) => (
                  <TableRow key={activity._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {
                      (activity.roleActivity === 'Assistant')
                        ? (
                          <>
                            <TableCell align='center' width={'10%'} sx={{ p: 1, fontSize: 16 }}>
                              {activity.order}
                            </TableCell>
                            <TableCell align='center' width={'40%'} sx={{ p: 1, fontSize: 16 }}>
                              {activity.activity}
                            </TableCell>
                            <TableCell align='center' width={'30%'} sx={{ p: 1, fontSize: 16 }}>
                              {checkListRadio.filter((item) => { return item.value === activity.status })[0].name}
                            </TableCell>
                            <TableCell align='center' width={'20%'} sx={{ p: 1, fontSize: 16 }}>
                              {new Date(activity.date).toLocaleDateString('es-es')}
                            </TableCell>
                          </>
                        )
                        : null
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  )
}
