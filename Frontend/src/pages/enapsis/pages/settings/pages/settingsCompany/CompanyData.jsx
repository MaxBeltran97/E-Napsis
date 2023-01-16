import { selectRegiones } from '@assets/select-regiones'
import { ButtonSave } from '@components/button'
import { DialogAreYouSure } from '@components/dialog'
import { GridInput } from '@components/grid'
import { InputText, InputTextArea } from '@components/input/generic'
import { InputRegion, InputRut } from '@components/input/specific'
import { useSettingStore } from '@hooks/useSettingStore'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const CompanyData = () => {

  const { companyData, startGetCompanyData, startUpdateCompanyData } = useSettingStore()

  const { handleSubmit, setValue, getValues, formState: { errors }, control } = useForm()

  const [openPopup, setOpenPopup] = useState(false)
  const [newCompanyData, setNewCompanyData] = useState(null)

  useEffect(() => {
    startGetCompanyData()
  }, [])

  useEffect(() => {
    Object.entries(companyData).forEach(([key, value]) => {
      setValue(key, value)
    })
  }, [companyData])

  const onSubmit = (data) => {
    event.preventDefault()

    setNewCompanyData(data)
    handleOpenPopup()
  }

  const handleOpenPopup = () => {
    setOpenPopup(true)
  }
  const handleClosePopup = () => {
    setOpenPopup(false)
  }
  const onUpdateCompanyData = async() => {
    const ok = await startUpdateCompanyData(newCompanyData)
    return ok
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={7}>
            <GridInput>
              <InputTextArea control={control} name={'Presentación de la Empresa'} subName={'(se visualiza en el PDF de la propuesta de cursos)'} label={'presentation'} error={errors.presentation} />
              <InputText control={control} name={'Nombre Representante Legal'} label={'legalRepresentativeName'} error={errors.legalRepresentativeName} direction={'row'} />
              <InputRut control={control} nameInput={'RUT Representante Legal'} label={'legalRepresentativeRut'} error={errors.legalRepresentativeRut} direction={'row'} />
              <InputText control={control} name={'Dirección'} subName={'(se visualiza en el PDF de la propuesta de cursos)'} label={'address'} error={errors.address} direction={'row'} />
              <InputText control={control} name={'Ciudad Empresa'} subName={'(se visualiza en las DJ)'} label={'city'} error={errors.city} direction={'row'} />
              <InputRegion control={control} name={'Región Empresa'} subName={'(se visualiza en las DJ)'} label={'region'} error={errors.region} getValues={getValues} setValue={setValue} items={selectRegiones} labelComuna={null} direction={'row'} />
              <InputText control={control} name={'Fono Empresa'} subName={'(se visualiza en el PDF de la propuesta de cursos)'} label={'phone'} error={errors.phone} direction={'row'} />
              <InputText control={control} name={'Facebook'} subName={'(se visualiza en el PDF de la propuesta de cursos)'} label={'facebook'} error={errors.facebook} direction={'row'} />
              <InputText control={control} name={'Twitter'} subName={'(se visualiza en el PDF de la propuesta de cursos)'} label={'twitter'} error={errors.twitter} direction={'row'} />
              <InputText control={control} name={'LinkedIn'} subName={'(se visualiza en el PDF de la propuesta de cursos)'} label={'linkedin'} error={errors.linkedin} direction={'row'} />
              <Typography sx={{ pt: 1 }}>Slogan (se visualiza en el PDF de la propuesta de cursos)</Typography>
              <InputText control={control} name={'Línea 1'} label={'sloganLine1'} error={errors.sloganLine1} direction={'row'} />
              <InputText control={control} name={'Línea 2'} label={'sloganLine2'} error={errors.sloganLine2} direction={'row'} />
              <InputText control={control} name={'Encabezado para Credencial'} subName={'(que debe decir el encabezado de la credencial)'} label={'headerBadge'} error={errors.headerBadge} direction={'row'} />
            </GridInput>
          </Grid>

          <ButtonSave buttonTitle={'Actualizar Datos de la Empresa'} errorTitle={'Error al Actualizar'} isLoading={false} errorsForm={false} />
        </Grid>
      </form>

      <DialogAreYouSure 
        open={openPopup}
        handleClose={handleClosePopup}
        title={'Actualizar Datos de la Empresa'}
        message={'¿Estás seguro de actualizar los datos de la empresa?'}
        okMessage={'Se actualizó correctamente'}
        errorMessage={'Ocurrió un error al actualizar los datos'}
        functionFromData={onUpdateCompanyData}
      />
    </>
  )
}
