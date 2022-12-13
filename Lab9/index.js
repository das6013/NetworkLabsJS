const labelText = document.querySelector('#editText');
let btn = document.querySelectorAll('button');
let d = document.querySelector('.container').innerHTML.split('');


  Array.prototype.randomColor = function() {
    let html = '';
    this.map( (letter) => {
      let color = "red";
      html +=
        "<span style=\"color:" + color + "\">"
        + letter +
        "</span>";
    }) 
    return html;
  };
  //document.querySelector('.container').innerHTML = d.randomColor();

const addElem = (n) => {
    let k=labelText.value.toString().length;
    let str=labelText.value;
   // document.querySelector('#editText').innerHTML = labelText.innerHTML.split('').randomColor();
    if(labelText.value==0 && n!="." && labelText.value.toString().length<2){
        labelText.value=n;
    }
    else
        labelText.value+=n;
}

const addZnak = (n) => {
    labelText.value+=" " + n + " ";
}

const equal = () => {
    labelText.value = eval(labelText.value.toString());
}

const clearAll = () => {
    labelText.value="0";
}
const removeLast = () => {
    let textContent = labelText.value.toString();
    if(textContent[textContent.length-2]==" "){
        labelText.value = textContent.substring(0,textContent.length-1);
        textContent = labelText.value.toString();
    }
    labelText.value = textContent.substring(0,textContent.length-1);
}
document.addEventListener('keydown', (event) => {
    if (event.code == 'Equal' || event.code == 'Enter') {
        equal();
      }
      if (event.code == 'NumpadSubtract') {
        addZnak('-');
      }
      if (event.code == 'NumpadAdd') {
        addZnak('+');
      }
      if (event.code == 'NumpadMultiply') {
        addZnak('*');
      }
      if (event.code == 'NumpadDecimal') {
        addElem('.');
      }
      if (event.code == 'NumpadDivide') {
        addZnak('/');
      }
      if (event.code == 'Backspace') {
        removeLast();
      }
      if (event.code == 'KeyC') {
        clearAll();
      }
      if (event.code == 'Digit1' || event.code == 'Numpad1') {

        addElem('1');
      }
      if (event.code == 'Digit2' || event.code == 'Numpad2') {
        addElem('2');
      }
      if (event.code == 'Digit3' || event.code == 'Numpad3') {
        addElem('3');
      }
      if (event.code == 'Digit4' || event.code == 'Numpad4') {
        addElem('4');
      }
      if (event.code == 'Digit5' || event.code == 'Numpad5') {
        addElem('5');
      }
      if (event.code == 'Digit6' || event.code == 'Numpad6') {
        addElem('6');
      }
      if (event.code == 'Digit7' || event.code == 'Numpad7') {
        addElem('7');
      }
      if (event.code == 'Digit8' || event.code == 'Numpad8') {
        addElem('8');
      }
      if (event.code == 'Digit9' || event.code == 'Numpad9') {
        addElem('9');
      }
      if (event.code == 'Digit0' || event.code == 'Numpad0') {
        addElem('0');
      }
})
