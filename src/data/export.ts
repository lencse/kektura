import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { rawFromKml, coordinatesFromGpx, checkpointsFromGpx } from '../map/files'
import { rawToCoordinates, filterByDistance, project, suitCheckpointsToHikingPath } from '../map/map'
import Data from './Data'
import config from '../../config/config'
import CheckpointData from '../map/CheckpointData'
import Coordinate from '../map/Coordinate'

async function data(): Promise<Data> {
    const kekturaData = await kektura()
    return {
        hungary: (await hungary()).map(project),
        budapest: (await budapest()).map(project),
        kektura: kekturaData.map(project),
        checkpoints: suitCheckpointsToHikingPath(await checkpoints(), kekturaData)
    }
}

const thresholds = config.resolutionThresholdMeters

const hungary = kmlData('gadm36_HUN_0.kml', 'Hungary', thresholds.hungary)
const budapest = kmlData('gadm36_HUN_1.kml', 'Hungary/Budapest', thresholds.budapest)
const kektura = gpxData('okt_teljes_gpx_2019-06-28.gpx', thresholds.kektura)
const checkpoints = checkpointData('Orszagos_Kektura-pecsetek.gpx')

function kmlData(
    kmlFileName: string,
    areaQualifier: string,
    distanceThreshold: number
): () => Promise<Coordinate[]> {
    return async () =>
        filterByDistance(
            rawToCoordinates(
                await rawFromKml(filePath(kmlFileName), areaQualifier)
            ),
            distanceThreshold
        )
}

function gpxData(
    gpxFileName: string,
    distanceThreshold: number
): () => Promise<Coordinate[]> {
    return async () =>
        filterByDistance(
            await coordinatesFromGpx(filePath(gpxFileName)),
            distanceThreshold
        )
}

function filePath(fileName: string): string {
    return resolve(process.cwd(), 'map', fileName)
}

export async function writeData(dataFilePath: string): Promise<void> {
    writeFileSync(dataFilePath, JSON.stringify(await data()))
}

function checkpointData(gpxFileName: string): () => Promise<CheckpointData[]> {
    return async () =>
        (await checkpointsFromGpx(filePath(gpxFileName)))
}
