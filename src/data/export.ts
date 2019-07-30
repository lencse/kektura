import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { rawFromKml, coordinatesFromGpx, checkpointsFromGpx } from '../map/files'
import { rawToCoordinates, filterByDistance, project } from '../map/map'
import Data from './Data'
import Point from '../map/Point'
import config from '../../config/config'

async function data(): Promise<Data> {
    await checkpointData('Orszagos_Kektura-pecsetek.gpx')()
    return {
        hungary: await hungary(),
        budapest: await budapest(),
        kektura: await kektura()
    }
}

const thresholds = config.resolutionThresholdMeters

const hungary = kmlData('gadm36_HUN_0.kml', 'Hungary', thresholds.hungary)
const budapest = kmlData('gadm36_HUN_1.kml', 'Hungary/Budapest', thresholds.budapest)
const kektura = gpxData('okt_teljes_gpx_2019-06-28.gpx', thresholds.kektura)

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

function filePath(fileName: string): string {
    return resolve(process.cwd(), 'map', fileName)
}

export async function writeData(dataFilePath: string): Promise<void> {
    writeFileSync(dataFilePath, JSON.stringify(await data()))
}

function checkpointData(gpxFileName: string): () => Promise<Point[]> {
    return async () =>
        (await checkpointsFromGpx(filePath(gpxFileName))).map(project)
}
