import * as SVG from 'svg.js'
import Data from './data/Data'

fetch('/data/data.json').then((resp) => resp.json().then((data: Data) => {
    const draw = SVG('map').size('100%', '100%')
    const c = data.hungary
    .map((co) =>
    [
        (co.lon * 1).toFixed(2),
        (co.lat * 1).toFixed(2)
    ]
    )
    const s = c.map((coo) => coo.join(',')).join(' ')
    draw.polygon(s).fill('red').stroke({ width: 1 }) // .move(-200, -400)
    console.table(c)
    console.dir(s)
}))
