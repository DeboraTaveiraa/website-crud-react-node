export const getNomeTipo = (value) => {  

  // if (value === 1) {
  //   return 'Adminstrador'
  // } else if (value === 2) {
  //   return 'Gerente'
  // } else if (value === 3) {
  //   return 'Funcionário'
  // }
  // return ''

  let arr = ['Adminstrador', 'Gerente', 'Funcionário']
  return arr[value-1]
  
}