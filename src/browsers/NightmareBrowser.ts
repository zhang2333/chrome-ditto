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
        let sessionId = options.sessionId ? 'persist: ' + options.sessionId : null
        let initNMOptions = {
            switches: {
                'ignore-certificate-errors': options.ignoreHTTPSErrors
            },
            webPreferences: {
                showImages: options.showImages,
                partition: sessionId
            },
            waitTimeout: options.waitTimeout,
            show: options.show,
        }

        let proxy = options.proxy
        if (proxy.host) {
            initNMOptions.switches['proxy-server'] = `${proxy.host}:${proxy.port}`
        }

        let instance = this.model(initNMOptions)
        if (proxy.username) {
            await instance.authentication(proxy.username, proxy.password)
        }

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
