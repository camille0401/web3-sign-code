const { By, Key, until } = require('selenium-webdriver');

module.exports = {
    findElements: async function (driver, o) {
        if (o.type == 'id') {
            return await driver.findElements(By.id(o.content));
        } else if (o.type == 'className') {
            return await driver.findElements(By.className(o.content));
        } else if (o.type == 'xpath') {
            return await driver.findElements(By.xpath(o.content));
        }else if (o.type == 'css') {
            return await driver.findElements(By.css(o.content));
        } else {
            return null;
        }
    },
    reFindElement: async function (driver, o) {
        let i = 0;
        let elemets = await this.findElements(driver, o);
        if (elemets && elemets.length > 0) {
            return elemets[0];
        } else {
            while (i<5) {
                await driver.sleep(500);
                elemets = await this.findElements(driver, o);
                if (elemets && elemets.length > 0) {
                    return elemets[0];
                }else{
                    i++;
                }
            }
            return null;

        }
    },
    oper:async function(e,t,v){
        if( t == "click"){
            await e.click();
        }else if(t == "info"){
            
        }else if(t == "input"){
            await e.sendKeys(v); 
        }
    },
}