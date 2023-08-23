import { loadSmplrJs } from './node_modules/@smplrspace/smplr-loader';
import { desks, rooms } from './data.js';

let space;

function initSpace(smplr) {
    const space = new smplr.Space({
            spaceId: "5ebf20ab-fbbe-48b0-8495-2a25a1adf681",
            clientToken: "pub_7e04f7e136dc47f9952476ebf421d315",
            containerId: "container",
            });
    space.startViewer({
        preview: true,
        onReady: () => updateDataLayers(),
        onError: (error) => console.error('Could not start viewer', error),
    });
}

function updateDataLayers() {
    // remove previous layers if any
    space.removeDataLayer('rooms');
    space.removeDataLayer('desks');

    // add new layers
    space.addDataLayer({
        id: 'rooms',
        type: 'polygon',
        data: rooms,
        tooltip: (d) => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
        color: (d) => (d.available ? '#3aa655' : '#ff3f34'),
        alpha: 0.7,
        height: 2.9,
    });
    space.addDataLayer({
        id: 'desks',
        type: 'furniture',
        data: desks,
        tooltip: (d) => `${d.name} - ${d.available ? 'free' : 'occupied'}`,
        color: (d) => (d.available ? '#50b268' : '#f75e56'),
    });
}

// we recommend using the default value 'esm' in your code but stackblitz required 'umd'
loadSmplrJs('umd')
    .then((smplr) => initSpace(smplr))
    .catch((error) => console.error(error));
