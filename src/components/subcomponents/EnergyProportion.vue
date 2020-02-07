<template>
  <svg class="proportion">
    <g transform="translate(0,20)" v-show="currentContinent != 'Antartica'">
    <text
    class="continent_label"
    :class="continent.continent === 'Asia' ? 'asia' : ''"
    :id="continent.continent === currentContinent ? 'active_label' : ''"
    v-for="(continent, i) in continentSum"
    v-show="continent.continent != 'World'"
    v-bind:key='i + 1'
    :x="continent.x + 2"
    y="-5"
    > {{continent.continent}} </text>
    <rect
    v-for="(continent, i) in continentSum"
    v-bind:key='i'
    v-show="continent.continent != 'Antartica'"
    :class="continent.continent === 'World' ? 'world' : 'continents'"
    :id="continent.continent === currentContinent ? 'active' : ''"
    :x="continent.x + 2"
    :width="continent.value"
    height="120"
    />
    <rect
    class="continents"
    id="active"
    :width="energyDetails.country"
    :height="energyDetails.country"
    x="2"
    y="140"
    />
    <rect
    class="world"
    :width="energyDetails.continent"
    :height="energyDetails.continent"
    x="2"
    y="140"
    />
    <line
    v-for="continent in continentSum"
    class="connector"
    v-show="continent.continent === currentContinent"
    v-bind:key='continent.x'
    :x1="continent.x + 2"
    y1="120"
    x2="2"
    y2="140"
    />
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
      Continents
    }
  },
  computed: {
    scales () {
      return {
        x: d3
          .scaleLinear()
          .domain([0, 558])
          .rangeRound([0, 210])
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
      return currentTot[0]['value']
    },
    singleCountry () {
      const selected = this.data.select
      const countries = this.continentTotal
      return this.scales.x(countries[selected]['sum'])
    },
    currentContinent () {
      const selected = this.data.select
      const countries = this.continentTotal
      return countries[selected]['continent']
    },
    realNumber () {
      const selected = this.data.select
      const countries = this.continentTotal
      return countries[selected]['realbumber']
    },
    energyDetails () {
      const scale = d3
        .scaleLinear()
        .domain([0, this.singleContinent])
        .rangeRound([0, 210])

      return {
        country: scale(this.singleCountry),
        continent: scale(this.singleContinent),
        value: this.realNumber
      }
    }

  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";
svg {
  height: 100%;
  width: 100%;
}
.proportion {
  margin-top: $spacing;
  padding: 2px;
}

.world {
  fill-opacity: 0;
  stroke: $color-neon;
}

.continents {
  fill-opacity: 0;
  stroke: $color-neon;
}

.continent_label {
  font-size: 9px;
  opacity: 0;
}

#active_label {
  text-anchor: middle;
  font-size: 12px;
  opacity: 1;
}

.south_america {
  text-anchor: right;
}

.asia {
  text-anchor: left;
}

.connector {
  stroke: gray;
  stroke-dasharray: 4 2;
}

#active {
  fill-opacity: 1;
  fill: $color-neon;
}
</style>
