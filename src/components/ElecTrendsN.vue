<template>
  <div class="electrification_trend">
    <div  class="scenarioselect">
      <div class="scenario-selector">
      <p class="graph-title sans">Electrification rates across sectors</p>
        <span>Model:</span> <span class="model">REMIND</span>
        <div>
        <p id="select-label">Select a scenario:</p>
         <SensesSelect
           class="scenario selector"
           :options="scenariosArray"
           v-model="scenarioSelected"
         />
     </div>
   </div>
     <div class='legend'>
       <p>How to read:</p>
       <svg class='lines-legend'>
         <rect width='50' height='10' x='0' y='2' fill='#ed96ab'/>
         <line x1='0' x2='50' y1='2' y2='2' stroke='#c8005f' stroke-width='2'/>
         <text x='60' y='12'>Emissions (Gt CO<tspan class="subscript">2</tspan>/yr)</text>
         <rect width='50' height='10' x='0' y='22' fill='#ffd89a'/>
         <line x1='0' x2='50' y1='22' y2='22' stroke='#ba7e12' stroke-width='2'/>
         <text x='60' y='30'>Electrification (%)</text>
         <rect width='50' height='10' x='0' y='42' fill='#a2e7c0'/>
         <line x1='0' x2='50' y1='42' y2='42' stroke='#5b9574' stroke-width='2'/>
         <text x='60' y='50'>Renewable Elect. (%)</text>
       </svg>
     </div>
  </div>
    <svg class="ele-charts" width="100%" height="100%">
      <g :transform="`translate(${ shiftLeft }, ${margin.bottom * 2})`">
      <path v-for="(chart, i) in createCharts.emissionsPaths"
      :transform="`translate(${margin.left}, ${createCharts.groupPosition[i]})`"
      class="emissions-trend"
      v-bind:key="i"
      :d="chart"
      />
      <path v-for="(chart, i) in createCharts.electrification"
      :transform="`translate(${margin.left}, ${createCharts.groupPosition[i]})`"
      :class="createCharts.sector[i] === 'Electricity' ? 'electricity-sect' : ''"
      class="elect-trend"
      v-bind:key="i + 'electr'"
      :d="chart"
      />
      <path v-for="(chart, i) in createCharts.re"
      :transform="`translate(${margin.left}, ${createCharts.groupPosition[i]})`"
      v-bind:key="i + 're'"
      class="low-carb"
      :d="chart"
      />
    <g
    v-for="(chart, i) in createCharts.electrification"
    v-bind:key="i + 'axis'"
    :transform="`translate(${margin.left}, ${createCharts.groupPosition[i]})`"
    >
      <text
      :x='0'
      text-anchor="start"
      y='-10'
      >{{createCharts.sector[i]}}
      </text>
      <YAxis
      :scale='scales.y'
      :scaleEm="scales.yEm"
      :height= 'innerHeight / 10'
      :width="innerWidth"
      :thicks='[[0],[50],[100]]'
      :indicator="'%'"
      />
      <line
      :x1='scales.x(2010)'
      :y1='scales.y(100)'
      :x2='scales.x(2100)'
      :y2='scales.y(100)'
      class='top__line'
      />
    </g>
  </g>
    <XAxis
    :scale='scales.x'
    :width='(this.innerWidth + this.margin.left) / 2'
    :margin='margin'
    :height= 'innerHeight'
    :thicks="[
      [2010],
      [2020],
      [2030],
      [2040],
      [2050],
      [2060],
      [2070],
      [2080],
      [2090],
      [2100]
    ]"
    :transform="`translate(${shiftLeft + margin.left},${this.innerHeight - 100})`" />
    />
    </svg>
  </div>
</template>
<script>
// Modules
import * as d3 from 'd3'
import _ from 'lodash'

// Data
import ElectrificationTrends from '../assets/data/electrification-trends.json'

