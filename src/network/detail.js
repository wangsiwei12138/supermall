import { request } from "./request"

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend(){
    return request({
        url:'/recommend'
    })
}



export class Goods {
    constructor(itemIofo, columns, services) {
        this.title = itemIofo.title;
        this.desc = itemIofo.desc;
        // this.newPrice = itemIofo.price;
        this.newPrice = itemIofo.highNowPrice
        this.oldPrice = itemIofo.oldprice;
        this.discount = itemIofo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemIofo.lowNowPrice;
    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info, rule) {
        //注:images可能没有值(某些商品有值，某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.info = info.set;
        this.sizes = rule.tables;
    }
}
