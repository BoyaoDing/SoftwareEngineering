<template>
  <div>
    <div id="clock">
      <p id="time">
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeText"
}
</script>

<style scoped>
#time {
  position: fixed;
  top: 197px;
  left: 131px;
  width: 960px;
  height: 200px;
  color: #333333;
  font-family: PTMono-Bold, "PT Mono", monospace;
  font-size: 200px;
  font-weight: 700;
  line-height: 200px;
  padding: 0px;
  margin: 0px;
  border: 0px;
}
#clock {
  position: fixed;
  top: 70px;
  left: 0px;
  width: 1220px;
  height: 440px;
  background-color: #f2f4f7;
}
</style>