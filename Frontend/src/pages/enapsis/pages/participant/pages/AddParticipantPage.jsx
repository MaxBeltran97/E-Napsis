import { useForm, useWatch } from "react-hook-form"

import { Grid } from "@mui/material"
import { GridForm, GridInput } from "@components/grid"
import { InputCondition } from "@components/input/InputCondition"
import { InputAutocomplete, InputAutocompleteAsync, InputRadio, InputText } from "@components/input/generic"
import { InputEmail, InputRut } from "@components/input/specific"
import { ButtonSave } from "@components/button"

import { radioGenderType, radioNationalityType, radioParticipantType } from "@assets/radio-data"

import { useCompanyStore } from "@hooks/useCompanyStore"
import { useCalendarCourseStore } from "@hooks/useCalendarCourseStore"
import { useParticipantStore } from "@hooks/useParticipantStore"
import { getCalendarCoursesWithAutocomplete, getCompaniesWithAutocomplete } from "@pages/enapsis/helpers"
import { useEffect, useState } from "react"

export const AddParticipantPage = () => {
  const { companies, startGetCompanies } = useCompanyStore()
  const { calendarCourses, startGetCalendarCourses } = useCalendarCourseStore()
  const { isLoading, activeParticipant, startSavingParticipant, startResetActiveParticipant } = useParticipantStore()
  
  const { handleSubmit, unregister, formState: {errors}, control } = useForm({defaultValues: activeParticipant})
  const pType = useWatch({ control, name: 'participantType' })
  const nType = useWatch({ control, name: 'nationalityType' })

  const [formTitle, setFormTitle] = useState('Registro de Participante')
  const [buttonTitle, setButtonTitle] = useState('Guardar Participante')

  useEffect(() => {
    if(Object.entries(activeParticipant).length !== 0) {
      setFormTitle('Modificar Participante')
      setButtonTitle('Guardar Cambios')
    }
    startResetActiveParticipant()
  }, [])

  useEffect(() => {
    startGetCalendarCourses()
    startGetCompanies()
  }, [])

  return (
    <GridForm handleSubmit={handleSubmit} formTitle={formTitle} functionFromData={startSavingParticipant}>
      <Grid item xs={12}>
        <GridInput title={'Datos Personales'}>
          <Grid container columnSpacing={4} rowSpacing={0}>
            <Grid item xs={12} lg={6}>
              <InputAutocomplete control={control} name={'Curso Calendarizado'} label={'calendarCourse_id'} required={true} error={errors.calendarCourse_id} items={getCalendarCoursesWithAutocomplete(calendarCourses)} />
              <InputRadio control={control} name={'Tipo Participante'} label={'participantType'} items={radioParticipantType} />

              <InputCondition value={pType} valuesConditions={[radioParticipantType[1].value]} unregister={unregister} labelCondition={'company_id'}>
                <InputAutocomplete control={control} name={'Empresa'} label={'company_id'} required={true} error={errors.company_id} items={getCompaniesWithAutocomplete(companies)} />
              </InputCondition>
              
              <InputRadio control={control} name={'Nacionalidad'} label={'nationalityType'} items={radioNationalityType} />
              <InputRut control={control} label={'rut'} required={true} error={errors.rut} dni={(nType === 'extranjero' ? true : false)} />
              <InputText control={control} name={'Nombres'} label={'fullName'} required={true} error={errors.fullName} />
              <InputText control={control} name={'Apellido Paterno'} label={'lastName'} required={true} error={errors.lastName} />
              <InputText control={control} name={'Apellido Materno'} label={'motherLastName'} error={errors.motherLastName} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <InputText control={control} name={'Establecimiento'} label={'institution'} error={errors.institution} />
              <InputEmail control={control} name={'Email'} label={'email'} required={true} error={errors.email} />
              <InputRadio control={control} name={'Género'} label={'gender'} items={radioGenderType} defaultPos={2} />
              <InputText control={control} name={'Cargo Desempeñado'} label={'position'} error={errors.positio} />
            </Grid>
          </Grid>
        </GridInput>
      </Grid>

      <ButtonSave buttonTitle={buttonTitle} errorTitle={'Error al Guardar'} isLoading={isLoading} errorsForm={false} />
    </GridForm>
  )
}
