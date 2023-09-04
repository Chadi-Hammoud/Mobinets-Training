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
        console.log("===>Calling UpdateDataLayers()");
        updateDataLayers();
        callOnClick();
        console.log("===> View IS READY");
    },
    onError: (error) => console.error("Could not start viewer", error),
})

let tempPoint;
///////////////////////
// space.addDataLayer({
//     tooltip: d => d.id,
//     onClick: (data) => {
//         tempPoint = data;
//         console.log(tempPoint)
//     }
// })
//////////////////////////////
export const callOnClick = ()=>{
    space.addDataLayer({
        // id:'point',
        // type: 'point',
        // data: [],
        onClick: (data) => {
            tempPoint = data;
            console.log(tempPoint)
        }
    })
}


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


const addPointDataLayer = () => {
    space.addDataLayer({
        id: 'points',
        type: 'point',
        data: points,
        diameter: 0.5,
        anchor: 'bottom',
        tooltip: d => d.id,
        onClick: (data) => {
            console.log(data);
            tempPoint = data;
            console.log("Temp: " + JSON.stringify(tempPoint));
            // console.log(points);
        },
        onDrop: ({ data, position }) =>
            // updatePoint({
            dispatchPoint({
                type: 'update',
                id: data.id,
                updates: { position }
            })
    })
}



// const consoleDataPoint =()=>{




// }

let points = [];

const addPointData = (point) => {

    try {
        points.push(point);
        console.log("Point was successfully added to Points");
        // console.log(points)

        addPointDataLayer();
    } catch (error) {
        console.log('Point cannot added to the Points array');
    }

}

function updatePoint(action) {
    console.log("action" + action)
    console.log("points: " + points);
    for (let i = 0; i < points.length; i++) {
        if (points[i].id === action.id) {
            points[i].position = action.updates.position;
            console.log(points);
            return points;
        }
    }
    return points;
}

export default space;
export const remove = () => {
    space.removeDataLayer("Departments");
    console.log("Dep removed");
}

export const drawDataLayer = () => updateDataLayers();

const generateSpecificID = () => {
    const randomID = Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999;
    console.log(randomID);
    return randomID;
}


export const addPoint = () => {
    space.enablePickingMode({
        onPick: ({ coordinates }) => {
            const pID = generateSpecificID();
            // console.log(coordinates);
            dispatchPoint({
                type: 'add',
                point: {
                    id: pID,
                    namePoint: "Point",
                    // type: 'point',
                    position: coordinates
                }
            });
            // addPointData(point);
        }
    })
}


export const showPoints = () => {
    console.log(points)
    space.addDataLayer({
        id: 'points',
        type: 'point',
        data: points,
        onclick: (data) => callOnClick(),
        diameter: 0.5,
        anchor: 'bottom',
        tooltip: d => d.id,
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
// const displayData = (data) => {
//     tempPoint = data;
//     console.log(data);
//     return tempPoint;
// }

export const disablePick = () => {
    space.disablePickingMode()
}


function checkPtID(pt) {
    return pt.id =tempPoint.id;
  }

export const removePoint = () => {
    let newPoints = points.filter(obj => obj.id !== tempPoint.id);
    console.log("tempPoint " + tempPoint);
    points = newPoints;
    console.log("Point " + tempPoint.id + " was removed successfully");
    addPointDataLayer();
    showPoints();
    callOnClick();
    // return points;
}



const dispatchPoint = (action) => {
    switch (action.type) {
        case 'add':
            addPointData(action.point);
            break;
        //   return [...points, action.point]
        case 'update':
            updatePoint(action)
            break;
        // return points.map(pt =>
        //     pt.id === action.id ? { ...pt, ...action.updates } : pt
        // )
        case 'remove':
            // return reject(r => r.id === action.id)(points)
            removePoint(tempPoint.id);
            // removePoint(action.point.id);
            break;
        default:
            console.error(`Unknown action type ${action.type}`)
    }
}

