import Vector from "./vector"
import {
    matrix4x4,
    Polygon3dSpecs,
    Lines3dSpecs,
    Points3dSpecs,
    Data3dSpecs,
    Points2dSpecs,
    Polygon2dSpecs,
    Data2dSpecs,
    Lines2dSpecs,
} from "./primitive-types"

type PolygonOrPoints3d = Points3dSpecs | Polygon3dSpecs
type PolygonOrPoints2d = Points2dSpecs | Polygon2dSpecs

class DataRenderer {
    sceneRange: number
    dataZoffset: number
    transformMatrix: matrix4x4
    projectionConstant: number

    constructor(
        sceneRange: number,
        dataZoffset: number,
        transformMatrix: matrix4x4,
        projectionConstant: number
    ) {
        this.sceneRange = sceneRange
        this.dataZoffset = dataZoffset
        this.transformMatrix = transformMatrix
        this.projectionConstant = projectionConstant
    }

    _projectPoint(x_: number, y_: number, z_: number, i: number): Vector {
        const { sceneRange, dataZoffset, transformMatrix, projectionConstant } = this
        const x = x_ / sceneRange
        const y = y_ / sceneRange
        const z = z_ / sceneRange + dataZoffset

        return new Vector(x, y, z, `${i}`)
            .transform(transformMatrix)
            .project(projectionConstant)
    }

    _projectPolygonOrPoints(element: PolygonOrPoints3d): PolygonOrPoints2d {
        const xs: Array<number> = []
        const ys: Array<number> = []

        element.x.forEach((rawX: number, index: number) => {
            const point = this._projectPoint(
                rawX,
                element.y[index],
                element.z[index],
                index
            )
            xs.push(point.x)
            ys.push(point.y)
        })
        return { ...element, x: xs, y: ys }
    }

    _projectLines(lines: Lines3dSpecs): Lines2dSpecs {
        const xs0: Array<number> = []
        const ys0: Array<number> = []
        const xs1: Array<number> = []
        const ys1: Array<number> = []

        lines.x0.forEach((rawX0: number, index: number) => {
            const points0 = this._projectPoint(
                rawX0,
                lines.y0[index],
                lines.z0[index],
                index
            )

            const points1 = this._projectPoint(
                lines.x1[index],
                lines.y1[index],
                lines.z1[index],
                index
            )

            xs0.push(points0.x)
            ys0.push(points0.y)
            xs1.push(points1.x)
            ys1.push(points1.y)
        })

        return { ...lines, x0: xs0, y0: ys0, x1: xs1, y1: ys1 }
    }

    render(data: Array<Data3dSpecs>): Array<Data2dSpecs> {
        return data.map((element: Data3dSpecs) => {
            switch (element.type) {
                case "polygon":
                case "points":
                    return this._projectPolygonOrPoints(element)
                case "lines":
                    return this._projectLines(element)
            }
        })
    }
}

export default DataRenderer
