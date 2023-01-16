import { memo, useState, useEffect } from 'react'
import { Controller } from 'react-hook-form'

import { TextField } from '@mui/material'
import { InputForm } from '../InputForm'

export const InputRut = memo(({ control, nameInput = '', label, required = false, error, dni = false, filter = false, filterName = "", direction = 'column' }) => {
  const [active, setActive] = useState(false)
  const [name, setName] = useState('RUT')

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  useEffect(() => {
    if(filter) {
      if(filterName !== "") {
        setName(filterName)
      }else {
        setName('RUT / DNI')
      }
    } else {
      if(dni) {
        setName('DNI')
      }else {
        setName('RUT')
      }
    }
  }, [dni])

  useEffect(() => {
    if(nameInput !== '') {
      setName(nameInput)
    }
  }, [nameInput])
  

  const isValidRut = (rut) => {
    if (dni) {
      return true
    }
    if (rut.length === 0 && !required) {
      return true
    }
    return /^((0|[0-9]{7,8}))-(([kK0-9]{1}))$/.test(rut)
  }

  return (
    <InputForm name={name} active={active} error={!!error} direction={direction}>
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
            placeholder={(dni) ? '' : '12345678-9'}
            fullWidth
            autoComplete='off'
            size='small'
            sx={{
              bgcolor: 'background.main',
              '& .MuiFormHelperText-root': {
                m: 0, pl: 1
              }
            }}
            InputLabelProps={{ shrink: (dni) ? undefined : true }}
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