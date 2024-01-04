const GooleBrowserUtil = require('../web3_tool/chorme/goole');//goole 分身
const ByteBrowserUtil = require('../web3_tool/chorme/byte');//比特浏览器
const AdsPowerUtil = require('../web3_tool/chorme/adspower');//ads 浏览器

const MateMask = require('../web3_tool/wallets/matemask');//小狐狸钱包

const dayJobs = require('./dayJob');

const jobConfig = {
    /****
     * 配置自己使用的什么工具
     * 1.goole 分身
     * 2.比特浏览器
     * 3.adspower 浏览器
     * 
     * 注意 ：只能选用一种
     */
    driver: 2,
    count: 6,//每次打开多少个窗口
    gooleConfig: [
        {
            name: "wangdery",//窗口名称 自定义
            datapath: "C:/Users/root/AppData/Local/Google/Chrome/User Data",//goole 数据保存的路径
            profile: "Profile 2"// 用户对应的文件夹名称
        }
    ],
    bytesConfig: [
        // {
        //     name: "wangdery_2",//窗口名称 
        //     id: "9761150ec41d432f849a30e6aec568ae"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "wangdery_3",//窗口名称 
        //     id: "f82226849d7349cf9181762c67b03afc"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "wangdery_4",//窗口名称 
        //     id: "b7790c452dc94b829b45caaca99ea2b4"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "wangdery_5",//窗口名称 
        //     id: "8a6b9645aa544559b52bb9a68e80179e"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "wangdery_6",//窗口名称 
        //     id: "ef9c6400d0524e55bf7158bbc1fda667"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "wangdery_7",//窗口名称 
        //     id: "fc94942c13a64a35ada8d64575549b26"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        {
            name: "wangdery_8",//窗口名称 
            id: "48fa7eed69994e18b0f46b737c5e6f5c"//窗口ID ，打开设置，点击第一行的复制ID
        },
        {
            name: "wangdery_9",//窗口名称 
            id: "8b1cafe969cd465aa3bfe80f6fdc1807"//窗口ID ，打开设置，点击第一行的复制ID
        },
        {
            name: "wangdery_10",//窗口名称 
            id: "fef00d09e0f542a694bfd465ac253eaa"//窗口ID ，打开设置，点击第一行的复制ID
        },
        {
            name: "wangdery_11",//窗口名称 
            id: "de817d4acd9d45f6af3aaddd1f539b05"//窗口ID ，打开设置，点击第一行的复制ID
        },
        // {
        //     name: "liuhaiying_12",//窗口名称 
        //     id: "0178763622d6479881af30ac15d6600e"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "liuhaiying_13",//窗口名称 
        //     id: "bd4d17c98d5742e5bab43e572af0f03f"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "liuhaiying_14",//窗口名称 
        //     id: "54647e4e47f5496fb891ee0f43ff1cf5"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "liuhaiying_15",//窗口名称 
        //     id: "75ccf8fb1dfc4c8c9227ef928ea32676"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "liuhaiying_16",//窗口名称 
        //     id: "e884394b66374419a9db09b3a7854837"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "liuhaiying_17",//窗口名称 
        //     id: "b690c28ba2294e129b87fb9d43e2fbe5"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "liuhaiying_18",//窗口名称 
        //     id: "97ad54b62fee48b38b12fde627729e7e"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "liuhaiying_19",//窗口名称 
        //     id: "811350d1cc8642d59b08239336d53b69"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "liuhaiying_20",//窗口名称 
        //     id: "316feffb8a6f4b18a9936fe8e8ee155c"//窗口ID ，打开设置，点击第一行的复制ID
        // },
        // {
        //     name: "liuhaiying_21",//窗口名称 
        //     id: "883a82b1504547e3b4e6a1a7db896a02"//窗口ID ，打开设置，点击第一行的复制ID
        // }

    ],
    adspowerConfig: [
        {
            name: "窗口1",//窗口名称 自定义
            adsId: "j94x8gr",//比特浏览器窗口id，对应比特浏览器-账号管理-序号、账号id
        },
        {
            name: "窗口2",//窗口名称 自定义
            adsId: "j94wyw5",//比特浏览器窗口id，对应比特浏览器-账号管理-序号、账号id
        },

    ]
}

// 设置Chrome浏览器选项，使用已登录的谷歌账号
// const driver = new GooleBrowserUtil("C:/Users/root/AppData/Local/Google/Chrome/User Data","Profile 2").initDriver();

