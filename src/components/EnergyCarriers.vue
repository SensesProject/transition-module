<template>
  <div class="visualization" id="carriers" width="90%">
      <div v-if="step === 5" class="regionselect">
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
       is producing the
       <span class="dotted">{{ findPerc.perc }}%</span>
       of the total global energy.
      <br/>
       Equals to
       <span class="dotted">
         {{ findPerc.absValue }} EJ/yr
       </span>.
     </p>
    </div>
    <svg ref="bars" width="90%" height="100%" :transform="'translate('+ width / 10 + ',10)'">
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
        :x='(width + margin.left) / 2'
        :y='sector.sectorHeight + 30'
        >
        {{sector.sector}}
      </text>
      <text
      v-for="(energy, i) in createRect[3].rects"
      class="fuel-labels"
      v-bind:key="energy.labels + i"
      :id='energy.labels'
      :x="energy.posX"
      :y= 'height - (height / 3)'
      v-on:click='active = true'
      >
      {{ energy.labels }}
      <tspan
      :x="energy.posX"
      :y= 'height - (height / 3) + 20'
      >
      {{ energy.carrierValue }}
      </tspan>
    </text>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

// data
import CarriersReport from '../assets/data/world_regional_report.json'
import ElectrificationSteps from '../assets/data/electrification-steps.json'

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
      ElectrificationSteps,
      selected: 'World',
      active: false,
      margin: {
        left: 70,
        top: 30,
        bottom: 30,
        right: 40
      }
    }
  },
  methods: {
    selectCarrier (event) {
      let currentElement = event.originalTarget.id
      const allElements = d3.selectAll('.fuel_rect')
      const elements = d3.selectAll('.' + currentElement)
      elements.classed('is-active', true)
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
      let carriers = this.CarriersReport
      if (this.step >= 7) { carriers = this.ElectrificationSteps }
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
    stepSelection () {
      let selected = this.selected
      if (this.step !== 5) { selected = 'World' }
      if (this.step === 7) { selected = 'World-step1' }
      if (this.step === 8) { selected = 'World-step2' }
      if (this.step === 9) { selected = 'World-step3' }
      if (this.step === 10) { selected = 'World-step4' }
      return selected
    },
    dataFilter () {
      const groupsbyregion = this.dataNest
      const selected = this.stepSelection
      console.log(groupsbyregion)
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
      const barWidth = (this.innerWidth + this.margin.left) / 2
      let sectorHeight = 0
      const { currentElement } = this
      const sectors = _.map(selectedRegion, (sector, key) => {
        let distance = 10
        // for bars height
        let ValueSum = d3.sum(d3.values(selectedRegion[key]))
        let yValue = y(ValueSum)
        // conditions to check data
        if (ValueSum === 0) {
          yValue = 0
        }
        let initialHeight = sectorHeight
        sectorHeight = sectorHeight + yValue + 30

        let totalDist = 0
        const rects = _.map(selectedRegion[key], (item, i) => {
          // for rects
          let initialDist = totalDist
          totalDist = totalDist + scale[key](item)
          // for labels horizontal position
          let initialPos = distance
          distance = distance + (barWidth / 10.5)
          return {
            labels: i,
            dist: initialDist,
            rectWidth: scale[key](item),
            carrierValue: item,
            posX: initialPos
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

      return {
        perc: Math.ceil((maxRegValue / total) * 100),
        absValue: Math.round(maxRegValue * 100) / 100
      }
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
  stroke: getColor(orange, 40);
  fill: getColor(orange, 60);
}
</style>
