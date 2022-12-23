import { useForm, useWatch } from "react-hook-form"

import { Grid } from "@mui/material"
import { GridForm, GridInput } from "@components/grid"
import { InputAutocomplete, InputAutocompleteAsync, InputDate, InputNumber, InputRadio, InputText, InputTextArea } from "@components/input/generic"
import { InputActivitiesContentHours, InputCalification, InputFieldArray, InputNumberAdornment } from "@components/input/specific"
import { ButtonSave } from "@components/button"

import { radioActivityType, radioInstructionModality } from "@assets/radio-data"

import { useCourseStore } from "@hooks/useCourseStore"
import { useTellerStore } from "@hooks/useTellerStore"
import { getTellersWithAutocomplete } from "@pages/enapsis/helpers/getTellersWithAutocomplete"
import { useEffect } from "react"
import { useState } from "react"


export const AddCoursePage = () => {
  const { tellers, startGetTellers } = useTellerStore()
  const { isLoading, activeCourse, startSavingCourse, startResetActiveCourse } = useCourseStore()

  const { handleSubmit, formState: { errors }, control } = useForm({defaultValues: activeCourse})
  const requestDate = useWatch({ control, name: 'requestDate' })

  const [formTitle, setFormTitle] = useState('Registro de Curso')
  const [buttonTitle, setButtonTitle] = useState('Guardar Curso')
  const [errorsForm, setErrorsForm] = useState(false)
  const [requestMinDate, setRequestMinDate] = useState(new Date())

  useEffect(() => {
    if(Object.entries(activeCourse).length !== 0) {
      setFormTitle('Modificar Curso')
      setButtonTitle('Guardar Cambios')
      setRequestMinDate(new Date(requestDate))
    }
    startResetActiveCourse()
  }, [])

  useEffect(() => {
    startGetTellers()
  }, [])

  useEffect(() => {
    if(Object.values(errors).length === 0) {
      setErrorsForm(false)
    } else {
      setErrorsForm(true)
    }
  }, [Object.values(errors).length])

  return (
    <GridForm handleSubmit={handleSubmit} formTitle={formTitle} functionFromData={startSavingCourse}>
      <Grid item xs={12}>
        <GridInput title={'Datos del Curso'}>
          <Grid container>
            <Grid item xs={12} lg={8}>
              <InputText control={control} name={'Código Sence / Interno'} label={'sence'} required={true} error={errors.sence} />
              <InputRadio control={control} name={'Modalidad de Instrucción'} label={'instruction'} items={radioInstructionModality} />
              <InputRadio control={control} name={'Tipo de Actividad'} label={'activityType'} items={radioActivityType} />
              <InputText control={control} name={'Nombre de Actividad'} label={'activityName'} required={true} error={errors.activityName} />
              <InputNumberAdornment control={control} name={'Porcentaje de Asistencia'} label={'attendance'} required={true} error={errors.attendance} maxValue={100} placeholder={'50'} adornment={'%'} position={'end'} withSize={3.5} />
              <InputCalification control={control} name={'Nota Minima'} label={'minCalification'} error={errors.minCalification} placeholder={'5,0'} withSize={3.5} />
              <InputNumber control={control} name={'Horas Minimas'} label={'minHours'} required={true} error={errors.minHours} withSize={3.5} />
              <InputNumber control={control} name={'N° de Participantes'} label={'participantsNumber'} error={errors.participantsNumber} withSize={3.5} />
              <InputTextArea control={control} name={'Población Objetivo'} label={'targetPopulation'} error={errors.targetPopulation} />
              <InputTextArea control={control} name={'Objetivos Generales'} label={'generalObjectives'} error={errors.generalObjectives} />
            </Grid>
            <Grid item xs={12}>
              <InputActivitiesContentHours control={control} name={'Actividades - Contenidos - Desglose de Horas'} label={'activitiesContentHours'} error={errors.activitiesContentHours} />
            </Grid>
            <Grid item xs={12} lg={8}>
              <InputNumber control={control} name={'Horas Totales'} label={'totalHours'} required={true} error={errors.totalHours} withSize={3.5} />
              <InputAutocomplete control={control} name={'Relatores'} label={'tellers_id'} required={true} error={errors.tellers_id} items={getTellersWithAutocomplete(tellers)} multiple={true} />
              <InputTextArea control={control} name={'Método o Técnica de Enseñanza'} label={'teachingTechnique'} error={errors.teachingTechnique} />
              <InputFieldArray control={control} name={'Medios Didácticos de Apoyo al Relator'} label={'tellerSupport'} error={errors.tellerSupport} textArea={true} />
              <InputFieldArray control={control} name={'Material Didáctico a Quedar en Poder de los Participantes'} label={'participantMaterial'} error={errors.participantMaterial} textArea={true} />
              <InputTextArea control={control} name={'Evaluación'} label={'evaluation'} error={errors.evaluation} />
              <InputTextArea control={control} name={'Infraestructura'} label={'infrastructure'} error={errors.infrastructure} />
              <InputFieldArray control={control} name={'Equipamiento'} label={'equipment'} error={errors.equipment} />
              <InputNumberAdornment control={control} name={'Valor Efectivo por Participante'} label={'participantValue'} required={true} error={errors.participantValue} adornment={'$'} position={'start'} withSize={3.5} />
              <InputDate control={control} name={'Fecha de Solicitud'} label={'requestDate'} required={true} error={errors.requestDate} minDate={requestMinDate} />
            </Grid>
          </Grid>
        </GridInput>
      </Grid>

      <ButtonSave buttonTitle={buttonTitle} errorTitle={'Error al Guardar'} isLoading={isLoading} errorsForm={errorsForm} />
    </GridForm>
  )
}
