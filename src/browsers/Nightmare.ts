import * as path from 'path'

import Base from '../models/Base'
import { DittoOptions } from '../models/types'
import * as utils from '../utils'

export default class Nightmare extends Base {
    name: string = 'nightmare'
    options: DittoOptions
    
    constructor (model: any) {
        super(model)
    }

    async init(options: DittoOptions): Promise<any> {
        this.options = options
        this.ins = this.model({
            switches: {
                'ignore-certificate-errors': options.ignoreHTTPSErrors
            },
            webPreferences: {
                showImages: options.showImages,
            },
            waitTimeout: options.waitTimeout,
            show: options.show,
        })

        return this
    }

    async wait (...args) {
        const firstArg = args[0]

        if (typeof firstArg === 'function') {
            let timeout = args[1] >= 0 ? args[1] : this.options.waitTimeout
            args.splice(1, 1) 
            await utils.timeout(this.ins.wait(...args), timeout)
        }
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
