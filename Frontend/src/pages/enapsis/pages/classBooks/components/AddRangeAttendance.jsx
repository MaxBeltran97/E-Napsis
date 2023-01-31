import { ButtonSave } from '@components/button'
import { GridInput } from '@components/grid'
import { InputCheckbox } from '@components/input/generic'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const AddRangeAttendance = ({calendarCourse_id}) => {

  const { startGetCalendarCourse, startSavingRangeAttendance } = useCalendarCourseStore()

  const { handleSubmit, setValue, clearErrors, control } = useForm()

  const [calendarCourse, setCalendarCourse] = useState(null)

  const getData = async () => {
    const calendar = await startGetCalendarCourse(calendarCourse_id)
    setCalendarCourse(calendar)
  }

  useEffect(() => {
    if(!!calendarCourse_id) {
      getData()
    }
  }, [calendarCourse_id])

  const onResetForm = () => {
    clearErrors()
    setValue('monday', false)
    setValue('tuesday', false)
    setValue('wednesday', false)
    setValue('thursday', false)
    setValue('friday', false)
    setValue('saturday', false)
    setValue('sunday', false)
  }

  const onSubmit = (data) => {
    event.preventDefault()
    startSavingRangeAttendance(calendarCourse?._id, calendarCourse?.startDate, calendarCourse?.endDate, data)
    
    onResetForm()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <GridInput title={'Registrar Días'}>
          <Grid container sx={{ mt: 1 }}>
            <InputCheckbox control={control} name={'Lunes'} label={'monday'} size={1.7} />
            <InputCheckbox control={control} name={'Martes'} label={'tuesday'} size={1.7} />
            <InputCheckbox control={control} name={'Miércoles'} label={'wednesday'} size={1.7} />
            <InputCheckbox control={control} name={'Jueves'} label={'thursday'} size={1.7} />
            <InputCheckbox control={control} name={'Viernes'} label={'friday'} size={1.7} />
            <InputCheckbox control={control} name={'Sábado'} label={'saturday'} size={1.7} />
            <InputCheckbox control={control} name={'Domingo'} label={'sunday'} size={1.7} />
          </Grid>

          <Grid item>
            <Typography sx={{pt: 1, userSelect: 'none' }}>NOTA: Se añadirán todos los días seleccionados dentro del rango de fechas del curso.</Typography>
          </Grid>
        </GridInput>
      </Grid>

      <ButtonSave buttonTitle={'Guardar Días'} errortitle={'Error al Guardar'} isLoading={false} errorsForm={false} />
    </form>
  )
}
