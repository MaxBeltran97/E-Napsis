import { memo, useState } from 'react'
import { Controller } from 'react-hook-form'

import { TextField } from '@mui/material'
import { InputForm } from '../InputForm'

export const InputEmail = memo(({ control, name, label, required = false, error }) => {
  const [active, setActive] = useState(false)

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  const isValidEmail = (email) => {
    if (email.length === 0 && !required) {
      return true
    }
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
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
            checkEmail: email => isValidEmail(email) || '*Email inválido'
          }
        }}
      />
    </InputForm>
  )
})