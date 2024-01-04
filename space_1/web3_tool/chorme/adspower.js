const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const request = require('request-promise-native');

class AdsBrowserUtil {
  constructor(ads_id) {
    this.open_url = `http://127.0.0.1:50325/api/v1/browser/start?user_id=${ads_id}`;
    this.close_url = `http://127.0.0.1:50325/api/v1/browser/stop?user_id=${ads_id}`;
    this.chrome_options = new chrome.Options();
  }

  async initDriver() {
    try {
        const resp = await request.get(this.open_url, { json: true });
        const chrome_driver = resp.data.webdriver;
        const debuggerAddress = resp.data.ws.selenium;
        
        this.chrome_options.setChromeBinaryPath(chrome_driver);
        this.chrome_options.addArguments(`--remote-debugging-port=${debuggerAddress.split(':')[1]}`);

        this.driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(this.chrome_options)
          //.usingServer(new chrome.ServiceBuilder().build())
          .build();
        await this.closeAll();

        return this.driver;
         
      } catch (e) {
        console.log(e);
      }
  }

  async quit() {
    while (true) {
      try {
        await this.driver.quit();
        await request.get(this.close_url);
        break;
      } catch {
        // do nothing
      }
    }
  }

  async closeAll() {
    const allHandles = await this.driver.getAllWindowHandles();
    for (let i = 1; i < allHandles.length; i++) {
      await this.driver.switchTo().window(allHandles[i]);
      await this.driver.close();
    }
    await this.driver.switchTo().window(allHandles[0]);
  }
}

module.exports = AdsBrowserUtil
