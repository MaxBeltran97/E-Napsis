import { AddCircleOutline, DeleteOutline } from "@mui/icons-material"
import { Button, FormHelperText, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { differenceInDays, differenceInHours } from "date-fns/esm"
import { es } from "date-fns/locale"
import { memo, useEffect, useState } from "react"
import { Controller, useFieldArray, useWatch } from "react-hook-form"

const ItemEvaluationDate = memo(({ control, label, index, error, startDate = new Date(), endDate, deleteActive, removeItem }) => {
  const [active, setActive] = useState(false)
  const [itemError, setItemError] = useState(false)
  const evaluationDate = useWatch({ control, name: `${label}.${index}.evaluationDate` })
  const percentage = useWatch({ control, name: `${label}.${index}.percentage` })

  const onFocus = () => {
    setActive(true)
  }
  const onBlur = () => {
    setActive(false)
  }

  const isValidDate = (date) => {
    setItemError(false)

    if (!!date) {
      if (!!startDate) {
        const differenceDays = differenceInDays(date, new Date(startDate))
        if (differenceDays < 0) {
          return false
        }
      }
      if (!!endDate) {
        const differenceDays = differenceInDays(date, new Date(endDate))
        if (differenceDays > 0) {
          return false
        } else if (differenceDays === 0) {
          const differenceHours = differenceInHours(date, new Date(endDate))
          if (differenceHours > 0) {
            return false
          }
        }
      }
    }
    return true
  }

  const isValidValue = (value) => {
    setItemError(false)

    const numberValue = parseInt(value)
    if (numberValue < 0 || numberValue > 100) {
      return false
    }
    return true
  }

  const isValidItem = (date, value) => {
    if(value === null) {
      value = percentage
    }else if(date === null) {
      date = evaluationDate
    }

    if(((date === '' || date === null) && value === '') || (date !== '' && date !== null && value !== '')){
      setItemError(false)
    }else{
      setItemError(true)
    }
  }

  return (
    <Grid container alignItems='flex-start' sx={{ pt: 1 }} columnSpacing={1}>
      <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', height: 40 }}>
        <Typography sx={{ color: !!(error) ? !!(error[index]) ? 'error.main' : (active) ? 'text.active' : '' : itemError ? 'error.main' : '' }} >Evaluación {index + 1}</Typography>
      </Grid>
      <Grid item xs={3.25}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <Controller
            control={control}
            name={`${label}.${index}.evaluationDate`}
            defaultValue=''

            render={({ field }) => (
              <DesktopDatePicker
                {...field}
                inputFormat={'dd/MM/yyyy'}
                minDate={(!!startDate) ? new Date(startDate) : new Date()}
                maxDate={new Date(endDate)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    error={(!!error) ? !!(error[index]?.evaluationDate) : itemError}
                    helperText={(!!error) ? !!(error[index]?.evaluationDate) ? error[index]?.evaluationDate.message : '' : ''}
                    autoComplete='off'
                    size="small"
                    sx={{
                      bgcolor: 'background.main',
                      '& .MuiFormHelperText-root': {
                        m: 0, pl: 1
                      }
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            )}

            rules={{
              validate: {
                checkDate: date => isValidDate(date) || '*Fecha inválida',
                checkItem: date => isValidItem(date, null)
              }
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={3.25}>
        <Controller
          control={control}
          name={`${label}.${index}.percentage`}
          defaultValue=''

          render={({ field }) => (
            <TextField
              {...field}
              onFocus={onFocus}
              onBlur={onBlur}
              error={(!!error) ? !!(error[index]?.percentage) : itemError}
              helperText={(!!error) ? !!(error[index]?.percentage) ? error[index]?.percentage.message : '' : ''}
              fullWidth
              autoComplete="off"
              size="small"
              sx={{
                bgcolor: 'background.main',
                '& .MuiFormHelperText-root': {
                  m: 0, pl: 1
                }
              }}
              InputProps={{
                endAdornment: <InputAdornment position={'end'}>%</InputAdornment>
              }}
            />
          )}

          rules={{
            pattern: {
              value: /^(0|[1-9]\d*)?$/,
              message: '*Este campo debe ser un número'
            },
            validate: {
              checkValue: value => isValidValue(value) || '*Valor entre 0 y 100',
              checkItem: value => isValidItem(null, value)
            }
          }}
        />
      </Grid>
      <Grid item xs={0.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <IconButton onClick={() => removeItem(index)}
          color='error'
          disabled={deleteActive}
        >
          <DeleteOutline />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={5}></Grid>
          <Grid item xs={7}>
            <FormHelperText error={true} sx={{ m: 0, pl: 1}}>
              {
                (itemError)
                ? '*Ambos campos deben contener datos'
                : ''
              }
            </FormHelperText>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
})

export const InputEvaluationDate = memo(({ control, name = '', label, error, startDate, endDate }) => {
  const [deleteActive, setDeleteActive] = useState(true)
  const { fields: items, append: appendItemRow, remove: removeItemRow } = useFieldArray({ control, name: label })

  const addNewItem = () => {
    appendItemRow({ evaluationDate: '', percentage: '' })
  }

  useEffect(() => {
    if (items.length === 0) {
      addNewItem()
    }

    if (items.length === 1) {
      setDeleteActive(true)
    } else if (items.length > 1) {
      setDeleteActive(false)
    }
  }, [items])

  useEffect(() => {
    removeItemRow(0)
  }, [removeItemRow])

  return (
    <Grid container sx={{ pt: 1 }}>
      <Grid item xs={12}>
        <Grid container columnSpacing={1}>
          <Grid item xs={5}></Grid>
          <Grid item xs={3.25}>
            <Typography sx={{ textAlign: 'center' }} >Fecha</Typography>
          </Grid>
          <Grid item xs={3.25}>
            <Typography sx={{ textAlign: 'center' }} >% de Ponderación</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {
          items.map((field, index) => (
            <ItemEvaluationDate key={field.id} control={control} label={label} index={index} error={error} startDate={startDate} endDate={endDate} deleteActive={deleteActive} removeItem={removeItemRow} />
          ))
        }
        <Button onClick={addNewItem}
          variant='outlined'
          color='primary'
        >
          <AddCircleOutline sx={{ mr: 1 }} />
          Agregar
        </Button>
      </Grid>
    </Grid>
  )
})
