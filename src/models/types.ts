import NightmareBrowser from "../browsers/NightmareBrowser"
import PuppeteerBrowser from "../browsers/PuppeteerBrowser"

export interface DittoOptions {
    show?: boolean
    showImages?: boolean
    ignoreHTTPSErrors?: boolean
    waitTimeout?: number
    sessionId?: string
}

export type Browsers = NightmareBrowser | PuppeteerBrowser
