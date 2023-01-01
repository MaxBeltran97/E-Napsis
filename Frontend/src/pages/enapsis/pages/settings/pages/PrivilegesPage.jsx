import { selectRoles } from "@assets/select-data"
import { ButtonSave } from "@components/button"
import { GridForm, GridInput } from "@components/grid"
import { InputCheckbox, InputSelect } from "@components/input/generic"
import { Divider, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"

export const PrivilegesPage = () => {

  const { handleSubmit, formState: {errors}, control } = useForm()
  const role = useWatch({ control, name: 'role'})

  const [errorsForm, setErrorsForm] = useState(false)

  useEffect(() => {
    if(Object.values(errors).length === 0) {
      setErrorsForm(false)
    } else {
      setErrorsForm(true)
    }
  }, [Object.values(errors).length])

  const onSubmit = (data) => {
    console.log(data)
  }
  
  return (
    <>
      <GridForm handleSubmit={handleSubmit} formTitle={'Gestión de Privilegios'} functionFromData={onSubmit}>
        <Grid item xs={12} lg={6}>
          <GridInput>
            <InputSelect control={control} name={'Clasificación'} label={'role'} required={true} error={errors.role} items={selectRoles}  />    
          </GridInput>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {
          (role === 'admin' || role === 'coordinator' || role === '' || role === undefined)
          ? (
            <>
              <Grid item xs={12} lg={6}>
                <Typography sx={{ pl: 1, fontSize: 18 }}>Empresas</Typography>
                <Grid container direction={'column'} sx={{ pl: 3 }}>
                  <InputCheckbox control={control} name={'Agregar'} label={'addCompany'} />
                  <InputCheckbox control={control} name={'Mostrar'} label={'showCompany'} />
                  <InputCheckbox control={control} name={'Modificar'} label={'modifyCompany'} />
                  <InputCheckbox control={control} name={'Eliminar'} label={'deleteCompany'} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </>
          )
          : null
        }
        {
          (role === 'admin' || role === 'coordinator' || role === '' || role === undefined)
          ? (
            <>
              <Grid item xs={12} lg={6}>
                <Typography sx={{ pl: 1, fontSize: 18 }}>Cursos</Typography>
                <Grid container direction={'column'} sx={{ pl: 3 }}>
                  <InputCheckbox control={control} name={'Agregar'} label={'addCourse'} />
                  <InputCheckbox control={control} name={'Mostrar'} label={'showCourse'} />
                  <InputCheckbox control={control} name={'Modificar'} label={'modifyCourse'} />
                  <InputCheckbox control={control} name={'Eliminar'} label={'deleteCourse'} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </>
          )
          : null
        }
        {
          (role === 'admin' || role === 'coordinator' || role === '' || role === undefined)
          ? (
            <>
              <Grid item xs={12} lg={6}>
                <Typography sx={{ pl: 1, fontSize: 18 }}>Participantes</Typography>
                <Grid container direction={'column'} sx={{ pl: 3 }}>
                  <InputCheckbox control={control} name={'Agregar'} label={'addParticipant'} />
                  <InputCheckbox control={control} name={'Mostrar'} label={'showParticipant'} />
                  <InputCheckbox control={control} name={'Modificar'} label={'modifyParticipant'} />
                  <InputCheckbox control={control} name={'Eliminar'} label={'deleteParticipant'} />
                  <InputCheckbox control={control} name={'Importar'} label={'importParticipant'} />
                  <InputCheckbox control={control} name={'Enviar Clave'} label={'sendKeyParticipant'} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </>
          )
          : null
        }
        {
          (role === 'admin' || role === 'coordinator' || role === 'teller' || role === '' || role === undefined)
          ? (
            <>
              <Grid item xs={12} lg={6}>
                <Typography sx={{ pl: 1, fontSize: 18 }}>Libro de Clases</Typography>
                <Grid container direction={'column'} sx={{ pl: 3 }}>
                  <InputCheckbox control={control} name={'Ver Libro'} label={'showClassBooks'} />
                  <InputCheckbox control={control} name={'Ingresar y ver Asistencia'} label={'attendanceClassBooks'} />
                  <InputCheckbox control={control} name={'Ingresar y ver Evaluaciones'} label={'evaluationsClassBooks'} />
                  <InputCheckbox control={control} name={'Reporte Final'} label={'finalReportClassBooks'} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </>
          )
          : null
        }
        {
          (role === 'admin' || role === 'coordinator' || role === '' || role === undefined)
          ? (
            <>
              <Grid item xs={12} lg={6}>
                <Typography sx={{ pl: 1, fontSize: 18 }}>Relator</Typography>
                <Grid container direction={'column'} sx={{ pl: 3 }}>
                  <InputCheckbox control={control} name={'Agregar'} label={'addTeller'} />
                  <InputCheckbox control={control} name={'Mostrar'} label={'showTeller'} />
                  <InputCheckbox control={control} name={'Modificar'} label={'modifyTeller'} />
                  <InputCheckbox control={control} name={'Eliminar'} label={'deleteTeller'} />
                  <InputCheckbox control={control} name={'Subir y ver Documentos'} label={'documentsTeller'} />
                  <InputCheckbox control={control} name={'Enviar Clave'} label={'sendKeyTeller'} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </>
          )
          : null
        }
        {
          (role === 'admin' || role === 'coordinator' || role === '' || role === undefined)
          ? (
            <>
              <Grid item xs={12} lg={6}>
                <Typography sx={{ pl: 1, fontSize: 18 }}>Calendario de Cursos</Typography>
                <Grid container direction={'column'} sx={{ pl: 3 }}>
                  <InputCheckbox control={control} name={'Agregar'} label={'addCourseCalendar'} />
                  <InputCheckbox control={control} name={'Mostrar'} label={'showCourseCalendar'} />
                  <InputCheckbox control={control} name={'Modificar'} label={'modifyCourseCalendar'} />
                  <InputCheckbox control={control} name={'Eliminar'} label={'deleteCourseCalendar'} />
                  <InputCheckbox control={control} name={'Fechas de Clases'} label={'classDatesCourseCalendar'} />
                  <InputCheckbox control={control} name={'Check-List'} label={'chekListCourseCalendar'} />
                  <InputCheckbox control={control} name={'Agregar Participantes al Curso'} label={'addParticipantsCourseCalendar'} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </>
          )
          : null
        }

        <ButtonSave buttonTitle={'Guardar Privilegios'} errorTitle={'Error la Guardar'} isLoading={false} errorsForm={errorsForm} />
      </GridForm>
    </>
  )
}
