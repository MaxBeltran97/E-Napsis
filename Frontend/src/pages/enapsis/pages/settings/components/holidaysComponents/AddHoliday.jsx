import { ButtonSave } from '@components/button'
import { GridInput, GridPaper } from '@components/grid'
import { InputDate, InputText } from '@components/input/generic'
import { useSettingStore } from '@hooks/useSettingStore'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { ButtonsChangeHoliday } from '.'

export const AddHoliday = () => {

  const { activeHoliday, startSavingHoliday } = useSettingStore()

  const { handleSubmit, setValue, clearErrors, formState: { errors }, control } = useForm({defaultValues: {
    _id: null,
    name: '',
    date: null
  }})
  useWatch({ control, name: '_id' })
  useWatch({ control, name: 'name' })
  useWatch({ control, name: 'date' })

  const [isModifying, setIsModifying] = useState(false)
  const [formTitle, setFormTitle] = useState('Registrar Feriado')

  useEffect(() => {
    if(Object.entries(activeHoliday).length !== 0) {
      clearErrors()
      setValue('_id', activeHoliday._id)
      setValue('name', activeHoliday.name)
      setValue('date', activeHoliday.date)

      setFormTitle('Modificar Feriado')
      setIsModifying(true)
    }
  }, [activeHoliday])

  const onResetForm = () => {
    clearErrors()
    setValue('_id', null)
    setValue('name', '')
    setValue('date', null)

    setFormTitle('Registrar Feriado')
    setIsModifying(false)
  }

  const onSubmit = (data) => {
    event.preventDefault()
    startSavingHoliday(data)
    onResetForm()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridPaper>
        <Grid item xs={12}>
          <GridInput title={formTitle}>
            <Grid container columnSpacing={4} rowSpacing={0}>
              <Grid item xs={12} lg={6}>
                <InputDate control={control} name={'Fecha'} label={'date'} required={true} error={errors.date} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputText control={control} name={'Nombre'} label={'name'} />
              </Grid>
            </Grid>
          </GridInput>
        </Grid>

        {
          (isModifying)
            ? <ButtonsChangeHoliday buttonTitle={'Modificar Feriado'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} onResetForm={onResetForm} />
            : <ButtonSave buttonTitle={'Guardar Feriado'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />
        }
      </GridPaper>
    </form>
  )
}
