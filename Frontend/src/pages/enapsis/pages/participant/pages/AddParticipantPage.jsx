import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"

import { Grid } from "@mui/material"
import { GridForm, GridInput } from "@components/grid"
import { InputAutocomplete, InputRadio, InputText } from "@components/input/generic"
import { InputEmail, InputRut } from "@components/input/specific"
import { ButtonSave } from "@components/button"

import { radioGenderType, radioNationalityType, radioParticipantType } from "@assets/radio-data"
import { InputCondition } from "@components/input/InputCondition"

import { useCompanyStore } from "@hooks/useCompanyStore"
import { useParticipantStore } from "@hooks/useParticipantStore"
import { getCompaniesWithAutocomplete } from "@pages/enapsis/helpers"

export const AddParticipantPage = () => {
  const { handleSubmit, unregister, formState: {errors}, control } = useForm()
  const { companies, startGetCompanies } = useCompanyStore()
  const { isLoading, startSavingParticipant } = useParticipantStore()
  const pType = useWatch({ control, name: 'participantType' })

  useEffect(() => {
    startGetCompanies()
  }, [])

  return (
    <GridForm handleSubmit={handleSubmit} formTitle={'Registro de Participante'} functionFromData={startSavingParticipant}>
      <Grid item xs={12}>
        <GridInput title={'Datos Personales'}>
          <Grid container columnSpacing={4} rowSpacing={0}>
            <Grid item xs={12} lg={6}>
              {/* Calendario Cursos con filtrado */}
              <InputText control={control} name={'Calendario de Cursos'} label={'courseCode'} required={true} error={errors.courseCode} />
              <InputRadio control={control} name={'Tipo Participante'} label={'participantType'} items={radioParticipantType} />

              <InputCondition value={pType} valuesConditions={[radioParticipantType[1].value]} unregister={unregister} labelCondition={'company_id'}>
                <InputAutocomplete control={control} name={'Empresa'} label={'company_id'} required={true} error={errors.company_id} items={getCompaniesWithAutocomplete(companies)} />
              </InputCondition>
              
              <InputRadio control={control} name={'Nacionalidad'} label={'nationalityType'} items={radioNationalityType} />
              <InputRut control={control} name={'RUT o Pasaporte'} label={'rut'} required={true} error={errors.rut} />
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

      <ButtonSave buttonTitle={'Guardar Participante'} errorTitle={'Error al Guardar'} isLoading={isLoading} errorsForm={false} />
    </GridForm>
  )
}
