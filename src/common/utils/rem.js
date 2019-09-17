let rem = (doc = document, win = window) => {
  let docEl = doc.documentElement
  let oHeight = docEl.offsetHeight
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = () => {
    let nHeight = docEl.offsetHeight
    let foots = docEl.querySelectorAll('.footPop')
    if (oHeight - nHeight > 50) {
      for (let i = 0; i < foots.length; i++) {
        foots[i].style.display = 'none'
      }
    } else {
      for (let i = 0; i < foots.length; i++) {
        foots[i].style.display = 'block'
      }
    }
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return ''
    if (clientWidth >= 750) {
      docEl.style.fontSize = '100px'
    } else {
      docEl.style.fontSize = 50 * (clientWidth / 375) + 'px'
    }
  }
  if (!doc.addEventListener) return ''
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}

export default rem
