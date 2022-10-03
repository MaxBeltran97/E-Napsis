import { ButtonSave } from "@components/button"
import { GridForm, GridInput } from "@components/grid"
import { InputFile, InputText } from "@components/input/generic"
import { FileDownloadOutlined } from "@mui/icons-material"
import { Button, Grid } from "@mui/material"
import { useForm } from "react-hook-form"

export const ImportParticipantsPage = () => {
  const { handleSubmit, formState: { errors }, control} = useForm()

  return (
    <GridForm handleSubmit={handleSubmit} formTitle={'Importar Masiva de Participantes'}>
      <Grid item xs={12} lg={8}>
        <GridInput title={'Importar Participantes'}>
          <InputText control={control} name={'Empresa'} label={'company'} error={errors.company} />
          <InputText control={control} name={'Contacto de Empresa'} label={'companyContact'} error={errors.companyContact} />
          <InputText control={control} name={'Curso'} label={'course'} error={errors.course} />
          <InputFile control={control} name={'Excel de Participantes'} label={'excelParticipants'} required={true} error={errors.excelParticipants} textButton={'Subir Archivos'} allowedExtensions={['xls', 'xlsx']} />

          <Grid item sx={{ pt: 1 }}>
            <Button variant='outlined' size='small' color='success'>
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
