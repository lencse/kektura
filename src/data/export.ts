import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { rawFromKml } from '../map/kml'
import { rawToCoordinates, filterByDistance, project } from '../map/map'
import Data from './Data'
import Point from '../map/Point'

async function data(): Promise<Data> {
    return {
        hungary: await hungary(),
        budapest: await budapest(),
    }
}

const hungary = kmlData('gadm36_HUN_0.kml', 'Hungary', 200)
const budapest = kmlData('gadm36_HUN_1.kml', 'Hungary/Budapest', 200)

function kmlData(
    kmlFileName: string,
    areaQualifier: string,
    distanceThreshold: number
): () => Promise<Point[]> {
    return async () =>
        filterByDistance(
            rawToCoordinates(
                await rawFromKml(kmlPath(kmlFileName), areaQualifier)
            ),
            distanceThreshold
        ).map(project)
}

function kmlPath(kmlFileName: string): string {
    return resolve(process.cwd(), 'map/kml', kmlFileName)
}

export async function writeData(filePath: string): Promise<void> {
    writeFileSync(filePath, JSON.stringify(await data()))
}
