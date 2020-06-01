<template>
  <div class="visualization" id="emissions__chart">
    <div class="chart-description" ref="inWrapper">
      <p class="graph-title sans">Energy-related CO<span class="subscript">2</span>
        emissions (fossil fuel use and industrial process)</p>
    </div>
    <svg class="emissions" width="100%" height="100%">
      <g :transform="'translate(' + margin.left + ',' + margin.top + ')'">
        <EmissionsDots
        :step = "step"
        :width="this.innerWidth"
        :margin="margin"
        :height="this.innerHeight"
        :scales="scales"
        />
        <g id="first_step" v-if="step <= 2">
          <path id="emissions" :d="linePath" />
        </g>
        <g class="applicationsData" v-if="step >= 3">
          <path
            v-for="(chunk, i) in applicationsData"
            v-bind:key="i"
            :d="chunk.d"
            :fill="chunk.color"
            :id="chunk.id"
            class="emission__chunks"
            :class="{ inactive: step >= 3.1 }"
          />
        </g>
        <g class="subsectorsData" v-if="step >= 3.1">
          <path
            v-for="(chunk, i) in subsectorsData"
            v-bind:key="i"
            :d="chunk.d"
            :fill="chunk.color"
            :id="chunk.id"
            class="emission__chunks"
            :class="[{ inactive: chunk.active != step }, step < 4 ? 'lowFill' : '']"
          />
        </g>
        <g  v-if="step >= 3">
          <text
          class="sectorlabels"
          :class="[{ inactive: chunk.active != step }, step > 3 && chunk.active != step ? 'lowText' : '']"
          :id="chunk.id"
          v-for="(chunk, i) in applicationsData"
          v-bind:key="i + 'text'"
          :x='scales.x(2015.2)'
          :y='scales.y(chunk.labels)'
          > {{ chunk.id }}
          </text>
        </g>
        <dragline
          v-if="step > 3"
          :divWidth="divWidth"
          :totalWidth="this.width"
          :width="this.innerWidth"
          :margin="margin"
          :height="this.innerHeight"
          :scales="scales"
          :data="subsectorsDataActive"
        />
        <XAxis
        :scale='scales.x'
        :width='this.innerWidth - this.margin.left'
        :height= 'innerHeight'
        :margin='margin'
        :thicks="step >= 2 ? thicksShort : thicksLong"
        :transform="'translate('+ innerWidth - (innerWidth / 2)  + ',0)'" />
        <YAxis
        :scale='scales.y'
        :width='this.innerWidth - margin.left'
        :height= 'innerHeight - margin.bottom'
        :thicks="[[0],[10],[20],[30],[40]]"
        :indicator="'Gt CO2/yr'"
        />
        <line v-for="(year, i) in thicksShort"
        v-show="step >= 2"
        class="yearsep"
        v-bind:key="i + 'lines'"
        :x1="scales.x(year)"
        :x2="scales.x(year)"
        :y1="scales.y(0)"
        :y2="scales.y(40)"
        />
      </g>
    </svg>
  </div>
</template>

<script>
// Libraries
import * as d3 from 'd3'

import { group, groups, rollup, rollups } from 'd3-array'

// components
import EmissionsDots from './subcomponents/EmissionsDots.vue'
import Dragline from './subcomponents/Dragline.vue'
import YAxis from './subcomponents/YAxis.vue'
import XAxis from './subcomponents/XAxis.vue'

// Data
import EmissionData from '../assets/data/emissions-merged-new.json'
// import emissionsData from '../assets/data/emissions-merged-new.json'
import HistoricalEmissions from '../assets/data/emissions_historical-new.json'

// // merge data into one file
// function merge (){
//   const merged = emissionsData.map(e => {
//     return {
//       ...emissionsData.find(d => d.Year === e.Year),
//       ...subEmissionsData.find(d => d.Year === e.Year),
//       ...ApplicationsShare.find(d => d.Year === e.Year)
//     }
//   })
// }
// merge()

