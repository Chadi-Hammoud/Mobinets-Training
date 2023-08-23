import { loadSmplrJs } from "./node_modules/@smplrspace/smplr-loader";
// import { office } from "./data.js"

loadSmplrJs("esm")
    .then((smplr) => {
        const space = new smplr.Space({
            // spaceId: "7d9cb58a-2fd1-43ee-9c0f-4254d78ec166",
            // clientToken: "pub_fc4b7f5e33bd49cf98912c56c404de8c",
            
            spaceId:"de022c7b-ba57-428a-8eea-7f1a2189a2ac",
            clientToken:"pub_fc4b7f5e33bd49cf98912c56c404de8c",            
            containerId: "container",
        });
        space.startViewer({
            preview: false,
            mode: '3d' ,
            onReady: () => {
                // updateDataLayers();
                console.log("Viewer is ready");
            },
            onError: (error) => console.error("Could not start viewer", error),
        });

    })
    .catch((error) => console.error(error));






// function updateDataLayers() {
//     // remove previous layers if any
//     space.removeDataLayer('office');

//     // space.addDataLayer({
//     //     id: "office",
//     //     type: 'furniture',
//     //     data: office,
//     //     color: (d) => (d.available ? '#50b268' : '#f75e56'),
//     // })
    
//     // space.addDataLayer({
//     //     id: 'desks',
//     //     type: 'furniture',
//     //     data: desks,
//     //     tooltip: (d) => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
//     //     color: (d) => (d.available ? '#50b268' : '#f75e56'),
//     //     alpha: 0.7,
//     //     // height: 2.9,
//     // });

//     space.addDataLayer({
//         id: "office",
//         type: 'polygon',
//         color:(d) => (d.available ? '#50b268' : '#f75e56'),
//         alpha:0.5,
//       })




// }
