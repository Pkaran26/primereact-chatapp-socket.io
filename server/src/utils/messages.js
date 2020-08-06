export const dbError = (e)=>{
  console.log(e)
  return {
    status: false,
    message: 'db error'
  }
}

export const dbMessage = (status, msg)=>{
  return {
    status: status,
    message: msg
  }
}
