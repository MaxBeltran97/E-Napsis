import { ButtonSave } from "@components/button"
import { DialogAreYouSure } from "@components/dialog"
import { GridPaper } from "@components/grid"
import { SkeletonListItemV2 } from "@components/skeleton"
import { useSettingStore } from "@hooks/useSettingStore"
import { Divider, Grid, Typography } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { AutomaticNoticeItem } from "../components/automaticNoticeComponents"

export const AutomaticNoticesPage = () => {

  const { isNoticesLoading, notices, startGetNotices, startUpdateNotices } = useSettingStore()

  const { handleSubmit, setValue, formState: {errors}, control } = useForm({defaultValues: {
    noticesFields: []
  }})

  const [openPopup, setOpenPopup] = useState(false)
  const [newNotices, setNewNotices] = useState(null)

  const { fields } = useFieldArray({
    control,
    name: 'noticesFields'
  })

  useEffect(() => {
    startGetNotices()
  }, [])

  useEffect(() => {
    if(!isNoticesLoading) {
      setValue('noticesFields', notices)
    }
  }, [isNoticesLoading])

  const onSubmit = (data) => {
    event.preventDefault()

    setNewNotices(data)
    handleOpenPopup()
  }

  const handleOpenPopup = () => {
    setOpenPopup(true)
  }
  const handleClosePopup = () => {
    setOpenPopup(false)
  }
  const onUpdateNotices = async() => {
    const ok = await startUpdateNotices(newNotices)
    return ok
  }

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Configuraciones de Avisos Automáticos</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridPaper rowSpacing={1}>
          <Grid item xs={12}>
            <Grid container alignItems={'center'} columnSpacing={1}>
              <Grid item xs={3}>
                <Typography sx={{ textAlign: 'center', userSelect: 'none', pt: 1, pb: 1 }}>Item</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Dias</Typography>
              </Grid>
              <Grid item xs={3.5}>
                <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Email</Typography>
              </Grid>
              <Grid item xs={4.5}>
                <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>Detalle</Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <Divider />
            </Grid>
          </Grid>

          {
            isNoticesLoading
              ? <SkeletonListItemV2 />
              : (
                fields.map((item, index) => (
                  <AutomaticNoticeItem key={index} notice={item} index={index} control={control} error={errors.noticesFields} />
                ))
              )
          }

          <Grid item>
            <Typography sx={{ pl: 1, userSelect: 'none' }}>NOTA: En el campo EMAIL puedes registrar más de un correo de aviso, debes separar los emails con coma</Typography>
          </Grid>

          <ButtonSave buttonTitle={'Actualizar'} errorTitle={'Error al Actualizar'} isLoading={false} errorsForm={false} />
        </GridPaper>
      </form>

      <DialogAreYouSure 
        open={openPopup}
        handleClose={handleClosePopup}
        title={'Actualizar Avisos Automáticos'}
        message={'¿Estás seguro de actualizar los avisos automáticos?'}
        okMessage={'Se actualizó correctamente'}
        errorMessage={'Ocurrió un error al actualizar los avisos'}
        functionFromData={onUpdateNotices}
      />
    </>
  )
}
