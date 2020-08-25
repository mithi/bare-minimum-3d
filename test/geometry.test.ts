import { radians } from "../src/geometry"

test("basic", () => {
    expect(radians(90)).toBe(Math.PI / 2)
})
