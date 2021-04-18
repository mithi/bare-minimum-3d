import { AxesOptions } from "./parameter-types"
import Vector from "./vector"
import { Lines2dSpecs, Points2dSpecs, DataSpecType } from "./primitive-types"

/*
   E4------F5      y
   |`.    | `.     |
   |  `A0-----B1   *----- x
   |   |  |   |     \
   G6--|--H7  |      \
    `. |   `. |       z
      `C2-----D3
*/

class AxesRenderer {
    origin: Vector
    axes: Array<Vector>
    name: string
    specs: AxesOptions
    constructor(origin: Vector, axes: Array<Vector>, name: string, specs: AxesOptions) {
        this.axes = axes
        this.origin = origin
        this.name = name
        this.specs = specs
    }

    drawAxis(
        p: Vector,
        v: Vector,
        axisType: "x" | "y" | "z",
        color: string
    ): Lines2dSpecs {
        const { lineSize, edgeOpacity } = this.specs
        return {
            x0: [p.x],
            y0: [p.y],
            x1: [v.x],
            y1: [v.y],
            color,
            opacity: edgeOpacity || 1,
            size: lineSize || 3,
            type: DataSpecType.lines,
            id: `${axisType}-${this.name}`,
        }
    }

    get centerPoint(): Points2dSpecs {
        return {
            x: [this.origin.x],
            y: [this.origin.y],
            color: this.specs.intersectionPointColor,
            opacity: 1.0,
            size: this.specs.intersectionPointSize || 3,
            type: DataSpecType.points,
            id: `point-${this.name}`,
        }
    }

    render() {
        const p = this.origin
        const [vx, vy, vz] = this.axes
        const { xColor, yColor, zColor } = this.specs
        return [
            this.drawAxis(p, vx, "x", xColor),
            this.drawAxis(p, vy, "y", yColor),
            this.drawAxis(p, vz, "z", zColor),
            this.centerPoint,
        ]
    }
}

export default AxesRenderer
