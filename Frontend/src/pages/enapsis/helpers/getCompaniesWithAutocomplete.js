
export const getCompaniesWithAutocomplete = (companies, filter = false) => {
  const options = companies.map( (company) => {
    return { value: company._id, label: company.fantasyName }
  })
  
  if(filter) {
    options.push({ value: -1, label: 'Particular' })
  }

  return options
}