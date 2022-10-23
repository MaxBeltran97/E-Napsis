import enapsisApi from "@api/enapsisApi"
import { onHandleCourses, onHandleLoading } from "@reduxSlices/courseSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useCourseStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, activeCourse, courses } = useSelector(state => state.course)

  const startGetCourses = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/course')
      dispatch(onHandleCourses(data))
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleLoading(false))
  }

  const startSavingCourse = async (course) => {
    dispatch(onHandleLoading(true))

    try {
      course = { ...course, 
        attendance: parseInt(course.attendance),
        minCalification: parseFloat(course.minCalification.replace(',','.')),
        minHours: parseInt(course.minHours),
        participantsNumber: parseInt(course.participantsNumber),
        totalHours: parseInt(course.totalHours),
        tellers_id: course.tellers_id.map( item => { return { teller_id: item.value } }),
        participantValue: parseInt(course.participantValue),
        requestDate: new Date(course.requestDate).toISOString().slice(0, 19).replace('T', ' '),
      }
      console.log(course)
      // const { data } = await enapsisApi.post('/course', JSON.stringify(course))
      // console.log(data)
      // navigate('../', {replace: true})
    } catch (error) {
      //TODO Manejar los errores que tira el backend
      console.log(error.response)
    }
    dispatch(onHandleLoading(false))
  }

  return {
    //* Propiedades
    isLoading,
    activeCourse,
    courses,

    //* Metodos
    startGetCourses,
    startSavingCourse
  }
}
