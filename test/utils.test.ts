import { renderScene } from "../src/utils"
import { viewSettings, sceneSettings } from "./test-settings"
import { sceneOptions } from "./test-input-scene-options"

import hexapodData from "./test-input-data-3d"
test("render scene", () => {
    expect(true).toBe(true)
    renderScene(viewSettings, sceneSettings, sceneOptions, hexapodData)
})
