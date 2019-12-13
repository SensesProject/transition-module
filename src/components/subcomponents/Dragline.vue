<template>
  <g class="dragline">
    <line :x1="x" y1="0" :x2="x" :y2="height - margin.bottom" stroke="#c8005f" />
    <rect
      x="0"
      y="0"
      :width="width - 200"
      :height="height - margin.bottom"
      class="draglineRect"
      @mousemove="clickDragline"
    />
    <g
      v-for="sector of sectors"
      :key="sector.key"
      :transform="'translate(' + x + ',' + scales.y(sector.data[1]) + ')'"
    >
      <text>{{ sector.value }},{{ sector.key }}</text>
      <circle r="3" />
    </g>
  </g>
</template>

<script>
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
        return {
          key,
          data,
          value: data.data[key]
        }
      })
    }
  },
  methods: {
    clickDragline: function (e) {
      this.x = e.layerX - this.margin.left
      // console.log(this.margin.left, e.layerX)
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

circle {
  fill: $color-red;
  stroke: $color-gray;
}

text {
  font-size: 11px;
  fill: #c8005f;
}

rect {
  fill: white;
  opacity: 0.5;
}
</style>
