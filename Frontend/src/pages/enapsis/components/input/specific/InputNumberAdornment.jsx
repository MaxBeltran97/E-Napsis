import { memo, useState } from "react"
import { Controller } from "react-hook-form"

import { InputAdornment, TextField } from "@mui/material"
import { InputForm } from "../inputForm"

export const InputNumberAdornment = memo(({ control, name, label, required = false, error, minLength = 0, maxLength = 10, minValue, maxValue, placeholder, adornment, position, withSize = 7}) => {
  const [active, setActive] = useState(false)

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  const isValidMinValue = (value) => {
    if(!!minValue) {
      const numberValue = parseInt(value)
      if(numberValue < minValue) {
        return false
      }
    }
    return true
  }

  const isValidMaxValue = (value) => {
    if(!!maxValue) {
      const numberValue = parseInt(value)
      if(numberValue > maxValue) {
        return false
      }
    }
    return true
  }
  
  return (
    <InputForm name={name} active={active} error={!!error} textBoxSize={withSize}>
      <Controller 
        control={control}
        name={label}
        defaultValue=''

        render={({field}) => (
          <TextField 
            {...field}
            onFocus={onFocus}
            onBlur={onBlur}
            error={!!error}
            helperText={(!!error) ? error.message : ''}
            label={(required) ? 'Obligatorio*' : ''}
            placeholder={(!!placeholder) ? placeholder : ''}
            fullWidth
            autoComplete="off"
            size='small'
            sx={{
              bgcolor: 'background.main',
              '& .MuiFormHelperText-root': {
                m: 0, pl: 1
              }
            }}
            InputProps={{
              startAdornment: (position === 'start') ? (<InputAdornment position={position}>{adornment}</InputAdornment>) : null,
              endAdornment: (position === 'end') ? (<InputAdornment position={position}>{adornment}</InputAdornment>) : null
            }}
            InputLabelProps={{ shrink: (!!adornment) ? true : false }}
          />
        )}

        rules={{
          required: {
            value: required,
            message: '*Este campo es obligatorio'
          },
          pattern: {
            value: /^(0|[1-9]\d*)?$/,
            message: '*Este campo debe ser un n??mero'
          },
          minLength: {
            value: minLength,
            message: `*Tama??o m??nimo de ${minLength} n??meros`
          },
          maxLength: {
            value: maxLength,
            message: `*Tama??o m??ximo de ${maxLength} n??meros`
          },
          validate: {
            checkMinValue: value => isValidMinValue(value) || `*Valor no debe ser menor a ${minValue}`,
            checkMaxValue: value => isValidMaxValue(value) || `*Valor no debe ser mayor a ${maxValue}`
          }
        }}
      />
    </InputForm>
  )
})