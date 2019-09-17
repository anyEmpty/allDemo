<template>
<transition name="fade">
    <div class="message" :class="type" v-if="show">
      <i class="icon"></i>
      <span class="text">{{text}}</span>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'message',
  props: {
    type: {
      type: String,
      default: 'info',
      validator: val => ['info', 'success', 'warning', 'error'].includes(val)
    },
    text: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
   // fade动画 <transition name="fade"> </transition>
   // 下面的样式可以自己改
  .fade-enter-active,
  .fade-leave-active {
     transition: opacity .3s;
  }
  .fade-enter,
  .fade-leave-to{
     opacity: 0;
  }
  .message{
    position: fixed;
    width: 60%;
    max-height: 100px;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    color: #ccc;
    font-size: 12px;
    border-radius: 4px;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    .text{
      box-sizing: border-box;
      background: #f5f5f5;
      // box-shadow: 0 0 10px rgba(0, 0, 0, .3);
      padding: 10px 20px;
    }
    &.info{
      color: red;
    }
    &.success{
      color: red;
    }
    &.error{
      color: red;
    }
    &.warning{
      color: red;
    }
  }
</style>
