import { loadSmplrJs } from './node_modules/@smplrspace/smplr-loader';


// loadSmplrJs("esm")
//   .then((smplr) => {
//     /* enjoy a fully typed API and auto-completion */
//     const space = new smplr.Space({
//         spaceId: "7d9cb58a-2fd1-43ee-9c0f-4254d78ec166",
//         clientToken: "pub_fc4b7f5e33bd49cf98912c56c404de8c",
//         containerId: "test",
//         // disableErrorReporting: true,

//     });
//     space.startViewer({
//       preview: true,
//       onReady: () => console.log("Viewer is ready"),
//       onError: (error) => console.error("Could not start viewer", error),
//     });
//   })
//   .catch((error) => console.error(error));


const space = new smplr.Space({
    spaceId: "7d9cb58a-2fd1-43ee-9c0f-4254d78ec166",
    clientToken: "pub_fc4b7f5e33bd49cf98912c56c404de8c",
    containerId: "container",
});
space.startViewer({
    preview: true,
    onReady: () => {
        // updateDataLayers();
        console.log("Viewer is ready");
    },
    onError: (error) => console.error("Could not start viewer", error),
});


// space.startViewer({
//     preview?: boolean,
//     loadingMessage?: string,
//     mode?: '2d' | '3d',
//     allowModeChange?: boolean,
//     onModeChange?: (mode: '2d' | '3d') => void,
//     onReady?: () => void,
//     onError?: (error: string | Error) => void,
//     ...customUX: object
//   }) 



// function updateDataLayers() {
//     space.removeDataLayer('Servers');
//     space.addDataLayer({
//         id: "8f08beb8-2627-44d6-add4-19a380b55912",
//         type: 'furniture',
//         data: Servers,
//         tooltip: (d) => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
//         color: (d) => (d.name == 'Desk1' ? '#50b268' : '#f75e56'),
//     });

// }