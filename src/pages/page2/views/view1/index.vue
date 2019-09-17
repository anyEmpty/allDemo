<template>
    <div class="view2">
        <p>我是page2的子页面view1</p>

        <button @click="$open({homepath: 'page1', name: 'view2'})">去page1 view2</button>
    </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
    name: "view1",
    props: {},
    computed: {
        // ...mapGetters([
        //   'text'
        // ])
    },
    beforeMount() {
        // let a = [7, 8, 9]
        // console.log([...a, 10])
    }
};
</script>
<style  lang='less' scoped>
@import url("./index.less");
</style>
