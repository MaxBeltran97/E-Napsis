import { ButtonSave, ButtonsChangeSave } from "@components/button"
import { GridInput } from "@components/grid"
import { InputText } from "@components/input/generic"
import { getEnvVariables } from "@helpers/getEnvVariables"
import { useSettingCompanyStore } from "@hooks/useSettingCompanyStore"
import { Grid } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { InputLogo } from "./components"

export const AddLogo = () => {
  
  const { VITE_API_URL } = getEnvVariables()
  const { activeLogo, startSavingLogo } = useSettingCompanyStore()

  const [logoActual, setLogoActual] = useState('')

  const { handleSubmit, setValue, clearErrors, formState: { errors }, control } = useForm({defaultValues: {
    _id: null,
    title: '',
    code: '',
    logo_img: ''
  }})
  useWatch({ control, name: '_id'})
  useWatch({ control, name: 'title'})
  useWatch({ control, name: 'code'})
  useWatch({ control, name: 'logo_img'})

  const [isModifying, setIsModifying] = useState(false)
  const [formTitle, setFormTitle] = useState('Registrar Logo')
  const [nameLogo, setNameLogo] = useState('logo')

  useEffect(() => {
    if(Object.entries(activeLogo).length !== 0) {
      clearErrors()
      setValue('_id', activeLogo._id)
      setValue('title', activeLogo.title)
      setValue('code', activeLogo.code)
      setValue('logo_img', activeLogo.logo_img)

      setLogoActual(activeLogo.logo_img)
  
      setFormTitle('Modificar Logo')
      setNameLogo('Logo Nuevo')
      setIsModifying(true)
    }
  }, [activeLogo])

  const onResetForm = () => {
    clearErrors()
    setValue('_id', null)
    setValue('title', '')
    setValue('code', '')
    setValue('logo_img', '')

    setFormTitle('Registrar Logo')
    setNameLogo('Logo')
    setIsModifying(false)
  }

  const onSubmit = (data) => {
    event.preventDefault()
    startSavingLogo(data)
    onResetForm()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <GridInput title={formTitle}>
            <Grid container columnSpacing={4} rowSpacing={0}>
              <Grid item xs={12} lg={6}>
                <InputText control={control} name={'Título'} label={'title'} required={true} error={errors.title} />
                <InputText control={control} name={'Codigo'} label={'code'} required={true} error={errors.code} />
              </Grid>
              <Grid item xs={12} lg={6}>
                {
                  (isModifying)
                    ? <img src={`${VITE_API_URL}/logos/get_image/${logoActual}`} width={110} />
                    : null
                }
                <InputLogo control={control} name={nameLogo} label={'logo_img'} error={errors.logo_img} helperText={'.jpg, .png'} allowedExtensions={['jpg', 'png']} logo={activeLogo} />
              </Grid>
            </Grid>
          </GridInput>
        </Grid>

        {
          (isModifying)
            ? <ButtonsChangeSave buttonTitle={'Modificar Logo'} errorTitle={'Error al Modificar'} isLoading={false} errorsForm={false} onResetForm={onResetForm} />
            : <ButtonSave buttonTitle={'Guardar Logo'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />  
        }
      </Grid>
    </form>
  )
}
