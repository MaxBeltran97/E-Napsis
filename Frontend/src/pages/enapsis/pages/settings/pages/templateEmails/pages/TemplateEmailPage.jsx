import { ButtonSave } from "@components/button"
import { GridInput, GridPaper } from "@components/grid"
import { InputText } from "@components/input/generic"
import { useSettingStore } from "@hooks/useSettingStore"
import { SETTINGS, TEMPLATE_EMAILS } from "@models/privateRoutes"
import { NavigateNext } from "@mui/icons-material"
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export const TemplateEmailPage = () => {

  const navigate = useNavigate()
  const { activeEmail, startResetEmail } = useSettingStore()

  const { handleSubmit, formState: { errors }, control } = useForm({defaultValues: activeEmail})

  const routeEmails = () => {
    startResetEmail()
    navigate(`${SETTINGS}${TEMPLATE_EMAILS}`, {replace: true})
  }

  const onSubmit = (data) => {
    event.preventDefault()
    console.log(data)
  }

  return (
    <>
      <Breadcrumbs 
        separator={<NavigateNext />}
        sx={{ mt: 1, ml: 2 }}
      >
        <Link underline="hover" color="inherit" onClick={routeEmails}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography variant="h5">Gestión de Correos</Typography>
        </Link>
        <Typography variant="h5" color={'text.primary'} sx={{ userSelect: 'none' }}>{activeEmail.title}</Typography>
      </Breadcrumbs>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridPaper>
          <Grid item xs={12} lg={6}>
            <GridInput>
              <InputText control={control} name={'Asunto'} label={'subject'} required={true} error={errors.subject} />
            </GridInput>
          </Grid>

          <ButtonSave buttonTitle={'Guardar Email'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />
        </GridPaper>
      </form>
    </>
  )
}
