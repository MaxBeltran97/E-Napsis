import { memo, useEffect, useRef, useState } from "react"
import { useFieldArray } from "react-hook-form"

import { Delete, ErrorOutline, FileUploadOutlined, TaskOutlined } from "@mui/icons-material"
import { Button, Fab, FormControl, FormHelperText, Grid, Tooltip, Typography } from "@mui/material"

export const InputFilesView = memo(({ control, name, label, error, required = false, multiple = false, helperText, textButton, allowedExtensions = [], withSize = 7 }) => {
  const [arrayErrors, setArrayErrors] = useState([])
  const [uploadActive, setUploadActive] = useState(true)
  const [value, setValue] = useState('')
  const { fields: items, append: appendItem, remove: removeItem } = useFieldArray({ control, name: label, rules: { required: {value: required, message: '*El archivo es obligatorio'} , validate: { checkFiles: files => isValidExtensions(files) || '*Extensiones Inválidas' } } })

  const fileInputRef = useRef()

  const addNewFile = (file) => {
    appendItem({ title: file.name, file: file })
  }

  useEffect(() => {
    if (!multiple) {
      if (items.length === 1) {
        setUploadActive(false)
      } else {
        setUploadActive(true)
      }
    }
  }, [items])


  const onChange = ({ target }) => {
    setValue(target.value)

    for (const file of target.files) {
      addNewFile(file)
    }
  }

  const isValidExtensions = (files) => {
    const errors = []
    if (files?.length > 0) {
      files.forEach((file, index) => {
        const nameSplit = file.file.name.split('.')
        const extension = nameSplit[(nameSplit.length) - 1]

        if (allowedExtensions.includes(extension.toLowerCase()) === false) {
          errors.push(index)
        }
      })
    }

    if (errors.length === 0) {
      setArrayErrors([])
      return true
    } else {
      setArrayErrors(errors)
      return false
    }
  }

  const formattedTitle = (title) => {
    return (title.length > 12)
      ? title.substring(0, 12) + '...'
      : title
  }

  return (
    <Grid container sx={{ pt: 1 }} alignItems='center'>
      <Grid item xs={5} lg={(12 - withSize)}>
        <Typography sx={{ color: (!!error) ? 'error.main' : '' }} >{name}</Typography>
      </Grid>
      <Grid item xs={7} lg={withSize}>
        <Grid container spacing={1} direction={'row'} >
          {
            items.map((field, index) => (
              <Grid item key={field.id} xs={6} lg={3} xl={2}>
                <Grid container direction={'column'} alignItems={'center'}
                  sx={{
                    position: 'relative', p: 2,
                    border: '1px solid',
                    borderColor: (arrayErrors.includes(index)) ? 'error.main' : 'rgba(0,0,0,0.2)',
                    borderRadius: 1
                  }}
                >
                  <Fab onClick={() => removeItem(index)}
                    size={'small'}
                    color={'error'}
                    sx={{ position: 'absolute', right: 4, top: 4 }}
                  >
                    <Delete fontSize="small" />
                  </Fab>
                  <Grid item>
                    {
                      (arrayErrors.includes(index))
                        ? <ErrorOutline sx={{ fontSize: 40 }} color={'error'} />
                        : <TaskOutlined sx={{ fontSize: 40 }} color={'primary'} />
                    }
                  </Grid>
                  <Grid item>
                    <Tooltip title={field.title}>
                      <Typography sx={{ mt: 1, color: (arrayErrors.includes(index)) ? 'error.main' : '', }} >{formattedTitle(field.title)}</Typography>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            ))
          }
        </Grid>
        <FormHelperText error={true} sx={{ m: 0, pl: 1 }}>
          {
            (!!error && items.length > 0)
              ? `${error.root?.message}`
              : null
          }
        </FormHelperText>

        <FormControl>
          <input
            type='file'
            value={value}
            ref={fileInputRef}
            multiple={multiple}
            onChange={(e) => onChange(e)}
            style={{ display: 'none' }}
          />

          <Button
            variant={'outlined'}
            onClick={() => fileInputRef.current.click()}
            disabled={!multiple && !uploadActive}
            sx={{
              mt: 1,
              color: (!!error) ? 'error.main' : '',
              borderColor: (!!error) ? 'error.main' : '',
              '&:hover': {
                borderColor: (!!error) ? 'error.main' : ''
              }
            }}
          >
            <FileUploadOutlined sx={{ mr: 1, color: (!!error) ? (!multiple && !uploadActive) ? '' : 'error.main' : '' }} />
            {textButton}
          </Button>
          <FormHelperText disabled={!multiple && !uploadActive} error={(!!error) ? (!multiple && !uploadActive) ? false : true : false } sx={{ m: 0, pl: 1 }}>
            {
              (!!error && items.length === 0)
                ? error.root.message
                : `(${helperText})`
            }
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  )
})