import { Filter } from '@components/accordion'
import { InputAutocomplete, InputText } from '@components/input/generic'
import { InputRut } from '@components/input/specific'
import { useCompanyStore } from '@hooks/useCompanyStore'
import { useParticipantStore } from '@hooks/useParticipantStore'
import { Button, Grid } from '@mui/material'
import { getCompaniesWithAutocomplete } from '@pages/enapsis/helpers'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const ParticipantFilter = ({ title }) => {

  const { companies, startGetCompanies } = useCompanyStore()
  const { filterParticipants } = useParticipantStore()
  const { handleSubmit, control } = useForm()

  useEffect(() => {
    startGetCompanies()
  }, [])

  const onSubmit = (data) => {
    event.preventDefault()
    filterParticipants(data)
  }

  return (
    <Grid item xs={12} sx={{ mt: 2 }}>
      <Filter title={title}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12} lg={6} >
              <InputText control={control} name={'Nombre'} label={'name'} />
              <InputRut control={control} label={'rut'} dni={true} filter={true} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <InputAutocomplete control={control} name={'Empresa'} label={'companies_id'} items={getCompaniesWithAutocomplete(companies, true)} multiple={true} />
            </Grid>
            <Grid container justifyContent={'center'} sx={{ mt: 3 }}>
              <Button type="submit"
                variant="outlined"
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
