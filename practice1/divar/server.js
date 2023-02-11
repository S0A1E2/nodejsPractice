import got from 'got';

async function getData() {
    try {
        const response = await got('https://api.divar.ir/v8/web-search/mashhad/mobile-tablet?goods-business-type=all');
        console.log(response);
    } catch(error) {
        console.log(error.response.body);
    }
}

getData();