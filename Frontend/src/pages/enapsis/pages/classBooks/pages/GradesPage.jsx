import { ButtonSave } from '@components/button'
import { DialogAreYouSure } from '@components/dialog'
import { GridPaper } from '@components/grid'
import { SkeletonListItemV2 } from '@components/skeleton'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { CLASS_BOOKS } from '@models/privateRoutes'
import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Divider, Grid, Link, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { GradesItem } from '../components'

function createData(rowName, value) {
  return { rowName, value }
}

export const GradesPage = () => {

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const {
    grades, isLoadingGrades,
    startGetCalendarCourse, startGetEvaluation, startResetEvaluation, startResetEvaluations,
    startGetGrades, startResetGrades, startUploadGrades
  } = useCalendarCourseStore()

  const { handleSubmit, setValue, formState: {errors}, control } = useForm({defaultValues: {
    gradesFields: []
  }})

  const { fields } = useFieldArray({
    control,
    name: 'gradesFields'
  })

  const [calendarCourse, setCalendarCourse] = useState(null)
  const [evaluation, setEvaluation] = useState(null)

  const [openPopup, setOpenPopup] = useState(false)
  const [newGrades, setNewGrades] = useState(null)

  const getData = async (calendar_id, evaluation_id) => {
    const calendar = await startGetCalendarCourse(calendar_id)
    setCalendarCourse(calendar)
    const eva_backend = await startGetEvaluation(evaluation_id)
    setEvaluation(eva_backend)

    startGetGrades(eva_backend._id)
  }

  useEffect(() => {
    const pathSplit = pathname.split('/')
    getData(pathSplit[2], pathSplit[4])
  }, [])

  const routeEvaluations = () => {
    startResetGrades()
    navigate(`${CLASS_BOOKS}/${calendarCourse?._id}/evaluaciones`, { replace: true })
  }

  useEffect(() => {
    if(!isLoadingGrades) {
      setValue('gradesFields', grades)
    }
  }, [isLoadingGrades])

  const routeClassBook = () => {
    startResetEvaluations()
    navigate(`${CLASS_BOOKS}`, { replace: true })
  }

  const rowsLeft = [
    createData('Título', evaluation?.title),
    createData('% Ponderación', `${evaluation?.percentage}%`),
  ]
  const rowsRight = [
    createData('Fecha', new Date(evaluation?.evaluationDate).toLocaleDateString('es-es'))
  ]

  const onSubmit = (data) => {
    event.preventDefault()

    setNewGrades(data)
    handleOpenPopup()
  }

  const handleOpenPopup = () => {
    setOpenPopup(true)
  }
  const handleClosePopup = () => {
    setOpenPopup(false)
  }
  const onUpdateGrades = async() => {
    const ok = await startUploadGrades(evaluation?._id,  newGrades)
    return ok
  }

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNext />}
        sx={{ mt: 1, ml: 2 }}
      >
        <Link underline="hover" color="inherit" onClick={routeClassBook}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography variant="h5">Libro de Clases</Typography>
        </Link>
        <Typography variant='h5' color={'text.primary'} sx={{ userSelect: 'none' }}>{calendarCourse?.internalName}</Typography>
        <Link underline="hover" color="inherit" onClick={routeEvaluations}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography variant="h5">Evaluaciones</Typography>
        </Link>
        <Typography variant='h5' color={'text.primary'} sx={{ userSelect: 'none' }}>{evaluation?.title}</Typography>
      </Breadcrumbs>

      {/* Detalles de la evaluacion */}
      <GridPaper columnSpacing={0} rowSpacing={1}>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 18 }}>Detalle de la Evaluación</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableBody>
                {
                  rowsLeft.map((row) => (
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
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableBody>
                {
                  rowsRight.map((row) => (
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
        </Grid>
      </GridPaper>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridPaper rowSpacing={1}>
          <Grid item xs={12}>
            <Grid container alignItems={'center'} columnSpacing={1}>
              <Grid item xs={8}>
                <Typography sx={{ userSelect: 'none', pt: 1, pb: 1, textAlign: 'center' }} >Participante</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ userSelect: 'none', textAlign: 'center' }} >Nota</Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <Divider />
            </Grid>
          </Grid>
          
          {
            isLoadingGrades
              ? <SkeletonListItemV2 />
              : (
                fields.map((item, index) => (
                  <GradesItem key={index} gradeParticipant={item} index={index} control={control} error={errors.gradesFields} />
                ))
              )
          }

          <ButtonSave buttonTitle={'Guardar Notas'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />
        </GridPaper>
      </form>

      <DialogAreYouSure
        open={openPopup}
        handleClose={handleClosePopup}
        title={'Guardar Notas'}
        message={'¿Estás seguro de guardar estás notas?'}
        okMessage={'Se guardaron correctamente'}
        errorMessage={'Ocurrió un error al guardar las notas'}
        functionFromData={onUpdateGrades}
      />
    </>
  )
}
