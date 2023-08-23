// import "./style.css";
import { loadSmplrJs } from './node_modules/@smplrspace/';
import { desks, rooms } from './data.js';

let space;

function initSpace(smplr) {
  space = new smplr.Space({
    spaceId: 'f438671f-9979-42c6-8338-05c0015abb2d',
    clientToken: 'pub_eb760fee77634cdab2fe31146fc371c2',
    containerId: 'test',
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
  loadSmplrJs('esm')
    .then((smplr) => initSpace(smplr))
    .catch((error) => console.error(error));
  