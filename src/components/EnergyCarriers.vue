<template>
  <div class="visualization" id="carriers" width="90%">
    <CountrySelector class="selector" />
    <svg width="80%" height="100%" :transform="'translate('+ margin.left * 2 + ',0)'">
      <g :transform="'translate('+ margin.left + ',' + margin.top + ')'">
        <g
          v-for="(sector,i) in createRect"
          v-bind:key="i"
          :id="sector.sector"
          :transform="'translate('+ margin.left * 2 + ',' + sector.sectorHeight +')'"
        >
          <rect
            class="fuel_rect"
            :class="sector.sector"
            v-for="(rect, i) in sector.rects"
            v-bind:key="i"
            :id="rect.labels"
            :x="rect.dist"
            :width="rect.rectWidth"
            :height="sector.rectHeight"
          />
        </g>
        <text
        class="sector-labels"
        v-for="(sector) in createRect"
        v-bind:key="sector.sector"
        :transform="'translate('+ ((width + margin.left) / 2) + ',' + (sector.sectorHeight + 10) +')'"
        >
        {{sector.sector}}
      </text>
      </g>
      <text
      v-for="(energy, i) in createEnLabels"
      :transform="'translate('+ margin.left * 2 + ',650)'"
      class="fuel-labels"
      v-bind:key="i"
      :x="energy.posX"
      >
      {{ energy.name }}
    </text>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

// data
import CarriersReport from '../assets/data/world_regional_report.json'

// Components
import CountrySelector from './subcomponents/CountrySelector.vue'

export default {
  name: 'EnergyCarriers',
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
    CountrySelector
  },
  data () {
    return {
      CarriersReport,
      margin: {
        left: 70,
        top: 30,
        bottom: 30,
        right: 40
      },
      energyLabels: [
        'coal',
        'electricity',
        'gas',
        'mtbio',
        'non-bioren',
        'nuclear',
        'oil',
        'other',
        'other gas',
        'other liquids',
        'other solids'
      ]
    }
  },
  computed: {
    innerWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight () {
      return this.height - this.margin.top - this.margin.bottom
    },
    // data new structure and selection
    nestVariables () {
      const carriers = this.CarriersReport
      return {
        carriers,
        groupsbyregion: _.groupBy(carriers, 'region'),
        allFuels: _.uniq(_.map(carriers, 'fuel')),
        sectors: ['industry', 'transport', 'residential', 'electricity']
      }
    },
    dataNest () {
      const {
        carriers,
        groupsbyregion,
        allFuels,
        sectors
      } = this.nestVariables

      _.forEach(groupsbyregion, (arr, key) => {
        const obj = {}
        _.forEach(sectors, sector => {
          const fuelObj = {}
          _.forEach(allFuels, (fuel, i) => {
            const data = _.map(arr, sector)
            fuelObj[fuel] = data[i]
          })
          obj[sector] = fuelObj
        })
        groupsbyregion[key] = obj
      })
      return groupsbyregion
    },
    dataFilter () {
      const groupsbyregion = this.dataNest
      return groupsbyregion['World']
    },
    // Scales
    scaleY () {
      const selectedRegion = this.dataFilter
      let maxEnergy = []
      const totalEnergy = _.map(selectedRegion, (value, fuel) => {
        let fuels = d3.values(selectedRegion[fuel])
        let maxValue = d3.max(fuels)
        maxEnergy.push(maxValue)
      })

      const y = d3.scaleLinear()
        .domain([0, maxEnergy.reduce((sum, val) => sum + val, 0)])
        .range([0, 300])

      return y
    },
    scaleX () {
      const selectedRegion = this.dataFilter
      const { width, height } = this
      const barWidth = (width + this.margin.left) / 2
      const ele = d3.values(selectedRegion.electricity)
      const ind = d3.values(selectedRegion.industry)
      const tran = d3.values(selectedRegion.transport)
      const res = d3.values(selectedRegion.residential)
      // defining scales for different sectors
      const electricity = d3.scaleLinear()
        .domain([0, ele.reduce((sum, val) => sum + val, 0)])
        .range([0, barWidth])

      const industry = d3.scaleLinear()
        .domain([0, ind.reduce((sum, val) => sum + val, 0)])
        .range([0, barWidth])

      const transport = d3.scaleLinear()
        .domain([0, tran.reduce((sum, val) => sum + val, 0)])
        .range([0, barWidth])

      const residential = d3.scaleLinear()
        .domain([0, res.reduce((sum, val) => sum + val, 0)])
        .range([0, barWidth])

      return {
        electricity,
        industry,
        residential,
        transport
      }
    },
    createRect () {
      const selectedRegion = this.dataFilter
      const scale = this.scaleX
      const y = this.scaleY
      const percScale = this.scalePerc
      let sectorHeight = 0

      const sectors = _.map(selectedRegion, (sector, key) => {
        let ValueSum = d3.sum(d3.values(selectedRegion[key]))
        let yValue = y(ValueSum)

        let initialHeight = sectorHeight
        sectorHeight = sectorHeight + yValue + 20

        let totalDist = 0
        const rects = _.map(selectedRegion[key], (item, i) => {
          let initialDist = totalDist
          totalDist = totalDist + scale[key](item)

          return {
            labels: i,
            dist: initialDist,
            rectWidth: scale[key](item)
          }
        })
        return {
          rects,
          sector: key,
          sectorHeight: initialHeight,
          rectHeight: yValue
        }
      })
      return sectors
    },
    createEnLabels () {
      const energies = this.energyLabels
      let distance = this.margin.left
      const barWidth = (this.width + this.margin.left) / 2

      const position = _.map(energies, (energy, i) => {
        const name = energies[i]
        console.log(name)
        let initialPos = distance
        distance = distance + (barWidth / 10.5)

        return {
          name: name,
          posX: initialPos
        }
      })
      console.log(position)
      return position
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

.visualization {
  width: inherit;
  height: inherit;
}

.fuel_rect {
  stroke: $color-yellow;
  fill: getColor(yellow, 80)
}

.fuel-labels {
  font-size: 10px;
  text-anchor: middle;
  cursor: pointer;
}

.selector {
  width: inherit;
}
</style>
