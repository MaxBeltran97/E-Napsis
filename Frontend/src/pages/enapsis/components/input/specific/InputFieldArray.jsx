import { AddCircleOutline, ConstructionOutlined, DeleteOutline } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { memo, useEffect, useState } from "react"
import { Controller, useFieldArray } from "react-hook-form"

export const InputFieldArray = memo(({ control, name, label, error, textArea = false }) => {
  const [active, setActive] = useState(false)
  const [deleteActive, setDeleteActive] = useState(true)
  const { fields: items, append: appendItemRow, remove: removeItemRow } = useFieldArray({ control, name: label })

  const onFocus = () => {
    setActive(true)
  }

  const onBlur = () => {
    setActive(false)
  }

  const addNewItem = () => {
    appendItemRow({ description: '', amount: '' })
  }

  useEffect(() => {
    if(items.length === 0){
      addNewItem()
    }

    if(items.length === 1){
      setDeleteActive(true)
    }else if(items.length > 1){
      setDeleteActive(false)
    }
  }, [items])

  useEffect(() => {
    if(items[0]?.description === '' || !(!!items[0])){
      removeItemRow(0)
    }
  }, [removeItemRow])

  return (
    <Grid container sx={{ pt: 1 }}>
      <Grid item xs={12}>
        <Typography sx={{ color: (active) ? 'text.active' : '' }}>{name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container columnSpacing={1}>
          <Grid item xs={8}>
            <Typography sx={{ textAlign: 'center' }} >Descripción</Typography>
          </Grid>
          <Grid item xs={3.5}>
            <Typography sx={{ textAlign: 'center' }} >Cantidad</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {
          items.map((field, index) => (
            <Grid container key={field.id} columnSpacing={1} sx={{ mb: 1 }}>
              <Grid item xs={8}>
                <Controller
                  control={control}
                  name={`${label}.${index}.description`}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      fullWidth
                      multiline={textArea}
                      minRows={textArea ? 4 : 1}
                      autoComplete='off'
                      size='small'
                      sx={{
                        bgcolor: 'background.main'
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3.5}>
                <Controller
                  control={control}
                  name={`${label}.${index}.amount`}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      error={(!!error) ? !!(error[index]?.amount) : false}
                      helperText={(!!error) ? !!(error[index]?.amount) ? error[index].amount.message : '' : ''}
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
                    pattern: {
                      value: /^(0|[1-9]\d*)?$/,
                      message: '*Este campo debe ser un número'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={0.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <IconButton onClick={() => removeItemRow(index)}
                  color='error'
                  disabled={deleteActive}
                >
                  <DeleteOutline />
                </IconButton>
              </Grid>
            </Grid>
          ))
        }
        <Button onClick={addNewItem}
          variant='outlined'
          color='primary'
        >
          <AddCircleOutline sx={{ mr: 1 }} />
          Agregar
        </Button>
      </Grid>
    </Grid>
  )
})
