import { readFileSync } from 'fs'
import { parseString } from 'xml2js'
import Coordinate from './Coordinate'

async function xml2json(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
        parseString(xml, (err, json) => {
            if (err) {
                reject(err)
            } else {
                resolve(json)
            }
        })
    })
}

export async function rawFromKml(kmlFilePath: string, areaQualifier: string): Promise<string> {
    const kml = readFileSync(kmlFilePath).toString()
    const data = await xml2json(kml.toString())
    return data.kml
        .Document[0]
        .Folder[0]
        .Placemark.filter((placemark) => areaQualifier === (
                placemark
                .ExtendedData[0]
                .SchemaData[0]
                .SimpleData.map((simpleData) => simpleData._).join('/')
            )
        )[0]
        .Polygon[0]
        .outerBoundaryIs[0]
        .LinearRing[0]
        .coordinates[0]
        .trim()
}

export async function coordinatesFromGpx(gpxFilePath: string): Promise<Coordinate[]> {
    const gpx = readFileSync(gpxFilePath).toString()
    const data = await xml2json(gpx.toString())
    return data.gpx
        .trk[0]
        .trkseg[0]
        .trkpt
        .map((node) => {
            return { lat: Number(node.$.lat), lon: Number(node.$.lon) }
        })
}
