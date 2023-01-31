import { ButtonSave } from '@components/button'
import { DialogAreYouSure } from '@components/dialog'
import { GridPaper } from '@components/grid'
import { SkeletonListItemV2 } from '@components/skeleton'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { CLASS_BOOKS } from '@models/privateRoutes'
import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Divider, Grid, Link, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { ParticipantAttendanceItem } from '../components'

export const ParticipantsAttendancePage = () => {

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const {
    participantsAttendance, isLoadingPartAttendance,
    startGetCalendarCourse, startGetAttendance, startResetAttendances,
    startGetParticipantsAttendance, startResetParticipantsAttendance, startUploadPartcipantsAttendance
  } = useCalendarCourseStore()

  const { handleSubmit, setValue, formState: {errors}, control } = useForm({defaultValues: {
    participantsAttendanceFields: []
  }})

  const { fields } = useFieldArray({
    control,
    name: 'participantsAttendanceFields'
  })

  const [calendarCourse, setCalendarCourse] = useState(null)
  const [attendance, setAttendance] = useState(null)

  const [openPopup, setOpenPopup] = useState(false)
  const [newParticipantsAttendance, setNewParticipantsAttendance] = useState(null)

  const getData = async (calendar_id, attendance_id) => {
    const calendar = await startGetCalendarCourse(calendar_id)
    setCalendarCourse(calendar)
    const atte_backend = await startGetAttendance(attendance_id)
    setAttendance(atte_backend)

    startGetParticipantsAttendance(atte_backend._id)
  }

  useEffect(() => {
    const pathSplit = pathname.split('/')
    getData(pathSplit[2], pathSplit[4])
  }, [])

  const routeAttendances = () => {
    startResetParticipantsAttendance()
    navigate(`${CLASS_BOOKS}/${calendarCourse?._id}/asistencia`, { replace: true })
  }

  useEffect(() => {
    if(!isLoadingPartAttendance) {
      setValue('participantsAttendanceFields', participantsAttendance)
    }
  }, [isLoadingPartAttendance, participantsAttendance])
  
  const routeClassBook = () => {
    startResetParticipantsAttendance()
    startResetAttendances()
    navigate(`${CLASS_BOOKS}`, { replace: true })
  }

  const onSubmit = (data) => {
    event.preventDefault()

    setNewParticipantsAttendance(data)
    handleOpenPopup()
  }

  const handleOpenPopup = () => {
    setOpenPopup(true)
  }
  const handleClosePopup = () => {
    setOpenPopup(false)
  }
  const onUpdateParticipantsAttendance = async() => {
    const ok = await startUploadPartcipantsAttendance(attendance?._id, newParticipantsAttendance)
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
        <Link underline="hover" color="inherit" onClick={routeAttendances}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography variant="h5">Asistencia</Typography>
        </Link>
        <Typography variant='h5' color={'text.primary'} sx={{ userSelect: 'none' }}>{ new Date(attendance?.date).toLocaleDateString('es-es') }</Typography>
      </Breadcrumbs>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridPaper rowSpacing={1}>
          <Grid item xs={12}>
            <Grid container alignItems={'center'} columnSpacing={1}>
              <Grid item xs={9}>
                <Typography sx={{ userSelect: 'none', pt: 1, pb: 1, textAlign: 'center' }} >Participante</Typography>
              </Grid>
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={4}>
                    <Tooltip title={'Presente'}>
                      <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>P</Typography>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    <Tooltip title={'Falta Justificada'}>
                      <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>J</Typography>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    <Tooltip title={'Falta Injustificada'}>
                      <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>I</Typography>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <Divider />
            </Grid>
          </Grid>

          {
            isLoadingPartAttendance
              ? <SkeletonListItemV2 />
              : (
                fields.map((item, index) => (
                  <ParticipantAttendanceItem key={index} participantAttendance={item} index={index} control={control} error={errors.participantsAttendanceFields} />
                ))
              )
          }

          <ButtonSave buttonTitle={'Guardar Asistencia'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />
        </GridPaper>
      </form>

      <DialogAreYouSure 
        open={openPopup}
        handleClose={handleClosePopup}
        title={'Guardar Asistencia'}
        message={'¿Estás seguro de guardar la asistencia?'}
        okMessage={'Se guardaron correctamente'}
        errorMessage={'Ocurrió un error al guardar la asistencia'}
        functionFromData={onUpdateParticipantsAttendance}
      />
    </>
  )
}
