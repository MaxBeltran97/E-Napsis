import { Autocomplete, TextField } from '@mui/material'
import { memo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { InputForm } from '../InputForm'

export const InputAutocomplete = memo(({ control, name, label, required = false, error, items = [], withSize = 7 }) => {
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

        render={({ field: { ref, onChange, ...field } }) => (
          <Autocomplete
            options={items}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(_, data) => onChange(data?.value)}

            renderOption={(props, option) => {
              return (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )
            }}

            renderInput={(params) => (
              <TextField 
                {...params}
                {...field}
                inputRef={ref}
                onFocus={onFocus}
                onBlur={onBlur}
                error={!!error}
                label={(required) ? 'Obligatorio*' : ''}
                fullWidth
                variant={'outlined'}
                size='small'
                sx={{
                  bgcolor: 'background.main'
                }}
              />
            )}
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
