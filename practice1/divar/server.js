import got from 'got';

async function getData() {
        const response = await got('https://api.divar.ir/v8/web-search/mashhad/mobile-tablet?goods-business-type=all');
        // console.log(response);
        const jsonString = response.body.toString();
        const json = JSON.parse(jsonString);
        console.log(json.last_post_date);
}


getData();