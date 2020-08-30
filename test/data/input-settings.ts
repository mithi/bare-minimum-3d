const viewSettings = {
    camTx: -0.2,
    camTy: -0.68,
    camTz: 1.5,
    cubeRx: 57,
    cubeRy: -4,
    cubeRz: 16.5,
    camZoom: 3.1,
    canvasToViewRatio: 300,
    defaultCamZoffset: 5,
    defaultCamOrientation: "z-forward-x-left",
}

const sceneSettings = {
    cubeRange: 600,
    cubeZoffset: 1,
    dataZoffset: 0,
    paperXrange: 600,
    paperYrange: 600,
}

const edgeAxes = {
    intersectionPointColor: "#FF00FF",
    intersectionPointSize: 5,
    xColor: "#E91E63",
    yColor: "#03A9F4",
    zColor: "#CDDC39",
    lineSize: 1,
    edgeOpacity: 1.0,
}

const worldAxes = {
    intersectionPointColor: "#FFFF00",
    intersectionPointSize: 5,
    xColor: "#E91E63",
    yColor: "#03A9F4",
    zColor: "#CDDC39",
    lineSize: 3,
    edgeOpacity: 1.0,
}

const cubeAxes = {
    intersectionPointColor: "#00FF00",
    intersectionPointSize: 5,
    xColor: "#E91E63",
    yColor: "#03A9F4",
    zColor: "#CDDC39",
    lineSize: 3,
    edgeOpacity: 1.0,
}

const sceneOptions = {
    paper: { color: "#17212B", opacity: 1 },
    xyPlane: { color: "#0652DD", opacity: 0.1 },
    sceneEdges: { color: "#607D8B", opacity: 1 },
    crossLines: { color: "#795548", opacity: 1 },
    edgeAxes,
    worldAxes,
    cubeAxes,
}

export { viewSettings, sceneSettings, sceneOptions }
