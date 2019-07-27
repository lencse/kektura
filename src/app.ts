import * as SVG from 'svg.js'
import Data from './data/Data'
import { transformer } from './draw/draw'
import Point from './map/Point'

fetch('/data/data.json').then((resp) => resp.json().then((data: Data) => {
    const w = 900
    const h = 600
    const transform = transformer(w, h, data)
    const draw = SVG('map').size(w, h)
    function polygon(points: Point[], className: string): void {
        const asString = transform(points)
            .map((p) => [p.x, p.y])
            .map((coo) => coo.join(',')).join(' ')
        draw.polygon(asString).addClass(className)
    }
    polygon(data.hungary, 'hungary')
    polygon(data.budapest, 'budapest')
}))
