import { TextField } from "@mui/material"
import { memo, useState } from "react"
import { Controller } from "react-hook-form"
import { InputForm } from "../InputForm"

export const InputCalification = memo(({ control, name, label, required = false, error, placeholder, withSize = 7 }) => {
  const [active, setActive] = useState(false)

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  const isValidCalification = (value) => {
    if (value.length === 0 && !required) {
      return true
    }
    return /^((0|[1-7]{1})),(([0-9]{1}))$/.test(value)
  }

  const isValidMinValue = (value) => {
    if (value.length === 0 && !required) {
      return true
    }

    const numberValue = parseFloat(value.replace(',','.'))
    if( numberValue < 1.0 ) {
      return false
    }
    return true
  }

  const isValidMaxValue = (value) => {
    if (value.length === 0 && !required) {
      return true
    }

    const numberValue = parseFloat(value.replace(',','.'))
    if( numberValue > 7.0 ) {
      return false
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
            size="small"
            sx={{
              bgcolor: 'background.main',
              '& .MuiFormHelperText-root': {
                m: 0, pl: 1
              }
            }}
            InputLabelProps={{ shrin: true }}
          />
        )}

        rules={{
          required: {
            value: required,
            message: '*Este campo es obligatorio'
          },
          validate: {
            checkCalification: value => isValidCalification(value) || '*Formato de nota inválida',
            checkMinValue: value => isValidMinValue(value) || `*Nota minima debe ser mayor o igual a 1,0`,
            checkMaxValue: value => isValidMaxValue(value) || `*Nota maxima debe ser menor o igual a 7,0`,
          }
        }}
      />
    </InputForm>
  )
})
