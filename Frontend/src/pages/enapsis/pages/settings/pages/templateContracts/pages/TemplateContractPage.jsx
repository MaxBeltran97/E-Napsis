import { ButtonSave } from "@components/button"
import { GridInput, GridPaper } from "@components/grid"
import { InputText } from "@components/input/generic"
import { useSettingStore } from "@hooks/useSettingStore"
import { SETTINGS, TEMPLATE_CONTRACTS } from "@models/privateRoutes"
import { NavigateNext } from "@mui/icons-material"
import { Breadcrumbs, Button, Grid, Link, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

export const TemplateContractPage = () => {

  const navigate = useNavigate()
  const { activeContract, startResetContract } = useSettingStore()

  const { handleSubmit, formState: {errors}, control } = useForm({defaultValues: activeContract})

  const routeContracts = () => {
    startResetContract()
    navigate(`${SETTINGS}${TEMPLATE_CONTRACTS}`, {replace: true})
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
        <Link underline="hover" color="inherit" onClick={routeContracts}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Typography variant="h5">Gestión de Contratos</Typography>
        </Link>
        <Typography variant="h5" color={'text.primary'} sx={{ userSelect: 'none'}}>{activeContract.title}</Typography>
      </Breadcrumbs>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridPaper>
          <Grid item xs={12} lg={8}>
            <GridInput>
              <InputText control={control} name={'Titulo'} label={'title'} required={true} error={errors.title} />
            </GridInput>
          </Grid>

          <ButtonSave buttonTitle={'Guardar Contrato'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />
        </GridPaper>
      </form>
    </>
  )
}
