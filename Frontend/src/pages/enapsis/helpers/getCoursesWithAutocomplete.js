
export const getCoursesWithAutocomplete = (courses) => {
  const options = courses.map( (course) => {
    return { value: course._id, label: `${course.sence} - ${course.activityName}` }
  })
  
  return options
}