import { selectRegiones } from "@assets/select-regiones"
import { Close } from "@mui/icons-material"
import { Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"

function createData(rowName, value) {
  return { rowName, value }
}

export const CompanyView = ({ company, open, handleClose }) => {

  const regionObj = selectRegiones.find( element => element.value === company.region)
  const communeObj = regionObj?.comunas.find( element => element.value === company.commune )

  const rowsCompany = [
    createData('RUT', (company.rut === null) ? 'Sin Datos' : company.rut),
    createData('Razón Social', company.socialReason),
    createData('Nombre de Fantasía', company.fantasyName),
    createData('Giro', company.giro),
    createData('Dirección', company.address),
    createData('Región', regionObj.name),
    createData('Comuna', communeObj.name),
    createData('Ciudad', company.city),
  ]

  const rowsContact = [
    createData('Nombre Contacto', (company.contactName === '') ? 'Sin Datos' : company.contactName),
    createData('Teléfono Celular', (company.cellPhone === null) ? 'Sin Datos' : company.cellPhone),
    createData('Cargo', (company.position === '') ? 'Sin Datos' : company.position),
    createData('Email', (company.email === '') ? 'Sin Datos' : company.email),
  ]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle sx={{ pr: 6 }}>
        Datos de {company.fantasyName}
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
                rowsCompany.map((row) => (
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

          <Typography variant="h6" sx={{ pt: 2, pb: 2}} >Datos de Contacto</Typography>
          <Table>
            <TableBody>
              {
                rowsContact.map((row) => (
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
