<template>
  <svg class="proportion">
    <rect
    v-for="(continent, i) in continentSum"
    v-bind:key='i'
    :class="continent.continent === 'World' ? 'world' : 'continents'"
    :id="continent.continent === currentContinent ? 'active' : ''"
    :x="continent.x"
    :width="continent.value"
    height="120"
    />
    <rect class="continents" id="active" :width="energyDetails.country" :height="energyDetails.country" y="130"/>
    <rect class="world" :width="energyDetails.continent" :height="energyDetails.continent" y="130"/>
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
          .rangeRound([0, 240])
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
    energyDetails () {
      const scale = d3
        .scaleLinear()
        .domain([0, this.singleContinent])
        .rangeRound([0, 240])

      return {
        country: scale(this.singleCountry),
        continent: scale(this.singleContinent)
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

#active {
  fill-opacity: 1;
  fill: $color-neon;
}
</style>
