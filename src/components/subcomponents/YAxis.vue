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
      text-anchor="end"
      :class="label"
      x='-10'
      :y='label.y + 5'
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

</style>
