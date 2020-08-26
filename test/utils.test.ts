import { renderScene } from "../src/utils"
import { viewSettings, sceneSettings } from "./test-settings"
import hexapodData from "./test-data-3d"
test("render scene", () => {
    expect(true).toBe(true)
    const sceneOptions = {
        paper: { color: "#17212B", opacity: 1.0 },
    }
    renderScene(viewSettings, sceneSettings, sceneOptions, hexapodData)
})
