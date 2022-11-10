import { Autocomplete, CircularProgress, Paper, TextField } from '@mui/material'
import { memo, useEffect, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { InputForm } from '../InputForm'

export const InputAutocompleteAsync = memo(({ control, name, label, required = false, error, multiple = false, entities, startGetEntities, getFormattedEntities, loading, withSize = 7 }) => {

  const value = useWatch({ control, name: label })

  const [active, setActive] = useState(false)
  const [items, setItems] = useState([])

  const onStartItems = async() => {
    await startGetEntities()
  }

  // const onChangeDefaultValue = () => {
  //   const valueLabel = items.find(item => item.value === value)
  //   console.log({valueLabel, label})
  // }

  useEffect(() => {
    if(!!value){
      console.log({value})
      onStartItems()
    }
  }, [])

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  const onOpen = async () => {
    await startGetEntities()
  }

  useEffect(() => {
    // console.log('se ejecuta', {loading})
    if (loading === false) {
      setItems([...getFormattedEntities(entities)])
      // if(!!value){
      //   onChangeDefaultValue()
      // }
    }
  }, [loading])

  const CustomPaper = (props) => {
    return <Paper elevation={8} {...props} />
  }

  return (
    <InputForm name={name} active={active} error={!!error} textBoxSize={withSize}>
      <Controller
        control={control}
        name={label}
        defaultValue={[]}

        render={({ field: { ref, onChange, ...field } }) => (
          <Autocomplete

            multiple={multiple}
            options={items}
            onOpen={onOpen}
            loading={loading}
            loadingText={'Cargando...'}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option) => option.label}
            onChange={(_, data) => {
              if (multiple) {
                onChange(data)
              } else {
                onChange(data?.value)
              }
            }}

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

                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
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
