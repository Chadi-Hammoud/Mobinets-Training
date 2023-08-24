////////////////////////////////////////////////////////////////////////
export const Servers = [
  {
    groupName: "Servers",
    layerType: "furniture",
    smplrUuid: "85c71216-9869-430b-b985-0195df352546",
    name: "Server1",
    type: "CISCO",
    temprature: 75,
    furnitureId: "8f08beb8-2627-44d6-add4-19a380b55912"
  },
  {
    groupName: "Servers",
    layerType: "furniture",
    smplrUuid: "0014c1d2-8780-428d-bc42-be25d8f01fcb",
    name: "Server2",
    type: "Dell",
    temprature: 60,
    furnitureId: "39a8ad5d-ad31-4633-b5b2-86982ad3aae0"
  },
  {
    groupName: "Servers",
    layerType: "furniture",
    smplrUuid: "0848602c-c2c6-4c31-91ee-0930133fe5db",
    name: "Server3",
    type: "IBM",
    temprature: 50,
    furnitureId: "bc7cbee0-c548-4b8a-bdd6-83bc00eda81e"
  },]

////////////////////////////////////////////////////////////////////////
export const Desk = [{
  groupName: "Desk",
  layerType: "furniture",
  smplrUuid: "8e58d216-b0f8-43c3-ba0f-38ccdf51667c",
  name: "Desk1",
  employee: "AbdAlrahman",
  furnitureId: "b5e3477f-c5b0-4339-9148-1037034f5a78"
},
{
  groupName: "Desk",
  layerType: "furniture",
  smplrUuid: "3d46931f-97d9-4635-9672-fb41dec7cc09",
  name: "Desk2",
  employee: "Mohamad",
  furnitureId: "a8026116-1306-4bf9-a940-1112dff3f7a4"
},

];

////////////////////////////////////////////////////////////////////////
export const Laptop = [
  {
    groupName: "Laptop",
    layerType: "furniture",
    smplrUuid: "84fc0e42-f5fb-482c-bdad-ce4ae1d83f30",
    name: "Lap1",
    employee: "Chadi",
    furnitureId: "04082a37-1515-4621-8245-c63cb2f243b1"
  }
];


////////////////////////////////////////////////////////////////////////
export const Points = [
  {
    layerType: "point",
    smplrUuid: "6706a88a-7c17-472b-a13d-72ca68089f88",
    name: "Enterence",
    levelIndex: "0",
    position: {x:4.4162787343712715,z:-3.9701508090869697,elevation:2.7805892395820493,levelIndex:0},
    coordinates: ""
  },
];

////////////////////////////////////////////////////////////////////////
export const Rooms = 
// [
//   {
//     groupName: "Room",
//     layerType: "polygon",
//     smplrUuid: "fbf24d64-8d27-4817-81ac-53450b6b62e2",
//     name: "ServerRoom",
//     levelIndex: "",
//     position: "",
//     coordinates: [
//       {x:2.9824074418198796,z:-6.961352299245758,levelIndex:0},
//       {x:2.9360130425310524,z:-5.0689359673663965,levelIndex:0},
//       {x:12.935890648729387,z:-5.045916665429002,levelIndex:0},
//       {x:13.010551415649926,z:-6.991195200692417,levelIndex:0}
//     ]
//   },
//   {
//     groupName: "Room",
//     layerType: "polygon",
//     smplrUuid: "8786a668-2925-4274-8820-d4e4f2aabc1f",
//     name: "OfficePoom",
//     levelIndex: "",
//     position: "",
//     coordinates: [
//       {x:3.023119699632246,z:-3.0751050266603066,levelIndex:0},
//       {x:8.797315968393033,z:-3.0760284216134983,levelIndex:0},
//       {x:8.798347043963968,z:-0.9403615008529689,levelIndex:0},
//       {x:2.972204937136164,z:-0.9570695684114972,levelIndex:0}
//     ]
//   },
//   {
//     groupName: ""
//   }
// ];

[
  {
    groupName: "Room",
    layerType: "polygon",
    smplrUuid: "fbf24d64-8d27-4817-81ac-53450b6b62e2",
    name: "ServerRoom",
    furnitureId: "",
    levelIndex: "",
    position: "",
    coordinates: [{x:2.9824074418198796,z:-6.961352299245758,levelIndex:0},{x:2.9360130425310524,z:-5.0689359673663965,levelIndex:0},{x:12.935890648729387,z:-5.045916665429002,levelIndex:0},{x:13.010551415649926,z:-6.991195200692417,levelIndex:0}]
  },
  {
    groupName: "Room",
    layerType: "polygon",
    smplrUuid: "8786a668-2925-4274-8820-d4e4f2aabc1f",
    name: "OfficePoom",
    furnitureId: "",
    levelIndex: "",
    position: "",
    coordinates: [{x:3.023119699632246,z:-3.0751050266603066,levelIndex:0},{x:8.797315968393033,z:-3.0760284216134983,levelIndex:0},{x:8.798347043963968,z:-0.9403615008529689,levelIndex:0},{x:2.972204937136164,z:-0.9570695684114972,levelIndex:0}]
  },
  {
    groupName: ""
  }
]

////////////////////////////////////////////////////////////////////////
export const Polyline = [
  {
    groupName: "Polyline",
    layerType: "polyline",
    smplrUuid: "20947884-12a1-41b7-b96c-7378d154ca6f",
    name: "p1",
    levelIndex: "",
    position: "",
    coordinates: [{
      x: 10.099920489560006,
      z: -4.951072297576904,
      elevation: 2.970654143123502,
      levelIndex: 0
    },
    { x: 10.95188743224198, z: -3.7651046618245574, elevation: 0.0020000000949984553, levelIndex: 0 },
    { x: 9.493629577164377, z: -3.569621768756785, elevation: 0.0020000000949984553, levelIndex: 0 }, 
    { x: 9.40801607345321, z: -4.675923544196466, elevation: 0.0020000000949949026, levelIndex: 0 },
    { x: 9.846429479714292, z: -4.956407702872303, elevation: 3.0000000000000018, levelIndex: 0 }]
  },
  {
    groupName: ""
  }
]


