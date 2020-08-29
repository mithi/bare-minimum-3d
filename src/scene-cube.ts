import { matrix4x4 } from "./primitive-types"
import Vector from "./vector"
import { rotateXYZmatrix, multiply4x4matrix } from "./geometry"

class NormalUnitCube {
    CENTER = new Vector(0, 0, 0, "cube-center") // cube-center
    /*
       E4------F5      y
       |`.    | `.     |
       |  `A0-----B1   *----- x (WORLD COORDINATE FRAME)
       |   |  |   |     \
       G6--|--H7  |      \
        `. |   `. |       z
          `C2-----D3
    */
    AXES = [
        new Vector(0.25, 0, 0, "xAxis"),
        new Vector(0, 0.25, 0, "yAxis"),
        new Vector(0, 0, 0.25, "zAxis"),
    ]

    POINTS = [
        new Vector(-1, +1, +1, "front-top-left"), // A0
        new Vector(+1, +1, +1, "front-top-right"), // B1
        new Vector(-1, -1, +1, "front-bottom-left"), // C2
        new Vector(+1, -1, +1, "front-bottom-right"), // D3
        new Vector(-1, +1, -1, "back-top-left"), // E4
        new Vector(+1, +1, -1, "back-top-right"), // F5
        new Vector(-1, -1, -1, "back-bottom-left"), // G6
        new Vector(+1, -1, -1, "back-bottom-right"), // H7
    ]
    /*
          i0
    g6 *---*---*
       |   |   |
    j1 *---*---* k2
       |   |   |
       *---*---*
          l3
                i0
           *----*
           |    |
        j1 *----*
            \   |
             \  * l3
             m4  \
                  \ n5
    */
    CROSS_SECTION_POINTS = [
        new Vector(+0, +1, -1, "top-center"), // i0
        new Vector(-1, +0, -1, "left-center"), // j1
        new Vector(+1, +0, -1, "right-center"), // k2
        new Vector(+0, -1, -1, "bottom-center"), // l3
        new Vector(-1, +0, +1, "left-center-forward"), // m4
        new Vector(+0, -1, +1, "bottom-center-forward"), // n5
    ]
}

const UNIT_CUBE = new NormalUnitCube()

class SceneCube {
    center3d = UNIT_CUBE.CENTER
    axes3d = UNIT_CUBE.AXES
    vertexPoints3d = UNIT_CUBE.POINTS
    crossPoints3d = UNIT_CUBE.CROSS_SECTION_POINTS
    center2d: Vector
    worldOrigin2d: Vector
    vertexPoints2d: Array<Vector>
    crossPoints2d: Array<Vector>
    axes2d: Array<Vector>
    worldAxes2d: Array<Vector>
    wrtWorldMatrix: matrix4x4
    wrtCameraMatrix: matrix4x4
    zOffset: number
    range: number
    projectionConstant: number

    constructor(
        euler: { x: number; y: number; z: number },
        worldWrtCameraMatrix: matrix4x4,
        zOffset: number,
        range: number,
        projectionConstant: number
    ) {
        this.wrtWorldMatrix = rotateXYZmatrix(euler)
        this.wrtCameraMatrix = multiply4x4matrix(
            worldWrtCameraMatrix,
            this.wrtWorldMatrix
        )
        this.zOffset = zOffset
        this.range = range
        this.projectionConstant = projectionConstant
        this.crossPoints2d = this._projectedPoints(this.crossPoints3d)
        this.vertexPoints2d = this._projectedPoints(this.vertexPoints3d)
        const [center2d] = this._projectedPoints([this.center3d])
        this.center2d = center2d
        this.axes2d = this._projectedPoints(this.axes3d)
        this.worldAxes2d = this._projectedPoints(this.axes3d, 0, worldWrtCameraMatrix)
        const [worldOrigin2d] = this._projectedPoints(
            [this.center3d],
            0,
            worldWrtCameraMatrix
        )
        this.worldOrigin2d = worldOrigin2d
    }

    _projectedPoints(
        points: Array<Vector>,
        offset: number = this.zOffset,
        transformMatrix: matrix4x4 = this.wrtCameraMatrix
    ) {
        return points.map((point: Vector) => {
            return new Vector(point.x, point.y, point.z + offset, point.name)
                .transform(transformMatrix)
                .project(this.projectionConstant)
        })
    }
}

export default SceneCube
