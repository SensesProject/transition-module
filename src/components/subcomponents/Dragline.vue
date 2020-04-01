<template>
  <g class="dragline" :data="labels">
    <line :x1="x" y1="0" :x2="x" :y2="height - margin.bottom" stroke="#c8005f" />
    <rect
      x="0"
      y="0"
      :width="width - margin.left"
      :height="height - margin.bottom"
      class="draglineRect"
      @mousemove="clickDragline"
    />
    <g
      v-for="sector of sectors"
      :key="sector.key"
      :transform="'translate(' + x + ',' + sector.y + ')'"
    >
      <circle class='labels' r="3"/>
    </g>
    <text
    v-for="(label, l) of labels"
    v-bind:key="l + 'label'"
    :x='x'
    :y='label.y'
    >
    {{ label.label }}: {{ Math.round(label.value / 1000) + ' Mt/year' }}
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
          year: this.x > 0 ? 1990 : this.year,
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
      // get an even simpler array of just the y positions
      const positions = labels.map(p => p.y)
      // set the minimum distance you want to have
      const minDist = 15
      // calculate the differences, by using filter() to get an array which is
      // the same as positions, but without the first item (i > 0). Then those values are
      // subtracted by the value that comes before them (y - positions[y])
      let diffs = positions.filter((y, i) => i > 0).map((y, i) => y - positions[i])
      // // now move those things for as long as any of those differences is smaller than minDist
      while (diffs.find(d => d < minDist) != null) {
        //   // if there is a difference to small, iterate over them
        diffs.forEach((d, i) => {
          // if this is difference is to small…
          if (d < minDist) {
            // console.log('true')
            // move the first position up and the one after that down
            // we move them by whatever is bigger. the minimum value to reach the
            // required distance or 2 pixels
            // (you could just move them by one or two pixels, but depending on the amount of
            // labels, this can take a while and slow things down. Also steps should not be to
            // small as it helps to have some extra space to wiggle)
            positions[i] = positions[i] - Math.max((minDist - d) / 2, 2)
            // console.log(positions[i] - Math.max((minDist - d) / 2, 2))
            positions[i + 1] = positions[i + 1] + Math.max((minDist - d) / 2, 2)
            //       // Now we can set some boundaries, if we for example don't want a label to be
            //       // lower/higher than a specific value…
            if (positions[i + 1] >= this.height) {
              positions[i + 1] = this.height - this.margin.top
            }
          }
        })
        //   // since we moved things around, it can be that labels which did not overlap before
        //   // do now. so we have to recalculate the diffs, and stay in this while-loop until everything
        //   // is fine
        diffs = positions.filter((y, i) => i > 0).map((y, i) => y - positions[i])
      }
      // // then, we can apply the y positions back to the array from before
      // // (if we still need the old y value, we can use y2 or so…)
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
  stroke: white;
}

text {
  fill: black;
}

rect {
  fill: white;
}
</style>
