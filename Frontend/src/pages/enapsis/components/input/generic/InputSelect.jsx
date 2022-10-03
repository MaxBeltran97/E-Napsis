import { memo, useState } from 'react'
import { Controller } from 'react-hook-form'

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { InputForm } from '../InputForm'

export const InputSelect = memo(({ control, name, label, required = false, error, defaultText = 'Seleccione...', items = [], withSize = 7 }) => {
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

        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel shrink size='small' id='select-label' error={!!error}>
              {
                (required) ? 'Obligatorio*' : ''
              }
            </InputLabel>
            <Select
              {...field}
              labelId='select-label'
              onFocus={onFocus}
              onBlur={onBlur}
              error={!!error}
              label={(required) ? 'Obligatorio*' : ''}
              notched
              fullWidth
              displayEmpty
              size='small'
              sx={{
                bgcolor: 'background.main'
              }}
            >
              <MenuItem value=''><em>{defaultText}</em></MenuItem>
              {
                items?.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))
              }
            </Select>
            <FormHelperText error={!!error} sx={{ m: 0, pl: 1 }}>
              {error?.message}
            </FormHelperText>
          </FormControl>
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
