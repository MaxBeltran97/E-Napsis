import { ButtonSave } from '@components/button'
import { GridForm, GridInput } from '@components/grid'
import { InputFilesView } from '@components/input/specific'
import { ErrorSharp } from '@mui/icons-material'
import { Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

export const CalendarCourseDocuments = ({ calendarCourse, open, handleClose }) => {

  const { handleSubmit, getValues, setValue, formState: { errors }, control } = useForm()
  const { internalCode, internalName } = calendarCourse

  const onSubmit = (data) => {
    event.preventDefault()
    console.log(data)
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={false}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Documentos de: {internalCode} - {internalName}</DialogTitle>
      <DialogContent dividers={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12}>
              <GridInput title={'Subir Documentos'}>
                <InputFilesView control={control} name={'Seleccionar Documentos'} label={'calendarCourseFiles'} error={ErrorSharp.calendarCourseFiles} multiple={true} helperText={'.pdf .docx .png .xls .ppt'} textButton={'Subir Archivos'} allowedExtensions={['pdf', 'docx', 'png', 'jpg', 'xls', 'xlsx', 'pptx']} withSize={9.6} />
              </GridInput>
            </Grid>

            <ButtonSave buttonTitle={'Guardar Documentos'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />

            <Grid item xs={12} sx={{ mt: 3 }}>
              <Divider />
            </Grid>
          </Grid>
        </form>
        <Typography sx={{ fontSize: '20px', mt: 2 }}>Documentos </Typography>

        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems={'center'}>
              <Grid item xs={10}>
                <Typography sx={{ textAlign: 'center' }}>Nombre del Documento</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ textAlign: 'center' }}>Descargar</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

    </Dialog>
  )
}
