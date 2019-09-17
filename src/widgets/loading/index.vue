<template>
  <div class="weui_loading_toast" v-show="show">
    <div class="weui_mask_transparent" @touchmove.prevent=""></div>
    <div class="weui_toast">
      <div class="weui_loading">
        <div class="weui_loading_leaf" :key="i" v-for="i in 12" :class="['weui_loading_leaf_' + (i - 1)]"></div>
      </div>
      <div class="weui_toast_content">{{text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    text: {
      type: String,
      default: 'Loading'
    }
    // position: String
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
.weui_mask_transparent{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0);
  left: 0;
  top: 0;
}
.weui_toast{
  position: fixed;
  width: 60%;
  height: 4rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}
.weui_toast_content{
  font-size: 16px;
  flex: 1;
  text-align: center;
}
.weui_loading{
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
