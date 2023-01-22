import { ButtonSave } from "@components/button"
import { DialogAreYouSure } from "@components/dialog"
import { GridInput, GridPaper } from "@components/grid"
import { InputText, InputTextArea } from "@components/input/generic"
import { useSettingStore } from "@hooks/useSettingStore"
import { SETTINGS, TEMPLATE_EMAILS } from "@models/privateRoutes"
import { NavigateNext } from "@mui/icons-material"
import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { tagsEmail } from "../assets"

export const TemplateEmailPage = () => {

  const navigate = useNavigate()
  const { activeEmail, startResetEmail, startUpdateEmail } = useSettingStore()

  const { handleSubmit, formState: { errors }, control } = useForm({ defaultValues: activeEmail })

  const [tagsXS, setTagsXS] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  const [newEmail, setNewEmail] = useState(null)

  const routeEmails = () => {
    startResetEmail()
    navigate(`${SETTINGS}${TEMPLATE_EMAILS}`, { replace: true })
  }

  const onSubmit = (data) => {
    event.preventDefault()
    
    setNewEmail(data)
    handleOpenPopup()
  }

  const handleOpenPopup = () => {
    setOpenPopup(true)
  }
  const handleClosePopup = () => {
    setOpenPopup(false)
  }
  const onUpdateEmail = async() => {
    const ok = await startUpdateEmail(newEmail)
    return ok
  }

  useEffect(() => {
    setTagsXS('')

    let tagsArray = []
    tagsEmail.map((tag) => {
      tagsArray.push(tag.value)
      return tag
    })
    
    const tagsString = tagsArray.toString().replaceAll(',', ', ')
    setTagsXS(tagsString)
  }, [])

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
        <Paper elevation={2}
          sx={{
            mt: 2,
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2
          }}
        >
          <Grid container columnSpacing={2} rowSpacing={2} direction={'row-reverse'}>

            <Grid item lg={5}
              sx={{ display: { xs:'none', lg: 'block' } }}
            >
              <Typography sx={{ textAlign: 'center' }}>TAG DISPONIBLES</Typography>
              <br />
              {
                tagsEmail.map((tag) => (
                  <Typography key={tag.value} sx={{ textAlign: 'center' }}>{tag.value}</Typography>
                ))
              }
            </Grid>

            <Grid item xs={12}
              sx={{ display: { xs: 'block', lg: 'none' } }}
            >
              <Typography sx={{ pl: 2, pr: 2 }}>TAG DISPONIBLES:</Typography>
              <br />
              <Typography sx={{ pl: 2, pr: 2 }}>{tagsXS}</Typography>
            </Grid>

            <Grid item xs={12} lg={7}>
              <GridInput>
                <InputText control={control} name={'Asunto'} label={'subject'} required={true} error={errors.subject} />
                <InputTextArea control={control} name={'Cuerpo'} label={'content'} error={errors.content} minRows={15} />
              </GridInput>
            </Grid>

            <ButtonSave buttonTitle={'Guardar Email'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />
          </Grid>
        </Paper>
      </form>

      <DialogAreYouSure 
        open={openPopup}
        handleClose={handleClosePopup}
        title={'Guardar Correo'}
        message={'¿Estás seguro de guardar este correo?'}
        okMessage={'Correo guardado correctamente'}
        errorMessage={'Ocurrió un error al guardar el correo'}
        functionFromData={onUpdateEmail}
      />
    </>
  )
}
