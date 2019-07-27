import * as SVG from 'svg.js'
import Coordinate from './map/Coordinate'

fetch('/data/hungary.json').then((resp) => resp.json().then((data: Coordinate[]) => {
    const draw = SVG('map').size('100%', '100%')
    const c = data.map((co) => [
        (co.lon * 40).toFixed(2),
        (co.lat * 40).toFixed(2)
    ])
    const s = c.map((coo) => coo.join(',')).join(' ')
    // draw.polygon('0,0 100,100, 150,200').fill('red').stroke({ width: 1 })
    draw.polygon(s).fill('red').stroke({ width: 1 }).move(-200, -400)
    console.table(c)
    console.dir(s)
}))
// fetch('/data/budapest.json').then((resp) => resp.json().then((data) => console.table(data)))
