import { useTellerStore } from '@hooks/useTellerStore'
import { CloudUploadOutlined, DeleteOutlined, ModeOutlined, RadioButtonChecked, RadioButtonUnchecked, Send } from '@mui/icons-material';
import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, Hidden, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.toUpperCase()[0]}`
    // children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function createData(rowName, value) {
  return { rowName, value }
}

export const TellerCard = ({ teller }) => {

  const { startChangeTeller, startDeleteTeller, startGetTellerUsername } = useTellerStore()
  const { situation, fullName, lastName, motherLastName, rut, email, cellPhone } = teller
  const [usernameTeller, setUsernameTeller] = useState('')

  const [openDeleteView, setOpenDeleteView] = useState(false)

  const getUsername = async () => {
    const { username } = await startGetTellerUsername(teller.user_id)
    setUsernameTeller(username)
  }

  useEffect(() => {
    getUsername()
  }, [])

  const handleOpenDeleteView = () => {
    setOpenDeleteView(true)
  }
  const handleCloseDeleteView = () => {
    setOpenDeleteView(false)
  }
  const onDeleteTeller = () => {
    startDeleteTeller(teller._id)
  }


  const onChangeTeller = () => {
    startChangeTeller(teller)
  }

  const rows = [
    createData('Usuario', `${usernameTeller}`),
    createData('Email', `${email}`),
    createData('Celular', `+56 9 ${cellPhone}`)
  ]

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar {...stringAvatar(usernameTeller)} />
        }
        action={
          <Tooltip title={'Enviar Clave'}>
            <IconButton>
              <Send forntSize='small' sx={{ transform: 'rotate(-45deg)' }} />
            </IconButton>
          </Tooltip>
        }
        title={`${fullName} ${lastName} ${motherLastName}`}
        subheader={`RUT/DNI: ${rut}`}
        sx={{
          '.MuiCardHeader-title': { 
            fontSize: 16
          }
        }}
      />
      <CardContent sx={{ pt: 1, pb: 1 }}>
        <TableContainer sx={{ overflowX: 'hidden' }}>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.rowName}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='left' width={'20%'} sx={{ p: 1, border: 0, fontSize: 15 }}>
                    {row.rowName}
                  </TableCell>
                  <TableCell align='left' width={'80%'} sx={{ p: 1, border: 0, fontSize: 15}}>
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Grid container rowSpacing={0.5} direction={'column'}>
          <Grid item>
            <Typography variant='body1'>
              Usuario: {usernameTeller}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              Email: {email}
            </Typography>
          </Grid>
        </Grid> */}
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'space-evenly' }}>
        <Tooltip title={(situation) ? 'Estado Activo' : 'Estado No Activo'}>
          <IconButton>
            {
              (situation)
              ? <RadioButtonChecked color='success' />
              : <RadioButtonUnchecked color='error' />
            }
          </IconButton>
        </Tooltip>
        <Tooltip title={'Subir Documentos'}>
          <IconButton>
            <CloudUploadOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title={'Modificar'}>
          <IconButton>
            <ModeOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title={'Eliminar'}>
          <IconButton>
            <DeleteOutlined color='error'/>
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}
