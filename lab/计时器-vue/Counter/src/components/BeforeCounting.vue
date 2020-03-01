<template>
  <div>
    <input type="text" placeholder="0" id="hour" v-model="tempHour">
    <label id="l1">时</label>
    <input type="text" placeholder="0" id="minute" v-model="tempMinute">
    <label id="l2">分</label>
    <input type="text" placeholder="0" id="second" v-model="tempSecond">
    <label id="l3">秒</label>
    <button id="countup" @click="counting(1)">开始正计时</button>
    <button id="countdown" @click="counting(2)">开始倒计时</button>
  </div>
</template>

<script>
export default {
	name: "BeforeCounting",
	data: function() {
		return {
			tempHour: 0,
			tempMinute: 0,
			tempSecond: 0
		}
	},
	methods: {
		counting (val) {
			let data = val;
			let inputHour = this.tempHour > 99 ? 99 : this.tempHour;
			let inputMinute = this.tempMinute > 59 ? 59 : this.tempMinute;
			let	inputSecond = this.tempSecond > 59 ? 59 : this.tempSecond;
			this.$emit('startCounting', data, inputHour, inputMinute, inputSecond);
    },
  },
  mounted: function () {
    let that = this;
    window.onkeyup = function (event) {
      if(event.keyCode == 13){
        that.counting(1);
      }
    }
  }
}
</script>

<style scoped>
input::-webkit-input-placeholder {
  position:relative; 
  left:9px; 
  width: 7px; 
	height: 22px;
}

input {
	padding-left: 9px;
  width: 61px;
  height: 38px;
  border-radius: 5px;
  font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
  color: #afafaf;
  font-size: 16px;
  line-height: 22px;
  border: none;
}
#hour {
	position: fixed;
  top: 15px;
  left: 40px;
}
#minute {
  position: fixed;
  top: 15px;
  left: 130px;
}
#second {
  position: fixed;
  top: 15px;
  left: 220px;
}

label {
  position: fixed;
  z-index: 9;
  top: 24px;
  width: 32px;
  height: 22px;
  text-align: right;
  color: #222222;
}
#l1 {
  left: 69px;
}
#l2 {
  left: 159px;
}
#l3{
  left: 249px;
}

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
  background-color: #2188e9
}
#countup {
  position: fixed;
  top: 15px;
  left: 310px;
}
#countdown {
  position: fixed;
  top: 15px;
  left: 428px;
}
</style>