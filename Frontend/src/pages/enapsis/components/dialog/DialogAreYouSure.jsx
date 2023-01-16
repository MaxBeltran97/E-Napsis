import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'

export const DialogAreYouSure = ({open, handleClose, title, message, okMessage, errorMessage, functionFromData}) => {
  
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [messageDialog, setMessageDialog] = useState(message)

  useEffect(() => {
    if(open) {
      setLoading(false)
      setResult(null)
      setMessageDialog(message)
    }
  }, [open])

  const startFunctionFromData = async() => {
    setLoading(true)
    const ok = await functionFromData()
    if(ok) {
      setMessageDialog(okMessage)
    }else {
      setMessageDialog(errorMessage)
    }
    setResult(ok)
    setLoading(false)
  }

  return (
    <Dialog
      open={open}
      onClose={(!loading) ? handleClose : null}
      maxWidth={'xs'}
      fullWidth={true}
    >
      <DialogTitle 
        sx={{ 
          textAlign: (result !== null) ? 'center' : '', 
          pb: (result !== null) ? 0 : '' 
        }}
      >
        {
          (loading)
          ? ''
          : (result == null)
            ? title
            : (result)
              ? <CheckCircleOutline sx={{ fontSize: 45, color: 'text.active' }} />
              : <CancelOutlined color='error' sx={{ fontSize: 45 }} />
        }
      </DialogTitle>

      <DialogContent
        sx={{
          display: (loading) ? 'flex' : '', justifyContent: 'center',
          pb: (loading) ? 4 : (result !== null) ? 1 : ''
        }}
      >
        {
          (loading)
          ? <CircularProgress />
          : (
            <DialogContentText sx={{ textAlign: (result !== null) ? 'center' : '' }}>
              {messageDialog}
            </DialogContentText>
          )
        }
      </DialogContent>

      {
        (loading)
          ? null
          : (
            <DialogActions sx={{ justifyContent: (result !== null) ? 'center' : '' }}>
              {
                (result == null)
                  ? (
                    <>
                      <Button onClick={startFunctionFromData} variant='outlined'>Aceptar</Button>
                      <Button onClick={handleClose} variant='outlined' color='buttonTernary'>Cancelar</Button>
                    </>
                  )
                  : <Button onClick={handleClose} variant='outlined'>Aceptar</Button>
              }
            </DialogActions>
          )
      }
    </Dialog>
  )
}
