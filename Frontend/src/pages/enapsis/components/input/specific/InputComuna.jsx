import { memo, useState } from "react"
import { Controller } from "react-hook-form"

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"
import { InputForm } from "../InputForm"
import { obtenerComunas } from "@pages/enapsis/helpers"

export const InputComuna = memo(({ control, name, label, required = false, error, getValues, defaultText = 'Seleccione...', labelRegion}) => {
  const [active, setActive] = useState(false)
  const comunas = obtenerComunas(getValues(labelRegion))

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
                comunas?.map((comuna) => (
                  <MenuItem key={comuna.value} value={comuna.value}>
                    {comuna.name}
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
