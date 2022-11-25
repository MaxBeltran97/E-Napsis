import { CloudUploadOutlined, ImportContacts, MenuBook, ModeOutlined } from '@mui/icons-material'
import { Button, Divider, Grid, Typography } from '@mui/material'
import React from 'react'

export const ClassBookItem = ({ calendarCourse }) => {

  const { internalCode, internalName, startDate, endDate } = calendarCourse
  const startDateFormat = new Date(startDate).toLocaleDateString('es-es')
  const endDateFormat = new Date(endDate).toLocaleDateString('es-es')

  return (
    <>
      <Grid item xs={12}>
        <Grid container columnSpacing={1}>
          <Grid item xs={4}>
            <Typography sx={{ pl: 1 }} >{internalName}</Typography>
            <Grid item xs={11} sx={{ pl: 1 }}>
              <Grid container direction={'column'}>

                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sx={{ pl: 1, display: 'flex', alignItems: 'center' }}>
                  <Grid container>
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>Código Interno:</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>{internalCode}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sx={{ pl: 1, display: 'flex', alignItems: 'center' }}>
                  <Grid container>
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>Fecha de Inicio:</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>{startDateFormat}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sx={{ pl: 1, display: 'flex', alignItems: 'center' }}>
                  <Grid container>
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>Fecha de Termino:</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>{endDateFormat}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sx={{ pl: 1, display: 'flex', alignItems: 'center' }}>
                  <Grid container>
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>Nombre Interno:</Typography>
                    </Grid>
                    <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>{internalName}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Grid container alignItems={'center'} direction={'column'} rowSpacing={1}>
              <Grid item>
                <Button variant='outlined'
                  color='buttonSecondary'
                  startIcon={<ImportContacts />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Generar Libro
                </Button>
              </Grid>
              <Grid item>
                <Button variant='outlined'
                  color='buttonSecondary'
                  startIcon={<MenuBook />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Generar Libro con Contenido
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Grid container alignItems={'center'} direction={'column'} rowSpacing={1}>
              <Grid item>
                <Button variant='outlined'
                  startIcon={<ModeOutlined />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Asistencia Presencial
                </Button>
              </Grid>
              <Grid item>
                <Button variant='outlined'
                  startIcon={<ModeOutlined />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Asistencia Online
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Grid container alignItems={'center'} direction={'column'} rowSpacing={1}>
              <Grid item>
                <Button variant='outlined'
                  startIcon={<ModeOutlined />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Ingresar Notas
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Grid container alignItems={'center'} direction={'column'} rowSpacing={1}>
              <Grid item>
                <Button variant='outlined'
                  startIcon={<CloudUploadOutlined />}
                  sx={{ textTransform: 'initial !important' }}
                >
                  Subir Archivos
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Divider />
        </Grid>
      </Grid>
    </>
  )
}