export default {
  name: 'EmissionsChart',
  components: {
    EmissionsDots,
    Dragline,
    YAxis,
    XAxis
  },
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
      EmissionData,
      margin: {
        left: 100,
        top: 30,
        bottom: 30,
        right: 30
      },
      divHeight: 0,
      divWidth: 0,
      thicksLong: [
        [2000],
        [2010],
        [2020],
        [2030],
        [2040],
        [2050],
        [2060],
        [2070],
        [2080]
      ],
      thicksShort: [
        [1995],
        [2000],
        [2005],
        [2010],
        [2015]
      ]
    }
  },
  computed: {
    innerWidth () {
      return this.width < 1024 ? this.width - this.margin.left : this.width - (this.margin.left * 5)
    },
    innerHeight () {
      return (this.height - this.margin.top - this.margin.bottom) / 1.2
    },
    maxYear: function () {
      return this.step >= 2 ? 2015 : 2080
    },
    lineData: function () {
      // other way of doing it:
      // const data = HistoricalEmissions.filter(d => d.Year <= this.maxYear)
      // const reduced = rollups(data, v => d3.sum(v, d => d.Value), d => d.Year)
      return EmissionData.filter(d => d.Year <= this.maxYear).map(d => [
        d.Year,
        d.Emissions
      ])
    },
    linePath () {
      return d3
        .line()
        .x(d => {
          return this.scales.x(d[0])
        })
        .y(d => {
          return this.scales.y(d[1] / 1000)
        })
        .curve(d3.curveLinear)(this.lineData)
    },
    scales () {
      return {
        x: d3
          .scaleLinear()
          .domain([1990, this.maxYear])
          .rangeRound([0, this.innerWidth - this.margin.left]),
        y: d3
          .scaleLinear()
          .domain([0, 40])
          .rangeRound([this.innerHeight - this.margin.bottom, 0])
      }
    },
    subsectors: function () {
      return [
        { key: 'Electricity', color: '#611731', active: 3.1 },
        { key: 'Combustion', color: '#dd5f84', active: 3.2 },
        { key: 'Solvents', color: '#dd5f84', active: 3.2 },
        { key: 'Process Emissions', color: '#dd5f84', active: 3.2 },
        { key: 'Waste', color: '#dd5f84', active: 3.2 },
        { key: 'Aviation', color: '#ed96ab', active: 3.3 },
        { key: 'Ground Transportation', color: '#ed96ab', active: 3.3 },
        { key: 'International Shipping', color: '#ed96ab', active: 3.3 },
        { key: 'Buildings', color: '#f8cbd4', active: 3.4 },
        { key: 'Other', color: '#cacaca', active: 3.5 }
      ]
    },
    applications: function () {
      return [
        { key: 'Electricity', color: '#611731', active: 3.1 },
        { key: 'Industry', color: '#dd5f84', active: 3.2 },
        { key: 'Transports', color: '#ed96ab', active: 3.3 },
        { key: 'Buildings', color: '#f8cbd4', active: 3.4 },
        { key: 'Other', color: '#cacaca', active: 3.5 }
      ]
    },

    applicationsData: function () {
      const stacked = d3.stack().keys(this.applications.map(d => d.key))(
        EmissionData
      )
      return stacked.map((d, i) => ({
        d: this.areaGenerator(d),
        color: this.applications[i].color,
        labels: d[25][1] - 1000,
        id: this.applications[i].key,
        active: this.applications[i].active
      }))
    },
    subsectorsData: function () {
      const stacked = d3.stack().keys(this.subsectors.map(d => d.key))(
        EmissionData
      )
      return stacked.map((d, i) => ({
        d: this.areaGenerator(d),
        color: this.subsectors[i].color,
        id: this.subsectors[i].key,
        active: this.subsectors[i].active,
        data: d
      }))
    },
    subsectorsDataActive: function () {
      return this.subsectorsData.filter(d => d.active === this.step)
    },
    areaGenerator: function () {
      const { x, y } = this.scales
      return d3
        .area()
        .x(d => x(d.data.Year))
        .curve(d3.curveLinear)
        .y0(d => y(d[0] / 1000))
        .y1(d => y(d[1] / 1000))
    }
  },
  methods: {
    calcSizes () {
      const { inWrapper: el } = this.$refs
      const innerHeight = el.clientHeight || el.parentNode.clientHeight
      const innerWidth = el.clientWidth || el.parentNode.clientWidth
      this.divHeight = Math.max(innerHeight, 500)
      this.divWidth = Math.max(innerWidth, 500)
    }
  },
  mounted () {
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
  },
  updated () {
    this.calcSizes()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";
.visualization {
  width: inherit;
  height: inherit;
  width: 90%;
  height: 100%;
  // margin: 0 auto;
  display: inline-flex;

  .chart-description {
    padding: 40px 40px;
    width: 25%;

    .superscript {
    display: inline;
    vertical-align: super;
    font-size: 10px;
    }
  }
}

svg {
  margin-top: 50px;
  width: 75%;

    #emissions {
      stroke: $color-red;
      fill: none;
    }

    .emission__chunks {
      stroke: grey;
      stroke-width: 1;
    }

    .lowFill {
      fill-opacity: 0.5;
      stroke: $color-red;
    }

    .lowText {
      fill-opacity: 0;
    }

    .subsectorsData {
      .inactive {
        display: none;
      }
    }

    .applicationsData {
      .inactive {
        fill-opacity: 0.1;
      }

    .sectorlabels {
      fill: black !important;
    }

    .inactive {
      fill: none;
    }

    .yearsep {
      stroke-dasharray: 2 2;
      stroke: gray;
    }
  }
}

@media screen and (max-width: 1024px) {

  .visualization {
    display: block;

    .chart-description {
      width: 100%;
    }

  }

  svg {
    width: 100%;
    margin-top: 25px;
  }
}
</style>
