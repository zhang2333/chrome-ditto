const Nightmare = require('nightmare')
const Puppeteer = require('puppeteer')

const Ditto = require('../dist')

const crawl = async (browserModel) => {
    let browser
    const selInput = '#translateContent'
    const selPara = '#phrsListTab > .trans-container li'
    let timeStart = Date.now()

    try {
        browser = await Ditto(browserModel, {
            show: false,
            showImage: false
        })
        let page = await browser.newPage()
        console.log(browser.name, 'started')

        await page.goto('http://dict.youdao.com/')
        await page.wait(selInput, 5e3)
        await page.type(selInput, 'browser')
        await page.click('button')

        const waitings = ['.aaa', '#hohwpekm', '.gewagheaw', '.xyz', selPara]
        let index = await page.waitOne(waitings)
        console.assert(4 === index, 'result of waitOne() should be 4')

        let paraphrasing = await page.evaluate((sel) => {
            let ele = document.querySelector(sel)
            return ele.textContent.trim()
        }, waitings[index])

        // await page.close()
        console.log(browser.name, paraphrasing)
    } catch (err) {
        console.error(err)
    } finally {
        await browser.close()
        console.log(browser.name, `${(Date.now() - timeStart) / 1000}s`)
    }
}

crawl(Nightmare)
crawl(Puppeteer)
