import { rawFromKml } from '../../src/map/kml'
import { resolve } from 'path'
import { rawToCoordinates } from '../../src/map/map'

describe('Extract Kml file', () => {

    it('Extract Hungary border', async () => {
        const raw = await rawFromKml(
            resolve(process.cwd(), 'map/kml/gadm36_HUN_0.kml'),
            'Hungary'
        )
        expect(raw).toMatch(/^\d(\d|[. ,])+\d$/)
    })

    it('Extract Budapest border', async () => {
        const raw = await rawFromKml(
            resolve(process.cwd(), 'map/kml/gadm36_HUN_1.kml'),
            'Hungary/Budapest'
        )
        expect(raw).toMatch(/^\d(\d|[. ,])+\d$/)
    })

})

describe('Extract Kml file', () => {

    it('Get coordinates from raw data', () => {
        const coords = rawToCoordinates('1.234,9.8765 2.444,3.666 0.12,2')
        expect(coords).toEqual([
            { lon: 1.234, lat: 9.8765 },
            { lon: 2.444, lat: 3.666 },
            { lon: 0.12, lat: 2 }
        ])
    })

})
