import { InputForm } from '@components/input/InputForm'
import { getEnvVariables } from '@helpers/getEnvVariables'
import { ErrorOutline, FileDownloadDoneOutlined, FileUploadOutlined } from '@mui/icons-material'
import { Button, FormControl, FormHelperText, Grid, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'

export const InputLogo = ({ control, name, label, error, helperText, allowedExtensions = [], logo }) => {
  const [fileReady, setFileReady] = useState(null)
  const [image, setImage] = useState(null)
  const [value, setValue] = useState('')

  const imageURL = useWatch({control, label})

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

  const isFile = (file) => {
    if(!!file.name) {
      return true
    }
    return false
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

  useEffect(() => {
    if(typeof imageURL.logo_img === "string") {
      setImage(null)
      setValue('')
      setFileReady(null)
    }
  }, [imageURL])

  return (
    <InputForm name={name} active={false} error={!!error}>

      <Grid container>
        <Grid item xs={12}>
          {
            (!!image)
              ? (<img src={URL.createObjectURL(image)} width={110} />)
              : (logo.logo_img === '-' || !!logo)
                ? null
                : (<img src={`${VITE_API_URL}/logos/get_image/${logo.logo_img}`} width={110}/>)
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
                          Subir Logo
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
                checkFiles: file => isValidExtensions(file) || '*Archivo con extensión inválida',
                checkFile: file => isFile(file) || '*Logo Obligatorio'
              }
            }}
          />
        </Grid>
      </Grid>
    </InputForm>
  )
}
