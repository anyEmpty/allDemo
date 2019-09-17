<template>
    <div class="view1">
        <p>我是page1的子页面view1</p>
        <button @click="$open({homepath: 'page2'})">去page2喽</button>
        <button @click="setText('hjsd')">哈哈</button>
        <router-link to="view2">view2</router-link>
        {{text}}
    </div>
</template>
<script>
// import { mapGetters, mapActions } from 'vuex'
import { iptCheck } from "@/common/utils/index.js";
// import { checkConfig } from '../../../../api/index.js'
import { mapGetters, mapActions } from "vuex";
import { aaa } from "@/server/text.js";
export default {
    name: "view1",
    // mixins: [mixA],
    props: {},
    data() {
        return {
            b: 2
        };
    },
    computed: {
        ...mapGetters(["text"])
    },
    methods: {
        ...mapActions(["setText"])
        // go () {
        //   console.log(232)
        //   this.$open({name: 'index', homepath: 'tmd'})
        // },
        // check () {
        //   this.SET_TEXT({text: {a: 2}})
        // }
    },
    beforeMount() {
        // let a = [7, 8, 9]
        // console.log(this)
        // console.log(this.$router)
        // console.log(this.text.a, 77)
        // console.log(checkConfig)
        // this.$loading({
        // text: '454'
        // })
        // this.$alert({
        // message: '你知道的',
        // buttonText: '确定'
        // })
        // checkConfig({a: 1})
        // .then(res => {
        // console.log(res)
        // })
        // this.$message.error('错误消息1').then(() => {console.log('err45454')})
        // setTimeout(() => {
        // this.$message.destroy();
        // this.$message.error('错误消息2').then(() => {console.log('err45454')})
        // }, 500)
        // this.$message.error('错误消息3').then(() => {console.log('err45454')})
        // this.$message.error('错误消息')
        // this.$message.error('错误消息')
        // this.$message.error('错误消息')
        // this.$message.error('错误消息')
        // console.log(this)
        // console.log(iptCheck('320382199412016815', 'checkCardId', true, ''))
        this.setText("89898");
        this.$vuexs("uhjsf");
        // aaa({ token: "oUMqgxH1iVbpdbdwM5XswQ8UWkqQ", isOfficial: "1" }).then(
        //     res => {
        //         console.log(res);
        //     }
        // );
    }
};
</script>
<style  lang='less' scoped>
@import url("./index.less");
</style>
