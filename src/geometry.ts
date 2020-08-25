import { matrix4x4 } from "./primitive-types"

const radians = (thetaDegrees: number) => (thetaDegrees * Math.PI) / 180

const _returnSinAndCosine = (theta: number): [number, number] => [
    Math.sin(radians(theta)),
    Math.cos(radians(theta)),
]

const uniform4x4matrix = (d: number): matrix4x4 => [
    [d, d, d, d],
    [d, d, d, d],
    [d, d, d, d],
    [d, d, d, d],
]

const multiply4x4matrix = (mA: matrix4x4, mB: matrix4x4): matrix4x4 => {
    let rM: matrix4x4 = uniform4x4matrix(0)

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            rM[i][j] =
                mA[i][0] * mB[0][j] +
                mA[i][1] * mB[1][j] +
                mA[i][2] * mB[2][j] +
                mA[i][3] * mB[3][j]
        }
    }

    return rM
}

const rotateXYZmatrix = (euler: { x: number; y: number; z: number }): matrix4x4 => {
    const [sx, cx] = _returnSinAndCosine(euler.x)
    const [sy, cy] = _returnSinAndCosine(euler.y)
    const [sz, cz] = _returnSinAndCosine(euler.z)
    return [
        [cy * cz, -sz * cy, sy, 0],
        [sx * sy * cz + sz * cx, -sx * sy * sz + cx * cz, -sx * cy, 0],
        [sx * sz - sy * cx * cz, sx * cz + sy * sz * cx, cx * cy, 0],
        [0, 0, 0, 1],
    ]
}

export { rotateXYZmatrix, multiply4x4matrix, radians }
