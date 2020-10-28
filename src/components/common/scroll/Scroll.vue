<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
    name: "Scroll",
    props: {
        probeType: {
            type: Number,
            default: 0,
        },
        pullUpLoad: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            scroll: null,
            message: "哈哈哈",
        };
    },
    mounted() {
        //1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad,
            pullingUp: true,
            pullUpLoad: true,
        });
        // this.scroll.scrollerHeight = 1000;
        //2.监听滚动的位置
        this.scroll.on("scroll", (position) => {
            this.$emit("scroll", position);
            this.scroll.refresh();
            // console.log(this.scroll.refresh());
        });

        //3.监听上拉事件
        this.scroll.on("pullingUp", () => {
            // console.log('上拉加载更多');
            this.$emit("pullingUp");
        });

        this.scroll.refresh();
    },
    methods: {
        scrollTo(x, y, time = 300) {
            this.scroll.scrollTo(x, y, time);
        },
        finishPullUp() {
            // console.log('----');
            this.scroll.finishPullUp();
            // this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
        },
        /* scrollTo(x, y, time){
            this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
        }, */
        refresh() {
            this.scroll.refresh();
            // this.scroll && this.scroll.refresh && this.scroll.refresh()
        },
        /* getCurrentY(){
            return this.scroll.y ? this.scroll.y :0
        } */
    },
};
</script>

<style scoped>
</style>
