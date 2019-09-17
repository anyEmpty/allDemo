<template>
  <div class="weui_dialog_alert" >
    <div class="weui_mask" @click="hideOnBlur && $emit('onHide')" v-show="show" @touchmove="$event.preventDefault()"></div>
    <div class="weui_dialog" v-show="show">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    hideOnBlur: {
      type: Function,
      default: () => {
        return ''
      }
    },
    scroll: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.weui_mask{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  left: 0;
  top: 0;
}
.weui_dialog{
  font-size: 12px;
  position:fixed;
  width: 60%;
  height: 4rem;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.1rem;
  display: flex;
  flex-direction: column;
}
</style>
