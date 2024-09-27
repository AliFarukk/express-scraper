import puppeteer from 'puppeteer';


const serp = async (res) => {

    const browser = await puppeteer.launch({ 
        headless: true,
        executablePath: process.env.NODE_ENV === 'production'
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath()
    });

    try {
        // google query 
        let query = 'https://www.google.com/search?q=best+seo+agency&gl=pk';
        let query2 = 'https://whatismyipaddress.com/';

        
        const page = await browser.newPage();

        await page.goto(query);

        await page.waitForSelector('div#search');

        // Extract search result titles and links
        // select all divs with claass g Ww4FFb vt6azd tF2Cxc asEBEc
        const results = await page.evaluate(() => {
            const searchResults = [];
            const items = document.querySelectorAll('.g.Ww4FFb.vt6azd.tF2Cxc.asEBEc');
            items.forEach(item => {
                const title = item.querySelector('h3') ? item.querySelector('h3').innerText : '';
                const link = item.querySelector('a') ? item.querySelector('a').href : '';
                const snippet = item.querySelector('.IsZvec') ? item.querySelector('.IsZvec').innerText : '';
                if (title && link) {
                    searchResults.push({ title, link, snippet });
                }
            });
            return searchResults;
        });

        console.log(results);
        res.send(results);

    } catch (e) {

        res.send(e);

    } finally {

        await browser.close();

    }





}

export default serp;