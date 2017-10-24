import Browser from '../models/Browser'
import NightmarePage from '../pages/NightmarePage'
import { DittoOptions } from '../models/types'

export default class NightmareBrowser extends Browser<NightmarePage> {
    name: string = 'nightmare'
    pages: NightmarePage[] = []

    async init(options: DittoOptions): Promise<NightmareBrowser> {
        this.options = options || this.options
        return this
    }

    async newPage(): Promise<NightmarePage> {
        let options = this.options
        let initNMOptions = {
            switches: {
                'ignore-certificate-errors': options.ignoreHTTPSErrors
            },
            webPreferences: {
                showImages: options.showImages,
            },
            waitTimeout: options.waitTimeout,
            show: options.show,
        }
        if (options.sessionId) {
            initNMOptions.webPreferences['partition'] = 'persist: ' + options.sessionId
        }
        let instance = this.model(initNMOptions)
        let page = new NightmarePage(options, instance)
        this.pages.push(page)

        return page
    }

    async close() {
        let closePromises = this.pages.map((page) => {
            if (!page.isClosed()) {
                return page.close()
            }
            return Promise.resolve()
        })
        await Promise.all(closePromises)
        this.pages = []
    }
}
