import { matrix4x4 } from "../src/primitive-types"
import { rotateXYZmatrix } from "../src/geometry"

const expectEqualMatrix = (A: matrix4x4, B: matrix4x4): void => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            expect(A[i][j]).toBeCloseTo(B[i][j])
        }
    }
}

test("rotate XYZ matrix", () => {
    const C: matrix4x4 = [
        [0.23419413, -0.68014914, -0.69465837, 0],
        [0.61901904, 0.65528985, -0.4329095, 0],
        [0.74964561, -0.32862189, 0.57449031, 0],
        [0, 0, 0, 1],
    ]
    const R = rotateXYZmatrix({ x: 37, y: -44, z: 71 })
    expectEqualMatrix(C, R)
})
