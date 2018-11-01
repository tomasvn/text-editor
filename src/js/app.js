/*
* 1. https://stackoverflow.com/questions/26389745/how-to-count-the-number-of-characters-without-spaces
**/

let selector = {
  'ar': document.querySelector('.js-textarea'),
  'txt': document.querySelector('.js-text'),
  'sl': document.querySelector('.js-slider'),
  'co': document.querySelector('.js-color'),
  'out': document.querySelector('.js-output-value'),
  'btl': document.querySelector('.js-left'),
  'btc': document.querySelector('.js-center'),
  'btj': document.querySelector('.js-justify'),
  'btr': document.querySelector('.js-right'),
  'bta': Array.from(document.querySelectorAll('.js-btn')), /* ES5 [].slice.call(document.querySelectorAll('.js-btn')) */
  'num': document.querySelector('.js-number'),
  'opt': document.querySelector('.js-font-select'),
  'con': document.querySelector('.js-count'),
  'wor': document.querySelector('.js-word'),
  'lim': document.querySelector('.js-char-limit'),
  'bti': document.querySelector('.js-indent'),
  'numInd': document.querySelector('.js-indent-num'),
  'ena': Array.from(document.querySelectorAll('.js-enable'))
}

let body = document.body

let printText = () => {
  selector.txt.innerText = selector.ar.value
  selector.con.innerText = selector.ar.value.length
  /* let str = selector.ar.value

  if(str.replace(/\s/g, "").length >= 40) { //[1.]
    alert('You have more than 40 chars!')
  } */
}

let changeSize = () => {
  selector.txt.style.fontSize = selector.sl.value + 'px'
  selector.out.innerHTML = selector.sl.value
}

let changeColor = () => {
  selector.txt.style.color = selector.co.value
}

let changeRhytm = () => {
  selector.txt.style.lineHeight = selector.num.value
}

let changeFont = () => {
  let index = selector.opt.selectedIndex

  switch (index) {
    case 0: selector.txt.style.fontFamily = 'arial'
      break
    case 1: selector.txt.style.fontFamily = 'serif'
      break
    case 2: selector.txt.style.fontFamily = 'sans-serif'
      break
    case 3: selector.txt.style.fontFamily = 'monospace'
      break
    default: console.log('Not working')
      break
  }
}

let changeLimit = () => {
  /**
   * Cannot use === in if statement for checking equality with number value
   * if I want to use === for equality check convert the value to string or convert it to number
   * or use loose equal, but avoid if possible
   * <input type="number"> returns string
   *
   * if(selector.lim.value === 400) {}
   */

  if (selector.lim.value > '0') {
    // return console.log(typeof(selector.lim.value))
    return selector.ar.setAttribute('maxlength', selector.lim.value)
  }
}

let indentTxt = () => {
  selector.txt.style.marginLeft = selector.numInd.value + 'px'
  // console.log(selector.txt)
}

/*let countWords = () => {

}*/

selector.ar.addEventListener('keyup', printText)
selector.sl.addEventListener('input', changeSize)
selector.co.addEventListener('input', changeColor)
selector.num.addEventListener('input', changeRhytm)
selector.opt.addEventListener('change', changeFont)
selector.lim.addEventListener('input', changeLimit)

selector.bta.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    switch (index) {
      case 0:
        selector.txt.style.textAlign = 'left'
        break
      case 1:
        selector.txt.style.textAlign = 'center'
        break
      case 2:
        selector.txt.style.textAlign = 'justify'
        break
      case 3:
        selector.txt.style.textAlign = 'right'
        break
      case 4:
        selector.txt.style.fontWeight = '300'
        break
      case 5:
        selector.txt.style.fontWeight = '400'
        break
      case 6:
        selector.txt.style.fontWeight = '600'
        break
      case 7:
        selector.txt.style.textDecoration = 'underline'
        break
      case 8:
        body.style.setProperty('--bg', '#003227')
        body.style.setProperty('--text-color', '#c4f5ef')
        break
      case 9:
        body.style.setProperty('--bg', '#fff')
        body.style.setProperty('--text-color', '#000')
        break
      default:
        console.log('No index found')
        break
    }
  })
})

selector.bti.addEventListener('click', indentTxt)

selector.ena.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    switch(index) {
      case 0:
        if (btn.checked === true) {
          selector.con.classList.add('is-visible')
          // console.log(selector.out)

        } else {
          
          selector.con.classList.remove('is-visible')
        }
      break
      case 1:
        if (btn.checked === true) {
          selector.wor.classList.add('is-visible')
          // console.log(selector.out)
        
        } else {
          
          selector.wor.classList.remove('is-visible')
        } 
      break
    }
  })
})