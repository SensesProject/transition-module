<template>
  <g class="xaxis">
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
      y='-10'
      >
      {{ label.year }}
    </text>
    </g>
  </g>
</template>

<script>
import map from 'lodash/map'

export default {
  name: 'YAxis',
  props: ['width', 'height', 'scale'],
  computed: {
    labels: function () {
      const labels = [
        [2015],
        [2020],
        [2025],
        [2030],
        [2035],
        [2040],
        [2045],
        [2050]
      ]

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
  stroke: black;
}

</style>
