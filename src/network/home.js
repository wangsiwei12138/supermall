import {request} from './request'

export function getHomeMultidata() {
  return request({
    // url:'/test/getBanners'
    url:'/home/multidata',
    // baseurl:"http://152.136.185.210:8000/api/z8",
  });
}

export function getHomeGoods(type,page){
  return request({
    // url:'/api/z8',
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}


/* function test(){
  const names = [

  ]
} */
/* export function getGoodsData(type, page) {
  return request({
    url:'/test/getGoods',
    params:{
      type,
      page
    }
  });
} */
