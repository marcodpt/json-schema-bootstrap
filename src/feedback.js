export default change => (e, value) => {
  const error = change(value)

  e.querySelectorAll('.validate').forEach(ctrl => {
    ctrl.classList.remove('is-'+(error ? '' : 'in')+'valid')
    ctrl.classList.add('is-'+(error ? 'in' : '')+'valid')
  })

  e.querySelectorAll('.invalid-feedback').forEach(feedback => {
    feedback.textContent = error
    feedback.classList[error ? 'remove' : 'add']('d-none')
  })
}
