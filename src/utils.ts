import { matrix4x4, Data3dSpecs } from "./primitive-types"
import { ViewSettings, SceneSettings, SceneOptions } from "./parameter-types"
import DataRenderer from "./data-renderer"
import SceneCube from "./scene-cube"
import SceneCubeRenderer from "./scene-cube-renderer"
import { rotateXYZmatrix } from "./geometry"

const getWorldWrtCameraMatrix = (
    offset: { x: number; y: number; z: number },
    euler: { x: number; y: number; z: number }
): matrix4x4 => {
    const r = rotateXYZmatrix(euler) // rotation of camera wrt world
    // rInverse = rTranspose = rotation of world wrt camera
    // tInverseMatrix = offset of world wrt camera in a matrix
    const t = offset // offset of camera wrt to world
    // world_to_camera_matrix = rotateCameraMatrixInverse * tInverseMatrix
    return [
        [r[0][0], r[1][0], r[2][0], -t.x],
        [r[0][1], r[1][1], r[2][1], -t.y],
        [r[0][2], r[1][2], r[2][2], -t.z],
        [0, 0, 0, 1],
    ]
}

type SceneOrientationMap = Record<string, { x: number; y: number; z: number }>

const SCENE_ORIENTATION: SceneOrientationMap = {
    "z-forward-x-left": { x: 0, y: 0, z: 0 },
    "z-up-x-left": { x: -90, y: 0, z: 0 },
    "z-up-x-forward": { x: -90, y: 90, z: 0 },
    "z-forward-x-right": { x: 0, y: 0, z: 180 },
}

const renderScene = (
    viewSettings: ViewSettings,
    sceneSettings: SceneSettings,
    sceneOptions: SceneOptions,
    data3d: Array<Data3dSpecs>
) => {
    // 1. compute matrix for transforming points wrt world to points wrt camera
    const { camTx, camTy, camTz, defaultCamZoffset, defaultCamOrientation } = viewSettings

    const camPosition = {
        x: camTx,
        y: camTy,
        z: camTz + defaultCamZoffset,
    }
    const camOrientation: { x: number; y: number; z: number } =
        SCENE_ORIENTATION[defaultCamOrientation]

    const worldWrtCameraMatrix = getWorldWrtCameraMatrix(camPosition, camOrientation)

    // 2. create the scene cube given parameters
    const { cubeRx, cubeRy, cubeRz, canvasToViewRatio, camZoom } = viewSettings
    const { cubeZoffset, cubeRange } = sceneSettings
    const projectionConstant: number = canvasToViewRatio * camZoom

    const cubeOrientation = { x: cubeRx, y: cubeRy, z: cubeRz }
    const cube = new SceneCube(
        cubeOrientation,
        worldWrtCameraMatrix,
        cubeZoffset,
        cubeRange,
        projectionConstant
    )

    // 3. generate the 2d representation of the scene cube to feed to the plot
    const sceneData = new SceneCubeRenderer(cube, sceneOptions).render()

    // 4. generate the 2d representation of the passed data to feed to the plot
    const { dataZoffset } = sceneSettings

    const models = new DataRenderer(
        cube.range,
        dataZoffset,
        cube.wrtCameraMatrix,
        projectionConstant
    ).render(data3d)

    // 5. return the props to feed to our 2d plot
    const container = {
        color: sceneOptions.paper.color,
        opacity: sceneOptions.paper.opacity || 1,
        xRange: sceneSettings.paperXrange,
        yRange: sceneSettings.paperYrange,
    }

    return {
        container,
        data: [...sceneData, ...models],
    }
}

export { renderScene }
