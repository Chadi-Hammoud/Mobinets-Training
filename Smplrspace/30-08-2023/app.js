// import { loadSmplrJs } from './node_modules/@smplrspace/smplr-loader';
import { evolve, map } from './node_modules/ramda';
// import { beacons, sensors, stalls } from './data';

const INITIAL_MODE = '3d';

let space;

const autoElevation = (mode) =>
  map(
    evolve({
      position: { elevation: (value) => (mode === '3d' ? value : 0) },
    })
  );

function initSpace(smplr) {
  space = new smplr.Space({
    spaceId: "b6e6acf9-1524-4f2b-a257-c6edd64832e0",
    clientToken: "pub_fc4b7f5e33bd49cf98912c56c404de8c",
    containerId: "container",
  });
  space.startViewer({
    preview: true,
    mode: INITIAL_MODE,
    allowModeChange: true,
    onModeChange: (mode) => updateDataLayers(mode),
    onReady: () => updateDataLayers(INITIAL_MODE),
    onError: (error) => console.error('Could not start viewer', error),
  });
}

function updateDataLayers(mode) {
  // remove previous layers if any
//   space.removeDataLayer('stalls');
//   space.removeDataLayer('sensors');
//   space.removeDataLayer('beacons');
//   space.removeDataLayer('beacons-range');

//   // add new layers
//   space.addDataLayer({
//     id: 'stalls',
//     type: 'polygon',
//     data: stalls,
//     tooltip: (d) => `${d.name} - ${d.hits} hits`,
//     color: (d) =>
//       d.hits < 8 ? '#3aa655' : d.hits < 16 ? '#c08727' : '#ff3f34',
//     alpha: 0.7,
//     height: mode === '3d' ? 1.9 : 0.0045,
//   });
//   space.addDataLayer({
//     id: 'sensors',
//     type: 'point',
//     data: autoElevation(mode)(sensors),
//     tooltip: (d) => `Sensor ${d.id}`,
//     color: '#357afc',
//     diameter: 0.4,
//   });
//   space.addDataLayer({
//     id: 'beacons',
//     type: 'point',
//     data: autoElevation(mode)(beacons),
//     tooltip: (d) => `${d.id} - range: ${d.range}m`,
//     color: '#3a3c3c',
//     diameter: 0.25,
//   });
//   space.addDataLayer({
//     id: 'beacons-range',
//     type: 'point',
//     data: autoElevation(mode)(beacons),
//     color: '#727676',
//     alpha: 0.3,
//     diameter: (d) => d.range,
//   });
}

// we recommend using the default value 'esm' in your code but stackblitz required 'umd'
loadSmplrJs('umd')
  .then((smplr) => initSpace(smplr))
  .catch((error) => console.error(error));
