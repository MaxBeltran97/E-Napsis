import { Autocomplete, Paper, TextField } from '@mui/material'
import { useEffect } from 'react'
import { memo, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { InputForm } from '../InputForm'

export const InputAutocomplete = memo(({ control, name, label, required = false, error, items = [], multiple = false, withSize = 7 }) => {
  const [active, setActive] = useState(false)
  const defaultValue = useWatch({ control, name: label })

  const [value, setValue] = useState((multiple) ? [] : null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (items.length > 0 && !!defaultValue) {
      if(multiple) {
        const a = defaultValue.map((dValue) => {
          return items.find(item => item.value === dValue.value)
        })
        setValue(a)
      }else {
        setValue(items.find(item => item.value === defaultValue))
      }
    }
  }, [items])

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  const CustomPaper = (props) => {
    return <Paper elevation={8} {...props} />
  }

  return (
    <InputForm name={name} active={active} error={!!error} textBoxSize={withSize}>
      <Controller
        control={control}
        name={label}

        render={({ field: { ref, onChange, ...field } }) => (
          <Autocomplete
            multiple={multiple}
            options={items}
            // freeSolo={true}

            value={value}
            onChange={(event, newValue) => {
              if (multiple) {
                onChange(newValue)
              } else {
                onChange(newValue?.value)
              }
              setValue(newValue)
            }}

            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}

            isOptionEqualToValue={(option, value) => option.value === value.value}
            // getOptionLabel={(option) => option.label}
            // onChange={(_, data) => {
            //   if (multiple) {
            //     onChange(data)
            //   } else {
            //     onChange(data?.value)
            //   }
            // }}

            PaperComponent={CustomPaper}

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
                helperText={(!!error) ? error.message : ''}
                label={(required) ? 'Obligatorio*' : ''}
                fullWidth
                variant={'outlined'}
                size='small'
                sx={{
                  bgcolor: 'background.main',
                  '& .MuiFormHelperText-root': {
                    m: 0, pl: 1
                  }
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
