type row4 = [number, number, number, number]
type matrix4x4 = [row4, row4, row4, row4]

interface Polygon2dSpecs {
    x: Array<number>
    y: Array<number>
    borderColor: String
    borderOpacity: Number
    fillColor: String
    fillOpacity: Number
    borderSize: Number
    type: "polygon"
    id: String
}

interface Points2dSpecs {
    x: Array<number>
    y: Array<number>
    color: String
    opacity: Number
    size: Number
    type: "points"
    id: String
}

interface Lines2dSpecs {
    x0: Array<number>
    y0: Array<number>
    x1: Array<number>
    y1: Array<number>
    color: String
    opacity: Number
    size: Number
    type: "lines"
    id: String
}

interface Lines3dSpecs extends Lines2dSpecs {
    z0: Array<number>
    z1: Array<number>
}

interface Polygon3dSpecs extends Polygon2dSpecs {
    z: Array<number>
}

interface Points3dSpecs extends Points2dSpecs {
    z: Array<number>
}

type Data2dSpecs = Polygon2dSpecs | Lines2dSpecs | Points2dSpecs
type Data3dSpecs = Polygon3dSpecs | Lines3dSpecs | Points3dSpecs

export {
    matrix4x4,
    Lines2dSpecs,
    Polygon2dSpecs,
    Points2dSpecs,
    Data2dSpecs,
    Lines3dSpecs,
    Polygon3dSpecs,
    Points3dSpecs,
    Data3dSpecs,
}
