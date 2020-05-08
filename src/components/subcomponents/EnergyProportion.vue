<template>
  <svg class="proportion">
    <g transform="translate(0,15)" v-show="currentContinent != 'Antartica'">
    <text x="2" y="-5"> World </text>
    <rect
    v-for="(continent, i) in continentSum"
    v-bind:key='i + "continent-value"'
    v-show="continent.continent != 'Antartica'"
    :class="continent.continent === 'World' ? 'world' : 'continents'"
    :id="continent.continent === currentContinent ? 'active' : ''"
    :x="continent.x + 2"
    :width="continent.value"
    :height="height / 6"
    />
    <rect
    class="continents"
    id="active"
    :width="energyDetails.country"
    :height="height / 6"
    x="2"
    y="60"
    />
    <g :transform="`translate(${this.width / 2}, ${this.width - (this.width / 3)})`">
    <text text-anchor="middle" x="0" :y="0" fill="black">
      {{ data.select }} energy use
    </text>
    <text text-anchor="middle" x="0" :y="15" fill="black">
      is the {{ percLabel }}% of entire
    </text>
    <text text-anchor="middle" x="0" :y="30" fill="black">
       {{currentContinent}} ({{ Math.round(energyDetails.value) }} EJ/Yr)
    </text>
    </g>
    <rect
    class="world"
    :width="this.width"
    :height="height / 6"
    x="2"
    y="60"
    />
    <line
    v-for="(continent,i) in continentSum"
    class="connector"
    v-show="continent.continent === currentContinent"
    v-bind:key='i + continent.x'
    :x1="continent.x + 2"
    :y1="height / 6"
    x2="2"
    y2="60"
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
  props: ['data', 'width', 'height'],
  data () {
    return {
      Continents
    }
  },
  computed: {
    percLabel () {
      return this.energyDetails.perc > 1 ? Math.round(this.energyDetails.perc) : '< 1'
    },
    scales () {
      return {
        x: d3
          .scaleLinear()
          .domain([0, 558])
          .rangeRound([0, this.width])
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

  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";
svg {
  height: 100%;
  width: 100%;
  margin: 0 auto;
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
  // text-anchor: middle;
  font-size: 9px;
  opacity: 0;
}

#active_label {
  font-size: 12px;
  opacity: 1;
}

.south_america {
  text-anchor: right;
}

.Asia {
  text-anchor: start;
}

.South {
  text-anchor: end;
}

.connector {
  stroke: gray;
  stroke-dasharray: 4 2;
}

#active {
  fill-opacity: 1;
  fill: getColor(neon, 100);
}
</style>
