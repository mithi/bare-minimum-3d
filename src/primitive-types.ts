type row4 = [number, number, number, number]
type matrix4x4 = [row4, row4, row4, row4]

interface Polygon2dSpecs {
    x: Array<Number>
    y: Array<Number>
    borderColor: String
    borderOpacity: Number
    fillColor: String
    fillOpacity: Number
    borderSize: Number
    type: "polygon"
    id: String
}

interface Points2dSpecs {
    x: Array<Number>
    y: Array<Number>
    color: String
    opacity: Number
    size: Number
    type: "points"
    id: String
}

interface Lines2dSpecs {
    x0: Array<Number>
    y0: Array<Number>
    x1: Array<Number>
    y1: Array<Number>
    color: String
    opacity: Number
    size: Number
    type: "lines"
    id: String
}

type Data2dSpecs = Polygon2dSpecs | Lines2dSpecs | Points2dSpecs

export { matrix4x4, Lines2dSpecs, Polygon2dSpecs, Points2dSpecs, Data2dSpecs }
