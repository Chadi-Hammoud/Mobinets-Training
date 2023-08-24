import { loadSmplrJs } from "./node_modules/@smplrspace/smplr-loader";
import { IT_Room } from "./data.js"

loadSmplrJs("esm")
    .then((smplr) => {
        const space = new smplr.Space({
            spaceId: "7d9cb58a-2fd1-43ee-9c0f-4254d78ec166",
            clientToken: "pub_fc4b7f5e33bd49cf98912c56c404de8c",
            containerId: "container",
            disableErrorReporting:true,
        });

        space.startViewer({
            preview: true,
            // onReady: () => updateDataLayers(),
            onError: (error) => {
                console.log('Could not start viewer', error),
                console.log("######################################");
                console.log(smplrClient.checkApiConnection());
                console.log("######################################");

            }
        });



    }).catch((error) => console.error(error));

















