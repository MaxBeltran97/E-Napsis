import { ButtonSave } from '@components/button'
import { GridInput } from '@components/grid'
import { InputDate } from '@components/input/generic'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { Grid } from '@mui/material'
import { getAttendanceDates } from '@pages/enapsis/helpers'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

export const AddAttendance = ({ calendarCourse_id }) => {

  const { attendances, startGetCalendarCourse, startSavingAttendance } = useCalendarCourseStore()

  const { handleSubmit, setValue, clearErrors, formState: {errors}, control } = useForm({
    defaultValues: {
      _id: null,
      date: '',
      calendarCourse_id: null
    }
  })
  useWatch({ control, name: '_id'})
  useWatch({ control, name: 'date'})

  const [loading, setLoading] = useState(true)

  const [calendarCourse, setCalendarCourse] = useState(null)
  const [listAttendances, setListAttendances] = useState([])

  const getData = async () => {
    setLoading(true)
    const calendar = await startGetCalendarCourse(calendarCourse_id)
    setCalendarCourse(calendar)
    setValue('calendarCourse_id', calendar?._id)

    setLoading(false)
  }

  useEffect(() => {
    if(!!calendarCourse_id) {
      getData()
    }
  }, [calendarCourse_id])

  const onResetForm = () => {
    clearErrors()
    setValue('_id', null)
    setValue('date', null)

    setListAttendances(getAttendanceDates(attendances))
  }

  const onSubmit = (data) => {
    event.preventDefault()
    startSavingAttendance(data)
    onResetForm()
  }

  useEffect(() => {
    setListAttendances(getAttendanceDates(attendances))
  }, [attendances])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <GridInput title={'Registrar Día'}>
          <Grid container>
            <Grid item xs={12} lg={6}>
              {
                (loading)
                  ? null
                  : <InputDate control={control} name={'Fecha'} label={'date'} required={true} error={errors.date} minDate={new Date(calendarCourse?.startDate)} maxDate={new Date(calendarCourse?.endDate)} listErrorDates={listAttendances} errorListMessage={'*Fecha ya está agregada'} />
              }
            </Grid>
          </Grid>
        </GridInput>
      </Grid>

      <ButtonSave buttonTitle={'Guardar Día'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />
    </form>
  )
}
