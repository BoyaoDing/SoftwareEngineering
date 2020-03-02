<template>
  <div>
    <button id="reset" @click="clkReset">重新再计时</button>
    <button id="clear" @click="clkClear">
      <span v-if="UpDown == 1">清空正计时</span>
      <span v-else>清空倒计时</span>
    </button>
    <button id="pause" v-if="isStop == 0 && PauseResume == 1" @click="clkPause(1)">暂停计时器</button>
    <button id="resume" v-if="isStop == 0 && PauseResume == -1" @click="clkPause(2)">恢复计时器</button>
    <p id="hint">
      <span v-if="UpDown == 1 && isStop == 0 && PauseResume == 1">正在正计时 </span>
      <span v-if="UpDown == 2 && isStop == 0 && PauseResume == 1">正在倒计时 </span>
      <span v-if="UpDown == 1 && isStop == 0 && PauseResume == -1">暂停正计时</span>
      <span v-if="UpDown == 2 && isStop == 0 && PauseResume == -1">暂停倒计时</span>
      <span v-if="UpDown == 1 && isStop == 1">正计时</span>
      <span v-if="UpDown == 2 && isStop == 1">倒计时</span>
      {{ (inputHour > 9) ? inputHour : '0' + inputHour }}:{{ (inputMinute > 9) ? inputMinute : '0' + inputMinute }}:{{ (inputSecond > 9) ? inputSecond : '0' + inputSecond }}
      <span v-if="isStop == 1">已结束</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'WhileCounting',

  data: function () {
    return {
      PauseResume: 1
    }
  },

  props: {
    UpDown: {
      type: Number,
      default: 1
    },
    inputHour: {
      type: Number,
      default: 0
    },
    inputMinute: {
      type: Number,
      default: 0
    },
    inputSecond: {
      type: Number,
      default: 0
    },
    isStop: {
      type: Number,
      default: 0
    }
  },

  methods: {
    clkPause (val) {
      this.PauseResume = -this.PauseResume
      this.$emit('clkPause', val)
    },
    clkClear () {
      this.PauseResume = 1
      this.$emit('clkClear')
    },
    clkReset () {
      this.PauseResume = 1
      this.$emit('clkReset')
    }
  },

  mounted: function () {
    let that = this
    window.onkeyup = function (event) {
      if (event.keyCode === 32) {
        if (that.PauseResume === 1) {
          that.clkPause(1)
        } else if (that.PauseResume === -1) {
          that.clkPause(2)
        }
      }
    }
  }
}
</script>

<style scoped>
button {
  width: 98px;
  height: 40px;
  border-radius: 5px;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0px;
  color: #ffffff;
  border: none;
}
#pause {
  position: fixed;
  top: 15px;
  left: 227px;
  background-color: #2188e9;
}
#resume {
  position: fixed;
  top: 15px;
  left: 227px;
  background-color: #2188e9;
}
#clear {
  position: fixed;
  top: 15px;
  left: 964px;
  background-color: #dd2e1d;
}
#reset {
  position: fixed;
  top: 15px;
  left: 1082px;
  background-color: #ffb020;
}

#hint {
    position: fixed;
    left: 40px;
    top: 24px;
    width: 192px;
    height: 22px;
    margin: 0px;
    font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
}
</style>
