<template>
  <div class="global-strategy">
    <svg
      :width="innerWidth"
      :height="innerHeight"
      :transform="'translate('+ margin.left + ',' + (margin.top - 10) + ')'"
    >
    </svg>
  </div>
</template>
<script>
// Modules
import * as d3 from 'd3'
import _ from 'lodash'

// Data
import ElectrificationTrends from '../assets/data/toyemissions-trends.json'

// Components
import SensesSelect from 'library/src/components/SensesSelect.vue'
import YAxis from './subcomponents/YAxis.vue'
import XAxis from './subcomponents/XAxis.vue'

export default {
  name: 'ElecTrends',
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      margin: {
        left: 40,
        top: 30,
        bottom: 30,
        right: 40
      }
    }
  },
  computed: {
    innerWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight () {
      return this.height - this.margin.top - this.margin.bottom
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";
.global-strategy {
  width: 100%;
  height: 100%;
}

svg {
  background-color: lightblue;
}
</style>
