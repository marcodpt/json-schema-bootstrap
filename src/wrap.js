export default el => ({
  wrapper,
  ...extra
}) => (wrapper ? wrapper(el) : el)(extra)
