<template>
  <g class="xaxis">
    <line
    class='axis'
    x1='0'
    x2='0'
    y1='0'
    :y2='height'
    />
    <g class="labels">
      <text
      v-for="(label, i) in labels"
      v-bind:key="i"
      text-anchor="left"
      :class="label"
      x='-30'
      :y='label.y'
      >
      {{ label.label }}
    </text>
    </g>
  </g>
</template>

<script>
import * as d3 from 'd3'
import map from 'lodash/map'

export default {
  name: 'YAxis',
  props: ['width', 'height', 'scale'],
  computed: {
    labels: function () {
      const { scale } = this

      return map(scale.ticks(), (tick, i) => {
        console.log(i)
        return {
          key: i,
          label: d3.format('.0s')(tick),
          y: scale(tick)
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

</style>
