import { Desk, Servers, AC, Departments } from './data001.js';

const space = new smplr.Space({
    spaceId: "b6e6acf9-1524-4f2b-a257-c6edd64832e0",
    clientToken: "pub_fc4b7f5e33bd49cf98912c56c404de8c",
    containerId: "container",
});

space.startViewer({
    preview: true,
    loadingMessage: "Hello From Mobinets Workspace",
    mode: '3d',
    allowModeChange: true,
    // onModeChange: ( '2d'),
    onReady: () => {
        console.log("===> View IS READY");
        console.log("===>Calling UpdateDataLayers()");
        updateDataLayers();
        console.log("===>After calling UpdateDataLayers()");
    },
    onError: (error) => console.error("Could not start viewer", error),
})


function updateDataLayers() {
    space.removeDataLayer('IT_Room');


    space.addDataLayer({
        id: "Desk",
        type: 'furniture',
        data: Desk,
        tooltip: (d) => `${d.name} - ${d.Employee == '' ? 'free' : d.Employee}`,
        color: (d) => (d.Employee == '' ? '#f75e56' : '#03fc24'),
    });


    space.addDataLayer({
        id: "Servers",
        type: 'furniture',
        data: Servers,
        tooltip: (d) => `${d.name} - ${d.Brand} -${d.temprature}! ${d.temprature > 65 ? 'Hot Temp' : 'Normal Temp'}`,
        color: (d) => `${d.temprature >= 65 ? '#f75e56' : '#50b268'}`,
    });

    space.addDataLayer({
        id: "AC",
        type: 'furniture',
        data: AC,
        tooltip: (d) => `${d.name} - ${d.Brand}`,
        color: (d) => (d.ON ? '#0398fc' : '#f75e56'),
    });

    space.addDataLayer({
        id: "Departments",
        type: 'polygon',
        data: Departments,
        baseHeight: 0,
        height: 1.5,
        color: (d) => (d.name == 'CEO' ? '#0398fc' : (d.name == 'Seniors' ? '#5feb63' : '#d15c5c')),
        alpha: 0.5,
        tooltip: (d) => `Dep: ${d.name}`,
    })

    console.log(space.getDataLayer("Departments"));

}

// const remove = () => {
//     space.removeDataLayer("Departments");
//     console.log("Dep removed");
// }

// console.log(getElementPositionOnScreen("c1f840c9-586f-4d87-b37a-33b5459c6c9d"));


// const fs = require('fs');
// const path = require('path');
let points = [];
// const Chance = require('chance');

// const chance = new Chance();

// import { iD_Gen } from './idgenerator.js';

const addPointData = (point) => {

    // try{   

    // point.id = 10
    // console.log(point);

    //     let id = iD_Gen;
    //     //let name= chance.letter({ casing: 'upper' }) + chance.integer({ min: 1, max: 9 });
    //     newPoint = point.push(id);
    //     newPoint = point.push(name);
    //     console.log("ID added successuffly!");
    //     console.log("Name added successuffly!");
    // }catch(error){
    //     console.log("cannot add ID or Name to the poit Obj\n"+ error);
    // }

    try {

        // point["id"] = 30;
        // console.log("point:" + point.x);
        points.push(point);
        console.log("Point was successfully added to Points");
        console.log(points)
        space.addDataLayer({
            id: 'points',
            type: 'point',
            data: points,
            diameter: 0.5,
            anchor: 'bottom',
            tooltip: d => d.x,
            onDrop: ({ data, position }) =>
                updatePoint({
                    type: 'update',
                    id: data.id,
                    updates: { position }
                })
        })


    } catch (error) {
        console.log('Point cannot added to the Points array');
    }

}

//////////////To Delete In case the following is works////////////////////////////////////////////////////////
// export const updatePoint = (points, action)=>{
//     if (!Array.isArray(points)) {
//         console.error('points is not an array.');
//         return points;
//       }
//     updatedList =  points.map(points =>points.id === action.id ? { ...points, ...action.updates } : points)

//     // for(let i = 0; i< points.length ; i++){
//     //     points[i].id == action.id ? points[i] = {...points[i], ...action.updates } : points;
//     // }

//     console.log(points);
//     return points;
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updatePoint(action) {
    console.log("action"+ action)
    console.log("points: "+points);
    for (let i = 0; i < points.length; i++) {
        if (points[i].id === action.id) {
            // Merge the updatedData with the existing object
            points[i].position=action.updates.position;
            console.log(points);
            // return { ...points, ...action.updates };
            return points;
        }
    }
    return points; // Return the original object if no update is needed
}

export default space;
export const remove = () => {
    space.removeDataLayer("Departments");
    console.log("Dep removed");
}

export const drawDataLayer = () => updateDataLayers();

function generateSpecificID() {
    const randomID = Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999;
    console.log(randomID);
    return randomID;
}


export const addPoint = () => {
    space.enablePickingMode({
        onPick: ({ coordinates }) => {
            const pID = generateSpecificID();
            // console.log(coordinates);
            let point = {
                id: pID,
                namePoint: "Point",
                position: coordinates
            };
            // addPointData(point);
            points.push(point);
            console.log("Point was successfully added to Points");
            console.log(points)
            space.addDataLayer({
                id: 'points',
                type: 'point',
                data: points,
                diameter: 0.5,
                anchor: 'bottom',
                tooltip: d => d.x,
                onDrag: ({data})=>{console.log(data)},
                onDrop: ({ data, position }) =>
                    updatePoint({
                        type: 'update',
                        id: data.id,
                        updates: { position }
                    })
            })
        }
    })
}

// export const addPoint = () => {
//     space.enablePickingMode({
//         onPick: ({ coordinates }) => {
//             dispatchIcon({
//                 // type: 'add',
//                 icon: {
//                     id: 10,
//                     name:"Icon",
//                     position: coordinates
//                 }
//             });
//             addPointData(coordinates)
//         }
//     })
// }


export const showPoints = () => {
    console.log(points)
    space.addDataLayer({
        id: 'points',
        type: 'point',
        data: points,
        diameter: 0.5,
        anchor: 'bottom',
        tooltip: d => d.x,
        // onDrop: ({ data, position }) =>
        //   dispatchPoint({
        //     type: 'update',
        //     id: data.id,
        //     updates: { position }
        //   })
    })
    // space.addDataLayer({
    //     id: 'icons',
    //     type: 'icon',
    //     data: points,
    //     icon: {
    //         url: '/img/logo.png',
    //         width: 180,
    //         height: 180
    //     },
    //     width: 0.5,
    //     tooltip: d => d.id,
    //     // onDrop: ({ data, position }) =>
    //     //   dispatchIcon({
    //     //     type: 'update',
    //     //     id: data.id,
    //     //     updates: { position }
    //     //   })
    // })

}



