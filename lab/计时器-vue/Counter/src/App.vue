<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
    <div id="controltable">
      <before-counting v-if="counting === 0" @startCounting="start"></before-counting>
      <while-counting v-if="counting > 0" v-bind:up-down=counting
        v-bind:input-hour=Number(inHour) v-bind:input-minute=Number(inMinute)
         v-bind:input-second=Number(inSecond) v-bind:is-stop = stop @clkPause="pause" @clkClear="clear" @clkReset="reset">
      </while-counting>
    </div>
    <time-text>{{hour > 9 ? hour : '0' + hour}}:{{minute > 9 ? minute : '0' + minute}}:{{second > 9 ? second : '0' + second}}</time-text>
  </div>
</template>

<script>
import TimeText from './components/TimeText'
import BeforeCounting from './components/BeforeCounting'
import WhileCounting from './components/WhileCounting'
export default {
  name: 'App',
  data: function () {
    return {
      counting: 0,
      inHour: 0,
      inMinute: 0,
      inSecond: 0,
      timer: '',
      hour: 0,
      minute: 0,
      second: 0,
      tenth: 0,
      stop: 0,
      upClear: 1,
      downClear: 1
    }
  },
  components: {
    TimeText,
    BeforeCounting,
    WhileCounting
  },
  methods: {
    up (startHour, startMinute, startSecond) {
      if (this.inHour === 0 && this.inMinute === 0 && this.inSecond === 0) {
        this.stop = 1
        this.upClear = 1
        return
      }
      if (this.inSecond < 0 || this.inMinute < 0 || this.inHour < 0) {
        alert('Wrong Input!')
        this.counting = 0
        this.tenth = 0
        this.stop = 0
        this.hour = 0
        this.minute = 0
        this.second = 0
        return
      }
      this.hour = startHour
      this.minute = startMinute
      this.second = startSecond
      this.upClear = 0
      this.timer = setInterval(() => {
        this.tenth += 1
        if (this.tenth >= 10) {
          this.tenth = 0
          this.second += 1
        }
        if (this.second >= 60) {
          this.second = 0
          this.minute += 1
        }
        if (this.minute >= 60) {
          this.minute = 0
          this.hour += 1
        }
        if (this.second === this.inSecond && this.minute === this.inMinute && this.hour === this.inHour) {
          clearInterval(this.timer)
          this.upClear = 1
          this.stop = 1
        }
      }, 100)
    },

    down (startHour, startMinute, startSecond) {
      if (startHour === 0 && startMinute === 0 && startSecond === 0) {
        this.stop = 1
        this.downClear = 1
        return
      }
      if (startHour < 0 || startMinute < 0 || startSecond < 0) {
        alert('Wrong Input!')
        this.counting = 0
        this.tenth = 0
        this.stop = 0
        this.hour = 0
        this.minute = 0
        this.second = 0
        return
      }
      this.hour = startHour
      this.minute = startMinute
      this.second = startSecond
      this.downClear = 0
      this.timer = setInterval(() => {
        this.tenth -= 1
        if (this.tenth < 0) {
          this.second -= 1
          this.tenth = 9
        }
        if (this.second < 0) {
          this.second = 59
          this.minute -= 1
        }
        if (this.minute < 0) {
          this.minute = 59
          this.hour -= 1
        }
        if (this.hour === 0 && this.minute === 0 && this.second === 0) {
          clearInterval(this.timer)
          this.downClear = 1
          this.stop = 1
        }
      }, 100)
    },

    start (data, inputHour, inputMinute, inputSecond) {
      this.counting = data
      this.inHour = inputHour
      this.inMinute = inputMinute
      this.inSecond = inputSecond
      if (data === 1) {
        this.up(0, 0, 0)
      } else if (data === 2) {
        this.down(inputHour, inputMinute, inputSecond)
      }
    },

    pause (val) {
      if (val === 1) { //  暂停操作
        if (this.downClear === 0 || this.upClear === 0) {
          clearInterval(this.timer)
        }
      } else if (val === 2) { // 恢复操作
        if (this.counting === 1) {
          this.up(this.hour, this.minute, this.second)
        } else if (this.counting === 2) {
          this.down(this.hour, this.minute, this.second)
        }
      }
    },

    clear () {
      this.counting = 0
      this.tenth = 0
      this.stop = 0
      if (this.downClear === 0 || this.upClear === 0) {
        clearInterval(this.timer)
      }
      this.hour = 0
      this.minute = 0
      this.second = 0
    },

    reset () {
      this.tenth = 0
      this.stop = 0
      if (this.downClear === 0 || this.upClear === 0) {
        clearInterval(this.timer)
      }
      if (this.counting === 1) {
        this.up(0, 0, 0)
      } else if (this.counting === 2) {
        this.down(this.inHour, this.inMinute, this.inSecond)
      }
    }
  }
}
</script>

<style>
#controltable {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 1220px;
    height: 70px;
    background-color: #97A5BC;
    border: 0px;
}
</style>
