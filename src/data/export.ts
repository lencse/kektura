import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { rawFromKml, coordinatesFromGpx } from '../map/files'
import { rawToCoordinates, filterByDistance, project } from '../map/map'
import Data from './Data'
import Point from '../map/Point'

async function data(): Promise<Data> {
    return {
        hungary: await hungary(),
        budapest: await budapest(),
        kektura: await kektura()
    }
}

const hungary = kmlData('gadm36_HUN_0.kml', 'Hungary', 250)
const budapest = kmlData('gadm36_HUN_1.kml', 'Hungary/Budapest', 200)
const kektura = gpxData('okt_teljes_gpx_2019-06-28.gpx', 250)

function kmlData(
    kmlFileName: string,
    areaQualifier: string,
    distanceThreshold: number
): () => Promise<Point[]> {
    return async () =>
        filterByDistance(
            rawToCoordinates(
                await rawFromKml(filePath(kmlFileName), areaQualifier)
            ),
            distanceThreshold
        ).map(project)
}

function gpxData(
    gpxFileName: string,
    distanceThreshold: number
): () => Promise<Point[]> {
    return async () =>
        filterByDistance(
            await coordinatesFromGpx(filePath(gpxFileName)),
            distanceThreshold
        ).map(project)
}

function filePath(kmlFileName: string): string {
    return resolve(process.cwd(), 'map', kmlFileName)
}

export async function writeData(dataFilePath: string): Promise<void> {
    writeFileSync(dataFilePath, JSON.stringify(await data()))
}
