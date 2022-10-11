import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"

import { FileDownloadOutlined } from "@mui/icons-material"
import { Button, Grid } from "@mui/material"
import { GridForm, GridInput } from "@components/grid"
import { InputAutocomplete, InputAutocompleteAsync, InputFile, InputText } from "@components/input/generic"
import { ButtonSave } from "@components/button"

import { useCompanyStore } from "@hooks/useCompanyStore"
import { getCompaniesWithAutocomplete } from "@pages/enapsis/helpers"

// import formatoExcelParticipantes from "@assets/formato_importar_participantes.xls"

export const ImportParticipantsPage = () => {
  const { handleSubmit, formState: { errors }, control} = useForm()
  const { companies, startGetCompanies, isLoading } = useCompanyStore()

  const downloadFileRef = useRef()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <GridForm handleSubmit={handleSubmit} formTitle={'Importar Masiva de Participantes'} functionFromData={onSubmit}>
      <Grid item xs={12} lg={8} xl={7}>
        <GridInput title={'Importar Participantes'}>
          <InputAutocompleteAsync control={control} name={'Empresa'} label={'company_id'} required={true} error={errors.company_id} entities={companies} startGetEntities={startGetCompanies} getFormattedEntities={getCompaniesWithAutocomplete} loading={isLoading} />
          <InputText control={control} name={'Curso Calendarizado'} label={'courseCode'} error={errors.courseCode} />
          <InputFile control={control} name={'Excel de Participantes'} label={'excelParticipants'} required={true} error={errors.excelParticipants} textButton={'Subir Archivos'} allowedExtensions={['xls', 'xlsx']} />

          <Grid item sx={{ pt: 1 }}>
            <a ref={downloadFileRef} href={'../src/assets/formato_importar_participantes.xls'} target='_blank' rel='noopener noreferrer' download={'formato_participantes.xls'}></a>
            <Button variant='outlined' onClick={() => downloadFileRef.current.click()} size='small' color='success'>
              <FileDownloadOutlined sx={{ mr: 1 }} fontSize='small' />
              Formato de archivo excel
            </Button>
          </Grid>
        </GridInput>
      </Grid>

      <ButtonSave buttonTitle={'Validar e Importar'} errorTitle={'Error al Importar'} isLoading={false} errorsForm={false} />
    </GridForm>
  )
}
