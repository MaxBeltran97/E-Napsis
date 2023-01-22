import enapsisApi from "@api/enapsisApi"
import { ButtonSave } from "@components/button"
import { GridInput, GridPaper } from "@components/grid"
import { InputText, InputTextArea } from "@components/input/generic"
import { useSettingStore } from "@hooks/useSettingStore"
import { SETTINGS, TEMPLATE_CONTRACTS } from "@models/privateRoutes"
import { NavigateNext } from "@mui/icons-material"
import { Breadcrumbs, Button, Grid, Link, Paper, Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { tagsContract } from "../assets"
import { getEnvVariables } from "@helpers"
import { InputFirma } from "../components/InputFirma"
import { DialogAreYouSure } from "@components/dialog"

export const TemplateContractPage = () => {

  const navigate = useNavigate()

  const { activeContract, startResetContract, startUpdateContract } = useSettingStore()

  const { handleSubmit, formState: { errors }, control } = useForm({ defaultValues: activeContract })


  const [tagsXS, setTagsXS] = useState('')
  const [openPopup, setOpenPopup] = useState(false)
  const [newContract, setNewContract] = useState(null)

  const routeContracts = () => {
    startResetContract()
    navigate(`${SETTINGS}${TEMPLATE_CONTRACTS}`, { replace: true })
  }

  const onSubmit = (data) => {
    event.preventDefault()
    
    setNewContract(data)
    handleOpenPopup()
  }

  const handleOpenPopup = () => {
    setOpenPopup(true)
  }
  const handleClosePopup = () => {
    setOpenPopup(false)
  }
  const onUpdateContract = async() => {
    const ok = await startUpdateContract(newContract)
    return ok
  }

  useEffect(() => {
    setTagsXS('')

    let tagsArray = []
    tagsContract.map((tag) => {
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
        <Link underline="hover" color="inherit" onClick={routeContracts}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography variant="h5">Gestión de Contratos</Typography>
        </Link>
        <Typography variant="h5" color={'text.primary'} sx={{ userSelect: 'none' }}>{activeContract.title}</Typography>
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

            <Grid item lg={4}
              sx={{ display: { xs: 'none', lg: 'block' } }}
            >
              <Typography sx={{ textAlign: 'center' }}>TAG DISPONIBLES</Typography>
              <br />
              {
                tagsContract.map((tag) => (
                  <Typography key={tag.value} sx={{ textAlign: 'center' }}>{tag.value}</Typography>
                ))
              }
            </Grid>

            <Grid item xs={12}
              sx={{ display: { xs: 'block', lg: 'none'} }}
            >
              <Typography sx={{ pl: 2, pr: 2 }}>TAG DISPONIBLES:</Typography>
              <br />
              <Typography sx={{ pl: 2, pr: 2 }}>{tagsXS}</Typography>
            </Grid>

            <Grid item xs={12} lg={8}>
              <GridInput>
                <InputText control={control} name={'Titulo'} label={'title'} required={true} error={errors.title} />
                <InputTextArea control={control} name={'Encabezado'} label={'header'} error={errors.header} />
                <InputTextArea control={control} name={'Descripción'} label={'content'} error={errors.content} minRows={25} />
                {/* firma imagen*/}

                {/* <img src={`${VITE_API_URL}/templates/contract/get_image/${activeContract._id}`} /> */}
                <InputFirma control={control} name={'Firma Representante'} label={'representativeSignature'} error={errors.representativeSignature} helperText={'.jpg, .png'} allowedExtensions={['jpg', 'png']} contract={activeContract} />
              </GridInput>
            </Grid>

            <ButtonSave buttonTitle={'Guardar Contrato'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />
          </Grid>
        </Paper>
      </form>

      <DialogAreYouSure 
        open={openPopup}
        handleClose={handleClosePopup}
        title={'Guardar Contrato'}
        message={'¿Estás seguro de guardar este contrato?'}
        okMessage={'Contrato guardado correctamente'}
        errorMessage={'Ocurrió un error al guardar el contrato'}
        functionFromData={onUpdateContract}
      />
    </>
  )
}
