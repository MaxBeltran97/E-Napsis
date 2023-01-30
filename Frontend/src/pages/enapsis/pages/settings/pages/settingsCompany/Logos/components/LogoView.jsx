import { getEnvVariables } from '@helpers/getEnvVariables'
import { Close } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import React from 'react'

function createData(rowName, value) {
  return { rowName, value }
}

export const LogoView = ({ logo, open, handleClose }) => {

  const { VITE_API_URL } = getEnvVariables()

  let rows = [
    createData('Título', logo.title),
    createData('Codigo', logo.code)
  ]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle sx={{ pr: 6 }} >
        Datos del {logo.title}
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
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left' width={'40%'} sx={{ p: 1, border: 0, fontSize: 16 }}>
                  Logo
                </TableCell>
                <TableCell align='left' width={'60%'} sx={{ p: 1, border: 0, fontSize: 16 }}>
                  <img src={`${VITE_API_URL}/logos/get_image/${logo.logo_img}`} width={110} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  )
}
