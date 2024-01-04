
const GooleBrowserUtil = require('./goole');
const MateMask = require('../wallets/matemask');


// 设置Chrome浏览器选项，使用已登录的谷歌账号
const driver = new GooleBrowserUtil("C:/Users/root/AppData/Local/Google/Chrome/User Data","Profile 2").initDriver();

const wallet = new MateMask(driver);

async function dowork(){
    //登录钱包
    await wallet.login('nsjsjssj520');
    //切换链
    await wallet.change_chain('Optimism');
    //
}

dowork();

















