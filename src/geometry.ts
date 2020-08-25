import { matrix4x4 } from "./primitive-types"
import Vector from "./vector"

const radians = (thetaDegrees: number) => (thetaDegrees * Math.PI) / 180

const getSinCos = (theta: number): [number, number] => [
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

const rotateXmatrix = (theta: number): matrix4x4 => {
    const [s, c] = getSinCos(theta)

    return [
        [1, 0, 0, 0],
        [0, c, -s, 0],
        [0, s, c, 0],
        [0, 0, 0, 1],
    ]
}

const rotateYmatrix = (theta: number): matrix4x4 => {
    const [s, c] = getSinCos(theta)
    return [
        [c, 0, s, 0],
        [0, 1, 0, 0],
        [-s, 0, c, 0],
        [0, 0, 0, 1],
    ]
}

const rotateZmatrix = (theta: number): matrix4x4 => {
    const [s, c] = getSinCos(theta)
    return [
        [c, -s, 0, 0],
        [s, c, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]
}

const rotateXYZmatrix = (euler: Vector): matrix4x4 => {
    const rx = rotateXmatrix(euler.x)
    const ry = rotateYmatrix(euler.y)
    const rz = rotateZmatrix(euler.z)
    const rxy = multiply4x4matrix(rx, ry)
    const rxyz = multiply4x4matrix(rxy, rz)
    return rxyz
}

export { rotateXYZmatrix, multiply4x4matrix, radians }
