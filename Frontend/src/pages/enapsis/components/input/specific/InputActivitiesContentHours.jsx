import { AddCircleOutline, DeleteOutline } from "@mui/icons-material"
import { Button, FormControl, FormHelperText, Grid, IconButton, TextField, Typography } from "@mui/material"
import { memo, useEffect, useState } from "react"
import { Controller, useFieldArray } from "react-hook-form"

export const InputActivitiesContentHours = memo(({ control, name, label, error }) => {
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
    appendItemRow({ activity: '', content: '', theoreticalHour: '', practiceHour: '', eLearningHour: '' })
  }

  useEffect(() => {
    if (items.length === 0) {
      addNewItem()
    }

    if (items.length === 1) {
      setDeleteActive(true)
    } else if (items.length > 1) {
      setDeleteActive(false)
    }
  }, [items])

  useEffect(() => {
    if(items[0]?.activity === '' || items[0]?.content === '' || !(!!items[0])) {
      removeItemRow(0)
    }
  }, [removeItemRow])

  return (
    <Grid container sx={{ pt: 1 }}>
      <Grid item xs={12}>
        <Typography sx={{ color: (active) ? 'text.active' : '' }}>{name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container columnSpacing={1} alignItems={'flex-end'}>
          <Grid item xs={3.5}>
            <Typography sx={{ textAlign: 'center' }} >Actividad</Typography>
          </Grid>
          <Grid item xs={3.5}>
            <Typography sx={{ textAlign: 'center' }} >Contenido</Typography>
          </Grid>
          <Grid item xs={4.5}>
            <Typography sx={{ textAlign: 'center' }} >Horas</Typography>
            <Grid container columnSpacing={1}>
              <Grid item xs={4}>
                <Typography sx={{ textAlign: 'center' }} >Teórico</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ textAlign: 'center' }} >Práctico</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ textAlign: 'center' }} >E-learning</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {
          items.map((field, index) => (
            <Grid container key={field.id} columnSpacing={1} sx={{ mb: 1 }}>
              <Grid item xs={3.5}>
                <Controller
                  control={control}
                  name={`${label}.${index}.activity`}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      fullWidth
                      multiline
                      minRows={4}
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
                  name={`${label}.${index}.content`}
                  defaultValue=''
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      fullWidth
                      multiline
                      minRows={4}
                      autoComplete='off'
                      size='small'
                      sx={{
                        bgcolor: 'background.main'
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4.5}>
                <Grid container columnSpacing={1}>
                  <Grid item xs={4}>
                    <Controller
                      control={control}
                      name={`${label}.${index}.theoreticalHour`}
                      defaultValue=''
                      render={({ field }) => (
                        <TextField
                          {...field}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          error={(!!error) ? !!(error[index]?.theoreticalHour) : false}
                          fullWidth
                          autoComplete='off'
                          size='small'
                          sx={{
                            bgcolor: 'background.main'
                          }}
                        />
                      )}
                      rules={{
                        pattern: {
                          value: /^(0|[1-9]\d*)?$/,
                          message: '*Los campos Hora deben ser númericos'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Controller
                      control={control}
                      name={`${label}.${index}.practiceHour`}
                      defaultValue=''
                      render={({ field }) => (
                        <TextField
                          {...field}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          error={(!!error) ? !!(error[index]?.practiceHour) : false}
                          fullWidth
                          autoComplete='off'
                          size='small'
                          sx={{
                            bgcolor: 'background.main'
                          }}
                        />
                      )}
                      rules={{
                        pattern: {
                          value: /^(0|[1-9]\d*)?$/,
                          message: '*Los campos Hora deben ser númericos'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Controller
                      control={control}
                      name={`${label}.${index}.eLearningHour`}
                      defaultValue=''
                      render={({ field }) => (
                        <TextField
                          {...field}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          error={(!!error) ? !!(error[index]?.eLearningHour) : false}
                          fullWidth
                          autoComplete='off'
                          size='small'
                          sx={{
                            bgcolor: 'background.main'
                          }}
                        />
                      )}
                      rules={{
                        pattern: {
                          value: /^(0|[1-9]\d*)?$/,
                          message: '*Los campos Hora deben ser númericos'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormHelperText error={true} sx={{ m: 0, pl: 1 }}>
                     {
                        (!!error)
                        ? (!!(error[index]?.theoreticalHour) || !!(error[index]?.practiceHour) || !!(error[index]?.eLearningHour)) 
                          ? '*Los campos de horas deben ser númericos' : ''
                        : ''
                     }
                    </FormHelperText>
                  </Grid>
                </Grid>
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
