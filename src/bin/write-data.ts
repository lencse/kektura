import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { rawFromKml } from '../map/kml'
import { rawToCoordinates } from '../map/map'

(async () => {
    const raw = await rawFromKml(
        resolve(process.cwd(), 'map/kml/gadm36_HUN_0.kml'),
        'Hungary'
    )
    const coordinates = rawToCoordinates(raw)
    writeFileSync(resolve(process.cwd(), 'build/data/hungary.json'), JSON.stringify(coordinates))
}) ()
