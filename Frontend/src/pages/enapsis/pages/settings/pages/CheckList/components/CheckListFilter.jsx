import { Filter } from '@components/accordion'
import { InputAutocomplete } from '@components/input/generic'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { useSettingCompanyStore } from '@hooks/useSettingCompanyStore'
import { useSettingStore } from '@hooks/useSettingStore'
import { Button, Grid } from '@mui/material'
import { getCalendarCoursesWithAutocomplete, getLogosWithAutocomplete } from '@pages/enapsis/helpers'
import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const CheckListFilter = ({ title }) => {
  
  const { calendarCourses, startGetCalendarCourses } = useCalendarCourseStore()
  const { logos, startGetLogos } = useSettingCompanyStore()

  const { filterCheckList } = useSettingStore()
  const { handleSubmit, control } = useForm()
  
  useEffect(() => {
    startGetCalendarCourses()
    startGetLogos()
  }, [])

  const onSubmit = (data) => {
    event.preventDefault()
    filterCheckList(data)
  }

  return (
    <Grid item xs={12} sx={{ mt: 2 }}>
      <Filter title={title}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} lg={6}>
              <InputAutocomplete control={control} name={'Curso Asociado'} label={'calendarCourse_id'} items={getCalendarCoursesWithAutocomplete(calendarCourses)} />
            </Grid>
            {/* Input para el logo asociado */}
            <Grid item xs={12} lg={6}>
              <InputAutocomplete control={control} name={'Logo Asociado'} label={'logo_id'} items={getLogosWithAutocomplete(logos)} />
            </Grid>
            <Grid container justifyContent={'center'} sx={{ mt: 3 }}>
              <Button type='submit'
                variant='outlined'
              >
                Aplicar Filtro
              </Button>
            </Grid>
          </Grid>
        </form>
      </Filter>
    </Grid>
  )
}
