import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { rawFromKml, coordinatesFromGpx } from '../map/files'
import { rawToCoordinates, filterByDistance, project } from '../map/map'
import Data from './Data'
import Point from '../map/Point'
import config from '../../config/config'
// import Checkpoint from '../map/Checkpoint';
// import Coordinate from '../map/Coordinate';
// import { HikePathNode } from '../map/HikePathNode';

async function data(): Promise<Data> {
    // console.dir(
    //     mergePath(await kektura2(), await checkpoints())
    // )
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
// const kektura2 = gpxCoordinates('okt_teljes_gpx_2019-06-28.gpx')
// const checkpoints = checkpointData('Orszagos_Kektura-pecsetek.gpx')

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

// function gpxCoordinates(
//     gpxFileName: string
// ): () => Promise<Coordinate[]> {
//     return async () => await coordinatesFromGpx(filePath(gpxFileName))
// }

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

// function checkpointData(gpxFileName: string): () => Promise<Checkpoint[]> {
//     return async () =>
//         (await checkpointsFromGpx(filePath(gpxFileName)))
// }

// function mergePath(hikePath: Coordinate[], checkpoints: Checkpoint[]): HikePathNode[] {
//     const result: HikePathNode[] = [{
//         coordinate: checkpoints[0].coordinate,
//         checkpointIdx: checkpoints[0].checkpointIdx
//     }]
//     let i = 0
//     let j = 1
//     console.dir(checkpoints)
//     while (i < hikePath.length || j < checkpoints.length - 1) {
//         const last = result[result.length - 1].coordinate
//         const d1 = distanceInMeters(last, hikePath[i])
//         const d2 = distanceInMeters(last, checkpoints[j].coordinate)
//         if (i < hikePath.length && d1 < d2) {
//             result.push({
//                 coordinate: hikePath[i]
//             })
//             ++i
//         } else {
//             result.push({
//                 coordinate: checkpoints[j].coordinate,
//                 checkpointIdx: checkpoints[j].checkpointIdx
//             })
//             ++j
//         }
//     }
//     // for (let i = 0; i < hikePath.length; ++i) {
//     //     for (let j = 0; j < checkpoints.length; ++j) {
//     //         const l = [hikePath[i].lat]
//     //     }
//     // }

//     return []
// }
