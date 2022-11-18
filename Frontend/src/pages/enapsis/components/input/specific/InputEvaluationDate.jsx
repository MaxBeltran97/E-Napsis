import { AddCircleOutline, DeleteOutline } from "@mui/icons-material"
import { Button, FormHelperText, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { differenceInDays, differenceInHours } from "date-fns/esm"
import { es } from "date-fns/locale"
import { memo, useEffect, useState } from "react"
import { Controller, useFieldArray, useWatch } from "react-hook-form"

const ItemEvaluationDate = memo(({ control, label, index, error, errorPercentage, startDate = new Date(), endDate, deleteActive, removeItem }) => {
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
    if (value === null) {
      value = percentage
    } else if (date === null) {
      date = evaluationDate
    }

    if (((date === '' || date === null) && value === '') || (date !== '' && date !== null && value !== '')) {
      setItemError(false)
      return true
    } else {
      setItemError(true)
      return false
    }
  }

  return (
    <Grid container alignItems='flex-start' sx={{ pt: 1 }}>
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
                    fullWidth
                    onFocus={onFocus}
                    onBlur={onBlur}
                    error={(!!error) ? !!(error[index]?.evaluationDate) ? true : itemError : false }
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
      <Grid item xs={3.25} sx={{ pl: 1 }}>
        <Controller
          control={control}
          name={`${label}.${index}.percentage`}
          defaultValue=''

          render={({ field }) => (
            <TextField
              {...field}
              onFocus={onFocus}
              onBlur={onBlur}
              error={(!!error) ? !!(error[index]?.percentage) ? true : itemError ? true : errorPercentage : false}
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
      <Grid item xs={0.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', pl: 1 }}>
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
            <FormHelperText error={true} sx={{ m: 0, pl: 1 }}>
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
  const [errorPercentage, setErrorPercentage] = useState(false)
  const { fields: items, append: appendItemRow, remove: removeItemRow } = useFieldArray({ control, name: label, rules: { validate: { checkList: percentages => isValidPercentageList(percentages) } } })

  const isValidPercentageList = (percentages) => {
    let percentageTotal = 0
    const evaluationDates = percentages.filter(item => { return (item.evaluationDate !== '' && item.evaluationDate !== null) })
    evaluationDates.map((item) => { percentageTotal += parseInt(item.percentage) })
    
    if(evaluationDates.length > 0) {
      if (percentageTotal !== 100) {
        setErrorPercentage(true)
        return(false)
      } else {
        setErrorPercentage(false)
      }
    }else {
      setErrorPercentage(false)
    }
    return(true)
  }

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
    if (items[0]?.evaluationDate === '' || !(!!items[0])) {
      removeItemRow(0)
    }
  }, [removeItemRow])

  return (
    <Grid container sx={{ pt: 1 }}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={5}></Grid>
          <Grid item xs={3.25}>
            <Typography sx={{ textAlign: 'center' }} >Fecha</Typography>
          </Grid>
          <Grid item xs={3.25} sx={{ pl: 1 }}>
            <Typography sx={{ textAlign: 'center' }} >% de Ponderación</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {
          items.map((field, index) => (
            <ItemEvaluationDate key={field.id} control={control} label={label} index={index} error={error} errorPercentage={errorPercentage} startDate={startDate} endDate={endDate} deleteActive={deleteActive} removeItem={removeItemRow} />
          ))
        }
        <Grid container>
          <Grid item xs={5}></Grid>
          <Grid item xs={7}>
            <FormHelperText error={true} sx={{ m: 0, pl: 1 }}>
              {
                (!!errorPercentage)
                  ? '*La suma de los porcentajes debe ser 100'
                  : ''
              }
            </FormHelperText>
          </Grid>
        </Grid>
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
