import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { ArticleOutlined, Visibility } from '@mui/icons-material'
import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CheckListView } from '.'

export const CheckListShowItem = ({ checkList }) => {

  const { startGetCalendarCourse } = useCalendarCourseStore()

  const [courseName, setCourseName] = useState('')

  const [openViewView, setOpenViewView] = useState(false)

  const getCalendarCourseName = async () => {
    const { internalCode, internalName } = await startGetCalendarCourse(checkList.calendarCourse_id)
    setCourseName(`${internalCode} - ${internalName}`)
  }

  useEffect(() => {
    getCalendarCourseName()
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
        <Grid item xs={8}>
          <Typography sx={{ pl: 1 }} >{courseName}</Typography>
        </Grid>
        <Grid item xs={4}>
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
