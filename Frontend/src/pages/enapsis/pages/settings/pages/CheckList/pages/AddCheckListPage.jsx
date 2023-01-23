import { ButtonSave } from '@components/button'
import { GridInput, GridPaper } from '@components/grid'
import { InputAutocomplete, InputText } from '@components/input/generic'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { useSettingStore } from '@hooks/useSettingStore'
import { CHECKLIST, SETTINGS } from '@models/privateRoutes'
import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Divider, Grid, Link, Tooltip, Typography, useForkRef } from '@mui/material'
import { getCalendarCoursesWithAutocomplete } from '@pages/enapsis/helpers'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { checkListTareasDefault } from '../assets'
import { CheckListAddItem } from '../components'

export const AddCheckListPage = () => {

  const navigate = useNavigate()

  const { calendarCourses, startGetCalendarCourses } = useCalendarCourseStore()
  const { isCheckListLoading, startSavingCheckList } = useSettingStore()

  const { handleSubmit, setValue, formState: { errors }, control } = useForm({
    defaultValues: {
      logo_id: '',
      calendarCourse_id: '',
      checkListActivities: []
    }
  })

  const { fields } = useFieldArray({
    control,
    name: 'checkListActivities'
  })

  const calendarCourseId = useWatch({ control, name: 'calendarCourse_id'})

  const updateData = async() => {
    //obtener nombre del logo
  }

  useEffect(() => {
    if(!!calendarCourseId) {
      updateData()
    }
  }, [calendarCourseId])

  useEffect(() => {
    setValue('checkListActivities', checkListTareasDefault)
  }, [])

  useEffect(() => {
    startGetCalendarCourses()
  }, [])

  const onSubmit = async (data) => {
    event.preventDefault()

    startSavingCheckList(data)
  }

  const routeCheckList = () => {
    navigate(`${SETTINGS}${CHECKLIST}`, { replace: true })
  }

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNext />}
        sx={{ mt: 1, ml: 2 }}
      >
        <Link underline='hover' color='inherit' onClick={routeCheckList}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography variant='h5'>Modulo Check-List</Typography>
        </Link>
        <Typography variant='h5' color={'text.primary'} sx={{ userSelect: 'none' }}>Nuevo Check-List</Typography>
      </Breadcrumbs>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridPaper>
          <Grid item xs={12} lg={7}>
            <GridInput>
              <InputAutocomplete control={control} name={'Curso Calendarizado'} label={'calendarCourse_id'} required={true} error={errors.calendarCourse_id} items={getCalendarCoursesWithAutocomplete(calendarCourses)} />
              <InputText control={control} name={'Logo Asociado'} label={'logo_id'} disabled={true} />
            </GridInput>
          </Grid>
          <Grid item xs={12}
          >
            <Grid container rowSpacing={0.5}
              sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: 1.5  }}
            >
              <Grid item xs={12}>
                <Grid container alignItems={'center'} columnSpacing={1}>
                  <Grid item xs={1}>
                    <Typography sx={{ textAlign: 'center', pt: 1, pb: 1 }}>N°</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ textAlign: 'center' }}>Actividad</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ textAlign: 'center' }}>Estado</Typography>
                    <Grid container>
                      <Grid item xs={4}>
                        <Tooltip title={'Actividad Realizada'}>
                          <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>R</Typography>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title={'Actividad No Realizada'}>
                          <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>N</Typography>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={4}>
                        <Tooltip title={'Actividad No Aplica'}>
                          <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>NA</Typography>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ textAlign: 'center' }}>Fecha</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mt: 0.5 }}>
                  <Divider />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container alignItems={'center'} columnSpacing={1}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ textAlign: 'center', pt: 0.5, pb: 0.5 }}>Coordinador de capacitación</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mt: 0.5 }}>
                  <Divider />
                </Grid>
              </Grid>

              {
                fields.map((item, index) => (
                  <CheckListAddItem key={index} checkActivity={item} index={index} control={control} error={errors.checkListActivities} roleActive={'Coordinator'} />
                ))
              }

              <Grid item xs={12}>
                <Grid container alignItems={'center'} columnSpacing={1}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ textAlign: 'center', pt: 0.5, pb: 0.5 }}>Asistente</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mt: 0.5 }}>
                  <Divider />
                </Grid>
              </Grid>

              {
                fields.map((item, index) => (
                  <CheckListAddItem key={index} checkActivity={item} index={index} control={control} error={errors.checkListActivities} roleActive={'Assistant'} />
                ))
              }
            </Grid>
          </Grid>

          <ButtonSave buttonTitle={'Guardar Check-List'} errorTitle={'Error al Guardar'} isLoading={isCheckListLoading} errorsForm={false} />
        </GridPaper>
      </form>
    </>
  )
}
