// function myFunction() {
//     alert("Hello from JavaScript!");
//   }

import space from './main.js'

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
    
