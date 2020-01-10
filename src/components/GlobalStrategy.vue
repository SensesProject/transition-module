<template>
  <div class="global-strategy" id="emissions__chart">
    <svg class="glob_strat" width="100%" height="100%">
      <g :transform="'translate(' + margin.left + ',' + margin.top * 2 + ')'">
        <path
          v-for="(chunk, i) in stackData"
          v-bind:key="i"
          :d="chunk.d"
          fill="#611731"
          :id="chunk.id"
          class="emission__chunks"
          :class="{ inactive: chunk.active != step && step != 14}"
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
  data () {
    return {
      DecarbonStrategy,
      margin: {
        left: 250,
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
        { key: 'Emi|CO2|Policy', color: '#611731', active: 14 },
        { key: 'Abatement|CDR', color: '#33121c', active: 15 },
        { key: 'Abatement|Electricity Decarbonization', color: '#dd5f84', active: 16 },
        { key: 'Abatement|Fuel Decarbonization', color: '#ed96ab', active: 17 },
        { key: 'Abatement|Energy Demand Reduction', color: '#f8cbd4', active: 18 }
      ]
    },
    scales () {
      return {
        x: d3
          .scaleLinear()
          .domain([2015, 2050])
          .rangeRound([0, this.innerWidth - 300]),
        y: d3
          .scaleLinear()
          .domain([0, 50000])
          .rangeRound([this.innerHeight - this.margin.bottom, 0])
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

path {
  stroke: #44061c;
}

.inactive {
  stroke: none;
  fill-opacity: 0.5;
}
</style>
