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
    data() {
        return {
            scroll: null,
        };
    },
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
    mounted() {
      
        //1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad,
            pullingUp: true,
            pullUpLoad: true,
        });
        //2.监听滚动的位置
        this.scroll.on("scroll", (position) => {
            this.$emit("scroll", position);
        });
        //3.监听上拉事件
        this.scroll.on("pullingUp", () => {
            this.$emit("pullingUp");
        });
    },
    methods: {
        finishPullUp() {
            this.scroll &&
                this.scroll.finishPullUp &&
                this.scroll.finishPullUp();
        },
        scrollTo(x, y, time) {
            this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
        },
        refresh() {
            this.scroll && this.scroll.refresh && this.scroll.refresh();
        },
        getCurrentY() {
            return this.scroll ? this.scroll.y : 0;
        },
    },
};
</script>

<style scoped>
</style>
