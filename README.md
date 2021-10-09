[![NPM](https://img.shields.io/npm/v/@mithi/bare-minimum-3d.svg)](https://www.npmjs.com/package/@mithi/bare-minimum-3d)
[![MINIFIED](https://img.shields.io/bundlephobia/min/@mithi/bare-minimum-3d?color=%2300BCD4&label=minified)](https://bundlephobia.com/result?p=@mithi/bare-minimum-3d)
[![GZIPPED](https://img.shields.io/bundlephobia/minzip/@mithi/bare-minimum-3d?color=%2300BCD4&label=minified%20%2B%20gzipped)](https://bundlephobia.com/result?p=bare-minimum-3d)
[![Install Size](https://packagephobia.now.sh/badge?p=@mithi/bare-minimum-3d)](https://packagephobia.com/result?p=%40mithi%2Fbare-minimum-3d)
[![Coverage Status](https://coveralls.io/repos/github/mithi/bare-minimum-3d/badge.svg?branch=master)](https://coveralls.io/github/mithi/bare-minimum-3d?branch=master)
![Test Passing](https://github.com/mithi/bare-minimum-3d/workflows/test/badge.svg)
[![Code Climate](https://codeclimate.com/github/mithi/bare-minimum-3d/badges/gpa.svg)](https://codeclimate.com/github/mithi/bare-minimum-3d)
[![technical debt](https://img.shields.io/codeclimate/tech-debt/mithi/bare-minimum-3d)](https://codeclimate.com/github/mithi/bare-minimum-3d/trends/technical_debt)
[![buy me coffee](https://img.shields.io/badge/Buy%20me%20-coffee!-orange.svg?logo=buy-me-a-coffee&color=795548)](https://ko-fi.com/minimithi)

# Bare Minimum 3d

A small package to transform declared 3d data (points, polygons, lines) to 2d data. The output is intended to be fed to a [`BareMinimum2d`](https://github.com/mithi/bare-minimum-2d) React component.

Extremely lightweight and fairly configurable, this package has zero dependencies and a relatively straightforward declarative API. See also: [why I created this project](https://github.com/mithi/bare-minimum-3d/wiki/Why-I-created-this-project).


You can checkout a demo application (and play with the parameters!) at: https://mithi.github.io/hello-3d-world

![](https://user-images.githubusercontent.com/1670421/91668232-c04c9c00-eb3d-11ea-8673-c1a525c7bc27.png)

## Getting started

```
$ npm i @mithi/bare-minimum-3d
$ npm i bare-minimum-2d
```

You can check out the examples of [`SceneOptions`, `SceneSettings`, `ViewSettings`](https://github.com/mithi/bare-minimum-3d/blob/master/test/data/input-settings.ts) that you can pass to the `renderScene()` function. You can pass 3d data such as this [`hexapod`](https://github.com/mithi/bare-minimum-3d/blob/master/test/data/input-data-3d.ts) or [`pyramid`](https://github.com/mithi/hello-3d-world/blob/master/src/data/input-3d-pyramid.ts). When you pass the hexapod data along with the other example parameters linked above, [`this is the corresponding 2d data`](https://github.com/mithi/bare-minimum-3d/blob/master/test/data/output-data-2d.ts) that `renderScene()` would return.

```js
import BareMinimum2d from "bare-minimum-2d"
import renderScene from "@mithi/bare-minimum-3d"

const { container, data } = renderScene(
    viewSettings, sceneSettings, sceneOptions, data3d
)

<BareMinimum2d {...{container, data} />
```

Please check the [wiki / documentation](https://github.com/mithi/bare-minimum-3d/wiki), to learn more about the arguments that you'll need to pass to `BareMinimum3d`'s `renderScene()` function.

-   [`SceneOptions`](https://github.com/mithi/bare-minimum-3d/wiki/SceneOptions)
-   [`SceneSettings`](https://github.com/mithi/bare-minimum-3d/wiki/SceneSettings)
-   [`ViewSettings`](https://github.com/mithi/bare-minimum-3d/wiki/ViewSettings)

## `0.4.0` Update

Version `0.4.0` exposes all utility functions are now exposed to the users, so you can use it however you like. With all the building blocks available to you, you can even build your own custom `renderScene` function, should you want to!

```js
import {
    renderScene,
    SCENE_ORIENTATION,
    getWorldWrtCameraMatrix,
    AxesRenderer,
    SceneCube,
    DataRenderer,
    SceneCubeRenderer,
    Vector,
    rotateXYZmatrix,
    multiply4x4matrix,
    radians,
} from "@mithi/bare-minimum-3d"
```

## ⚠️❗ Limitations

This library does NOT perform [clipping](https://www.gabrielgambetta.com/computer-graphics-from-scratch/clipping.html) or [hidden surface removal](https://www.gabrielgambetta.com/computer-graphics-from-scratch/hidden-surface-removal.html). Each element are just painted to the screen in the order that you declare them in your array of data, and the scene elements are always rendered first, meaning your data will be rendered on top of any scene element. This means that it is possible that elements will incorrectly overlap other elements that are actually nearer to the camera. There is no plan to fix this... unless someone [makes a pull request](https://github.com/mithi/bare-minimum-3d/issues/20)! :heart:

## Contributing [![PRs welcome!](https://img.shields.io/badge/PRs-welcome-orange.svg?style=flat)](./CONTRIBUTING.md)

Please read the [contributing guidelines](https://github.com/mithi/hexapod/blob/master/CONTRIBUTING.md) and the recommended [commit style guide](https://github.com/mithi/hexapod/wiki/A-Commit-Style-Guide)! Thank you!
