<template>
  <div class="electrification_trend">
    <div class='legend'>
      How to read:
      <svg class='lines-legend'>
        <rect width='50' height='10' x='0' y='12' fill='#ed96ab'/>
        <line x1='0' x2='50' y1='12' y2='12' stroke='#c8005f' stroke-width='2'/>
        <text x='60' y='20'>% Emissions Trend</text>
        <rect width='50' height='10' x='0' y='42' fill='#ffd89a'/>
        <line x1='0' x2='50' y1='42' y2='42' stroke='#ba7e12' stroke-width='2'/>
        <text x='60' y='50'>% Electrification Trend</text>
      </svg>
    </div>
    <div v-if="step >= 13" class="regionselect">
   <SensesSelect
     class="selector"
     :options="regionsArray"
     v-model="regSelected"
   />
   <SensesSelect
     class="scenario selector"
     :options="scenariosArray"
     v-model="scenariosSelected"
   />
   <p id="select-label">
     The selectors above allows you to filter electrification trends according
     to region and scenario.
   </p>
   <p class="left-text">
     According to the
     <span class="highlight" id="scenario">
       {{ scenariosSelected }}
     </span> scenario , the
     <span class="highlight">
       {{ regSelected }}
     </span> region will a comprehensive ...% electrification trend across all
     four sectors.
     <br />(REMIND Model)
   </p>
  </div>
    <svg
      :width="innerWidth"
      :height="innerHeight"
      :transform="'translate('+ margin.left + ',' + (margin.top - 10) + ')'"
    >
      <g
        v-for="(group, i) in createGraphs"
        v-bind:key="i"
        :class="group.name"
        :transform="'translate('+ (innerWidth / 4) + ',' + group.verticalPos + ')'"
      >
          <text
          class="sector-labels"
          :x='width / 2.08'
          y='-20'
          >
          {{group.name !== 'electricity-RE' ? group.name : 'electricity (VRE and RE)'}}
        </text>
        <path
        class='emissions-trend'
        :d="group.dEm"
        fill='#ed96ab'
        />
        <path
        class='elect-trend'
        :d="group.dEle"
        :fill='group.fill'
        />
        <YAxis
        v-if= "group.name !== 'electricity-RE'"
        :scale='scales.y'
        :height= 'innerHeight / 8'
        />
        <line
        :x1='scales.x(2005)'
        :y1='scales.y(100)'
        :x2='scales.x(2100)'
        :y2='scales.y(100)'
        class='top__line'
        />
      </g>
      <XAxis
      :scale='scales.x'
      :width='(this.innerWidth + this.margin.left) / 2'
      :height= 'innerHeight'
      :transform="'translate('+ (innerWidth / 4) + ',' + (this.innerHeight - 30) + ')'" />
      />
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
  components: {
    SensesSelect,
    YAxis,
    XAxis
  },
  data () {
    return {
      ElectrificationTrends,
      regSelected: 'EUR',
      scenariosSelected: 'B1300',
      colors: {
        'electricity-RE': '#ffac00',
        'electricity-VRE': '#ffac00',
        industry: '#ffac00',
        residential: '#ffac00',
        transport: '#ffac00'
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
      return _.groupBy(trends, 'region')
    },
    dataNest () {
      const newModels = this.dataStructure
      _.forEach(newModels, (region, r) => {
        const obj = {}
        let singleModel = _.groupBy(region, 'scenario')
        _.forEach(singleModel, (scenario, s) => {
          const scenarioObj = {}
          let variableArr = _.groupBy(scenario, 'variable')
          _.forEach(variableArr, (variable, v) => {
            const emissions = _.map(variable[0], (datum, d) => {
              return { date: d, value: datum }
            })
            const electrification = _.map(variable[1], (datum, d) => {
              return { date: d, value: datum }
            })
            emissions.splice(16)
            electrification.splice(16)
            scenarioObj[v] = { emissions, electrification }
          })
          obj[s] = scenarioObj
        })
        newModels[r] = obj
      })
      return newModels
    },
    modelSelection () {
      const models = this.dataNest
      const regSelected = this.regSelected
      const scenarioSelected = this.scenariosSelected
      return models[regSelected][scenarioSelected]
    },
    regionsArray () {
      const models = this.dataNest
      const allRegions = []

      _.forEach(models, (arr, key) => {
        allRegions.push(key)
        return allRegions
      })
      return allRegions
    },
    scenariosArray () {
      const regSelected = this.regSelected
      const scenarios = this.dataNest[regSelected]
      const allScenarios = []

      _.forEach(scenarios, (arr, key) => {
        allScenarios.push(key)
        return allScenarios
      })
      return allScenarios
    },
    sectorKeys () {
      const selectedModel = this.modelSelection
      return _.map(selectedModel, (label, l) => {
        return l
      })
    },
    scales () {
      const graphWidth = (this.innerWidth + this.margin.left) / 2
      return {
        x: d3
          .scaleLinear()
          .domain([2005, 2100])
          .rangeRound([0, graphWidth]),
        y: d3
          .scaleLinear()
          .domain([0, 100])
          .rangeRound([this.innerHeight / 8, 0]),
        yEm: d3
          .scaleLinear()
          .domain([0, 100])
          .rangeRound([0, this.innerHeight / 8])
      }
    },
    createGraphs () {
      const selectData = this.modelSelection
      const { x, y, yEm } = this.scales
      const groups = this.sectorKeys
      let distance = this.margin.top
      const paths = d3
        .area()
        .x(d => {
          return x(d['date'])
        })
        .y0(y(0))
        .y1(d => {
          return y(d['value'])
        })

      const Empaths = d3
        .area()
        .x(d => {
          return x(d['date'])
        })
        .y0(y(0))
        .y1(d => {
          return yEm(d['value'])
        })

      return _.map(selectData, (group, g) => {
        let initialPos = distance
        if (g !== 'electricity-RE') {
          distance = distance + (this.innerHeight / 4)
        } else { initialPos = distance }
        return {
          dEle: paths(group['electrification']),
          dEm: Empaths(group['emissions']),
          name: g !== 'electricity-VRE' ? g : null,
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
      const tickFormat = { x: d3.format('d'), y: d3.format('.0s') }[axis]
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
}

path {
  fill-opacity: 0.4;
}

.elect-trend {
  stroke: getColor(yellow, 40);
}

.emissions-trend {
  stroke: getColor(red, 40);
}

.legend {
  bottom: 0;
  left: 3.5em;
  position: absolute;
  width: 150px;
  z-index: 1;
}

.lines-legend {
  background-color: transparent;
  width: 250px;
}

.regionselect {
  top: $spacing  + 1;
  left: 3.5em;
  position: absolute;
  width: 245px;
  z-index: 1;
}

.scenario {
  margin-left: 5px;
}

#scenario {
  background: getColor(green, 100);
  color: getColor(green, 40);
}

#select-label {
  margin-top: 15px;
}

.left-text {
  margin-top: 15px;
}

.sector-labels {
  text-anchor: end;
}

.top__line {
  stroke: grey;
  stroke-width: 0.5;
  stroke-dasharray: 2 2;
}
</style>
