const GooleBrowserUtil = require('./web3_tool/chorme/goole');
const MateMask = require('./web3_tool/wallets/matemask');

const zksync = require('./web3_jobs/zksync');

// 设置Chrome浏览器选项，使用已登录的谷歌账号
const driver = new GooleBrowserUtil("C:/Users/root/AppData/Local/Google/Chrome/User Data","Profile 2").initDriver();

const wallet = new MateMask(driver);

async function dowork(){
    //登录钱包
    await wallet.login('nsjsjssj520');
    // //切换链
    await wallet.change_chain('zkSync Era Mainnet');

    // console.log(zksync);
    //
    await zksync.dapps.syncswap.swap(driver,'0.001');
}

dowork();