// Components
import SensesSelect from 'library/src/components/SensesSelect.vue'
import YAxis from './subcomponents/YAxisGl.vue'
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
      scenarioSelected: 'BAU',
      margin: {
        left: 40,
        top: 50,
        bottom: 30,
        right: 40
      }
    }
  },
  computed: {
    shiftLeft () {
      return this.width < 1024 ? this.innerWidth / 4.5 : this.margin.left
    },
    innerWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight () {
      return this.width < 1024 ? this.height - this.margin.top - this.margin.bottom : this.height - this.margin.bottom
    },
    newScenario () {
      let currentScenario = this.scenarioSelected
      return currentScenario
    },
    scales () {
      const graphWidth = (this.innerWidth + this.margin.left) / 2
      return {
        x: d3
          .scaleLinear()
          .domain([2010, 2100])
          .rangeRound([0, graphWidth]),
        y: d3
          .scaleLinear()
          .domain([0, 100])
          .rangeRound([this.innerHeight / 9, 0]),
        yEm: d3
          .scaleLinear()
          .domain([15000, 0])
          .rangeRound([0, this.innerHeight / 9])
      }
    },
    dataStructure () {
      let trends = this.ElectrificationTrends
      const selected = this.newScenario
      const allScenarios = _.groupBy(trends, 'scenario')
      return allScenarios[selected]
    },
    scenariosArray () {
      let trends = this.ElectrificationTrends
      const allScenarios = _.groupBy(trends, 'scenario')
      const scenariosarray = []
      _.forEach(allScenarios, (scenario, key) => {
        scenariosarray.push(key)
      })
      return scenariosarray
    },
    years () {
      const data = this.dataStructure
      const allyears = _.groupBy(data, 'period')
      let years = []
      _.map(allyears, (year, y) => {
        years.push(y)
      })
      return years
    },
    emissionsData () {
      const data = this.dataStructure
      const sectors = _.groupBy(data, 'sector')
      const Emissions = _.map(sectors, (sector, s) => {
        const filter = _.filter(sector, { variable: 'Emissions' })
        const value = _.map(filter, (datum, d) => { return { value: datum['value'], year: this.years[d] } })
        return value
      })
      return Emissions
    },
    electrData () {
      const data = this.dataStructure
      const sectors = _.groupBy(data, 'sector')
      const Electrification = _.map(sectors, (sector, s) => {
        let ele = {}
        let re = {}
        if (s !== 'Electricity') {
          let filter = _.filter(sector, { variable: 'ElShare' })
          const valueEle = _.map(filter, (datum, d) => { return { value: datum['value'], year: this.years[d] } })
          ele = valueEle
        } else {
          let filterEle = _.filter(sector, s => { return s['variable'] === 'WindSolarShare' })
          let filterRe = _.filter(sector, s => { return s['variable'] === 'REShare' })
          const valueEle = _.map(filterEle, (datum, d) => { return { value: datum['value'], year: this.years[d] } })
          const valueRe = _.map(filterRe, (datum, d) => { return { value: datum['value'], year: this.years[d] } })
          ele = valueEle
          re = valueRe
        }
        return {
          sector: s,
          electrification: ele,
          ReEle: re
        }
      })
      return Electrification
    },
    createCharts () {
      const years = this.years
      const allemissions = this.emissionsData
      const electrification = this.electrData
      const { x, y, yEm } = this.scales
      let distance = -100

      const paths = d3
        .area()
        .x(d => {
          return x(d['year'])
        })
        .y0(y(0))
        .y1(d => {
          return y(d['value'])
        })

      const Empaths = d3
        .area()
        .x(d => {
          return x(d['year'])
        })
        .y0(y(0))
        .y1(d => {
          return yEm(d['value'])
        })
      const distances = _.map(allemissions, e => {
        distance = distance + (this.innerHeight / 5)
        return distance
      })
      let initialPos = distances
      return {
        sector: _.map(electrification, e => { return e['sector'] }),
        groupPosition: initialPos,
        emissionsPaths: _.map(allemissions, (emi, e) => { return Empaths(emi) }),
        electrification: _.map(electrification, (ele, e) => { return paths(ele['electrification']) }),
        re: _.map(electrification, (ele, e) => { if (ele['sector'] === 'Electricity') { return paths(ele['ReEle']) } else { return '' } })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";
@import "library/src/style/global.scss";

.electrification_trend {
  width: 100%;
  height: 100%;
  display: inline-flex;

  .model {
    color: $color-neon;
  }

  #select-label {
    display: inline;
  }
}

.ele-charts {
  width: 100%;
  height: 100%;
  margin: 0 auto;

  path {
    fill-opacity: 0.4;

    &.elect-trend {
      stroke: getColor(yellow, 40);
      fill: #ffac00;
    }

    &.emissions-trend {
      stroke: getColor(red, 40);
      fill: #ed96ab;
    }

    &.low-carb {
      stroke: getColor(green, 40);
      fill: #a2e7c0;
    }

    &.electricity-sect {
      display:none;
    }
  }

  .top__line {
    stroke: grey;
    stroke-width: 0.5;
    stroke-dasharray: 2 2;
  }
}

.legend {
  margin-top: 20px;
}

.lines-legend {
  background-color: transparent;
}

.scenarioselect {
  width: 40%;
  z-index: 1;
  padding: 40px 40px;
}

.scenario-selector {
  margin-top: 20px;
}

.scenario {
  margin-left: 5px;
}

@media screen and (max-width: 1024px) {

  .electrification_trend {
    display: block;
  }

  .scenarioselect {
    width: 100%;
    height: 18%;
    display: inline-flex;

    .legend {
      margin-left: 10px;
    }

    .scenario-selector {
      width: 90%;
    }
  }

  .ele-charts {
    width: 100%;
  }
}
</style>
