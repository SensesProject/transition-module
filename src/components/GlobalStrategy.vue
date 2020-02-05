<template>
  <div class="global-strategy" id="emissions__chart">
    <svg class="glob_strat" width="100%" height="100%">
      <pattern
      id="abatementCDR"
      width="5"
      height="10"
      patternTransform="rotate(45 0 0)"
      patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="10" style="stroke:#dd5f84; stroke-width:1" />
      </pattern>
      <g :transform="'translate(' + margin.left * 2 + ',' + margin.top + ')'">
        <path
          v-for="(chunk, i) in stackData"
          v-bind:key="i"
          :d="chunk.d"
          :fill="chunk.active <= step && step != 14 ? 'url(#abatementCDR)' : '#611731'"
          :id="chunk.id"
          class="emission__chunks"
        />
        <line
        :x1="scales.x(2050)"
        :y1="scales.y(linePosition)"
        :x2="scales.x(2020)"
        :y2="scales.y(linePosition)"
        stroke="white"
        stroke-width="2"
        />
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
import DecarbonStrategy from '../assets/data/waterfall-toydata-new.json'

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
    // This is the processing with different data, still to be understood how to implement
    // real data on this graph
    // editData () {
    //   const strategyData = this.DecarbonStrategy
    //   let newData = {}
    //   let obj = {}
    //   const newGroups = _.groupBy(strategyData, 'Model')
    //   _.forEach(newGroups, (strategy, s) => {
    //     let singleVariable = _.groupBy(strategy, 'Variable')
    //     _.forEach(singleVariable, (variable, v) => {
    //       const singleArray = _.map(variable, (year, y) => {
    //         const singleValue = _.map(year, (data, d) => {
    //           return { date: Number(d), value: data, key: v }
    //         })
    //         singleValue.splice(8)
    //         return singleValue
    //       })
    //       obj = singleArray
    //     })
    //     newData[s] = obj
    //   })
    //   console.log('newData', newData)
    //   return newData
    // },

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
        { key: 'Abatement|Electricity Decarbonization', color: 'url(#eleDec)', active: 17 },
        { key: 'Abatement|Fuel Decarbonization', color: 'url(#fuelDec)', active: 16 },
        { key: 'Abatement|Energy Demand Reduction', color: 'url(#demRed)', active: 15 }
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
    stackData () {
      const newData = this.DecarbonStrategy
      const stacked = d3.stack().keys(this.strategies.map(d => d.key))(newData)
      const paths = stacked.map((d, i) => ({
        d: this.areaGenerator(d),
        id: this.strategies[i].key,
        active: this.strategies[i].active
      }))
      return paths
    },
    linePosition () {
      const newData = this.DecarbonStrategy
      const stacked = d3.stack().keys(this.strategies.map(d => d.key))(newData)
      return stacked[0][7][1]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";
.global-strategy {
  width: 55%;
  height: 100%;
  margin: 0 auto;
}
svg {
  width: 100%;
  height: 100%;
  margin: 0 auto;

  margin-top: 10%;
}

@media screen and (min-width: 1600px)  {
    .global-strategy {
      width: 55%;
      height: 90%;
      margin: 0 auto;
    }

    svg {
      margin-top: 20%;
    }
}

path {
  stroke:#dd5f84;
  stroke-width: 0.5;
}

.inactive {
  stroke: none;
  fill-opacity: 0.5;
}
</style>
