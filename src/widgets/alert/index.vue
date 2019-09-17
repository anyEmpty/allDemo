<template>
  <div class="vux-alert">
    <x-dialog
    class="weui_dialog_alert"
    :show="show"
    @onHide="onHide">
      <div class="weui_dialog_hd">
      </div>
      <div class="weui_dialog_bd">
        <div v-if="html != ''" v-html="html"></div>
        <!-- <slot></slot> -->
      </div>
      <div class="weui_dialog_ft"  @click="onHide">
        <span class="weui_btn_dialog primary">{{buttonText}}</span>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import XDialog from '../x-dialog/index.vue'

export default {
  components: {
    XDialog
  },
  props: {
    show: Boolean,
    html: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: '我知道了'
    }
  },
  methods: {
    onHide () {
      console.log(1)
      this.show = false
    }
  }
}
</script>
<style lang="less" scoped>
.weui_dialog{

}
.weui_dialog_hd{
  flex: 0;
}
.weui_dialog_bd{
  width: 100%;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;

}
.weui_dialog_ft{
  flex: 1;
  width: 100%;
  color: #0095df;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-top: 1px solid #ccc;
}
</style>
