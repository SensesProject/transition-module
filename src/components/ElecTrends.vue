<template>
  <div class="electrification_trend">
    <svg
      :width="innerWidth"
      :height="innerHeight"
      :transform="'translate('+ margin.left + ',' + margin.top + ')'"
    >
      <g
        v-for="(group, i) in createGraphs"
        v-bind:key="i"
        :transfrom="'translate(' + 1110 + ',' + 1120 + ')'"
      >
        <path :d="group" fill="black" />
        <g class="axis" v-axis:y="scales" />
        <g class="axis" v-axis:x="scales" :transfrom="'translate(' + 1110 + ',' + 1120 + ')'" />
      </g>
    </svg>
  </div>
</template>
<script>
// Modules
import * as d3 from 'd3'
import _ from 'lodash'

// Data
import ElectrificationTrends from '../assets/data/electrification-trends.json'

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
      ElectrificationTrends,
      electrificationYears: [
        2005,
        2010,
        2015,
        2020,
        2030,
        2040,
        2050,
        2055,
        2060,
        2065,
        2070,
        2080,
        2085,
        2090,
        2095,
        2100
      ],
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
    },
    dataStructure () {
      let trends = this.ElectrificationTrends
      return _.groupBy(trends, 'model')
    },
    dataNest () {
      const newModels = this.dataStructure
      const timeParse = d3.timeParse('%Y')
      _.forEach(newModels, (model, m) => {
        const obj = {}
        let singleModel = _.groupBy(model, 'scenario')
        _.forEach(singleModel, (scenario, s) => {
          const scenarioObj = {}
          let variableArr = _.groupBy(scenario, 'variable')
          _.forEach(variableArr, (variable, v) => {
            const singleElement = _.map(variable[0], (datum, d) => {
              return { date: d, value: datum }
            })
            singleElement.splice(20)
            scenarioObj[v] = singleElement
          })
          obj[s] = scenarioObj
        })
        newModels[m] = obj
      })
      return newModels
    },
    modelSelection () {
      const models = this.dataNest
      return models['REMIND']['2020_400']
    },
    sectorKeys () {
      const selectedModel = this.modelSelection
      return _.map(selectedModel, (label, l) => {
        return l
      })
    },
    scales () {
      return {
        x: d3
          .scaleLinear()
          .domain([2005, 2100])
          .rangeRound([0, 500]),
        y: d3
          .scaleLinear()
          .domain([0, 400])
          .rangeRound([0, 300])
      }
    },
    createGraphs () {
      const selectData = this.modelSelection
      const { x, y } = this.scales
      const groups = this.sectorKeys
      const paths = d3
        .area()
        .x(d => {
          return x(d['date'])
        })
        .y(d => {
          return y(d['value'])
        })
      return _.map(selectData, (group, g) => {
        console.log(g, group, paths(group))
        return paths(group)
      })
    }
  },
  directives: {
    axis (el, binding) {
      const axis = binding.arg
      // console.log("axis", axis);
      const axisMethod = { x: 'axisTop', y: 'axisLeft' }[axis]
      const tickFormat = { x: d3.format('d'), y: d3.format('.2s') }[axis]
      const methodArg = binding.value[axis]

      d3.select(el)
        .transition()
        .duration(1000)
        .call(
          d3[axisMethod](methodArg)
            .tickSize(0)
            .tickPadding(10)
            .tickFormat(tickFormat)
        )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.electrification_trend {
  background-color: lightblue;
  width: 100%;
  height: 100%;
}

svg {
  background-color: white;
}
path {
  stroke: aliceblue;
}
</style>
