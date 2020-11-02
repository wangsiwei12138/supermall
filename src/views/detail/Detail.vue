<template>
    <div class="detail">
        <detail-nav-bar @titleClick="titleClick" ref="nav" />
        <scroll
            class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
        >
            <detail-swiper :top-images="topImages" />
            <detail-base-info :goods="goods" />
            <detail-shop-info :shop="shop" />
            <detail-goods-info
                :detail-info="detailInfo"
                @imageLoad="imageLoad"
            />
            <detail-param-info ref="params" :param-info="paramInfo" />
            <detail-comment-info ref="comment" :comment-info="commentInfo" />
            <goods-list ref="recommend" :goods="recommends" />
        </scroll>
        <detail-bottom-bar @addCart="addToCart" />
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        <!-- <back-top @click.native="backClick" v-show="isShowBackTop"></back-top> -->
    </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
    getDetail,
    Goods,
    Shop,
    GoodsParam,
    getRecommend,
} from "network/detail";
import { debounce } from "common/utils";
// import { itemListenerMixin, backTopMixin } from "common/mixin";
import { itemListenerMixin, backTopMixin } from "common/mixin";


import { mapActions } from "vuex";

export default {
    name: "Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList,
    },
    // mixins: [itemListenerMixin, backTopMixin],
    mixins: [itemListenerMixin, backTopMixin],
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            itemImgLoad: null,
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0,
            isTabFixed: false,
            saveY: 0,
        };
    },
    created() {
        //1.保存传入的iid
        this.iid = this.$route.params.iid;

        //2.根据iid请求详情数据
        getDetail(this.iid).then((res) => {
            //1.获取数据
            const data = res.result;

            //2.获取顶部的图片轮播数据
            this.topImages = data.itemInfo.topImages;

            //3.获取商品信息
            this.goods = new Goods(
                data.itemInfo,
                data.columns,
                data.shopInfo.services
            );

            //4.创建店铺信息对象
            this.shop = new Shop(data.shopInfo);

            //5.保存商品的详情数据
            this.detailInfo = data.detailInfo;

            //6.获取参数信息
            this.paramInfo = new GoodsParam(
                data.itemParams.info,
                data.itemParams.rule
            );

            //7.取出评论的信息
            if (data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0];
            }
        });

        //3.请求推荐数据
        getRecommend().then((res) => {
            // console.log(res);
            this.recommends = res.data.list;
        });

        //4.给getThemeTopy赋值
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = [];

            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
            this.themeTopYs.push(Number.MAX_VALUE);
        }, 100);
    },

/*     mounted() {},
    updated() {}, */
    destroyed() {
        this.$bus.$off("imageLoad", this.itemIamgeListener);
    },
    methods: {
        ...mapActions(["addCart"]),
        imageLoad() {
            this.$refs.scroll.refresh();
            this.getThemeTopY();
        },

        titleClick(index) {
            // console.log(index);
            this.$refs.scroll.refresh();
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
        },
        contentScroll(position) {
            const positionY = -position.y;

            let length = this.themeTopYs.length;

            for (let i = 0; i < length - 1; i++) {
                if (
                    this.currentIndex !== i &&
                    positionY >= this.themeTopYs[i] &&
                    positionY < this.themeTopYs[i + 1]
                ) {
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                }
            }
            //是否显示回到顶部
            //1.判断backTop是否显示
            this.isShowBackTop = -position.y > 1000;

            //2.决定tabControl是否吸顶(position:fixed)
            this.isTabFixed = -position.y > this.taboffsetTop;
        },
        addToCart() {
            //1.获取购物车需要展示的信息
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.newPrice;
            product.iid = this.iid;

            //2.将商品添加到购物车里
            // this.$store.cartList.push(product)
            // this.$store.commit('addCart',product)
            this.addCart(product).then((res) => {
                this.$toast.show(res, 1500);
            });
        },
    },
};
</script>

<style scoped>
.detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
}

.content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
}
</style>