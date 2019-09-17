import server from './index.js'
export function aaa (data) {
  return server.post('itinerarywebapi/searchhistory/getSearchHistory', data)
}
