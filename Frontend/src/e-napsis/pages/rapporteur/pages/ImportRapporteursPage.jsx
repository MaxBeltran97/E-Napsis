import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { FileDownloadOutlined } from "@mui/icons-material"
import { Button, Grid } from "@mui/material"

import { GridForm, GridInput } from "../../../components/grid"
import { InputFile } from "../../../components/input"
import { ButtonSave } from "../../../components/button"

export const ImportRapporteursPage = () => {

    const { handleSubmit, formState: { errors }, control } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [errorsForm, setErrorsForm] = useState(false)

    const onSubmit = (data) => {
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
        <GridForm handleSubmit={handleSubmit} formTitle={'Importación Masiva de Relatores'} functionFromData={onSubmit}>
            <Grid item xs={12}>
                <GridInput title={'Importar Relatores'} >
                    <InputFile name={'Excel de Relatores'} textButton={'Subir Excel'} label={'excelRapporteurs'} allowedExtensions={['xls']} required={true} control={control} error={errors.excelRapporteurs} />
                    
                    <Grid item sx={{ pt: 1 }}>
                        <Button variant="outlined" size="small" color="success">
                            <FileDownloadOutlined sx={{ mr: 1 }} fontSize='small' />
                            Formato de archivo excel
                        </Button>
                    </Grid>
                </GridInput>
            </Grid>

            <ButtonSave buttonTitle={'Guardar Relator'} errorTitle={'Error al guardar'} isLoading={isLoading} errorsForm={errorsForm} />
        </GridForm>
    )
}
