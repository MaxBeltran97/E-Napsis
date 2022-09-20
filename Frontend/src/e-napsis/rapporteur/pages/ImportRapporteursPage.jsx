import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { ErrorOutlineOutlined, FileDownloadOutlined, SaveOutlined } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"

import { GridPaper } from "../../ui/components/grid"
import { InputFile } from "../../ui/components/input"

export const ImportRapporteursPage = () => {

    const { handleSubmit, formState: { errors }, control } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [errorsForm, setErrorsForm] = useState(false)

    const onSubmit = (data) => {
        event.preventDefault()
        console.log(data)
        setIsLoading(true)
    }

    useEffect(() => {
        if (Object.entries(errors).length === 0) {
            setErrorsForm(false)
        } else {
            setErrorsForm(true)
        }
    }, [Object.entries(errors).length])


    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Typography variant="h5" sx={{ mt: 1, ml: 2 }}>Importación Masiva de Relatores</Typography>

            <GridPaper>
                <Grid item xs={12}>
                    <Typography sx={{ fontSize: '20px' }}>Importar Relatores</Typography>

                    <Grid item sx={{ pl: 2, pr: 2 }}>
                        <InputFile name={'Excel de Relatores'} textButton={'Subir Excel'} label={'excelRapporteurs'} allowedExtensions={['xls']} required={true} control={control} error={errors.excelRapporteurs} />
                    </Grid>

                    <Grid item sx={{ pl: 2, pt: 1, pr: 2 }}>
                        <Button variant="outlined" size="small" color="success">
                            <FileDownloadOutlined sx={{ mr: 1 }} fontSize='small'/>
                            Formato de archivo excel
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <LoadingButton type="submit" variant="outlined" loading={isLoading} color={(errorsForm) ? 'error' : 'primary'}>
                        {
                            (errorsForm)
                                ? (
                                    <>
                                        <ErrorOutlineOutlined sx={{ mr: 1 }} />
                                        Error al guardar
                                    </>
                                )
                                : (
                                    <>
                                        <SaveOutlined sx={{ mr: 1 }} />
                                        Guardar Relatores
                                    </>
                                )
                        }
                    </LoadingButton>
                </Grid>
            </GridPaper>
        </form>
    )
}
