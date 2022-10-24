import { memo, useState } from 'react'
import { Controller } from 'react-hook-form'

import { TextField } from '@mui/material'
import { InputForm } from '../InputForm'

export const InputText = memo(({ control, name, label, required = false, error, disabled = false, withSize = 7 }) => {
  const [active, setActive] = useState(false)

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
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
            // placeholder={(!!placeholder) ? placeholder : ''}
            fullWidth
            disabled={disabled}
            autoComplete='off'
            size='small'
            sx={{
              bgcolor: 'background.main',
              '& .MuiFormHelperText-root': {
                m: 0, pl: 1
              }
            }}
            // InputLabelProps={{ shrink: (!!placeholder) ? true : false }}
          />
        )}

        rules={{
          required: {
            value: required,
            message: '*Este campo es obligatorio'
          }
        }}
      />
    </InputForm>
  )
})