// const wallet = new MateMask(driver);
// async function work(){
//     //打开窗口
//     let driver = new GooleBrowserUtil(e.datapath,e.profile).initDriver();
//     //循环执行每日job,单线程工作（暂时只支持一个窗口工作）
//     for (var prop in dayJobs) {
//         if (dayJobs.hasOwnProperty(prop)) {
//             console.log(prop.name);
//             prop.work(driver);
//         }
//     }

// }

async function dowork() {

    //判断使用的什么工具

    if (jobConfig.driver === 1) {
        /**如果使用的是goole 分身 */
        if (jobConfig.gooleConfig && jobConfig.gooleConfig.length > 0) {
            //多窗口工作
            for (let j = 0; j < jobConfig.gooleConfig.length; j++) {
                //打开窗口
                let e = jobConfig.gooleConfig[j];
                console.log("打开" + e.name + "窗口");
                let driver = await new GooleBrowserUtil(e.datapath, e.profile).initDriver();
                //循环执行每日job,单线程工作（暂时只支持一个窗口工作）
                for (var prop in dayJobs.dapps) {
                    if (dayJobs.dapps.hasOwnProperty(prop)) {
                        console.log(dayJobs.dapps[prop].name);
                        await dayJobs.dapps[prop].work(driver);
                    }
                }
                //ads 请求有限制 等待2秒开启下个窗口
                await wait(2);
            }
        }
        if (gooleConfig && gooleConfig.length() > 0) {
            //多窗口工作
            // 设置Chrome浏览器选项，使用已登录的谷歌账号
            // const driver = new GooleBrowserUtil("C:/Users/root/AppData/Local/Google/Chrome/User Data","Profile 2").initDriver();

        }
    } else if (jobConfig.driver === 2) {
        /**如果使用的是比特浏览器*/
        console.log("使用比特浏览器开始工作。");
        if (jobConfig.bytesConfig && jobConfig.bytesConfig.length > 0) {
            let arrCount = jobConfig.bytesConfig.length / jobConfig.count;
            //多窗口工作
            for (let j = 0; j < jobConfig.bytesConfig.length / jobConfig.count; j++) {
                //每次打开的窗口
                let tempArr;
                if ((j + 1) * jobConfig.count < jobConfig.bytesConfig.length) {
                    tempArr = jobConfig.bytesConfig.slice(j * jobConfig.count, (j + 1) * jobConfig.count);
                } else {
                    tempArr = jobConfig.bytesConfig.slice(j * jobConfig.count, jobConfig.bytesConfig.length);
                }

                tempArr.forEach(async e => {
                    console.log("打开" + e.name + "窗口");
                    let adspower = new ByteBrowserUtil(e.id);
                    await adspower.initDriver();
                    //循环执行每日job,单线程工作（暂时只支持一个窗口工作）
                    forJob(dayJobs.dapps, adspower, e);
                    //ads 请求有限制 等待2秒开启下个窗口
                    await wait(2);
                })
            }

            //  for(let j = 0;j<jobConfig.bytesConfig.length;j++){
            //      //打开窗口
            //      let e = jobConfig.bytesConfig[j];

            //  }
        }

    } else if (jobConfig.driver === 3) {
        /**如果使用的是ads浏览器*/
        console.log("使用ads浏览器开始工作。");
        if (jobConfig.adspowerConfig && jobConfig.adspowerConfig.length > 0) {
            //多窗口工作
            for (let j = 0; j < jobConfig.adspowerConfig.length; j++) {
                //打开窗口
                let e = jobConfig.adspowerConfig[j];
                console.log("打开" + e.name + "窗口");
                let adspower = new AdsPowerUtil(e.adsId);
                await adspower.initDriver();
                //循环执行每日job,单线程工作（暂时只支持一个窗口工作）
                forJob(dayJobs.dapps, adspower, e);
                //ads 请求有限制 等待2秒开启下个窗口
                await wait(2);
            }

        }
    } else {
        console.log("请选择使用的是什么浏览器！");
    }
    // //登录钱包
    // await wallet.login('nsjsjssj520');
    // // //切换链
    // await wallet.change_chain('zkSync Era Mainnet');

    // // console.log(zksync);
    // //
    // await zksync.dapps.syncswap.swap(driver,'0.001');
}

async function forJob(apps, adspower, e) {
    for (var prop in apps) {
        if (apps.hasOwnProperty(prop)) {
            await apps[prop].work(adspower, e);
        }
    }
}

function wait(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}

dowork();