# Bare Minimum 3d

A small package to transform declared 3d data (points, polygons, lines)
to 2d data. The output is intended to be fed to a [`bare-minimum-2d`](https://github.com/mithi/bare-minimum-2d) plot.

The [documentation](https://github.com/mithi/bare-minimum-3d/wiki/) on how to use this library is still under heavy construction.

But you can checkout a demo application in: https://mithi.github.io/hello-3d-world/

![](https://user-images.githubusercontent.com/1670421/91668232-c04c9c00-eb3d-11ea-8673-c1a525c7bc27.png)

## Limitations 
This library does not perform [clipping](https://www.gabrielgambetta.com/computer-graphics-from-scratch/clipping.html) or [hidden surface removal](https://www.gabrielgambetta.com/computer-graphics-from-scratch/hidden-surface-removal.html). It would be best to implement the **Painter’s Algorithm**, **backface culling**, and **Depth buffering** in the future, but this is not a priority in the foreseeable future. 
