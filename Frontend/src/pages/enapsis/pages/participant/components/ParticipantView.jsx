import { radioGenderType, radioNationalityType } from "@assets/radio-data"
import { useCalendarCourseStore } from "@hooks/useCalendarCourseStore"
import { useCompanyStore } from "@hooks/useCompanyStore"
import { Close } from "@mui/icons-material"
import { Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useEffect, useState } from "react"

function createData(rowName, value) {
  return { rowName, value }
}

export const ParticipantView = ({ participant, open, handleClose }) => {

  const { startGetCompany } = useCompanyStore()
  const { startGetCalendarCourse } = useCalendarCourseStore()
  const nationalityObj = radioNationalityType.find( element => element.value === participant.nationalityType )
  const genderObj = radioGenderType.find( element => element.value === participant.gender)
  const [companyName, setCompanyName] = useState('')
  const [calendarCourseName, setCalendarCourseName] = useState('')

  const getCompanyName = async () => {
    //TODO Cambiar por getCompanyById para buscar en el store primero
    const { fantasyName } = await startGetCompany(participant.company_id)
    setCompanyName(fantasyName)
  }

  const getCalendarCourseName = async () => {
    const { internalName } = await startGetCalendarCourse(participant.calendarCourse_id)
    setCalendarCourseName(internalName)
  }

  useEffect(() => {
    if (!!participant.company_id) {
      getCompanyName()
    }
    if (!!participant.calendarCourse_id) {
      getCalendarCourseName()
    }
  }, [])

  let rows = [
    createData('Curso Asociado', calendarCourseName),
    createData('Empresa', companyName),
    createData((participant.nationalityType === 'chileno') ? 'RUT' : 'DNI', participant.rut ),
    createData('Nacionalidad', nationalityObj?.name),
    createData('Nombres', participant.fullName),
    createData('Apellidos', `${participant.lastName} ${participant.motherLastName}`),
    createData('Email', participant.email),
    createData('Género', genderObj?.name),
    createData('Establecimiento', (participant.institution === '') ? 'Sin Datos' : participant.institution ),
    createData('Cargo Desempeñado', (participant.position === '') ? 'Sin Datos' : participant.position ),
  ]

  if (companyName === '') {
    rows = rows.filter((item) => item.rowName !== 'Empresa')
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle sx={{ pr: 6 }}>
        Datos de {`${participant.fullName} ${participant.lastName} ${participant.motherLastName}`}
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
      </DialogContent>
    </Dialog>
  )
}
