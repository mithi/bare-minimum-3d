interface ViewSettings {
    camTx: number
    camTy: number
    camTz: number
    camZoom: number
    canvasToViewRatio: number
    cubeRx: number
    cubeRy: number
    cubeRz: number
    defaultCamOrientation: string
    defaultCamZoffset: number
}

interface SceneSettings {
    cubeRange: number
    cubeZoffset: number
    dataZoffset: number
    paperXrange: number
    paperYrange: number
}

interface SceneOptions {
    paper: ModelOptions
    xyPlane?: ModelOptions
    sceneEdges?: ModelOptions
    crossLines?: ModelOptions
    edgeAxes?: AxesOptions
    worldAxes?: AxesOptions
    cubeAxes?: AxesOptions
}

interface ModelOptions {
    color: string
    opacity?: number
}

interface AxesOptions {
    intersectionPointColor: string
    intersectionPointSize?: number
    xColor: string
    yColor: string
    zColor: string
    lineSize?: number
    edgeOpacity?: number
}

export { ViewSettings, SceneSettings, SceneOptions }
