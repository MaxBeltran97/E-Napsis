import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"

import { FileDownloadOutlined } from "@mui/icons-material"
import { Button, Grid } from "@mui/material"
import { GridForm, GridInput } from "@components/grid"
import { InputAutocomplete, InputAutocompleteAsync, InputFile, InputText } from "@components/input/generic"
import { ButtonSave } from "@components/button"

import { useCompanyStore } from "@hooks/useCompanyStore"
import { getCalendarCoursesWithAutocomplete, getCompaniesWithAutocomplete } from "@pages/enapsis/helpers"
import { InputFilesView } from "@components/input/specific"
import { useCalendarCourseStore } from "@hooks/useCalendarCourseStore"
import { useParticipantStore } from "@hooks/useParticipantStore"

// import formatoExcelParticipantes from "@assets/formato_importar_participantes.xls"

export const ImportParticipantsPage = () => {
  const { companies, startGetCompanies } = useCompanyStore()
  const { calendarCourses, startGetCalendarCourses } = useCalendarCourseStore()
  const { startSavingParticipantFile } = useParticipantStore()

  const { handleSubmit, formState: { errors }, control} = useForm()

  const downloadFileRef = useRef()

  useEffect(() => {
    startGetCalendarCourses()
    startGetCompanies()
  }, [])

  return (
    <GridForm handleSubmit={handleSubmit} formTitle={'Importar Masiva de Participantes'} functionFromData={startSavingParticipantFile}>
      <Grid item xs={12}>
        <GridInput title={'Importar Participantes'}>
          <Grid container>
            <Grid item xs={12} lg={8}>
              {/* <InputAutocompleteAsync control={control} name={'Empresa'} label={'company_id'} required={true} error={errors.company_id} entities={companies} startGetEntities={startGetCompanies} getFormattedEntities={getCompaniesWithAutocomplete} loading={isLoading} /> */}
              <InputAutocomplete control={control} name={'Empresa'} label={'company_id'} required={true} error={errors.company_id} items={getCompaniesWithAutocomplete(companies)} />
              {/* <InputAutocompleteAsync control={control} name={'Curso Calendarizado'} label={'calendarCourse_id'} required={true} error={errors.calendarCourse_id} entities={calendarCourses} startGetEntities={startGetCalendarCourses} getFormattedEntities={getCalendarCoursesWithAutocomplete} loading={isLoadingCalendar} /> */}
              <InputAutocomplete control={control} name={'Curso Calendarizado'} label={'calendarCourse_id'} required={true} error={errors.calendarCourse_id} items={getCalendarCoursesWithAutocomplete(calendarCourses)} />
            </Grid>
            <Grid item xs={12}>
              <InputFilesView control={control} name={'Excel de Participantes'} label={'excelParticipants'} required={true} error={errors.excelParticipants} helperText={'.xls .xlsx'} textButton={'Subir Archivo'} allowedExtensions={['xls', 'xlsx']} withSize={8.67} />
            </Grid>
            <Grid item xs={12} sx={{ pt: 1 }}>
              <a ref={downloadFileRef} href={'../src/assets/formato_importar_participantes.xlsx'} target='_blank' rel='noopener noreferrer' download={'formato_participantes.xlsx'}></a>
              <Button variant='outlined' onClick={() => downloadFileRef.current.click()} size='small' color='success'>
                <FileDownloadOutlined sx={{ mr: 1 }} fontSize='small' />
                Formato de archivo excel
              </Button>
            </Grid>
          </Grid>

        </GridInput>
      </Grid>

      <ButtonSave buttonTitle={'Validar e Importar'} errorTitle={'Error al Importar'} isLoading={false} errorsForm={false} />
    </GridForm>
  )
}
