import { memo, useState } from 'react'
import { Controller } from 'react-hook-form'

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { InputForm } from '../InputForm'
import { obtenerComunas } from '@pages/enapsis/helpers'

export const InputRegion = memo(({ control, name, label, required = false, error, getValues, setValue, defaultText = 'Seleccione...', items = [], labelComuna }) => {
  const [active, setActive] = useState(false)

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  const onChange = (field, {target}) => {
    const region = target.value
    if(!!labelComuna) {
      const comunaActual = getValues(labelComuna)
  
      if (!!region) {
        const comunas = obtenerComunas(region)
        if(comunas.includes(comunaActual) === false) {
          setValue(labelComuna, '')
        }
      } else {
        setValue(labelComuna, '')
      }
    }
    
    field.onChange(region)
  }

  return (
    <InputForm name={name} active={active} error={!!error}>
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
              onChange={e => onChange(field, e)}
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