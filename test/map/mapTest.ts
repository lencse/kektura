import { rawFromKml } from '../../src/map/kml'
import { resolve } from 'path'
import { rawToCoordinates } from '../../src/map/map'

describe('Extract Kml file', () => {

    it('Extract Hungary border', async () => {
        const raw = await rawFromKml(
            resolve(__dirname + '../../../map/kml/gadm36_HUN_0.kml'),
            'Hungary'
        )
        expect(raw.length).toBeGreaterThan(1000)
    })

    it('Extract Budapest border', async () => {
        const raw = await rawFromKml(
            resolve(__dirname + '../../../map/kml/gadm36_HUN_1.kml'),
            'Hungary/Budapest'
        )
        expect(raw.length).toBeGreaterThan(1000)
    })

})

describe('Extract Kml file', () => {

    it('Get coordinates from raw data', () => {
        const coords = rawToCoordinates('1.234,9.8765 2.444,3.666 0.12,2')
        expect(coords).toEqual([
            {lat: 1.234, lon: 9.8765 },
            {lat: 2.444, lon: 3.666 },
            {lat: 0.12, lon: 2 }
        ])
    })

})
