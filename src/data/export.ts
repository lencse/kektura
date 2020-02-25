import { writeFileSync, readdirSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { rawFromKml, coordinatesFromGpx, checkpointsFromGpx } from '../map/files'
import { rawToCoordinates, filterByDistance, project, suitCheckpointsToHikingPath } from '../map/map'
import Data from './Data'
import config from '../../config/config'
import CheckpointData from '../map/CheckpointData'
import Coordinate from '../map/Coordinate'
import Hike from '../map/Hike'
import * as Md from 'markdown-it'

async function data(): Promise<Data> {
    const kekturaData = await kektura()
    return {
        hungary: (await hungary()).map(project),
        budapest: (await budapest()).map(project),
        kektura: kekturaData.map(project),
        checkpoints: suitCheckpointsToHikingPath(await checkpoints(), kekturaData),
        hikes: await hikes()
    }
}

const thresholds = config.resolutionThresholdMeters

const hungary = kmlData('gadm36_HUN_0.kml', 'Hungary', thresholds.hungary)
const budapest = kmlData('gadm36_HUN_1.kml', 'Hungary/Budapest', thresholds.budapest)
const kektura = gpxData('okt_teljes_gpx_2019-06-28.gpx', thresholds.kektura)
const checkpoints = checkpointData('Orszagos_Kektura-pecsetek.gpx')
const hikes = hikeData()

function kmlData(
    kmlFileName: string,
    areaQualifier: string,
    distanceThreshold: number
): () => Promise<Coordinate[]> {
    return async () =>
        filterByDistance(
            rawToCoordinates(
                await rawFromKml(mapFilePath(kmlFileName), areaQualifier)
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
            await coordinatesFromGpx(mapFilePath(gpxFileName)),
            distanceThreshold
        )
}

function mapFilePath(fileName: string): string {
    return resolve(process.cwd(), 'map', fileName)
}

function contentDir(): string {
    return resolve(process.cwd(), 'content')
}

export async function writeData(dataFilePath: string): Promise<void> {
    writeFileSync(dataFilePath, JSON.stringify(await data()))
}

function checkpointData(gpxFileName: string): () => Promise<CheckpointData[]> {
    return async () =>
        (await checkpointsFromGpx(mapFilePath(gpxFileName)))
}

const md = new Md()

function hikeData(): () => Promise<Hike[]> {
    return async () => readdirSync(contentDir()).filter((filename) => filename.match(/\.mdx$/))
        .map((fileName) => {
            const fileContent = readFileSync(resolve(contentDir(), fileName)).toString()
            const parts = /^---(.*)---(.*)$/sim.exec(fileContent)
            const metaData = JSON.parse(parts[1])
            return {
                start: new Date(metaData.start),
                end: new Date(metaData.end),
                name: metaData.name,
                startPointIdx: metaData.startPoint,
                endPointIdx: metaData.endPoint,
                text: md.render(parts[2])
            }
        })
}
