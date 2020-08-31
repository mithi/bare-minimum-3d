import SceneCube from "./scene-cube"
import { SceneOptions } from "./parameter-types"
import Vector from "./vector"
import {
    Polygon2dSpecs,
    Lines2dSpecs,
    Data2dSpecs,
    DataSpecType,
} from "./primitive-types"
import AxesRenderer from "./axes-renderer"

class SceneCubeRenderer {
    cube: SceneCube
    sceneOptions: SceneOptions
    constructor(cube: SceneCube, sceneOptions: SceneOptions) {
        this.cube = cube
        this.sceneOptions = sceneOptions
    }

    render(): Array<Data2dSpecs> {
        return [
            ...this.drawXYplane(),
            ...this.drawBox(),
            ...this.drawCrossSectionLines(),
            ...this.drawEdgeAxes(),
            ...this.drawWorldAxes(),
            ...this.drawCubeAxes(),
        ]
    }

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

    drawBox(): Array<Lines2dSpecs> {
        const { sceneEdges } = this.sceneOptions
        if (!sceneEdges) {
            return []
        }

        const start: Array<number> = [0, 1, 3, 2, 5, 7, 6, 4, 1, 0, 3, 2]
        const end: Array<number> = [1, 3, 2, 0, 7, 6, 4, 5, 5, 4, 7, 6]
        const p: Array<Vector> = this.cube.vertexPoints2d
        const { color, opacity } = sceneEdges

        const lines: Lines2dSpecs = {
            x0: start.map(i => p[i].x),
            y0: start.map(i => p[i].y),
            x1: end.map(i => p[i].x),
            y1: end.map(i => p[i].y),
            color: color,
            opacity: opacity || 1.0,
            size: 1,
            type: DataSpecType.lines,
            id: "scene-edges-cube-box",
        }

        return [lines]
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

    drawEdgeAxes(): Array<Data2dSpecs> {
        const { edgeAxes } = this.sceneOptions
        if (!edgeAxes) {
            return []
        }
        const p: Array<Vector> = this.cube.vertexPoints2d
        return new AxesRenderer(p[6], [p[7], p[4], p[2]], "edge-axes", edgeAxes).render()
    }

    drawWorldAxes(): Array<Data2dSpecs> {
        const { worldAxes } = this.sceneOptions
        if (!worldAxes) {
            return []
        }

        return new AxesRenderer(
            this.cube.worldOrigin2d,
            this.cube.worldAxes2d,
            "world-axes",
            worldAxes
        ).render()
    }

    drawCubeAxes(): Array<Data2dSpecs> {
        const { cubeAxes } = this.sceneOptions
        if (!cubeAxes) {
            return []
        }

        return new AxesRenderer(
            this.cube.center2d,
            this.cube.axes2d,
            "cube-axes",
            cubeAxes
        ).render()
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
        const { xyPlane } = this.sceneOptions
        if (!xyPlane) {
            return []
        }

        const { color, opacity } = xyPlane
        const p: Array<Vector> = this.cube.vertexPoints2d
        const polygon: Polygon2dSpecs = {
            x: [p[4].x, p[5].x, p[7].x, p[6].x],
            y: [p[4].y, p[5].y, p[7].y, p[6].y],
            fillColor: color,
            fillOpacity: opacity || 1.0,
            borderColor: color,
            borderOpacity: opacity || 1.0,
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
        const { crossLines } = this.sceneOptions
        if (!crossLines) {
            return []
        }

        const p: Array<Vector> = this.cube.crossPoints2d
        const t: Array<Vector> = this.cube.vertexPoints2d

        const { color, opacity } = crossLines

        const lines: Lines2dSpecs = {
            x0: [p[0].x, p[1].x, p[1].x, p[3].x, t[6].x, t[4].x, t[5].x, t[7].x],
            y0: [p[0].y, p[1].y, p[1].y, p[3].y, t[6].y, t[4].y, t[5].y, t[7].y],
            x1: [p[3].x, p[2].x, p[4].x, p[5].x, t[4].x, t[5].x, t[7].x, t[6].x],
            y1: [p[3].y, p[2].y, p[4].y, p[5].y, t[4].y, t[5].y, t[7].y, t[6].y],
            color: color,
            opacity: opacity || 1.0,
            size: 1,
            type: DataSpecType.lines,
            id: "cross-section-lines",
        }
        return [lines]
    }
}
export default SceneCubeRenderer
