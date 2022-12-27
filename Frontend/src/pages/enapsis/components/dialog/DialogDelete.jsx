import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

export const DialogDelete = ({title, body, open, handleClose, functionDelete}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={functionDelete} variant={'outlined'} color={'error'} >Eliminar</Button>
        <Button onClick={handleClose} variant={'outlined'} color={'buttonTernary'} >Cancelar</Button>
      </DialogActions>
    </Dialog>
  )
}
