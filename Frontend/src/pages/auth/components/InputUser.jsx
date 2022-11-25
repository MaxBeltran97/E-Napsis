import { TextField } from "@mui/material"
import { memo } from "react"
import { Controller } from "react-hook-form"

export const InputUser = memo(({ control, label, error, disabled = false}) => {

  return (
    <Controller
      control={control}
      name={label}
      defaultValue=''

      render={({field}) => (
        <TextField 
          {...field}
          disabled={disabled}
          error={!!error}
          helperText={(!!error) ? error.message : ''}
          label={'Correo electrónico o usuario'}
          fullWidth
          // size="small"
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
          value: true,
          message: '*Introduce una dirección de correo electrónico o un usuario'
        }
      }}
    />
  )
})
