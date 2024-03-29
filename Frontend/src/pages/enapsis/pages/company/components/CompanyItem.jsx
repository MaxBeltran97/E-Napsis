import { DialogDelete } from '@components/dialog'
import { useCompanyStore } from '@hooks/useCompanyStore'
import { DeleteOutlined, ModeOutlined, Visibility } from '@mui/icons-material'
import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { CompanyView } from '.'

export const CompanyItem = ({ company }) => {

  const { startChangeCompany, startDeleteCompany } = useCompanyStore()
  const { fantasyName, rut, contactName } = company

  const [openDeleteView, setOpenDeleteView] = useState(false)
  const [openViewView, setOpenViewView] = useState(false)

  const handleOpenDeleteView = () => {
    setOpenDeleteView(true)
  }
  const handleCloseDeleteView = () => {
    setOpenDeleteView(false)
  }
  const onDeleteCompany = () => {
    startDeleteCompany(company._id)
  }

  const onChangeCompany = () => {
    startChangeCompany(company)
  }

  const handleOpenViewView = () => {
    setOpenViewView(true)
  }
  const handleCloseViewView = () => {
    setOpenViewView(false)
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={4}>
          <Typography sx={{ pl: 1 }} >{fantasyName}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ textAlign: 'center' }}>{rut}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{contactName}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Ver Datos'}>
                <IconButton onClick={handleOpenViewView}>
                  <Visibility />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Modificar'}>
                <IconButton onClick={onChangeCompany}>
                  <ModeOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Eliminar'}>
                <IconButton onClick={handleOpenDeleteView}>
                  <DeleteOutlined color="error" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 2 }}>
        <Divider />
      </Grid>

      <DialogDelete
        title={`Eliminar la empresa ${fantasyName}`}
        body={'¿Estás seguro de eliminar esta empresa? Al eliminarla, se eliminarán todos los participantes asociados a ella.'}
        open={openDeleteView}
        handleClose={handleCloseDeleteView}
        functionDelete={onDeleteCompany}
      />
      <CompanyView company={company} open={openViewView} handleClose={handleCloseViewView} />
    </Grid>
  )
}
