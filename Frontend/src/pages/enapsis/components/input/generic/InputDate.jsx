import { TextField } from "@mui/material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { differenceInDays, differenceInHours } from "date-fns/esm"
import { es } from 'date-fns/locale'
import { memo, useState } from "react"
import { Controller } from "react-hook-form"
import { InputForm } from "../InputForm"

export const InputDate = memo(({ control, name, label, required = false, error, minDate, maxDate, listErrorDates = [], errorListMessage }) => {
  const [active, setActive] = useState(false)

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  const isValidDate = (date) => {
    if(!!date) {
      if(!!minDate) {
        const differenceDays = differenceInDays(date, new Date(minDate))
        if(differenceDays < 0) {
          return false
        }
      }
      if(!!maxDate) {
        const differenceDays = differenceInDays(date, new Date(maxDate))
        if(differenceDays > 0) {
          return false
        } else if(differenceDays === 0) {
          const differenceHours = differenceInHours(date, new Date(maxDate))
          if(differenceHours > 0) {
            return false
          }
        }
      }
    }
    return true
  }

  const isValidDateInList = (date) => {
    let flag = true

    if(listErrorDates.length > 0) {
      if(!!date) {
        listErrorDates.forEach(dateInList => {
          const differenceDays = differenceInDays(date, new Date(dateInList))
          if(differenceDays === 0) {
            flag = false
          }
        });
      }
    }
    
    return flag
  }

  return (
    <InputForm name={name} active={active} error={!!error}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <Controller 
          control={control}
          name={label}
          defaultValue=''

          render={({field}) => (
            <DesktopDatePicker 
              {...field}
              inputFormat={'dd/MM/yyyy'}
              minDate={(!!minDate) ? new Date(minDate) : null}
              maxDate={(!!maxDate) ? new Date(maxDate) : null}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  error={!!error}
                  helperText={(!!error) ? error.message : ''}
                  label={(required) ? 'Obligatorio*' : ''}
                  autoComplete='off'
                  // fullWidth
                  size='small'
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
            required: {
              value: required,
              message: '*Este campo es obligatorio'
            },
            validate: {
              checkDate: date => isValidDate(date) || '*Fecha inválida',
              checkDateInList: date => isValidDateInList(date) || errorListMessage
            }
          }}
        />
      </LocalizationProvider>
    </InputForm>
  )
})
