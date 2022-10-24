
export const getCalendarCoursesWithAutocomplete = (calendarCourses) => {
  const options = calendarCourses.map( (calendarCourse) => {
    return { value: calendarCourse._id, label: `${calendarCourse.internalCode} - ${calendarCourse.internalName}`}
  })

  return options
}
