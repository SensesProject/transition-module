<template>
  <g class="dragline">
    <line :x1="x" y1="0" :x2="x" :y2="height - margin.bottom" stroke="#c8005f" />
    <rect
      x="0"
      y="0"
      :width="(width - margin.left) - 100"
      :height="height - margin.bottom"
      class="draglineRect"
      @mousemove="clickDragline"
    />
    <g
      v-for="sector of sectors"
      :key="sector.key"
      :transform="'translate(' + x + ',' + scales.y((sector.data[0] + sector.data[1]) / 2) + ')'"
    >
      <circle class='labels' r="3"/>
    </g>
    <text
    v-for="sector of sectors"
    v-bind:key="sector.value"
    :x='width - margin.left  + 10'
    :y='scales.y(sector.y)'
    >
    {{ sector.key }}: {{ millions(sector.value) }}
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
        return {
          key,
          data,
          y: (d.data[25][0] + d.data[25][1]) / 2,
          value: Math.round(value)
        }
      })
    }
  },
  methods: {
    clickDragline: function (e) {
      this.x = e.layerX - this.margin.left
      // console.log(this.margin.left, e.layerX)
    },
    millions (value) {
      return Math.abs(Number(value)) >= 1.0e+9

        ? Math.abs(Number(value)) / 1.0e+9 + 'B'
      // Six Zeroes for Millions
        : Math.abs(Number(value)) >= 1.0e+6

          ? Math.abs(Number(value)) / 1.0e+6 + 'M'
        // Three Zeroes for Thousands
          : Math.abs(Number(value)) >= 1.0e+3

            ? Math.abs(Number(value)) / 1.0e+3 + 'K'

            : Math.abs(Number(value))
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
  fill: #c8005f;
}

rect {
  fill: white;
}
</style>
