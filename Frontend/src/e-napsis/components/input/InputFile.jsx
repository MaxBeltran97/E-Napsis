import { ErrorOutlineOutlined, FileDownloadDoneOutlined, FileUploadOutlined } from "@mui/icons-material"
import { Button, FormControl, FormHelperText, Grid, Typography } from "@mui/material"
import { memo, useRef } from "react"
import { useState } from "react"
import { Controller } from 'react-hook-form'

export const InputFile = memo(({ name, textButton, helperText, label, allowedExtensions = [], required = false, multiple = false, control, error }) => {

    const [fileReady, setFileReady] = useState(null)
    const [value, setValue] = useState("")

    const fileInputRef = useRef()

    const isValidExtensions = (files) => {
        if (files?.length > 0) {
            for (const file of files) {
                const nameSplit = file.name.split('.')
                const extension = nameSplit[(nameSplit.length) - 1]

                if (allowedExtensions.includes(extension.toLowerCase()) === false) {
                    return false
                }
            }
        }
        return true
    }

    const onChange = (field, { target }) => {
        setValue(target.value)

        field.onChange(target.files)
        if (target.files.length === 0) {
            setFileReady(null)
        } else {
            if (target.files.length === 1) {
                setFileReady('1 archivo')
            } else {
                setFileReady(`${target.files.length} archivos`)
            }
        }
    }

    return (
        <Grid container
            direction={'row'}
            alignItems={'center'}
            sx={{ pt: 1 }}
        >
            <Grid item xs={5}>
                <Typography sx={{ color: (!!error) ? 'error.main' : '' }}>{name}</Typography>
            </Grid>
            <Grid item xs={7}>
                <Controller
                    control={control}
                    name={label}

                    render={({ field }) => (
                        <FormControl>
                            <input
                                {...field}
                                type="file"
                                value={value}
                                ref={fileInputRef}
                                multiple={multiple}
                                onChange={(e) => onChange(field, e)}
                                style={{ display: 'none' }}
                            />

                            <Button
                                variant={'outlined'}
                                onClick={() => fileInputRef.current.click()}
                                sx={{
                                    color: (!!error) ? 'error.main' : '',
                                    borderColor: (!!error) ? 'error.main' : '',
                                    "&:hover": {
                                        borderColor: (!!error) ? 'error.main' : ''
                                    }
                                }}
                            >
                                {
                                    (!!fileReady)
                                        ? (
                                            <>
                                                {
                                                    (!!error)
                                                        ? <ErrorOutlineOutlined sx={{ mr: 1 }} />
                                                        : <FileDownloadDoneOutlined sx={{ mr: 1 }} />
                                                }
                                                {fileReady}
                                            </>
                                        )
                                        : (
                                            <>
                                                {
                                                    (!!error)
                                                        ? <ErrorOutlineOutlined sx={{ mr: 1 }} />
                                                        : <FileUploadOutlined sx={{ mr: 1 }} />
                                                }
                                                {textButton}
                                            </>
                                        )
                                }
                            </Button>
                            {
                                ((!!error) || (!!helperText))
                                ? (
                                    <FormHelperText error={!!error} sx={{ margin: 0, pl: 1 }}>
                                        {
                                            (!!error)
                                                ? error.message
                                                : `(${helperText})`
                                        }
                                    </FormHelperText>
                                )
                                : null
                            }
                        </FormControl>
                    )}

                    rules={{
                        required: {
                            value: required,
                            message: '*Este campo es obligatorio'
                        },
                        validate: {
                            checkFiles: files => isValidExtensions(files) || '*Archivo con extensión inválida'
                        }
                    }}
                />
            </Grid>
        </Grid>
    )
})
