<template>
  <div class="electrification_trend">
    <div class='legend'>
      How to read:
      <svg class='lines-legend'>
        <rect width='50' height='10' x='0' y='2' fill='#ed96ab'/>
        <line x1='0' x2='50' y1='2' y2='2' stroke='#c8005f' stroke-width='2'/>
        <text x='60' y='12'>% Emissions</text>
        <rect width='50' height='10' x='0' y='22' fill='#ffd89a'/>
        <line x1='0' x2='50' y1='22' y2='22' stroke='#ba7e12' stroke-width='2'/>
        <text x='60' y='30'>% Electrification</text>
        <rect width='50' height='10' x='0' y='42' fill='#a2e7c0'/>
        <line x1='0' x2='50' y1='42' y2='42' stroke='#5b9574' stroke-width='2'/>
        <text x='60' y='50'>% Low Carbon Elect.</text>
      </svg>
    </div>
    <div v-if="step >= 13" class="scenarioselect">
   <SensesSelect
     class="scenario selector"
     :options="scenariosArray"
     v-model="scenarioSelected"
   />
   <p id="select-label">
     The selectors above allows you to filter global electrification trends
     from the REMIND model across three scenarios:
     Business-as-usual, 2°C Stabilization, 1.5°C.
   </p>
  </div>
    <svg class="ele-charts">
      <g>
      <path v-for="(chart, i) in createCharts.emissionsPaths"
      :transform="`translate(${(innerWidth / 4) }, ${createCharts.groupPosition[i]})`"
      class="emissions-trend"
      v-bind:key="i"
      :d="chart"
      />
      <path v-for="(chart, i) in createCharts.electrification"
      :transform="`translate(${(innerWidth / 4) }, ${createCharts.groupPosition[i]})`"
      :class="createCharts.sector[i] === 'Electricity' ? 'electricity-sect' : ''"
      class="elect-trend"
      v-bind:key="i + 'electr'"
      :d="chart"
      />
      <path v-for="(chart, i) in createCharts.re"
      :transform="`translate(${(innerWidth / 4) }, ${createCharts.groupPosition[i]})`"
      v-bind:key="i + 're'"
      class="low-carb"
      :d="chart"
      />
    </g>
    <g
    v-for="(chart, i) in createCharts.electrification"
    v-bind:key="i + 'axis'"
    :transform="`translate(${(innerWidth / 4) }, ${createCharts.groupPosition[i]})`"
    >
      <YAxis
      :scale='scales.y'
      :height= 'innerHeight / 10'
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
    <XAxis
    :scale='scales.x'
    :width='(this.innerWidth + this.margin.left) / 2'
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
    :transform="'translate('+ (innerWidth / 4) + ',' + (this.innerHeight - 110) + ')'" />
    />
    </svg>
  </div>
</template>
<script>
// Modules
import * as d3 from 'd3'
import _ from 'lodash'

// Data
import ElectrificationTrends from '../assets/data/ElectrificationEmissions.json'

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
      scenarioSelected: '2°C Stabilization',
      margin: {
        left: 0,
        top: -30,
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
          .rangeRound([this.innerHeight / 10, 0]),
        yEm: d3
          .scaleLinear()
          .domain([100, 0])
          .rangeRound([0, this.innerHeight / 10])
      }
    },
    dataStructure () {
      let trends = this.ElectrificationTrends
      const selected = this.scenarioSelected
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
          let filter = _.filter(sector, { variable: 'Electrification' })
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
        re: _.map(electrification, (ele, e) => { if (ele['sector'] === 'Electricity') { return paths(ele['electrification']) } else { return '' } })
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
  width: 80%;
  height: 100%;
}

svg {
  background-color: white;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: block;
}

.ele-charts {
  margin-left: 100px;
}

path {
  fill-opacity: 0.4;
}

.elect-trend {
  stroke: getColor(yellow, 40);
  fill: #ffac00;
}

.emissions-trend {
  stroke: getColor(red, 40);
  fill: #c8005f;
}

.low-carb {
  stroke: getColor(green, 40);
  fill: #5b9574;
}

.electricity-sect {
  fill: #5b9574;
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

.scenarioselect {
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

.scenarioselect, .left-text {
  margin-top: 15px;
  font-family: $font-serif;
}

.sector-labels {
  text-anchor: end;
}

.top__line {
  stroke: grey;
  stroke-width: 0.5;
  stroke-dasharray: 2 2;
}

@include max-width(1100px) {
  $key-height: 128px;
  .regionselect {
    height: $key-height;
    width: 18%;
  }
}
</style>
