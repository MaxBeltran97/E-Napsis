import { memo, useState } from 'react'
import { Controller } from 'react-hook-form'

import { TextField } from '@mui/material'
import { InputForm } from '../InputForm'

export const InputRut = memo(({ control, name, label, required = false, error }) => {
  const [active, setActive] = useState(false)

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  const isValidRut = (rut) => {
    if (rut.length === 0 && !required) {
      return true
    }
    return /^((0|[0-9]{7,8}))-(([kK0-9]{1}))$/.test(rut)
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
          />
        )}

        rules={{
          required: {
            value: required,
            message: '*Este campo es obligatorio'
          },
          validate: {
            checkRut: rut => isValidRut(rut) || '*Rut inválido'
          }
        }}
      />
    </InputForm>
  )
})