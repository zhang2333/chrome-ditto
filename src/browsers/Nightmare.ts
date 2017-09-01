import * as path from 'path'

import Base from '../models/Base'
import { DittoOptions } from "../models/types"

export default class Nightmare extends Base {
    name: string = 'nightmare'
    
    constructor (model: any) {
        super(model)
    }

    async init(options: DittoOptions): Promise<any> {
        this.ins = this.model({
            switches: {
                'ignore-certificate-errors': options.ignoreHTTPSErrors
            },
            webPreferences: {
                showImages: options.showImages,
            },
            show: options.show
        })

        return this
    }

    async setUserAgent(ua: string) {
        await this.ins.useragent(ua)
    }

    async setViewport(width: number, height: number) {
        await this.ins.viewport(width, height)
    }

    close(): Promise<void> {
        return this.ins.end().then(() => {})
    }

    screenshot(filePath: string): Promise<any> {
        return this.ins.screenshot(path.resolve(process.cwd(), filePath))
    }
}
