import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { rawFromKml } from '../map/kml'
import { rawToCoordinates } from '../map/map'

export async function writeHungaryData(): Promise<void> {
    const raw = await rawFromKml(
        resolve(process.cwd(), 'map/kml/gadm36_HUN_0.kml'),
        'Hungary'
    )
    const coordinates = rawToCoordinates(raw)
    writeFileSync(resolve(process.cwd(), 'build/data/hungary.json'), JSON.stringify(coordinates))
}

export async function writeBudapestData(): Promise<void> {
    const raw = await rawFromKml(
        resolve(process.cwd(), 'map/kml/gadm36_HUN_1.kml'),
        'Hungary/Budapest'
    )
    const coordinates = rawToCoordinates(raw)
    writeFileSync(resolve(process.cwd(), 'build/data/budapest.json'), JSON.stringify(coordinates))
}
