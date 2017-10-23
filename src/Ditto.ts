import NightmareBrowser from './browsers/NightmareBrowser'
import PuppeteerBrowser from './browsers/PuppeteerBrowser'
import { DittoOptions, Browsers } from './models/types'

export default function (source, options: DittoOptions = {}): Promise<Browsers> {
    let Model

    if (source.launch) {
        Model = PuppeteerBrowser
    } else if (source.Promise) {
        Model = NightmareBrowser
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

    return new Model(source).init(mergedOptions)
}
