<template>
  <g class="xaxis">
    <g class="labels" v-for="(label, i) in labels" v-bind:key="i">
      <line class="thicks" x2='0' x1="0" :y1='label.y' :y2='label.y' stroke="black"/>
      <text
      text-anchor="end"
      :class="label"
      x='-10'
      :y='label.y'
      >
      {{ label.perc }} {{ indicator }}
    </text>
    <text
    text-anchor="start"
    :class="label"
    :x='(width / 2) + 8'
    :y='label.y'
    >
    {{ emissionsLabels[i] / 1000}} Gt CO2/yr
  </text>
    </g>
  </g>
</template>

<script>
import { map, range } from 'lodash'

export default {
  name: 'YAxis',
  props: ['width', 'height', 'scale', 'thicks', 'indicator', 'scaleEm'],
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
    },
    emissionsLabels () {
      return [0, 10000, 15000]
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
