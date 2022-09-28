import { memo, useState } from "react"
import { Controller } from "react-hook-form"

import { InputAdornment, TextField } from "@mui/material"
import { InputForm } from "../InputForm"

export const InputPhoneNumber = memo(({ control, name, label, required = false, error, identifier, length }) => {
  const [active, setActive] = useState(false)

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  return (
    <InputForm name={name} active={active} error={!!error}>
      <Controller
        control={control}
        name={label}
        defaultValue=''

        render={({ field }) => (
          <TextField
            {...field}
            onFocus={onFocus}
            onBlur={onBlur}
            error={!!error}
            helperText={(!!error) ? error.message : ''}
            label={(required) ? 'Obligatorio*' : ''}
            fullWidth
            autoComplete='off'
            size='small'
            sx={{
              bgcolor: 'background.main',
              '& .MuiFormHelperText-root': {
                m: 0, pl: 1
              }
            }}
            InputProps={{
              startAdornment: <InputAdornment position='start'>{identifier}</InputAdornment>
            }}
          />
        )}

        rules={{
          pattern: {
            value: /^(0|[1-9]\d*)?$/,
            message: '*Este campo debe ser un número'
          },
          minLength: {
            value: length,
            message: `*Tamaño de ${length} números`
          },
          maxLength: {
            value: length,
            message: `*Tamaño de ${length} números`
          },
          required: {
            value: required,
            message: '*Este campo es obligatorio'
          }
        }}
      />
    </InputForm>
  )
})
