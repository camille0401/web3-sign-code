
const { By, Key, until } = require('selenium-webdriver');
const extensionId = 'nkbihfbeogaeaoehlefnkodbefgpgknn';

class MateMask {
    constructor(driver) {
        this.driver = driver;
    }

    //狐狸钱包login
    async login(pwd) {
        let login_html = "chrome-extension://" + extensionId + "/home.html";

        await this.driver.get(login_html);
        await this.driver.get(login_html);
        // 等待插件加载完成
        await this.driver.sleep(2000);

        await this.driver.findElement(By.id('password')).sendKeys(pwd);
        
        
        await this.driver.findElement(By.xpath('//button[@data-testid="unlock-submit"]')).click();

    }

    //狐狸钱包名称切换账号
    async change_account(account) {
        await this.driver.sleep(2000);
        await this.driver.findElement(By.xpath('//button[@data-testid="network-display"]')).click();
        await this.driver.findElement(By.xpath('//span[text()="' + account.name + '"]')).click();

    }

    //狐狸钱根据名称切换网络
    async change_chain(chain_name) {
        await this.driver.sleep(2000);
        await this.driver.findElement(By.xpath('//button[@data-testid="network-display"]')).click();

        let eles = await this.driver.findElements(By.xpath('//div[text()="' + chain_name + '"]'));
        if(eles && eles.length>0){
            eles[0].click();
        }else{
            eles = await this.driver.findElements(By.xpath('//span[text()="' + chain_name + '"]'));
            eles[0].click();
        }
        // this.driver.wait(
        //     until.elementLocated(By.xpath(xpathExpression)),
        //     10000)
        //     .then(element => element.click())
        //     .catch(error => console.error('Error:', error))
        //     .finally(() => {
        //         // 关闭浏览器
        //         driver.quit();
        //     });


        // let chains = await this.driver.findElements(By.xpath('//span[text()="' + chain_name + '"]'));
        // if (chains && chains.length > 0) {
        //     chains[0].click;
        // }else{
        //     chains = await this.driver.findElement(By.xpath('//div[@class(contans(),"multichain-network-list-item__network-name") and contants(text(),'+chain_name+')]')).click();; 
        // }
    }

    //狐狸钱确认操作
    async confirm() {
        let handles = await driver.getAllWindowHandles();

        while (handles.length == 1) {
            await driver.sleep(3000);
            handles = await driver.getAllWindowHandles();
        }

        if (handles.length > 1) {
            await driver.switchTo().window(handles[1]);
            await driver.findElement(By.xpath('//button[@data-testid="page-container-footer-next]')).click();

        } else {
            console.log("没有钱包弹窗！");
            return null;
        }
    }

    //狐狸钱拒绝操作
    async refused() {
        let handles = await driver.getAllWindowHandles();

        while (handles.length == 1) {
            await driver.sleep(3000);
            handles = await driver.getAllWindowHandles();
        }

        if (handles.length > 1) {
            await driver.switchTo().window(handles[1]);
            await driver.findElement(By.xpath('//button[@data-testid="page-container-footer-cancel]')).click();

        } else {
            console.log("没有钱包弹窗！");
            return null;
        }

    }



}

module.exports = MateMask