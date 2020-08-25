import SceneCube from "./scene-cube"
import Vector from "./vector"
import {
    Polygon2dSpecs,
    Lines2dSpecs,
    Points2dSpecs,
    Data2dSpecs,
    DataSpecType,
} from "./primitive-types"

/*
   E4------F5      y
   |`.    | `.     |
   |  `A0-----B1   *----- x
   |   |  |   |     \
   G6--|--H7  |      \
    `. |   `. |       z
      `C2-----D3
face 1 - A0, B1, D3 | C2 (front)
face 2 - B1, F5, H7 | D3 (front right)
face 3 - F5, E4, G6 | H7 (front left)
face 4 - E4, A0, C2 | G6 (back)
face 5 - E4, F5, B1 | A0 (top)
face 6 - C2 , D3, H7 | G6 |(bottom)
*/
const POINT_FACE_SET = [
    [0, 1, 3, 2],
    [1, 5, 7, 3],
    [5, 4, 6, 7],
    [4, 0, 2, 6],
    [4, 5, 1, 0],
    [2, 3, 7, 6],
]

const drawAxes = (p0: Vector, vx: Vector, vy: Vector, vz: Vector, name: string) => {
    const xAxis: Lines2dSpecs = {
        x0: [p0.x],
        y0: [p0.y],
        x1: [vx.x],
        y1: [vx.y],
        color: "#FF0000",
        opacity: 1.0,
        size: 5,
        type: DataSpecType.lines,
        id: `x-${name}`,
    }

    const yAxis: Lines2dSpecs = {
        x0: [p0.x],
        y0: [p0.y],
        x1: [vy.x],
        y1: [vy.y],
        color: "#0000FF",
        opacity: 1.0,
        size: 5,
        type: DataSpecType.lines,
        id: `y-${name}`,
    }

    const zAxis: Lines2dSpecs = {
        x0: [p0.x],
        y0: [p0.y],
        x1: [vz.x],
        y1: [vz.y],
        color: "#00FF00",
        opacity: 1.0,
        size: 5,
        type: DataSpecType.lines,
        id: `z-${name}`,
    }

    const centerPoint: Points2dSpecs = {
        x: [p0.x],
        y: [p0.y],
        color: "#FFFFFF",
        opacity: 1.0,
        size: 6,
        type: DataSpecType.points,
        id: `point-${name}`,
    }

    console.log(xAxis, yAxis, zAxis, centerPoint)
    return [xAxis, yAxis, zAxis, centerPoint]
}

class SceneCubeRenderer {
    cube: SceneCube
    constructor(cube: SceneCube) {
        this.cube = cube
    }

    render(): Array<Data2dSpecs> {
        const box = this.drawBox()
        const edges = this.drawEdges()
        const worldAxes = this.drawWorldAxes()
        const axes = this.drawCubeAxes()
        const xyPlane = this.drawXYplane()
        const crossSectionLines = this.drawCrossSectionLines()
        return [...box, ...xyPlane, ...edges, ...axes, ...worldAxes, ...crossSectionLines]
    }

    drawBox(): Array<Polygon2dSpecs> {
        const p: Array<Vector> = this.cube.vertexPoints2d
        let data: Array<Polygon2dSpecs> = []

        POINT_FACE_SET.forEach((pointIndices, index) => {
            const [a, b, c, d] = pointIndices

            const plane: Polygon2dSpecs = {
                x: [p[a].x, p[b].x, p[c].x, p[d].x],
                y: [p[a].y, p[b].y, p[c].y, p[d].y],
                borderColor: "#0652DD",
                borderOpacity: 1.0,
                fillColor: "FFFFFF",
                fillOpacity: 0,
                borderSize: 1,
                type: DataSpecType.polygon,
                id: `plane-${index}`,
            }

            data.push(plane)
        })

        return data
    }

    /*
E4              y
|               |
|               *----- x (WORLD COORDINATE FRAME)
|                \
G6-------H7       \
 \                z
  \C2
  xEdge=red
  yEdge=blue
  zEdge=green
  intersectionPoint=white (G6)
*/
    drawEdges(): Array<Data2dSpecs> {
        const p: Array<Vector> = this.cube.vertexPoints2d
        return drawAxes(p[6], p[7], p[4], p[2], "edge")
    }

    drawWorldAxes(): Array<Data2dSpecs> {
        const v: Array<Vector> = this.cube.worldAxes2d
        const p_: Vector = this.cube.worldOrigin2d
        return drawAxes(p_, v[0], v[1], v[2], "worldAxes")
    }

    drawCubeAxes(): Array<Data2dSpecs> {
        const v: Array<Vector> = this.cube.axes2d
        const p_: Vector = this.cube.center2d
        return drawAxes(p_, v[0], v[1], v[2], "axes")
    }

    /*
/*
E4          F5
 *----------*
 |          |
 |          |    y
 |          |    |
 *----------*    *-- x
 G6         H7
*/
    drawXYplane(): Array<Polygon2dSpecs> {
        const p: Array<Vector> = this.cube.vertexPoints2d
        const polygon: Polygon2dSpecs = {
            x: [p[4].x, p[5].x, p[7].x, p[6].x],
            y: [p[4].y, p[5].y, p[7].y, p[6].y],
            fillColor: "#0e2845",
            fillOpacity: 0.5,
            borderColor: "#0e2845",
            borderOpacity: 1.0,
            borderSize: 1,
            type: DataSpecType.polygon,
            id: "xy-plane",
        }
        return [polygon]
    }

    /*
                          (y)^
          i0                 |
       *---*---*          +1 |
       |   |   |           0 |---------->(x)
    j1 *---*---* k2       -1 | -1, 0, 1
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
         E4          F5
          *----------*
          |          |
          |          |    y
          |          |    |
          *----------*    *-- x
          G6         H7
    */

    drawCrossSectionLines(): Array<Lines2dSpecs> {
        const p: Array<Vector> = this.cube.crossPoints2d
        const t: Array<Vector> = this.cube.vertexPoints2d

        const lines: Lines2dSpecs = {
            x0: [p[0].x, p[1].x, p[1].x, p[3].x, t[6].x, t[4].x, t[5].x, t[7].x],
            y0: [p[0].y, p[1].y, p[1].y, p[3].y, t[6].y, t[4].y, t[5].y, t[7].y],
            x1: [p[3].x, p[2].x, p[4].x, p[5].x, t[4].x, t[5].x, t[7].x, t[6].x],
            y1: [p[3].y, p[2].y, p[4].y, p[5].y, t[4].y, t[5].y, t[7].y, t[6].y],
            color: "#079992",
            opacity: 0.5,
            size: 1,
            type: DataSpecType.lines,
            id: "cross-section-lines",
        }
        return [lines]
    }
}
export default SceneCubeRenderer
