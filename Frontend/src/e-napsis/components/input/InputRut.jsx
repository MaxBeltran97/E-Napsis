import { Grid, TextField, Typography } from "@mui/material"
import { memo, useState } from "react"
import { Controller } from 'react-hook-form'

export const InputRut = memo(({ name , label, required = false, control, error }) => {

    const [active, setActive] = useState(false)

    const onFocus = () => {
        setActive(true)
    }

    const onBlur = () => {
        setActive(false)
    }

    const isValidRut = (rut) => {
        if (rut.length === 0 && !required) {
            return true
        }
        return /^((0|[0-9]{7,8}))-(([kK0-9]{1}))$/.test(rut)
    }

    return (
        <Grid container
            direction={'row'}
            alignItems='center'
            sx={{ pt: 1 }}
        >
            <Grid item xs={5}>
                <Typography sx={{ color: (!!error) ? 'error.main' : (active) ? 'text.active' : '' }}>{name}</Typography>
            </Grid>
            <Grid item xs={7}>
                <Controller 
                    control={control}
                    name={label}
                    defaultValue=''

                    render={({field}) => (<TextField
                        {...field}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        error={!!error}
                        helperText={(!!error) ? error.message : ''}
                        label={(required) ? "Obligatorio*" : ''}
                        placeholder={'12345678-9'}
                        fullWidth
                        autoComplete="off"
                        size="small"
                        sx={{ 
                            bgcolor: 'background.component',
                            "& .MuiFormHelperText-root": {
                                margin: 0,
                                pl: 1
                            }
                        }}
                        InputLabelProps={{ shrink: true }}
                    />)}

                    rules={{
                        required: {
                            value: required,
                            message: '*Este campo es obligatorio'
                        },
                        validate: {
                            checkRut: rut => isValidRut(rut) || '*Rut invalido.'
                        }
                    }}
                />
            </Grid>
        </Grid>
    )
})