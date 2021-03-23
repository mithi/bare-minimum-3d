import { renderScene } from "../src/utils"
import { viewSettings, sceneSettings, sceneOptions } from "./data/input-settings"
import props2d from "./data/output-data-2d"
import assert from "assert"
import hexapodData from "./data/input-data-3d"

test("render scene", () => {
    const props2dResult = renderScene(
        viewSettings,
        sceneSettings,
        sceneOptions,
        hexapodData
    )

    assert.deepStrictEqual(props2dResult, props2d)
})
