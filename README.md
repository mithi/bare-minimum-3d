[![Coverage Status](https://coveralls.io/repos/github/mithi/bare-minimum-3d/badge.svg?branch=master)](https://coveralls.io/github/mithi/bare-minimum-3d?branch=master)
![Test Passing](https://github.com/mithi/bare-minimum-3d/workflows/test/badge.svg)
[![Code Climate](https://codeclimate.com/github/mithi/bare-minimum-3d/badges/gpa.svg)](https://codeclimate.com/github/mithi/bare-minimum-3d)
[![technical debt](https://img.shields.io/codeclimate/tech-debt/mithi/bare-minimum-3d)](https://codeclimate.com/github/mithi/bare-minimum-3d/trends/technical_debt)
[![buy me coffee](https://img.shields.io/badge/Buy%20me%20-coffee!-orange.svg?logo=buy-me-a-coffee&color=795548)](https://ko-fi.com/minimithi)

# Bare Minimum 3d

A small package to transform declared 3d data (points, polygons, lines)
to 2d data. The output is intended to be fed to a [`bare-minimum-2d`](https://github.com/mithi/bare-minimum-2d) react component..

```
$ npm install @mithi/bare-minimum-3d@0.1.3
```

Please check the [wiki / documentation](https://github.com/mithi/bare-minimum-3d/wiki), to learn the arguments that you'll need to pass to `BareMinimum3d`'s `renderScene` function. 
- [`SceneOptions`](https://github.com/mithi/bare-minimum-3d/wiki/SceneOptions)
- [`SceneSettings`](https://github.com/mithi/bare-minimum-3d/wiki/SceneSettings)
- [`ViewSettings`](https://github.com/mithi/bare-minimum-3d/wiki/ViewSettings)


You can check out the examples [`SceneOptions`, `SceneSettings`, `ViewSettings`](https://github.com/mithi/bare-minimum-3d/blob/master/test/data/input-settings.ts)
and [3d `Data`](https://github.com/mithi/bare-minimum-3d/blob/master/test/data/input-data-3d.ts) that you can pass to the `renderScene()` function the corresponding [`2d output`](https://github.com/mithi/bare-minimum-3d/blob/master/test/data/output-data-2d.ts)

```js
import BareMinimum2d from "@mithi/bare-minimum-2d"
import renderScene from "@mithi/bare-minimum-3d"

const { container, data } = renderScene(
        viewSettings,
        sceneSettings,
        sceneOptions,
        data3d
    )

<BareMinimum2d {...{container, data} />
```

You can checkout a demo application in: https://mithi.github.io/hello-3d-world/ and play with the parameters. 

![](https://user-images.githubusercontent.com/1670421/91668232-c04c9c00-eb3d-11ea-8673-c1a525c7bc27.png)

## Limitations

This library does not perform [clipping](https://www.gabrielgambetta.com/computer-graphics-from-scratch/clipping.html) or [hidden surface removal](https://www.gabrielgambetta.com/computer-graphics-from-scratch/hidden-surface-removal.html). It would be best to implement the **painter’s algorithm**, **back face culling**, and **depth buffering** , but this will not be implemented in the foreseeable future.
