
export const getEvaluationDates = (evaluations) => {
  const dates = evaluations.map((evaluation) => {
    return evaluation.evaluationDate
  })

  return dates
}
