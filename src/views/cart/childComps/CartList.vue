<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <cart-list-item
                v-for="(item, index) in cartList"
                :key="index"
                :item-info="item"
            />
        </scroll>
    </div>
</template>

<script>

import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

import { debounce } from "../../../common/utils";

import { mapGetters } from "vuex";

export default {
    name: "CartList",
    components: {
        Scroll,
        CartListItem,
    },
    computed: {
        ...mapGetters(["cartList"]),
        // pullUpLoad:true
    },
    activated () {
        this.$refs.scroll.refresh()
        console.log(this.$refs.scroll);
        // debounce(this.$refs.scroll.refresh(),500)
    },
    
};
</script>

<style scoped>
.cart-list {
    height: calc(100% - 44px - 49px - 40px);
}

.content {
    height: 100%;
    overflow: hidden;
}
</style>