// function myFunction() {
//     alert("Hello from JavaScript!");
//   }
import { evolve, map } from './node_modules/ramda';
import {Group} from './node_modules/@mantine/'

import space from './main.js'
let points =[];


const addPoint = ()=>{
    // function addPoint (){
        space.enablePickingMode({
        onPick: ({ coordinates }) => {
            let new_Coord = [...points, coordinates]
            points = new_Coord;
            console.log(points);
        //   dispatchIcon({
        //     type: 'add',
        //     icon: {
        //       id: chance.guid(),
        //       name:
        //         chance.letter({ casing: 'upper' }) +
        //         chance.integer({ min: 1, max: 9 }),
        //       position: coordinates
        //     }
        //   })
        }
      })
    }