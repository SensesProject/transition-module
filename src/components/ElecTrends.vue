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
        :class="group.name"
        :transform="'translate('+ (margin.left * 7.5) + ',' + group.verticalPos + ')'"
      >
        <path
        :d="group.d"
        :fill='group.fill'
        />
        <g class="axis" v-axis:y="scales" />
      </g>
      <g class="axis"
      v-axis:x="scales"
      :transform="'translate('+ (margin.left * 7.5) + ',' + (this.innerHeight - 30) + ')'" />
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
      colors: {
        'electricity|RE': '#ffd89a',
        'electricity|VRE': '#795315',
        industry: '#ffac00',
        residential: '#ba7e12',
        transport: '#ffecce'
      },
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
      console.log(models['REMIND']['2020_400'])
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
          .rangeRound([0, this.innerWidth / 2 + 100]),
        y: d3
          .scaleLinear()
          .domain([0, 100])
          .rangeRound([80, 0])
      }
    },
    createGraphs () {
      const selectData = this.modelSelection
      const { x, y } = this.scales
      const groups = this.sectorKeys
      let distance = this.margin.top + 10
      const paths = d3
        .area()
        .x(d => {
          return x(d['date'])
        })
        .y0(y(0))
        .y1(d => {
          return y(d['value'])
        })
      return _.map(selectData, (group, g) => {
        console.log(g, group, paths(group))
        let initialPos = distance
        if (g !== 'electricity|RE') {
          distance = distance + (this.innerHeight / 4)
        } else { initialPos = distance }
        return {
          d: paths(group),
          name: g,
          fill: this.colors[g],
          verticalPos: initialPos
        }
      })
    }
  },
  directives: {
    axis (el, binding) {
      const axis = binding.arg
      // console.log("axis", axis);
      const axisMethod = { x: 'axisBottom', y: 'axisLeft' }[axis]
      const tickFormat = { x: d3.format('d'), y: d3.format('.2s') }[axis]
      const methodArg = binding.value[axis]

      d3.select(el)
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
@import "library/src/style/variables.scss";
.electrification_trend {
  width: 100%;
  height: 100%;
}

svg {
  background-color: white;
  border: 1px solid black;
}
path {
  stroke: getColor(yellow, 40);
  fill-opacity: 0.5;
}
</style>
