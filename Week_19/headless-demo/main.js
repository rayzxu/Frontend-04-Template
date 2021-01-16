const puppeteer = require('puppeteer');

async function main() {
    console.log('11111')
    console.log(puppeteer)
    const brower = await puppeteer.launch();
    const page = await brower.newPage();
    await page.goto('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E5%89%8D%E7%AB%AF%20%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%20%E8%80%97%E6%97%B6&oq=%25E5%258D%2595%25E5%2585%2583%25E6%25B5%258B%25E8%25AF%2595%2520%25E8%2580%2597%25E6%2597%25B6&rsv_pq=dcd437bd000129df&rsv_t=05efGlGY5577yBNeLRH0PADjJGFt8HQi2qZa6qz4RSWAnVEXSLPF1QFpaws&rqlang=cn&rsv_dl=tb&rsv_enter=1&rsv_btype=t&inputT=2826&rsv_sug3=80&rsv_sug1=18&rsv_sug7=100&rsv_sug2=0&rsv_sug4=3534');
    const a = await page.$('a');
    console.log('11111');
    console.log(await a.asElement().boxModel());
    await brower.onClose()
    // await hrefElement.click()
};

main()