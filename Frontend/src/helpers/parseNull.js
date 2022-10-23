
export const parseNull = (value) => {
  if(value === '' || !(!!value)){
    return null
  }else{
    return value
  }
}