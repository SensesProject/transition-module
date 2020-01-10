<template>
  <svg class="proportion">
  </svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Proportion',
  props: ['data'],
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
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";
</style>
