<template>
  <svg class="proportion" ref="proportionDiv">
    <g :transform="`translate(${margin.left / 2}, ${margin.top})`">
      <g class="general">
        <text x="2" y="-5"> World </text>
        <rect
        v-for="(continent, i) in continentSum"
        v-bind:key='i + "continent-value"'
        v-show="continent.continent != 'Antartica'"
        :class="continent.continent === 'World' ? 'world' : 'continents'"
        class="world"
        :id="continent.continent === currentContinent ? 'active' : ''"
        :width="continent.value"
        :height="y / 2"
        :x="continent.x + 2"
        />
      </g>
      <g class="detail" :transform="`translate(0, ${y - (y / 4)})`">
        <text text-anchor="start" y="-5" fill="black">
           {{currentContinent}} ({{ Math.round(energyDetails.value) }} EJ/Yr)
        </text>
        <g class="continent">
          <rect :width="chartWidth * 2" :height="y / 2" />
          <rect
          class="continents"
          id="active"
          :width="energyDetails.country"
          :height="y / 2"
          />
        </g>
        <text text-anchor="middle" :x="width" :y="y / 3.2" fill="black">
          {{ data.select }}: {{ percLabel }}%
        </text>
      </g>
      <g :transform="`translate(0, 0)`">
        <line
        v-for="(continent,i) in continentSum"
        class="connector"
        v-show="continent.continent === currentContinent"
        v-bind:key='`${i}start`'
        :x1="continent.x + 2"
        :y1="y / 2"
        x2="2"
        :y2="y - (y / 4)"
        />
        <line
        v-for="(continent,i) in continentSum"
        class="connector"
        v-show="continent.continent === currentContinent"
        v-bind:key='`${i}end`'
        :x1="(continent.x + continent.value) + 2"
        :y1="y / 2"
        :x2="chartWidth * 2"
        :y2="y - (y / 4)"
        />
      </g>
    </g>
  </svg>
</template>

<script>
import _ from 'lodash'
import * as d3 from 'd3'

import Continents from '../../assets/data/energycarriers-continents.json'

export default {
  name: 'Proportion',
  props: ['data'],
  data () {
    return {
      Continents,
      width: 0,
      halfWidth: 0,
      height: 0,
      margin: {
        top: 15,
        left: 10,
        right: 10
      }
    }
  },
  computed: {
    percLabel () {
      return this.energyDetails.perc > 1 ? Math.round(this.energyDetails.perc) : '< 1'
    },
    chartWidth () {
      const { divWidth } = this.calcSizes
      return divWidth < 100 ? this.halfWidth : this.width - this.margin.left
    },
    y () {
      return this.height > 155 ? this.height / 4 : this.height / 2
    },
    scales () {
      return {
        x: d3
          .scaleLinear()
          .domain([0, 502.182284])
          .rangeRound([0, this.chartWidth])
      }
    },
    continentTotal () {
      const continents = _.groupBy(this.Continents, 'Region')
      const data = this.data.allData
      let countrySum = {}
      _.map(data, (country, c) => {
        let sector = []
        let sum = []
        _.map(country, (energy, e) => {
          let values = []
          _.map(energy, (value, v) => { values.push(value) })
          sector = _.sum(values)
          sum.push(sector)
        })
        countrySum[c] = {
          sum: _.sum(sum),
          continent: continents[c][0]['Continent'],
          region: continents[c][0]['Region']
        }
      })
      return countrySum
    },
    continentSum () {
      const totalCont = _.groupBy(this.continentTotal, 'continent')
      let yDistance = 0
      return _.map(totalCont, (continent, co) => {
        let continentSum = []
        _.map(continent, (region, r) => { continentSum.push(region['sum']) })
        const scaledValue = this.scales.x(_.sum(continentSum))
        let initialyPos = yDistance
        yDistance = yDistance + scaledValue
        return {
          realnumber: _.sum(continentSum),
          value: scaledValue,
          x: co === 'World' ? 0 : initialyPos,
          continent: co
        }
      })
    },
    singleContinent () {
      const selected = this.data.select
      const countryTot = this.continentTotal
      const continentTot = this.continentSum
      const currentContinent = countryTot[selected]['continent']
      const currentTot = _.filter(continentTot, (single, s) => { return single['continent'] === currentContinent })
      return currentTot[0]['realnumber']
    },
    singleCountry () {
      const selected = this.data.select
      const countries = this.continentTotal
      return countries[selected]['sum']
    },
    currentContinent () {
      const selected = this.data.select
      const countries = this.continentTotal
      return countries[selected]['continent']
    },
    realNumber () {
      const selected = this.data.select
      const countries = this.continentTotal
      return countries[selected]['sum']
    },
    energyDetails () {
      const scale = d3
        .scaleLinear()
        .domain([0, this.singleContinent])
        .rangeRound([0, this.width])
      return {
        perc: (this.singleCountry / this.singleContinent) * 100,
        country: scale(this.singleCountry),
        continent: scale(this.singleContinent),
        value: this.singleContinent
      }
    }
  },
  methods: {
    calcSizes () {
      const { proportionDiv: div } = this.$refs
      const divWidth = div.clientWidth || div.parentNode.clientWidth
      const divHeight = div.clientHeight || div.parentNode.clientHeight
      this.width = divWidth / 2
      this.halfWidth = divWidth / 2.5
      this.height = divHeight
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
svg {
  display: inline;
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

.proportion {
  width: 100%;
  margin-top: $spacing;
  padding: 2px;
}

.world,
.continent  {
  fill-opacity: 0;
  stroke: $color-neon;
}

.connector {
  stroke: gray;
  fill: $color-neon;
  stroke-width: 0.5;
}

#active {
  fill-opacity: 1;
  fill: getColor(neon, 100);
}

@media screen and (max-width: 1024px) {
  svg {
    width: 40%;
  }

  .proportion {
    margin-top: 0;
    padding: 2px;
  }
}
</style>
