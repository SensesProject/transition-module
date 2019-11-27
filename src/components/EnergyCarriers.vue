<template>
  <div class="visualization" id="carriers" width="90%">
      <div v-if="step >= 5" class="regionselect">
     <SensesSelect
       class="selector"
       :options="regionsArray"
       v-model="selected"
     />
     <p id="select-label">
       Use the selector above to see energy carriers distribution across regions.
     </p>
     <p id="emissions-label">
       <span class="highlight">
         {{ selected }}
       </span>
       is producing the {{ findPerc }}% of the total global energy.
     </p>
    </div>
    <svg width="90%" height="100%" :transform="'translate('+ width / 10 + ',0)'">
      <g :transform="'translate('+ margin.left + ',0)'">
        <g
          v-for="(sector,i) in createRect"
          v-bind:key="i"
          :id="sector.sector"
          :transform="'translate(5,' + sector.sectorHeight +')'"
        >
          <rect
            class="fuel_rect"
            :class="[sector.sector, rect.labels]"
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
        :transform="'translate('+
          ((width + margin.left) / 2)
          + ',' + (sector.sectorHeight
          + 10) +')'"
        >
        {{sector.sector}}
      </text>
      </g>
      <text
      v-for="(energy, i) in createEnLabels"
      :transform="'translate('+ margin.left + ',770)'"
      class="fuel-labels"
      v-bind:key="i"
      :id='energy.name'
      :x="energy.posX"
      v-on:click='selectCarrier'
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
import SensesSelect from 'library/src/components/SensesSelect.vue'

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
    SensesSelect
  },
  data () {
    return {
      CarriersReport,
      selected: 'World',
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
        'other-gas',
        'other-liquids',
        'other-solids'
      ]
    }
  },
  methods: {
    selectCarrier (event) {
      let currentElement = event.originalTarget.id
      const allElements = d3.selectAll('rect_fuel')
      const elements = d3.selectAll('.' + currentElement)
      elements.attr('class', 'is-active')
      allElements.addClass('inactive')
      console.log(currentElement)
      return { currentElement }
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
    regionsArray () {
      const groupsbyregion = this.nestVariables.groupsbyregion
      const allRegions = []

      _.forEach(groupsbyregion, (arr, key) => {
        allRegions.push(key)
        return allRegions
      })
      return allRegions
    },
    dataFilter () {
      const groupsbyregion = this.dataNest
      const selected = this.selected
      return groupsbyregion[selected]
    },
    // Scales
    scaleY () {
      const selectedRegion = this.dataFilter
      const { height } = this
      let maxEnergy = []
      const totalEnergy = _.map(selectedRegion, (value, fuel) => {
        let fuels = d3.values(selectedRegion[fuel])
        let maxValue = d3.sum(fuels)
        maxEnergy.push(maxValue)
      })

      const y = d3.scaleLinear()
        .domain([0, maxEnergy.reduce((sum, val) => sum + val, 0)])
        .range([0, height / 2])

      let maxRegValue = maxEnergy.reduce((sum, val) => sum + val, 0)
      return {
        y,
        maxRegValue
      }
    },
    scaleX () {
      const selectedRegion = this.dataFilter
      const { width, height } = this
      const barWidth = (this.innerWidth + this.margin.left) / 2
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
      const { y } = this.scaleY
      let sectorHeight = 0
      const { currentElement } = this
      console.log('outside event', currentElement)
      const sectors = _.map(selectedRegion, (sector, key) => {
        let ValueSum = d3.sum(d3.values(selectedRegion[key]))
        let yValue = y(ValueSum)
        if (ValueSum === 0) {
          yValue = 0
        }
        let initialHeight = sectorHeight
        sectorHeight = sectorHeight + yValue + 30

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
      const barWidth = (this.innerWidth + this.margin.left) / 2
      let distance = 10
      const position = _.map(energies, (energy, i) => {
        const name = energies[i]
        let initialPos = distance
        distance = distance + (barWidth / 10.5)

        return {
          name: name,
          posX: initialPos
        }
      })
      return position
    },
    findPerc (){
      const { maxRegValue } = this.scaleY
      const groupsbyregion = this.dataNest
      const world = groupsbyregion['World']
      const maxEnergy = []
      const totalEnergy = _.map(world, (value, fuel) => {
        let fuels = d3.values(world[fuel])
        let maxValue = d3.sum(fuels)
        maxEnergy.push(maxValue)
      })
      const total = maxEnergy.reduce((sum, val) => sum + val, 0)

      return Math.ceil((maxRegValue / total) * 100)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

.visualization {
  height: inherit;
  padding: 2% 12%;
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

.regionselect {
  top: $spacing * 2;
  position: absolute;
  width: 150px;
}

#select-label {
  font-size: 10px;
  margin-top: 15px;
}

#emissions-label {
  margin-top: 15px;
}

.is-active {
  stroke: $color-neon;
  fill: getColor(neon, 80);
}
</style>
