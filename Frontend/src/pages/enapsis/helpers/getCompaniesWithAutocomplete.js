
export const getCompaniesWithAutocomplete = (companies) => {
  const options = companies.map( (company) => {
    return { value: company._id, label: company.fantasyName }
  })
  
  return options
}