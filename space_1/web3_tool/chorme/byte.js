const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
const request = require('request-promise-native');

class ByteBrowserUtil {
    constructor(id) {
        this.params = {
            id: id,
            args: [],
            loadExtensions: false,
            extractIp: false
        }
        this.chrome_options = new chrome.Options();
    }

    async initDriver() {
        try {
            let data = this.params;
            const openRes = await request({url:'http://127.0.0.1:54345/browser/open', method:"post",json:true, body:data});
            if (openRes.success) { 

                let options = new chrome.Options()
                options.options_['debuggerAddress'] = openRes.data.http
                //options.options_['prefs'] = { 'profile.default_content_setting_values': { images: 2 } }
            
                let driverPath = openRes.data.driver
                this.chrome_options.setChromeBinaryPath(driverPath);
            
                this.driver = new webdriver.Builder()
                  .setChromeOptions(options)
                  .withCapabilities(webdriver.Capabilities.chrome())
                  .forBrowser('chrome')
                  .build()

                await this.closeAll();

                return this.driver;
            }

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

module.exports = ByteBrowserUtil
