<template>
  <g class="xaxis">
    <!-- <line
    class='axis'
    x1='0'
    x2='0'
    y1='0'
    :y2='height'
    /> -->
    <g class="labels" v-for="(label, i) in labels" v-bind:key="i">
      <line class="thicks" :x2='width' x1="0" :y1='label.y' :y2='label.y' stroke="black"/>
      <text
      text-anchor="end"
      :class="label"
      x='-10'
      :y='label.y'
      >
      {{ label.perc }} {{ indicator }}
    </text>
    </g>
  </g>
</template>

<script>
import map from 'lodash/map'

export default {
  name: 'YAxis',
  props: ['width', 'height', 'scale', 'thicks', 'indicator'],
  computed: {
    labels: function () {
      const labels = this.thicks

      return map(labels, pair => {
        const [perc] = pair
        return {
          y: this.scale(perc),
          perc
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";

.axis {
  stroke: black;
}

.thicks {
  stroke-dasharray: 1 2;
}

</style>
