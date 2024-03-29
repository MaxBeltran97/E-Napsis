import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { useSettingCompanyStore } from '@hooks/useSettingCompanyStore'
import { ArticleOutlined, Visibility } from '@mui/icons-material'
import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CheckListView } from '.'

export const CheckListShowItem = ({ checkList }) => {

  const { startGetCalendarCourse } = useCalendarCourseStore()
  const { startGetLogo } = useSettingCompanyStore()

  const [courseName, setCourseName] = useState('')
  const [logoName, setLogoName] = useState('generico')

  const [openViewView, setOpenViewView] = useState(false)

  const updateData = async () => {
    const { internalCode, internalName, logo_id } = await startGetCalendarCourse(checkList.calendarCourse_id)
    setCourseName(`${internalCode} - ${internalName}`)

    const { title } = await startGetLogo(logo_id)
    setLogoName(title)
  }

  useEffect(() => {
    updateData()
  }, [])

  const handleOpenViewView = () => {
    setOpenViewView(true)
  }
  const handleCloseViewView = () => {
    setOpenViewView(false)
  }
  
  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'} columnSpacing={1}>
        <Grid item xs={6}>
          <Typography sx={{ pl: 1 }} >{courseName}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ pl: 1 }} >{logoName}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Grid container justifyContent={'space-evenly'} wrap={'wrap'}>
            <Grid item>
              <Tooltip title={'Ver Datos'}>
                <IconButton onClick={handleOpenViewView}>
                  <Visibility />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={'Exportar Check-List'}>
                <IconButton>
                  <ArticleOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Divider />
      </Grid>

      <CheckListView checkList={checkList} open={openViewView} handleClose={handleCloseViewView} />
    </Grid>
  )
}
