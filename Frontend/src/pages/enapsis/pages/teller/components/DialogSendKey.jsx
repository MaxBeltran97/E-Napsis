import { useTellerStore } from '@hooks/useTellerStore'
import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'

export const DialogSendKey = ({open, handleClose, teller}) => {

  const { startNewKeyTeller } = useTellerStore()
  const [loading, setLoading] = useState(false)
  const [resultKey, setResultKey] = useState(null)
  const [messageKey, setMessageKey] = useState('')
  const title = `Enviar Clave a ${teller.fullName} ${teller.lastName}${!!(teller.motherLastName) ? ' '+teller.motherLastName : '' }`

  useEffect(() => {
    if(open) {
      setLoading(false)
      setResultKey(null)
      setMessageKey('')
    }
  }, [open])

  const getNewKeyTeller = async() => {
    setLoading(true)
    const ok = await startNewKeyTeller(teller._id)
    if(ok){
      setMessageKey('La clave se envio correctamente')
    }else {
      setMessageKey('Ocurrio un error al enviar la clave')
    }
    setResultKey(ok)
    setLoading(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'xs'}
      fullWidth={true}
    >
      <DialogTitle sx={{ textAlign: (resultKey !== null) ? 'center' : '', pb: (resultKey !== null) ? 0 : '' }}>
        {
          (loading)
          ? ''
          : (resultKey == null)
              ? title
              : (resultKey)
                  ? <CheckCircleOutline sx={{ fontSize: 45, color: 'text.active' }} />
                  : <CancelOutlined color='error' sx={{ fontSize: 45 }} />
        }
        
      </DialogTitle>
      <DialogContent 
        sx={{ 
          display: (loading) ? 'flex' : '', justifyContent: 'center',
          pb: (loading) ? 4 : (resultKey !== null) ? 1 : ''
        }}
      >
        {
          (loading)
          ? (
            <CircularProgress />
          )
          : (
            <DialogContentText sx={{ textAlign: (resultKey !== null) ? 'center' : '' }}>
              {
                (resultKey == null)
                  ? '¿Estás seguro de enviar la clave al relator?'
                  : messageKey
              }
            </DialogContentText>
          )
        }
      </DialogContent>
      {
        (loading)
        ? (
          null
        )
        : (
          <DialogActions sx={{ justifyContent: (resultKey !== null) ? 'center' : '' }}>
            {
              (resultKey == null)
                ? (
                  <>
                    <Button onClick={getNewKeyTeller} variant='outlined'>Aceptar</Button>
                    <Button onClick={handleClose} variant='outlined' color={'buttonTernary'}>Cancelar</Button>
                  </>
                )
                : <Button onClick={handleClose} variant='outlined'>OK</Button>
            }
          </DialogActions>
        )
      }
    </Dialog>
  )
}
