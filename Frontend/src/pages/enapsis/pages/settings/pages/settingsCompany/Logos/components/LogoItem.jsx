import { DialogDelete } from '@components/dialog'
import { useSettingCompanyStore } from '@hooks/useSettingCompanyStore'
import { DeleteOutlined, ModeOutlined, Visibility } from '@mui/icons-material'
import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { LogoView } from '.'

export const LogoItem = ({ logo }) => {

  const { startDeleteLogo, startChangeLogo} = useSettingCompanyStore()

  const [openDeleteView, setOpenDeleteView] = useState(false)
  const [openViewView, setOpenViewView] = useState(false)

  const onChangeLogo = () => {
    startChangeLogo(logo)
  }

  const handleOpenDeleteView = () => {
    setOpenDeleteView(true)
  }
  const handleCloseDeleteView = () => {
    setOpenDeleteView(false)
  }
  const onDeleteLogo = () => {
    startDeleteLogo(logo._id)
  }

  const handleOpenViewView = () => {
    setOpenViewView(true)
  }
  const handleCloseViewView = () => {
    setOpenViewView(false)
  }

  return (
    <Grid item xs={12} sx={{ pt: 1 }}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={4}>
          <Typography sx={{ pl: 1 }}>{logo.title}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ textAlign: 'center' }}>{logo.code}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Ver Datos'}>
                <IconButton onClick={handleOpenViewView}>
                  <Visibility/>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Modificar'}>
                <IconButton onClick={onChangeLogo}>
                  <ModeOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Eliminar'}>
                <IconButton onClick={handleOpenDeleteView}>
                  <DeleteOutlined color='error' />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Divider />
      </Grid>

      <DialogDelete 
        title={`Eliminar el logo ${logo.title}`}
        body={'¿Estás seguro de eliminar este logo? Al eliminarlo, este se eliminará de todos los cursos que lo asocien.'}
        open={openDeleteView}
        handleClose={handleCloseDeleteView}
        functionDelete={onDeleteLogo}
      />
      <LogoView logo={logo} open={openViewView} handleClose={handleCloseViewView} />
    </Grid>
  )
}
