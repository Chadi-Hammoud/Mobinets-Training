// function myFunction() {
//     alert("Hello from JavaScript!");
//   }
// import { evolve, map } from './node_modules/ramda';
// import { Group } from './node_modules/@mantine/'

// import space from './main.js'
// let points = [];

import { drawDataLayer, remove, addPoint, showPoints, disablePick, removePoint, callOnClick  } from './main.mjs'


document.getElementById('btn1').onclick = () => {
  remove();
}

document.getElementById('btn2').onclick = () => {
  drawDataLayer();
}

document.getElementById('btn3').onclick = () => {
  addPoint();
}

document.getElementById('btn4').onclick = () => {
  showPoints();
}

document.getElementById('btn5').onclick = () => {
  disablePick();
}

document.getElementById('btn6').onclick = () => {
  removePoint();
}
document.getElementById('btn7').onclick = () => {
  callOnClick();
}


