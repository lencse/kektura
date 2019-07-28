import { rawFromKml } from '../src/map/kml'
import { resolve } from 'path'
import { rawToCoordinates, distanceInMeters, filterByDistance, project } from '../src/map/map'

describe('Extract Kml file', () => {

    it('Extract Hungary border', async () => {
        const raw = await rawFromKml(
            resolve(process.cwd(), 'map/gadm36_HUN_0.kml'),
            'Hungary'
        )
        expect(raw).toMatch(/^(\d+\.\d+,\d+\.\d+ )+\d+\.\d+,\d+\.\d+$/)
    })

    it('Extract Budapest border', async () => {
        const raw = await rawFromKml(
            resolve(process.cwd(), 'map/gadm36_HUN_1.kml'),
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

    it('Transform to Pseudo-Mercator', () => {
        const point = project({ lat: 16.45419312, lon: 47.1848259 })
        expect(point).toEqual({ x: 5252590.792357266, y: 1857381.2976151858 })
    })

    it('Filter coordinates by distance', () => {
        const coordinates = [
            { lon: 20.47387314, lat: 46.15235138 },
            { lon: 20.47296524, lat: 46.15174866 },
            { lon: 20.47172356, lat: 46.15082932 },
            { lon: 20.47033882, lat: 46.14984894 },
            { lon: 20.46892357, lat: 46.14889145 },
            { lon: 20.46755791, lat: 46.14794159 },
            { lon: 20.46618271, lat: 46.14697647 },
            { lon: 20.46491814, lat: 46.14609528 },
            { lon: 20.46363449, lat: 46.14518738 },
        ]
        const filtered = filterByDistance(coordinates, 130)
        expect(filtered).toEqual([
            { lon: 20.47387314, lat: 46.15235138 },
            { lon: 20.47172356, lat: 46.15082932 },
            { lon: 20.47033882, lat: 46.14984894 },
            { lon: 20.46892357, lat: 46.14889145 },
            { lon: 20.46618271, lat: 46.14697647 },
            { lon: 20.46363449, lat: 46.14518738 }
        ])
    })

})
