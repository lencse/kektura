import { resolve } from 'path'
import { writeData } from '../src/data/export'
import { readFileSync } from 'fs'
import Data from '../src/data/Data'

describe('Data export', () => {

    it('Write data to file', async () => {
        const filePath = resolve('/tmp', Date.now() + '.json')
        await writeData(filePath)
        const data: Data = JSON.parse(
            readFileSync(filePath).toString()
        )
        expect(data.budapest.length).toBeGreaterThan(100)
        expect(data.hungary.length).toBeGreaterThan(100)
    })

})
