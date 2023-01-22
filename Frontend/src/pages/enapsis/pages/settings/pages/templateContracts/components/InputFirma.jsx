import { InputForm } from '@components/input/InputForm'
import { getEnvVariables } from '@helpers/getEnvVariables'
import { ErrorOutline, FileDownloadDoneOutlined, FileUploadOutlined } from '@mui/icons-material'
import { Button, FormControl, FormHelperText, Grid, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

export const InputFirma = ({ control, name, label, error, helperText, allowedExtensions = [], contract }) => {
  const [fileReady, setFileReady] = useState(null)
  const [image, setImage] = useState(null)
  const [value, setValue] = useState('')

  const fileInputRef = useRef()
  const { VITE_API_URL } = getEnvVariables()

  const isValidExtensions = (file) => {

    if(!!file.name) {
      const nameSplit = file.name.split('.')
      const extension = nameSplit[(nameSplit.length) - 1]

      if(allowedExtensions.includes(extension.toLowerCase()) === false) {
        return false
      }
    }

    return true
  }

  const onChange = (field, { target }) => {
    setValue(target.value)

    const files = [...target.files]

    field.onChange(files[0])
    setImage(files[0])
    if (target.files.length === 0) {
      setFileReady(null)
    } else {
      setFileReady('archivo subido')
    }
  }

  return (
    <InputForm name={name} active={false} error={!!error}>

      <Grid container>
        <Grid item xs={12}>
          {
            (image)
              ? (<img src={URL.createObjectURL(image)} width={200} />)
              : (contract.representativeSignature === '-')
                ? null
                : (<img src={`${VITE_API_URL}/templates/contract/get_image/${contract._id}`} width={200}/>)
          }
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name={label}

            render={({ field }) => (
              <FormControl>
                <input
                  {...field}
                  type='file'
                  value={value}
                  ref={fileInputRef}
                  onChange={(e) => onChange(field, e)}
                  style={{ display: 'none' }}
                />

                <Button
                  variant={'outlined'}
                  onClick={() => fileInputRef.current.click()}
                  sx={{
                    color: (!!error) ? 'error.main' : '',
                    borderColor: (!!error) ? 'error.main' : '',
                    '&:hover': {
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
                              ? <ErrorOutline sx={{ mr: 1 }} />
                              : <FileDownloadDoneOutlined sx={{ mr: 1 }} />
                          }
                          {fileReady}
                        </>
                      )
                      : (
                        <>
                          {
                            (!!error)
                              ? <ErrorOutline sx={{ mr: 1 }} />
                              : <FileUploadOutlined sx={{ mr: 1 }} />
                          }
                          Subir Firma
                        </>
                      )
                  }
                </Button>

                {
                  ((!!error) || (!!helperText))
                    ? (
                      <FormHelperText error={!!error} sx={{ m: 0, pl: 1 }}>
                        {
                          (!!error)
                            ? error.message
                            : `(${helperText})`
                        }
                      </FormHelperText>
                    ) : null
                }
              </FormControl>
            )}

            rules={{
              validate: {
                checkFiles: file => isValidExtensions(file) || '*Archivo con extensión inválida'
              }
            }}
          />
        </Grid>
      </Grid>
    </InputForm>
  )
}
