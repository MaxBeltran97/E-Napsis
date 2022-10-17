
export const getTellersWithAutocomplete = (tellers) => {
  const options = tellers.map((teller) => {
    return { value: teller._id, label: `${teller.fullName} ${teller.lastName}`}
  })

  return options
}
