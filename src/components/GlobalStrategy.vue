<template>
  <div class="global-strategy" id="emissions__chart">
    <div v-if="step === 19" class="scenarioselect">
   <SensesSelect
     class="selector"
     :options="regionsArray"
     v-model="selected"
   />
   <p id="select-label">
     Use the selector above to select different decarbonization pathways.
   </p>
   <p id="emissions-label">
     <span class="highlight">
       {{ selected }}
     </span>
     is producing the
     <span class="dotted">%</span>
     of the total global energy.
     Equals to
     <span class="dotted">
        EJ/yr
     </span>.
   </p>
  </div>
    <svg class="glob_strat" width="100%" height="100%">
      <pattern
      id="abatementCDR"
      width="5"
      height="10"
      patternTransform="rotate(45 0 0)"
      patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="10" style="stroke:#ed96ab; stroke-width:1" />
      </pattern>
      <g :transform="'translate(' + margin.left * 2 + ',' + margin.top + ')'">
        <path
          v-for="(chunk, i) in stackData"
          v-bind:key="i"
          :d="chunk.d"
          :fill="chunk.active <= step && step != 14 ? 'url(#abatementCDR)' : '#ed96ab'"
          :id="chunk.id"
          class="emission__chunks"
        />
        <line
        :x1="scales.x(2050)"
        :y1="scales.y(linePosition)"
        :x2="scales.x(2020)"
        :y2="scales.y(linePosition)"
        stroke="#611731"
        stroke-width="2"
        />
        <text :x="scales.x(2020)" :y="scales.y(linePosition) - 10">{{ textLabel }}</text>
        <XAxisGl
        :scale='scales.x'
        :width='this.innerWidth / 2 - this.margin.left'
        />
        />
        <YAxisGl
        :scale='scales.y'
        :height= 'innerHeight / 1.5'
        />
      </g>
    </svg>
  </div>
</template>

<script>
// Libraries
import * as d3 from 'd3'
import { group, groups, rollup, rollups } from 'd3-array'
import _ from 'lodash'

// Data
import DecarbonStrategy from '../assets/data/waterfall-toydata.json'

import YAxisGl from './subcomponents/YAxisGl.vue'
import XAxisGl from './subcomponents/XAxisGl.vue'

export default {
  name: 'GlobalStrategy',
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
  components: {
    XAxisGl,
    YAxisGl
  },
  data () {
    return {
      DecarbonStrategy,
      margin: {
        left: 30,
        top: 30,
        bottom: 30,
        right: 30
      }
    }
  },
  computed: {
    innerWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight () {
      return this.height - this.margin.top - this.margin.bottom
    },
    strategies: function () {
      return [
        { key: 'Emi|CO2|Policy', color: '#611731', active: 20 },
        { key: 'Abatement|CDR', color: 'url(#abatementCDR)', active: 18 },
        { key: 'Abatement|Energy Demand Reduction', color: 'url(#demRed)', active: 17 },
        { key: 'Abatement|Fuel Decarbonization', color: 'url(#fuelDec)', active: 16 },
        { key: 'Abatement|Electricity Decarbonization', color: 'url(#eleDec)', active: 15 }
      ]
    },
    scales () {
      return {
        x: d3
          .scaleLinear()
          .domain([2015, 2050])
          .rangeRound([0, this.innerWidth / 2 - this.margin.left]),
        y: d3
          .scaleLinear()
          .domain([0, 55000])
          .rangeRound([this.innerHeight / 1.5, 0])
      }
    },
    areaGenerator: function () {
      const { x, y } = this.scales
      return d3
        .area()
        .x(d => x(d.data.Year))
        .curve(d3.curveLinear)
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))
    },
    filterData () {
      const newData = this.DecarbonStrategy
      const selectData = _.filter(newData, { 'Scenario': 'IC_80_noCDR' })
      return selectData
    },
    stackData () {
      const newData = this.filterData
      const stacked = d3.stack().keys(this.strategies.map(d => d.key))(newData)
      const paths = stacked.map((d, i) => ({
        d: this.areaGenerator(d),
        id: this.strategies[i].key,
        active: this.strategies[i].active
      }))
      return paths
    },
    linePosition () {
      const newData = this.filterData
      const stacked = d3.stack().keys(this.strategies.map(d => d.key))(newData)
      let linePosition = stacked[0][7][1]
      if (this.step === 14) { return stacked[4][7][1] }
      if (this.step === 15) { return stacked[3][7][1] }
      if (this.step === 16) { return stacked[2][7][1] }
      if (this.step === 17) { return stacked[1][7][1] }
      return linePosition
    },
    textLabel () {
      const data = this.stackData
      const lArray = _.filter(data, { 'active': this.step })
      let label = 'Total Emissions'
      if (this.step !== 14 && this.step < 19) { label = lArray[0].id }
      if (this.step === 19) { label = 'Residual Emissions' }
      return label
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";
.scenarioselect {
  top: $spacing + 1;
  left: 3.5em;
  position: absolute;
  width: 245px;
  height: 700px;
  z-index: 1;
}

.global-strategy {
  width: 55%;
  height: 100%;
  margin: 0 auto;
}
svg {
  width: 100%;
  height: 100%;
  margin: 0 auto;

  margin-top: 50px;
}

@media screen and (min-width: 1600px)  {
    .global-strategy {
      width: 55%;
      height: 90%;
      margin: 0 auto;
    }

    svg {
      margin-top: 150px;
    }
}

path {
  stroke:#dd5f84;
  stroke-width: 1;
  fill-opacity: 0.4;
}

.inactive {
  stroke: none;
  fill-opacity: 0.5;
}
</style>
