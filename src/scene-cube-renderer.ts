import SceneCube from "./scene-cube"
import Vector from "./vector"

interface Polygon2dSpecs {
    x: Array<Number>
    y: Array<Number>
    borderColor: String
    borderOpacity: Number
    fillColor: String
    fillOpacity: Number
    borderSize: Number
    type: "polygon"
    id: String
}

interface Points2dSpecs {
    x: Array<Number>
    y: Array<Number>
    color: String
    opacity: Number
    size: Number
    type: "points"
    id: String
}

interface Lines2dSpecs {
    x0: Array<Number>
    y0: Array<Number>
    x1: Array<Number>
    y1: Array<Number>
    color: String
    opacity: Number
    size: Number
    type: "lines"
    id: String
}

type Data2dSpecs = Polygon2dSpecs | Lines2dSpecs | Points2dSpecs
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

class SceneCubeRenderer {
    crossPoints2d: Array<Vector>
    vertexPoints2d: Array<Vector>

    constructor(cube: SceneCube) {
        this.crossPoints2d = cube.crossPoints2d
        this.vertexPoints2d = cube.vertexPoints2d
    }

    render(): Array<Data2dSpecs> {
        const box: Array<Polygon2dSpecs> = this.drawBox()
        const edges: Array<Data2dSpecs> = this.drawEdges()
        const xyPlane: Array<Polygon2dSpecs> = this.drawXYplane()
        const crossSectionLines: Array<Lines2dSpecs> = this.drawCrossSectionLines()
        return [...box, ...xyPlane, ...edges, ...crossSectionLines]
    }

    drawBox(): Array<Polygon2dSpecs> {
        const p: Array<Vector> = this.vertexPoints2d
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
                type: "polygon",
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
        const p: Array<Vector> = this.vertexPoints2d
        const xEdge: Lines2dSpecs = {
            x0: [p[7].x],
            y0: [p[7].y],
            x1: [p[6].x],
            y1: [p[6].y],
            color: "#FF0000",
            opacity: 1.0,
            size: 5,
            type: "lines",
            id: "x-edge",
        }

        const yEdge: Lines2dSpecs = {
            x0: [p[6].x],
            y0: [p[6].y],
            x1: [p[4].x],
            y1: [p[4].y],
            color: "#0000FF",
            opacity: 1.0,
            size: 5,
            type: "lines",
            id: "y-edge",
        }

        const zEdge: Lines2dSpecs = {
            x0: [p[6].x],
            y0: [p[6].y],
            x1: [p[2].x],
            y1: [p[2].y],
            color: "#00FF00",
            opacity: 1.0,
            size: 5,
            type: "lines",
            id: "z-edge",
        }

        const intersectionPoint: Points2dSpecs = {
            x: [p[6].x],
            y: [p[6].y],
            color: "#FFFFFF",
            opacity: 1.0,
            size: 6,
            type: "points",
            id: "edge-intersection",
        }

        return [xEdge, yEdge, zEdge, intersectionPoint]
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
        const p: Array<Vector> = this.vertexPoints2d
        const polygon: Polygon2dSpecs = {
            x: [p[4].x, p[5].x, p[7].x, p[6].x],
            y: [p[4].y, p[5].y, p[7].y, p[6].y],
            fillColor: "#0e2845",
            fillOpacity: 0.5,
            borderColor: "#0e2845",
            borderOpacity: 1.0,
            borderSize: 1,
            type: "polygon",
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
        const p: Array<Vector> = this.crossPoints2d
        const t: Array<Vector> = this.vertexPoints2d

        const lines: Lines2dSpecs = {
            x0: [p[0].x, p[1].x, p[1].x, p[3].x, t[6].x, t[4].x, t[5].x, t[7].x],
            y0: [p[0].y, p[1].y, p[1].y, p[3].y, t[6].y, t[4].y, t[5].y, t[7].y],
            x1: [p[3].x, p[2].x, p[4].x, p[5].x, t[4].x, t[5].x, t[7].x, t[6].x],
            y1: [p[3].y, p[2].y, p[4].y, p[5].y, t[4].y, t[5].y, t[7].y, t[6].y],
            color: "#079992",
            opacity: 0.5,
            size: 1,
            type: "lines",
            id: "cross-section-lines",
        }
        return [lines]
    }
}
/*
const drawWorldAxes = projectedPoints => {}
const drawCubeAxes = projectedPoints => {}
const drawWorldCenterPoint = projectedPoint => {}
const drawCubeCenterPoint = projectedPoint => {}
*/

export default SceneCubeRenderer
