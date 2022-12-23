import { useForm, useWatch } from "react-hook-form"

import { Grid } from "@mui/material"
import { GridForm, GridInput } from "@components/grid"
import { InputAutocomplete, InputAutocompleteAsync, InputDate, InputNumber, InputText } from "@components/input/generic"
import { InputEvaluationDate, InputNumberAdornment, InputRegion } from "@components/input/specific"
import { ButtonSave } from "@components/button"

import { selectRegiones } from "@assets/select-regiones"

import { useCalendarCourseStore } from "@hooks/useCalendarCourseStore"
import { useCourseStore } from "@hooks/useCourseStore"
import { getCoursesWithAutocomplete } from "@pages/enapsis/helpers"
import { useEffect, useState } from "react"
import { radioInstructionModality } from "@assets/radio-data"

export const AddCalendarCoursePage = () => {
  const { courses, startGetCourses, startGetCourse } = useCourseStore()
  const { isLoading, activeCalendarCourse, startSavingCalendarCourse, startResetActiveCalendarCourse } = useCalendarCourseStore()

  const { handleSubmit, getValues, setValue, formState: {errors}, control } = useForm({defaultValues: activeCalendarCourse})
  const courseId = useWatch({ control, name: 'course_id' })
  const startDate = useWatch({ control, name: 'startDate' })
  const endDate = useWatch({ control, name: 'endDate' })
  
  const [formTitle, setFormTitle] = useState('Calendarizar Curso')
  const [buttonTitle, setButtonTitle] = useState('Calendarizar Curso')
  const [errorsForm, setErrorsForm] = useState(false)
  const [startMinDate, setStartMinDate] = useState(new Date())

  const updateData = async() => {
    const { sence, instruction, totalHours, participantValue } = await startGetCourse(courseId)
    const instructionObj = radioInstructionModality.find(element => element.value === instruction)

    setValue('sence', sence, { shouldValidate: true })
    setValue('instruction', instructionObj.name, { shouldValidate: true })

    if(Object.entries(activeCalendarCourse).length === 0) {
      setValue('courseTotalHours', totalHours, { shouldValidate: true })
      setValue('participantValue', participantValue, { shouldValidate: true })
    }
  }

  useEffect(() => {
    if(!!courseId) {
      updateData()
    }
  }, [courseId])

  useEffect(() => {
    if(Object.entries(activeCalendarCourse).length !== 0) {
      setFormTitle('Modificar Curso Calendarizado')
      setButtonTitle('Guardar Cambios')
      setStartMinDate(new Date(startDate))
    }
    startResetActiveCalendarCourse()
  }, [])

  useEffect(() => {
    startGetCourses()
  }, [])

  useEffect(() => {
    if(Object.values(errors).length === 0) {
      setErrorsForm(false)
    } else {
      setErrorsForm(true)
    }
  }, [Object.values(errors).length])

  return (
    <GridForm handleSubmit={handleSubmit} formTitle={formTitle} functionFromData={startSavingCalendarCourse}>
      <Grid item xs={12}>
        <GridInput title={'Datos a Calendarizar'}>
          <Grid container>
            <Grid item xs={12} lg={8}>
              <InputText control={control} name={'Código Interno'} label={'internalCode'} error={errors.internalCode} />
              <InputText control={control} name={'Nombre Interno'} label={'internalName'} required={true} error={errors.internalName} />
              {/* <InputAutocompleteAsync control={control} name={'Seleccionar Curso'} label={'course_id'} required={true} error={errors.course_id} entities={courses} startGetEntities={startGetCourses} getFormattedEntities={getCoursesWithAutocomplete} loading={isLoadingCourse} /> */}
              <InputAutocomplete control={control} name={'Seleccionar Curso'} label={'course_id'} required={true} error={errors.course_id} items={getCoursesWithAutocomplete(courses)} />
              {/* disabled */}
              <InputText control={control} name={'Codigo Sence'} label={'sence'} required={true} error={errors.sence} disabled={true} withSize={3.5} />
              <InputText control={control} name={'Modalidad de Instrucción'} label={'instruction'} required={true} error={errors.instruction} disabled={true} />
              {/* disabled end */}
              <InputNumber control={control} name={'Horas Totales'} label={'courseTotalHours'} required={true} error={errors.courseTotalHours} withSize={3.5} />
              <InputText control={control} name={'Lugar de Ejecución'} label={'ejecutionPlace'} required={true} error={errors.ejecutionPlace} />
              <InputText control={control} name={'Ciudad de Ejecución'} label={'ejecutionCity'} error={errors.ejecutionCity} />
              <InputRegion control={control} name={'Región de Ejecución'} label={'ejecutionRegion'} error={errors.ejecutionRegion} getValues={getValues} setValue={setValue} items={selectRegiones} labelComuna={null} />
              {/* Fechas */}
              <InputDate control={control} name={'Fecha de Inicio'} label={'startDate'} required={true} error={errors.startDate} minDate={startMinDate} maxDate={endDate} />
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

      <ButtonSave buttonTitle={buttonTitle} errorTitle={'Error al Calendarizar'} isLoading={isLoading} errorsForm={errorsForm} />
    </GridForm>
  )
}
