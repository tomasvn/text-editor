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
  'con': document.querySelector('.js-count')
}

let printText = () => {
  selector.txt.innerText = selector.ar.value
  selector.con.innerText = selector.ar.value.length
  /*let str = selector.ar.value
  
  if(str.replace(/\s/g, "").length >= 40) { //[1.]
  	//alert('You have more than 40 chars!')
  }*/
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
  
  switch(index) {
    case 0: selector.txt.style.fontFamily = 'arial'
    break;
    case 1: selector.txt.style.fontFamily = 'serif'
    break;
    case 2: selector.txt.style.fontFamily = 'sans-serif'
    break;
    case 3: selector.txt.style.fontFamily = 'monospace'
    break;
    default: console.log('Not working')
    break;
  }
}

selector.ar.addEventListener('keyup', printText)
selector.sl.addEventListener('input', changeSize)
selector.co.addEventListener('input', changeColor)
selector.num.addEventListener('input', changeRhytm)
selector.opt.addEventListener('change', changeFont)

selector.bta.forEach((btn, index) => {
	btn.addEventListener('click', () => {
  	switch(index) {
	  case 0:
      	//console.log(selector.txt)
        selector.txt.style.textAlign = 'left'
      break;
      case 1:
      	selector.txt.style.textAlign = 'center'
      break;
      case 2:
      	selector.txt.style.textAlign = 'justify'
      break;
      case 3:
      	selector.txt.style.textAlign = 'right'
      break;
      default:
      	console.log('No index found')
      break;
    }
  })	
})
