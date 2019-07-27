import { rawFromKml } from '../../src/map/kml'
import { resolve } from 'path'
import { rawToCoordinates, distanceInMeters } from '../../src/map/map'

describe('Extract Kml file', () => {

    it('Extract Hungary border', async () => {
        const raw = await rawFromKml(
            resolve(process.cwd(), 'map/kml/gadm36_HUN_0.kml'),
            'Hungary'
        )
        expect(raw).toMatch(/^(\d+\.\d+,\d+\.\d+ )+\d+\.\d+,\d+\.\d+$/)
    })

    it('Extract Budapest border', async () => {
        const raw = await rawFromKml(
            resolve(process.cwd(), 'map/kml/gadm36_HUN_1.kml'),
            'Hungary/Budapest'
        )
        expect(raw).toMatch(/^(\d+\.\d+,\d+\.\d+ )+\d+\.\d+,\d+\.\d+$/)
    })

})

describe('Map', () => {

    it('Get coordinates from raw data', () => {
        const coords = rawToCoordinates('1.234,9.8765 2.444,3.666 0.12,2')
        expect(coords).toEqual([
            { lon: 1.234, lat: 9.8765 },
            { lon: 2.444, lat: 3.666 },
            { lon: 0.12, lat: 2 }
        ])
    })

    it('Calculate distance', () => {
        const distance = distanceInMeters(
            { lon: 16.45419312, lat: 47.1848259 },
            { lon: 16.45189667, lat: 47.18889236 }
        )
        expect(distance).toEqual(547)
    })

})
