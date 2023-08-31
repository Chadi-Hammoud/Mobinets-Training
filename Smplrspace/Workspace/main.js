
import { Desk, Servers, AC, Departments } from './data001.js'


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

const remove = () => {
    space.removeDataLayer("Departments");
    console.log("Dep removed");
}

// console.log(getElementPositionOnScreen("c1f840c9-586f-4d87-b37a-33b5459c6c9d"));


function addPoint() {
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


// export default space;
export default space ;
