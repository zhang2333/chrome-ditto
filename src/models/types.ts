import NightmareBrowser from "../browsers/NightmareBrowser"
import PuppeteerBrowser from "../browsers/PuppeteerBrowser"

export interface Proxy {
    username?: string
    password?: string
    host: string
    port: number
}

export interface DittoOptions {
    show?: boolean
    showImages?: boolean
    ignoreHTTPSErrors?: boolean
    waitTimeout?: number
    sessionId?: string
    proxy?: Proxy
}

export type Browsers = NightmareBrowser | PuppeteerBrowser
