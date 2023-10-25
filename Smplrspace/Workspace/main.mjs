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
export const callOnClick = () => {
    space.addDataLayer({
        id: 'points',
        type: 'point',
        data: points,
        onClick: (data) => {
            tempPoint = data;
            console.log(tempPoint)
        },
        diameter: 0.5,
        anchor: 'bottom',
        tooltip: d => d.id,
        onDrop: ({ data, position }) => {
            dispatchPoint({
                type: 'update',
                id: data.id,
                updates: { position }
            });
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
        onDrop: ({ data, position }) => {
            console.log("data: " + JSON.stringify(data));
            console.log("position: " + JSON.stringify(position));

            // updatePoint({
            dispatchPoint({
                type: 'update',
                id: data.id,
                updates: { position }
            });
        }
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
    console.log("action" + JSON.stringify(action))
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
            // const pID = generateSpecificID();
            // console.log(coordinates);
            dispatchPoint({
                type: 'add',
                point: {
                    id: generateSpecificID(),
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
        onclick: () => callOnClick(),
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
    return pt.id = tempPoint.id;
}

export const removePoint = () => {
    let newPoints = points.filter(obj => obj.id !== tempPoint.id);
    console.log("tempPoint " + tempPoint);
    points = newPoints;
    console.log("Point " + tempPoint.id + " was removed successfully");

    // showPoints();
    // addPointDataLayer();
    callOnClick();
    // return points;
}


export const addIcon = () => {
    space.addDataLayer({
        id: "ICON",
        type: 'icon',
        data: [{
            id: 25732,
            position: {
                elevation: 0.002000000095002008,
                levelIndex: 0,
                x: -13.363932241143681,
                z: -12.063679434409908
            },

        }],
        icon: {
            url: "data:image/jpeg;base64,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",
            width: 104,
            height: 142
        },
        width: 1,
        onClick: (data) => {
            console.log(data);
            console.log("Temp: " + JSON.stringify(tempPoint));
            // console.log(points);
        },
        onDrag: (data) => {
            console.log(data);},
        onDrop: ({ data, position })=>{
            console.log(data);
            console.log(position);
        }
    })
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

