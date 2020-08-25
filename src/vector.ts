import { matrix4x4 } from "./primitive-types"

class Vector {
    x = 0
    y = 0
    z = 0
    name = "no-name-vector"

    constructor(x: number, y: number, z: number, name: string) {
        Object.assign(this, { x, y, z, name })
    }

    transform = (tM: matrix4x4): Vector => {
        const [r0, r1, r2] = tM.slice(0, 3)
        const [r00, r01, r02, tx] = r0
        const [r10, r11, r12, ty] = r1
        const [r20, r21, r22, tz] = r2

        const { x, y, z, name } = this
        const x_ = x * r00 + y * r01 + z * r02 + tx
        const y_ = x * r10 + y * r11 + z * r12 + ty
        const z_ = x * r20 + y * r21 + z * r22 + tz
        return new Vector(x_, y_, z_, name)
    }

    project = (pC: number): Vector =>
        new Vector((this.x / this.z) * pC, (this.y / this.z) * pC, pC, this.name)

    transformThenProject = (tM: matrix4x4, pC: number): Vector =>
        this.transform(tM).project(pC)
}

export default Vector
