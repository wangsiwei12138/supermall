import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";


export const itemListenerMixin = {
    mounted () {
        //1.图片加载完成的事件监听
        const refresh = debounce(this.$refs.scroll.refresh, 50);
        //3.监听item中图片加载完成
        this.$bus.$on("itemImgLoad", () => {
            refresh();
        });
        this.$bus.$on("itemImgLoad",this.itemImageListener)
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data () {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
    }
}