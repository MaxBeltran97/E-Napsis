import { useForm, useWatch } from "react-hook-form"

import { Grid } from "@mui/material"
import { GridForm, GridInput } from "@components/grid"
import { InputCondition } from "@components/input/InputCondition"
import { InputAutocompleteAsync, InputDate, InputNumber, InputRadio, InputText, InputTextArea } from "@components/input/generic"
import { InputCalification, InputNumberAdornment } from "@components/input/specific"
import { ButtonSave } from "@components/button"

import { radioActivityType, radioInstructionModality } from "@assets/radio-data"

import { useCourseStore } from "@hooks/useCourseStore"
import { useTellerStore } from "@hooks/useTellerStore"
import { getTellersWithAutocomplete } from "@pages/enapsis/helpers/getTellersWithAutocomplete"


export const AddCoursePage = () => {
  const { handleSubmit, unregister, formState: { errors }, control } = useForm()
  const { isLoading: isLoadingTeller, tellers, startGetTellers } = useTellerStore()
  const { isLoading, startSavingCourse } = useCourseStore()
  const instructionType = useWatch({ control, name: 'instruction' })

  return (
    <GridForm handleSubmit={handleSubmit} formTitle={'Registro de Curso'} functionFromData={startSavingCourse}>
      <Grid item xs={12} lg={8}>
        <GridInput title={'Datos del Curso'}>
          <InputText control={control} name={'Código Sence / Interno'} label={'sence'} required={true} error={errors.sence} />
          <InputRadio control={control} name={'Modalidad de Instrucción'} label={'instruction'} items={radioInstructionModality} />
          <InputRadio control={control} name={'Tipo de Actividad'} label={'activityType'} items={radioActivityType} />
          <InputText control={control} name={'Nombre de Actividad'} label={'activityName'} required={true} error={errors.activityName} />
          <InputNumberAdornment control={control} name={'Porcentaje de Asistencia'} label={'attendance'} required={true} error={errors.attendance} maxValue={100} placeholder={'50'} adornment={'%'} position={'end'} withSize={3.5} />
          <InputCalification control={control} name={'Nota Minima'} label={'minCalification'} error={errors.minCalification} placeholder={'5,0'} withSize={3.5} />

          <InputCondition value={instructionType} valuesConditions={[radioInstructionModality[1].value, radioInstructionModality[2].value]} unregister={unregister} labelCondition={'minHours'}>
            <InputNumber control={control} name={'Horas Minimas'} label={'minHours'} required={true} error={errors.minHours} withSize={3.5} />
          </InputCondition>

          <InputNumber control={control} name={'N° de Participantes'} label={'participantsNumber'} error={errors.participantsNumber} withSize={3.5} />
          <InputTextArea control={control} name={'Población Objetivo'} label={'targetPopulation'} error={errors.targetPopulation} />
          <InputTextArea control={control} name={'Objetivos Generales'} label={'generalObjectives'} error={errors.generalObjectives} />
          {/* Objetivos E-C-H InputPersonalizado con ArrayField */}
          <InputNumber control={control} name={'Horas Totales'} label={'totalHours'} required={true} error={errors.totalHours} withSize={3.5} />
          <InputAutocompleteAsync control={control} name={'Relatores'} label={'tellers_id'} required={true} error={errors.tellers_id} multiple={true} entities={tellers} startGetEntities={startGetTellers} getFormattedEntities={getTellersWithAutocomplete} loading={isLoadingTeller} />
          <InputTextArea control={control} name={'Método o Técnica de Enseñanza'} label={'teachingTechnique'} error={errors.teachingTechnique} />
          {/* Medios Didacticos relator InputP con ArrayField */}
          {/* Material didoctico participantes InputP con ArrayField */}
          <InputTextArea control={control} name={'Evaluación'} label={'evaluation'} error={errors.evaluation} />
          <InputTextArea control={control} name={'Infraestructura'} label={'infrastructure'} error={errors.infrastructure} />
          {/* Equipamiento InputP con ArrayField */}
          <InputNumberAdornment control={control} name={'Valor Efectivo por Participante'} label={'participantValue'} required={true} error={errors.participantValue} adornment={'$'} position={'start'} withSize={3.5} />
          <InputDate control={control} name={'Fecha de Solicitud'} label={'requestDate'} required={true} error={errors.requestDate} minDate={new Date()} />
        </GridInput>
      </Grid>

      <ButtonSave buttonTitle={'Guardar Curso'} errorTitle={'Error al Guardar'} isLoading={isLoading} errorsForm={false} />
    </GridForm>
  )
}
