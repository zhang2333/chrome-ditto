# Chrome Ditto

Common API for `Nightmare`, `Puppeteer`

## Install

``` shell
yarn add chrome-ditto

# or npm
npm i chrome-ditto
```

## Usage

``` js
const Ditto = require('chrome-ditto')
const Nightmre = require('nightmare')
// const puppeteer = require('puppeteer')

(async () => {
    const page = await Ditto(Nightmare)
    // const page = Ditto(puppeteer)
    await page.goto('http://www.example.com/')
    await page.wait('h1')
    let content = await page.evaluate(() => {
        return document.querySelector('p').textContent.trim()
    })
    console.log('content:', content)
    await page.screenshot('./example.png')
    await page.close()
})()
```

## API

### Ditto

- `Ditto(model, options: DittoOptions): Browser`

  `model`: Nightmare | Puppeteer, that you want to transform

- `DittoOptions`

  - `show`: `boolean`
  - `showImages`: `boolean`
  - `ignoreHTTPSErrors`: `boolean`
  - `waitTimeout`: `number`

### Browser

#### Init

- `init(options: DittoOptions): Promise`

#### Properties

- `model`
- `ins`

  instance of model

- `options: DittoOptions`
- `name: string`

  name of `Browser`, `'nightmare', 'puppeteer'` etc.


#### Setters of Browser

- `setUserAgent(ua: string): Promise`
- `setViewport(width: number, height: number): Promise`

#### Actions

- `click(selector: string): Promise`
- `close(): Promise`
- `goto(url: string): Promise`
- `type(selector: string, text: string): Promise`

#### Extract

- `evaluate(func: Function, arg1, arg2...): Promise`
- `html(): Promise<string>`
- `screenshot(relativePath: string): Promise`

#### Waiting

- `wait(time: number): Promise`
- `wait(selector: string, timeout: number): Promise`
- `wait(func: Function, timeout: number, arg1, arg2...): Promise`

  - `func(arg1, arg2...): boolean`

- `waitOne(waitings: Array<string|Function>, timeout: number): Promise<number>`

  ```js
  const isFooPage = () => !!window.location.href.match(/foo/)
  const flags = ['#succeessBox', '#failedBox', isfooPage]
  let indexOfFlag = await page.waitOne(flags)
  switch(indexOfFlag) {
    case 0:
      console.log('succeess')
      break
    case 1:
      console.log('failed')
      break
    case 2:
      throw 'foo?'
      break
  }
  ```
