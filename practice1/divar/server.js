import got from 'got';

async function getData() {;

        const response = await got('https://api.divar.ir/v8/web-search/mashhad/mobile-tablet?goods-business-type=all');
        const jsonString = response.body.toString();
        const json = JSON.parse(jsonString);

        const lastPostDate = json.last_post_date;
        const date = new Date(lastPostDate);

        const postList = json.web_widgets.post_list;

        for(let i = 0; i < postList.length; i++) {
        
            const lastPostSortDate = postList[i].action_log.server_side_info.info.extra_data.last_post_sort_date;
            console.log(lastPostSortDate);

             if(lastPostSortDate == lastPostDate) {
            
                 console.log(lastPostSortDate);
             }
            
             else {
            
                 console.log('nop');
             };
            
        };
        
};

getData();