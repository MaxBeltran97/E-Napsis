import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { memo, useEffect, useState } from "react"
import { Controller } from "react-hook-form"

import { regiones } from '../../data/comunas-regiones'

export const InputRegionComuna = memo(({ required = false, control, setValue, errors }) => {

    const [activeRegion, setActiveRegion] = useState(false)
    const [activeComuna, setActiveComuna] = useState(false)
    const [valueComuna, setValueComuna] = useState('')
    const [comunas, setComunas] = useState([])

    useEffect(() => {
        const region = regiones.find(region => region.value === control._defaultValues.region)
        if(!!control._defaultValues.comuna) {
            setValueComuna(control._defaultValues?.comuna)
        }
        setComunas(region?.comunas)
    }, [])


    const onFocusRegion = () => {
        setActiveRegion(true)
    }

    const onBlurRegion = () => {
        setActiveRegion(false)
    }

    const onChangeRegion = (field, { target }) => {
        const region = regiones.find(region => region.value === target.value)

        if (!!target.value) {
            if (region.comunas.includes(valueComuna) === false) {
                setValueComuna('')
                setValue('comuna', '')
            }
            setComunas(region.comunas)
        } else {
            setValueComuna('')
            setComunas([])

            setValue('comuna', '')
        }
        field.onChange(target.value)
    }

    const onFocusComuna = () => {
        setActiveComuna(true)
    }

    const onBlurComuna = () => {
        setActiveComuna(false)
    }

    const onChangeComuna = (field, { target }) => {
        setValueComuna(target.value)
        field.onChange(target.value)
    }

    return (
        <>
            <Grid container
                direction={'row'}
                alignItems='center'
                sx={{ pt: 1 }}
            >
                <Grid item xs={5}>
                    <Typography sx={{ color: (!!errors?.region) ? 'error.main' : (activeRegion) ? 'text.active' : '' }}>Región</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Controller
                        control={control}
                        name='region'
                        defaultValue=''

                        render={({ field }) => ((
                            <FormControl fullWidth>
                                <InputLabel shrink size="small" id="select-label" error={!!errors?.region}>
                                    {
                                        (required) ? 'Obligatorio*' : ''
                                    }
                                </InputLabel>

                                <Select
                                    {...field}
                                    labelId="select-label"
                                    onFocus={onFocusRegion}
                                    onBlur={onBlurRegion}
                                    error={!!errors?.region}
                                    label={(required) ? "Obligatorio*" : ''}
                                    onChange={e => onChangeRegion(field, e)}
                                    notched
                                    fullWidth
                                    displayEmpty
                                    size='small'
                                    sx={{
                                        bgcolor: 'background.component'
                                    }}
                                >
                                    <MenuItem value=""><em>Seleccione...</em></MenuItem>
                                    {
                                        regiones.map((region) => (
                                            <MenuItem key={region.value} value={region.value}>
                                                {region.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                <FormHelperText error={!!errors?.region} sx={{ margin: 0, pl: 1 }}>
                                    {errors?.region?.message}
                                </FormHelperText>
                            </FormControl>
                        ))}

                        rules={{
                            required: {
                                value: required,
                                message: '*Este campo es obligatorio'
                            }
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container
                direction={'row'}
                alignItems='center'
                sx={{ pt: 1 }}
            >
                <Grid item xs={5}>
                    <Typography sx={{ color: (!!errors?.comuna) ? 'error.main' : (activeComuna) ? 'text.active' : '' }}>Comuna</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Controller
                        control={control}
                        name='comuna'
                        defaultValue=''

                        render={({ field }) => ((
                            <FormControl fullWidth>
                                <InputLabel shrink size="small" id="select-label" error={!!errors?.comuna}>
                                    {
                                        (required) ? 'Obligatorio*' : ''
                                    }
                                </InputLabel>

                                <Select
                                    {...field}
                                    labelId="select-label"
                                    onFocus={onFocusComuna}
                                    onBlur={onBlurComuna}
                                    error={!!errors?.comuna}
                                    label={(required) ? "Obligatorio*" : ''}
                                    value={valueComuna}
                                    onChange={e => onChangeComuna(field, e)}
                                    notched
                                    fullWidth
                                    displayEmpty
                                    size='small'
                                    sx={{
                                        bgcolor: 'background.component'
                                    }}
                                >
                                    <MenuItem value=""><em>Seleccione...</em></MenuItem>
                                    {
                                        comunas?.map((comuna) => (
                                            <MenuItem key={comuna.value} value={comuna.value}>
                                                {comuna.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                <FormHelperText error={!!errors?.comuna} sx={{ margin: 0, pl: 1 }}>
                                    {errors?.comuna?.message}
                                </FormHelperText>
                            </FormControl>
                        ))}

                        rules={{
                            required: {
                                value: required,
                                message: '*Este campo es obligatorio'
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
})