import Nightmare from './browsers/Nightmare'
import Puppeteer from './browsers/Puppeteer'
import { DittoOptions } from './models/types'

export default function (source, options: DittoOptions = {}): Promise<Nightmare|Puppeteer> {
    let Model

    if (source.launch) {
        Model = Puppeteer
    } else if (source.Promise) {
        Model = Nightmare
    } else {
        throw new Error('Wrong source')
    }

    const mergedOptions: DittoOptions = {
        show: false,
        showImages: true,
        ignoreHTTPSErrors: false,
        waitTimeout: 3e4,

        ...options
    }

    return new Model(source, mergedOptions).init()
}
