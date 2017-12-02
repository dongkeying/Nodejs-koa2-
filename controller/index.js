const superagent = require('superagent');
const cheerio = require('cheerio');
const charset2 = require('superagent-charset');

const url = "http://www.yujia.com/m_siftclasslist.html";
const result = [];
const getDetail = (ctx,next) => {
    superagent
        .get(url)
        .set({
            "Accept": "text / html, application/xhtml+xml,application/xml; q=0.9, image/webp,image/apng, */*;q=0.8",
            "Accept-Encoding":"gzip, deflate",
            "Cache-Control":"max-age=0",
            "Connection":"keep-alive",
            "Cookie":"user=76e8b2a262e285b450afdfa29c90aebd; date=2017-12-02; PHPSESSID=751a319s1t48ebh1ofurg2ok75; id=1303582; Hm_lvt_53e14e30a91f1a17e6c32395a2ad521e=1511964713,1512200145; Hm_lpvt_53e14e30a91f1a17e6c32395a2ad521e=1512220305",
            "Host":"www.yujia.com",
            "Referer":"http://www.yujia.com/m_siftclass/5317.html",
            "Upgrade-Insecure-Requests":1,
            "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        })
        .end((err,res) => {
            if(err){
                console.log(err);
                return ;
            }
            const $ = cheerio.load(res.text);
            const arr = $('.xui-row')[0].children;
            //存储图片
            $('#tab-box1 .xui-col-xs-6').find('img').each((index,element) => {
                result.push({
                    imgUrl: "http://www.yujia.com" + element.attribs.src
                })
            });
            $('#tab-box1 .xui-content').each((index,element) => {
                result[index].title = $(element).find('h2').text();
                result[index].maxPrice = $(element).find('s').text();
                result[index].minPrice = $(element).find('em').parent('span').text()
            });
        })
    ctx.body = result;
}

module.exports = {
    getDetail
}