
export const getAttendanceDates = (attendances) => {
  const dates = attendances.map((attendance) => {
    return attendance.date
  })

  return dates
}
