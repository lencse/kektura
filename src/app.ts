import * as SVG from 'svg.js'
import Data from './data/Data'
import { transformer } from './draw/draw'
import Point from './map/Point'

fetch('/data/data.json').then((resp) => resp.json().then((data: Data) => {
    const w = 900
    const h = 600
    const transform = transformer(w, h, data)
    const draw = SVG('map').viewbox(0, 0, w, h)
    function polygon(points: Point[], className: string): SVG.Polygon {
        const asString = transform(points)
            .map((p) => [p.x, p.y])
            .map((coo) => coo.join(',')).join(' ')
        return draw.polygon(asString).addClass(className)
    }
    function polyline(points: Point[], className: string): SVG.PolyLine {
        const asString = transform(points)
            .map((p) => [p.x, p.y])
            .map((coo) => coo.join(',')).join(' ')
        return draw.polyline(asString).addClass(className)
    }
    polygon(data.hungary, 'hungary')
        .attr({ opacity: 0 })
        .animate(1000)
        .attr({ opacity: 1 })
    polygon(data.budapest, 'budapest')
        .attr({ opacity: 0 })
        .animate(1000)
        .attr({ opacity: 1 })
    polyline(data.kektura, 'kektura')
        .attr({ opacity: 0 })
        .animate(1000)
        .attr({ opacity: 1 })
}))
