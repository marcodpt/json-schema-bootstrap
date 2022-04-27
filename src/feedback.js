export default change => (e, value, validation) => {
  var error = change(value)
  error = validation ? validation(value, error) : error

  e.querySelectorAll('.validate').forEach(ctrl => {
    ctrl.classList.remove('is-'+(error ? '' : 'in')+'valid')
    ctrl.classList.add('is-'+(error ? 'in' : '')+'valid')
  })

  e.querySelectorAll('.invalid-feedback').forEach(feedback => {
    feedback.textContent = error
    feedback.classList[error ? 'remove' : 'add']('d-none')
  })
}
