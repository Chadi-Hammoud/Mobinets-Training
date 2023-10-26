const space = new smplr.Space({
    spaceId: "025ecee7-840c-48d3-b1c7-4b1542aace75",
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
    },
    onError: (error) => console.error("Could not start viewer", error),
})