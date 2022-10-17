import { memo, useRef, useState } from "react"
import { Controller } from "react-hook-form"

import { ErrorOutline, FileDownloadDoneOutlined, FileUploadOutlined } from "@mui/icons-material"
import { Button, FormControl, FormHelperText } from "@mui/material"
import { InputForm } from "../InputForm"

export const InputFile = memo(({ control, name, label, required = false, error, textButton, helperText, allowedExtensions = [], multiple = false }) => {
  const [fileReady, setFileReady] = useState(null)
  const [value, setValue] = useState('')

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
    <InputForm name={name} active={false} error={!!error}>
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
                      {textButton}
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
              ): null
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
    </InputForm>
  )
})
