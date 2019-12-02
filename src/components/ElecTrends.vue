<template>
  <div class="electrification_trend">
  </div>
</template>

<script>
export default {
  name: 'ElecTrends',
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      default: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.electrification_trend {
  background-color: lightblue;
  width: 100%;
  height: 100%;
}
</style>
