import { Grid, TextField, Typography } from "@mui/material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { differenceInDays, differenceInHours } from "date-fns/esm"

import { es } from 'date-fns/locale'
import { memo, useState } from "react"
import { Controller } from 'react-hook-form'

export const InputDate = memo(({ name , label, min = false, max = false, required = false, control, error }) => {

    const [active, setActive] = useState(false)

    const onFocus = () => {
        setActive(true)
    }

    const onBlur = () => {
        setActive(false)
    }

    const isValidDate = (date) => {
        if(!!date){
            const differenceDays = differenceInDays(date, new Date())
            if(min) {
                if(differenceDays < 0){
                    return false
                }
            }else if(max) {
                if(differenceDays > 0){
                    return false
                }else if(differenceDays === 0){
                    const differenceHours = differenceInHours(date, new Date())
                    if(differenceHours > 0){
                        return false
                    }
                }
            }
        }
        return true
    }

    return (
        <Grid container
            direction={'row'}
            alignItems='center'
            sx={{ pl: 2, pt: 1 }}
        >
            <Grid item xs={5}>
                <Typography sx={{ color: (!!error) ? 'error.main' : (active) ? 'text.active' : '' }}>{name}</Typography>
            </Grid>
            <Grid item xs={7}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es} >
                    <Controller 
                        control={control}
                        name={label}
                        defaultValue=''

                        render={({field}) => (
                            <DesktopDatePicker 
                                {...field}
                                inputFormat={'dd/MM/yyyy'}
                                minDate={min && new Date()}
                                maxDate={max && new Date()}
                                onFocus={onFocus}
                                renderInput={(params) => (<TextField 
                                    {...params} 
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    error={!!error}
                                    helperText={(!!error) ? error.message : ''}
                                    autoComplete='off'
                                    size='small'
                                    sx={{
                                        bgcolor: 'background.component',
                                        "& .MuiFormHelperText-root": {
                                            bgcolor: 'background.default',
                                            margin: 0,
                                            pl: 1
                                        }
                                    }}
                                />)}
                            />
                        )}

                        rules={{
                            required: {
                                value: required,
                                message: '*Este campo es obligatorio'
                            },
                            validate: {
                                checkDate: date => isValidDate(date) || '*Fecha inválida'
                            }
                        }}
                    />
                </LocalizationProvider>
            </Grid>
        </Grid>
    )
})