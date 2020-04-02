<template>
  <g class="dragline">
    <line :x1="x" y1="0" :x2="x" :y2="height - margin.bottom" stroke="#c8005f" />
    <rect
      x="0"
      y="0"
      :width="width - margin.left"
      :height="height - margin.bottom"
      class="draglineRect"
      @mousemove="clickDragline"
    />
    <g v-for="(label, l) of labels" v-bind:key="l + 'label'" :transform="`translate(${x}, 0)`">
      <polyline class="label_line" :points="`0 ${label.y} 4 ${label.y} 8 ${label.y2} 25 ${label.y2}`"/>
      <text :transform="`translate(0, ${label.y2})`" x='30' class="shadow">
        <tspan font-weight="bold">{{ Math.round(label.value / 1000) + ' Mt/year' }}</tspan> - {{ label.label }}
      </text>
      <text :transform="`translate(0, ${label.y2})`" x='30'>
        <tspan font-weight="bold">{{ Math.round(label.value / 1000) + ' Mt/year' }}</tspan> - {{ label.label }}
      </text>
    </g>
    <g v-for="sector of sectors" :key="sector.key" :transform="'translate(' + x + ',' + sector.y + ')'">
      <circle class='labels' r="3"/>
    </g>
  </g>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Dragline',
  props: ['width', 'height', 'scales', 'data', 'margin'],
  data () {
    return {
      x: 0
    }
  },
  computed: {
    year: function () {
      let year = parseInt(this.scales.x.invert(this.x))
      if (year < 1990) { year = 1990 }
      if (year > 2015) { year = 2015 }
      return year
    },
    sectors: function () {
      return this.data.map((d, i) => {
        const data = d.data.find(e => e.data.Year === this.year)
        const { key } = d.data
        const value = data.data[key]
        return {
          key,
          data,
          value: Math.round(value),
          year: this.year,
          y: this.scales.y((data[1] / 1000000 + data[0] / 1000000) / 2)
        }
      })
    },
    labels () {
      // first create a subset of our data with the things we actually need
      const data = this.sectors
      const labels = data.map(d => {
        return {
          label: d.key,
          value: d.value,
          y: d.y,
          year: d.year
        }
      }).sort((a, b) => a.y - b.y) // it's important to sort our data by their y position!!!
      const positions = labels.map(p => p.y)
      const minDist = 15
      let diffs = positions.filter((y, i) => i > 0).map((y, i) => y - positions[i])
      while (diffs.find(d => d < minDist) != null) {
        diffs.forEach((d, i) => {
          if (d < minDist) {
            positions[i] = positions[i] - Math.max((minDist - d), 2)
            positions[i + 1] = positions[i + 1] + Math.max((minDist - d), 2)
            if (positions[i + 1] >= this.height) {
              positions[i + 1] = this.height - this.margin.top
            }
          }
        })
        diffs = positions.filter((y, i) => i > 0).map((y, i) => y - positions[i])
      }
      labels.forEach((l, i) => {
        l.y2 = positions[i]
      })
      // console.log(labels)
      return labels
    }
  },
  methods: {
    clickDragline: function (e) {
      this.x = e.layerX - this.margin.left - 60
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
  stroke: #c8005f;
  stroke-width: 2px;
}

.label_line {
  fill: none;
  stroke: #C57098;
}

text {
  fill: black;

  &.shadow {
    stroke-width: 3.5;
    stroke: #FFFFFF;
    stroke-opacity: 0.8;
  }
}

rect {
  fill: white;
}
</style>
