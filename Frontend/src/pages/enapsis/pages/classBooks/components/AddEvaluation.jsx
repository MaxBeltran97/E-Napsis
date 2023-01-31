import { ButtonSave, ButtonsChangeSave } from '@components/button'
import { GridInput, GridPaper } from '@components/grid'
import { InputDate, InputText } from '@components/input/generic'
import { InputNumberAdornment } from '@components/input/specific'
import { useCalendarCourseStore } from '@hooks/useCalendarCourseStore'
import { Grid } from '@mui/material'
import { getEvaluationDates } from '@pages/enapsis/helpers'
import React, { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

export const AddEvaluation = ({ calendarCourse_id }) => {

  const { activeEvaluation, evaluations, startSavingEvaluation, startGetCalendarCourse, startGetEvaluations } = useCalendarCourseStore()

  const { handleSubmit, setValue, clearErrors, formState: { errors }, control } = useForm({
    defaultValues: {
      _id: null,
      title: '',
      percentage: '',
      evaluationDate: '',
      calendarCourse_id: null
    }
  })
  useWatch({ control, name: '_id' })
  useWatch({ control, name: 'title' })
  useWatch({ control, name: 'percentage' })
  useWatch({ control, name: 'evaluationDate' })

  const [loading, setLoading] = useState(true)

  const [isModifying, setIsModifying] = useState(false)
  const [formTitle, setFormTitle] = useState('Registrar Evaluación')
  const [calendarCourse, setCalendarCourse] = useState(null)
  const [percentageMax, setPercentageMax] = useState(null)
  const [listEvaluation, setListEvaluation] = useState([])

  const getData = async () => {
    setLoading(true)
    const calendar = await startGetCalendarCourse(calendarCourse_id)
    setCalendarCourse(calendar)
    setValue('calendarCourse_id', calendar?._id)
    
    setLoading(false)
  }

  useEffect(() => {
    if(!!calendarCourse_id) {
      getData()
    }
  }, [calendarCourse_id])

  useEffect(() => {
    let sumaPercentage = 0
    evaluations.map((evaluation) => {
      sumaPercentage += evaluation.percentage
      return evaluation
    })

    if(isModifying) {
      setPercentageMax(100-sumaPercentage+activeEvaluation.percentage)
    }else {
      setPercentageMax(100-sumaPercentage)
    }
  }, [evaluations, isModifying])

  useEffect(() => {
    if (Object.entries(activeEvaluation).length !== 0) {
      setIsModifying(false)
      
      clearErrors()
      setValue('_id', activeEvaluation._id)
      setValue('title', activeEvaluation.title)
      setValue('percentage', activeEvaluation.percentage)
      setValue('evaluationDate', activeEvaluation.evaluationDate)

      setFormTitle('Modificar Evaluación')
      setIsModifying(true)

      setListEvaluation(getEvaluationDates(evaluations.filter(x => {return (x._id !== activeEvaluation._id)})) )
    }
  }, [activeEvaluation])

  const onResetForm = () => {
    clearErrors()
    setValue('_id', null)
    setValue('title', '')
    setValue('percentage', '')
    setValue('evaluationDate', null)

    setFormTitle('Registrar Evaluación')
    setIsModifying(false)

    setListEvaluation(getEvaluationDates(evaluations))
  }

  const onSubmit = (data) => {
    event.preventDefault()
    startSavingEvaluation(data)
    onResetForm()
  }

  useEffect(() => {
    setListEvaluation(getEvaluationDates(evaluations))
  }, [evaluations])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridPaper>
        <Grid item xs={12}>
          <GridInput title={formTitle}>
            <Grid container columnSpacing={4} rowSpacing={0}>
              <Grid item xs={12} lg={6}>
                <InputText control={control} name={'Título'} label={'title'} required={true} error={errors.title} />
                <InputNumberAdornment control={control} name={'% Ponderación'} label={'percentage'} required={true} error={errors.percentage} minValue={0} maxValue={percentageMax} placeholder={`${percentageMax}`} adornment={'%'} position={'end'} withSize={3.5} />
              </Grid> 
              <Grid item xs={12} lg={6}>
                {
                  (loading)
                  ? null
                  : <InputDate control={control} name={'Fecha'} label={'evaluationDate'} required={true} error={errors.evaluationDate} minDate={new Date(calendarCourse?.startDate)} maxDate={new Date(calendarCourse?.endDate)} listErrorDates={listEvaluation} errorListMessage={'*Fecha ya está agregada'} />
                }
              </Grid>
            </Grid>  
          </GridInput>
        </Grid>

        {
          (isModifying)
            ? <ButtonsChangeSave buttonTitle={'Modificar Evaluación'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} onResetForm={onResetForm} />
            : <ButtonSave buttonTitle={'Guardar Evaluación'} errorTitle={'Error al Guardar'} isLoading={false} errorsForm={false} />  
        }
      </GridPaper>
    </form>
  )
}
