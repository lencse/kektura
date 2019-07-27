import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { rawFromKml } from '../map/kml'
import { rawToCoordinates } from '../map/map'
import distanceInMeters from '../map/distance'

export async function writeHungaryData(): Promise<void> {
    const raw = await rawFromKml(
        resolve(process.cwd(), 'map/kml/gadm36_HUN_0.kml'),
        'Hungary'
    )
    const coordinates = rawToCoordinates(raw)
    const c = [coordinates[0]]
    for (let i = 1; i < coordinates.length - 1; i += 1) {
        if (distanceInMeters(coordinates[i], coordinates[i-1]) >= 200) {
            c.push(coordinates[i])
        }
    }
    c.push(coordinates[coordinates.length - 1])
    console.table(c)
    console.table([
        c[0], c[c.length -1]
    ])
    writeFileSync(resolve(process.cwd(), 'build/data/hungary.json'), JSON.stringify(c))
}

export async function writeBudapestData(): Promise<void> {
    const raw = await rawFromKml(
        resolve(process.cwd(), 'map/kml/gadm36_HUN_1.kml'),
        'Hungary/Budapest'
    )
    const coordinates = rawToCoordinates(raw)
    writeFileSync(resolve(process.cwd(), 'build/data/budapest.json'), JSON.stringify(coordinates))
}
