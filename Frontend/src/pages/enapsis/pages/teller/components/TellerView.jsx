import { selectMaritalStatus } from "@assets/select-data"
import { selectRegiones } from "@assets/select-regiones"
import { useTellerStore } from "@hooks/useTellerStore"
import { Close } from "@mui/icons-material"
import { Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"

function createData(rowName, value) {
  return { rowName, value }
}

export const TellerView = ({ teller, open, handleClose }) => {

  const { startGetTellerUsername } = useTellerStore()
  const maritalStatusObj = selectMaritalStatus.find( element => element.value === teller.maritalStatus )
  const regionObj = selectRegiones.find( element => element.value === teller.region)
  const communeObj = regionObj?.comunas.find( element => element.value === teller.commune )
  const [usernameTeller, setUsernameTeller] = useState('')

  const getUsername = async () => {
    const { username } = await startGetTellerUsername(teller.user_id)
    setUsernameTeller(username)
  }

  useEffect(() => {
    getUsername()
  }, [])

  const rows = [
    createData('Estado', (teller.situation) ? 'Activo' : 'No Activo'),
    createData((teller.nationalityType === 'chileno') ? 'RUT' : 'DNI', teller.rut ),
    createData('Nombres', teller.fullName),
    createData('Apellidos', `${teller.lastName} ${teller.motherLastName}`),
    createData('Nacionalidad', (teller.nationalityType === 'chileno') ? 'Chileno' : (teller.nationality === '') ? 'Sin Datos' : teller.nationality),
    createData('Fecha de Nacimiento', (teller.birthday === null) ? 'Sin Datos' : new Date(teller.birthday).toLocaleDateString('es-es')),
    createData('Email', teller.email),
    createData('Usuario', usernameTeller),
    createData('Profesión', teller.profession),
    createData('Teléfono Celular', `+56 9 ${teller.cellPhone}`),
    createData('Estado Civil', (teller.maritalStatus === '') ? 'Sin Datos' : maritalStatusObj.name),
    createData('Dirección', (teller.address === '') ? 'Sin Datos' : teller.address),
    createData('Región', (teller.region === '') ? 'Sin Datos' : regionObj.name),
    createData('Comuna', (teller.commune === '') ? 'Sin Datos' : communeObj.name),
  ]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle sx={{ pr: 6 }}>
        Datos de {`${teller.fullName} ${teller.lastName} ${teller.motherLastName}`}
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

          <Typography variant="h6" sx={{ pt: 2, pb: 2}} >Información Adicional</Typography>
          <Table>
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell align='left' width={'40%'} sx={{ p: 1, border: 0, fontSize: 16 }}>
                  REUF Actualizada
                </TableCell>
                <TableCell align='left' width={'60%'} sx={{ p: 1, border: 0, fontSize: 16 }}>
                  {
                    (teller.reuf)
                    ? 'Si'
                    : 'No'
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  )
}
