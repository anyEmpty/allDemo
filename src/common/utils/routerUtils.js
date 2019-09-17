const open = ({ query = {}, name = '', newPage = '', homepath = '' } = {}) => {
  debugger
  let params = ''
  if (query) {
    params = formatQuery(query)
  }
  homepath = homepath ? ('/' + homepath + '/') : `/${location.pathname.split('/')[1]}/`

  let url = `${homepath}${name}${params}`
  console.log(homepath, url)
  if (newPage) {
    window.open(location.protocol + '//' + location.host + url, '_blank')
  } else {
    location.href = url
  }
}
// open()
function formatQuery (query) {
  let params = ''
  if (query) {
    for (var item in query) {
      let vals = query[item]
      if (vals !== undefined) {
        params += item + '=' + query[item] + '&'
      }
    }
  }
  params = params ? '?' + params : params
  return params
}

export default open
