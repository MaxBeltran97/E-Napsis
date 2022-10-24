import { useForm, useWatch } from "react-hook-form"

import { Grid } from "@mui/material"
import { GridForm, GridInput } from "@components/grid"
import { InputAutocompleteAsync, InputDate, InputNumber, InputText } from "@components/input/generic"
import { InputEvaluationDate, InputNumberAdornment, InputRegion } from "@components/input/specific"
import { ButtonSave } from "@components/button"

import { selectRegiones } from "@assets/select-regiones"

import { useCalendarCourseStore } from "@hooks/useCalendarCourseStore"
import { useCourseStore } from "@hooks/useCourseStore"
import { getCoursesWithAutocomplete } from "@pages/enapsis/helpers"
import { useEffect } from "react"

export const AddCalendarCoursePage = () => {
  const { handleSubmit, getValues, setValue, formState: {errors}, control } = useForm()
  const { isLoading: isLoadingCourse, courses, startGetCourses, startGetCourse } = useCourseStore()
  const { isLoading, startSavingCalendarCourse } = useCalendarCourseStore()
  const courseId = useWatch({ control, name: 'course_id' })
  const startDate = useWatch({ control, name: 'startDate' })
  const endDate = useWatch({ control, name: 'endDate' })

  const updateData = async() => {
    const { sence, instruction, totalHours, participantValue } = await startGetCourse(courseId)

    setValue('sence', sence, { shouldValidate: true })
    setValue('instruction', instruction, { shouldValidate: true })
    setValue('courseTotalHours', totalHours, { shouldValidate: true })
    setValue('participantValue', participantValue, { shouldValidate: true })
  }

  useEffect(() => {
    if(!!courseId) {
      updateData()
    }
  }, [courseId])

  return (
    <GridForm handleSubmit={handleSubmit} formTitle={'Calendarizar Curso'} functionFromData={startSavingCalendarCourse}>
      <Grid item xs={12}>
        <GridInput title={'Datos a Calendarizar'}>
          <Grid container>
            <Grid item xs={12} lg={8}>
              <InputText control={control} name={'Código Interno'} label={'internalCode'} error={errors.internalCode} />
              <InputText control={control} name={'Nombre Interno'} label={'internalName'} required={true} error={errors.internalName} />
              <InputAutocompleteAsync control={control} name={'Seleccionar Curso'} label={'course_id'} required={true} error={errors.course_id} entities={courses} startGetEntities={startGetCourses} getFormattedEntities={getCoursesWithAutocomplete} loading={isLoadingCourse} />
              {/* disabled */}
              <InputText control={control} name={'Codigo Sence'} label={'sence'} required={true} error={errors.sence} disabled={true} withSize={3.5} />
              <InputText control={control} name={'Modalidad de Instrucción'} label={'instruction'} required={true} error={errors.instruction} disabled={true} withSize={3.5} />
              {/* disabled end */}
              <InputNumber control={control} name={'Horas Totales'} label={'courseTotalHours'} required={true} error={errors.courseTotalHours} withSize={3.5} />
              <InputText control={control} name={'Lugar de Ejecución'} label={'ejecutionPlace'} required={true} error={errors.ejecutionPlace} />
              <InputText control={control} name={'Ciudad de Ejecución'} label={'ejecutionCity'} error={errors.ejecutionCity} />
              <InputRegion control={control} name={'Región de Ejecución'} label={'ejecutionRegion'} error={errors.ejecutionRegion} getValues={getValues} setValue={setValue} items={selectRegiones} labelComuna={null} />
              {/* Fechas */}
              <InputDate control={control} name={'Fecha de Inicio'} label={'startDate'} required={true} error={errors.startDate} minDate={new Date()} maxDate={endDate} />
              <InputDate control={control} name={'Fecha de Término'} label={'endDate'} required={true} error={errors.endDate} minDate={startDate} />
              {/* Fechas end */}
            </Grid>
            <Grid item xs={12}>
              {/* Dias de clases */}
            </Grid>
            <Grid item xs={12} lg={8}>
              <InputNumberAdornment control={control} name={'Valor por Participante'} label={'participantValue'} required={true} error={errors.participantValue} adornment={'$'} position={'start'} withSize={3.5} />
            </Grid>
          </Grid>
        </GridInput>
      </Grid>
      
      <Grid item xs={12}>
        <GridInput title={'Fechas de Evaluaciones'}>
          <Grid container>
            <Grid item xs={12} lg={8}>
              <InputEvaluationDate control={control} label={'evaluationDates'} error={errors.evaluationDates} startDate={startDate} endDate={endDate} />
            </Grid>
          </Grid>
        </GridInput>
      </Grid>

      <ButtonSave buttonTitle={'Calendarizar Curso'} errorTitle={'Error al Calendarizar'} isLoading={isLoading} errorsForm={false} />
    </GridForm>
  )
}
