<template>
  <g class="dragline">
    <line :x1="x" y1="0" :x2="x" :y2="height - margin.bottom" stroke="#c8005f" />
    <rect
      x="0"
      y="0"
      :width="width - margin.left + 30"
      :height="height - margin.bottom"
      class="draglineRect"
      @mousemove="clickDragline"
    />
    <g
      v-for="sector of sectors"
      :key="sector.key"
      :transform="'translate(' + x + ',' + scales.y((sector.data[0] / 1000000 + sector.data[1] / 1000000) / 2) + ')'"
    >
      <circle class='labels' r="3"/>
    </g>
    <text
    v-for="sector of sectors"
    v-bind:key="sector.value"
    :x='x'
    :y='scales.y((sector.data[0] / 1000000 + sector.data[1] / 1000000) / 2) '
    >
    {{ sector.key }}: {{ Math.round(sector.value / 1000) + ' Mt/year' }}
  </text>
  </g>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Dragline',
  props: ['width', 'height', 'scales', 'data', 'margin'],
  data () {
    return {
      x: 10
    }
  },
  computed: {
    year: function () {
      return parseInt(this.scales.x.invert(this.x))
    },
    sectors: function () {
      return this.data.map(d => {
        const data = d.data.find(e => e.data.Year === this.year)
        const { key } = d.data
        const value = data.data[key]
        let labelPos = (d.data[25][0] + d.data[25][1]) / 2
        if (d.data[25][0] === 31005018.44227) { labelPos = labelPos - 250000 }
        if (d.id === 'Industrial Waste') { labelPos = labelPos + 1750000 }
        if (d.id === 'Other Processes') { labelPos = labelPos + 900000 }
        return {
          key,
          data,
          y: labelPos,
          value: Math.round(value)
        }
      })
    }
  },
  methods: {
    clickDragline: function (e) {
      this.x = e.layerX - this.margin.left - 100
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";

.draglineRect {
  fill: none;
  pointer-events: all;
}

.labels {
  fill: white;
  stroke: white;
}

text {
  fill: black;
}

rect {
  fill: white;
}
</style>
