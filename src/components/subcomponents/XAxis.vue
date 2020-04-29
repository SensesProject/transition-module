<template>
  <g class="xaxis" :transform="`translate(0, ${height - margin.bottom})`">
    <line
    class='axis'
    x1='0'
    :x2='width'
    y1='0'
    y2='0'
    />
    <g class="labels">
      <text
      v-for="(label, i) in labels"
      v-bind:key="i"
      text-anchor="middle"
      :class="label"
      :x='label.x'
      y='20'
      >
      {{ label.year }}
    </text>
    </g>
  </g>
</template>

<script>
import map from 'lodash/map'

export default {
  name: 'XAxis',
  props: ['width', 'height', 'scale', 'thicks', 'margin'],
  computed: {
    labels: function () {
      const labels = this.thicks

      return map(labels, pair => {
        const [year] = pair
        return {
          x: this.scale(year),
          year
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";

.axis {
  stroke: grey;
}
</style>
