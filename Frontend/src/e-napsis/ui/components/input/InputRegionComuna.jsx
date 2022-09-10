import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material"
import { memo, useState } from "react"
import { Controller } from "react-hook-form"

import { regiones } from '../../data/comunas-regiones'

export const InputRegionComuna = memo(({ control, setValue }) => {

    const [activeRegion, setActiveRegion] = useState(false)
    const [activeComuna, setActiveComuna] = useState(false)
    const [valueComuna, setValueComuna] = useState('')
    const [comunas, setComunas] = useState([])

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
                sx={{ pl: 2, pt: 1 }}
            >
                <Grid item xs={5}>
                    <Typography sx={{ color: (activeRegion) ? 'text.active' : '' }}>Región</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Controller
                        control={control}
                        name='region'
                        defaultValue=''

                        render={({ field }) => ((
                            <FormControl fullWidth>
                                <Select
                                    {...field}
                                    onFocus={onFocusRegion}
                                    onBlur={onBlurRegion}
                                    onChange={e => onChangeRegion(field, e)}
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
                            </FormControl>
                        ))}
                    />
                </Grid>
            </Grid>
            <Grid container
                direction={'row'}
                alignItems='center'
                sx={{ pl: 2, pt: 1 }}
            >
                <Grid item xs={5}>
                    <Typography sx={{ color: (activeComuna) ? 'text.active' : '' }}>Comuna</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Controller
                        control={control}
                        name='comuna'

                        render={({ field }) => ((
                            <FormControl fullWidth>
                                <Select
                                    {...field}
                                    onFocus={onFocusComuna}
                                    onBlur={onBlurComuna}
                                    value={valueComuna}
                                    onChange={e => onChangeComuna(field, e)}
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
                            </FormControl>
                        ))}
                    />
                </Grid>
            </Grid>
        </>
    )
})