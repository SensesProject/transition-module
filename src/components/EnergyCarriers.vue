<template>
  <div class="visualization" id="carriers">
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
    <svg
    :width="innerWidth"
    :height="innerHeight"
    :transform="'translate('+ margin.left + ',' + (margin.top - 10) + ')'"
    >
      <Arrows
      :height="innerHeight"
      :step="step"
      :transform="'translate('+ (innerWidth / 5.5) + ',' + (innerHeight / 12) + ')'"
      v-if="step >= 8"
      />
      <g
      :transform="'translate('+ (innerWidth / 4) + ',0)'">
        <text
        v-for="(energy, i) in createRect[0].rects"
        class="fuel-labels"
        v-bind:key="energy.labels + i"
        :id='energy.labels'
        :x="energy.posX"
        :y= '(innerHeight - 30)'
        v-on:click=";[
        isActive = isActive === energy.labels ? 'initial' : energy.labels,
        clicked = isActive !== 'initial'
        ]"
        >
        {{ energy.labels }}
        <tspan
        :data="sumCarriers"
        :id='energy.labels'
        :x="energy.posX"
        :y= '(innerHeight - 45)'
        class="energy_sum"
        :class='isActive === energy.labels ? "is-active" : "is-inactive"'
        >
        {{ sumCarriers[i] }} EJ/yr
        </tspan>
      </text>
        <g
          v-for="(sector,i) in createRect"
          v-bind:key="i"
          :id="sector.sector"
          :transform="'translate(0,' + sector.sectorHeight +')'"
        >
          <rect
            class="fuel_rect"
            :fill='rect.fill'
            :class='isActive === rect.labels ?
            [sector.sector, rect.labels, "is-fill"] :
            [sector.sector, rect.labels, "is-empty"]'
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
import Arrows from './subcomponents/Arrows.vue'

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
    SensesSelect,
    Arrows
  },
  data () {
    return {
      CarriersReport,
      ElectrificationSteps,
      selected: 'World',
      isActive: '',
      clicked: false,
      margin: {
        left: 40,
        top: 30,
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
      if (this.step >= 10) { selected = 'World-step4' }
      return selected
    },
    dataFilter () {
      const groupsbyregion = this.dataNest
      const selected = this.stepSelection
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
      let sectorHeight = this.margin.top
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
        sectorHeight = (this.innerHeight / 12) + (sectorHeight + yValue)
        console.log(key)
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
            posX: initialPos,
            fill: this.step >= 7 && key === 'electricity' ? '#ffd89a' : '#d8d8e4' &&
              this.step >= 8 && key === 'industry' && i === 'electricity' ? '#ffd89a' : '#d8d8e4' &&
              this.step >= 9 && key === 'transport' && i === 'electricity' ? '#ffd89a' : '#d8d8e4' &&
              this.step >= 10 && key === 'residential' && i === 'electricity' ? '#ffd89a' : '#d8d8e4'
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
      const carriers = this.carrierSum
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
      const perc = (maxRegValue / total) * 100
      return {
        perc: Math.round(perc * 100) / 100,
        absValue: Math.round(maxRegValue * 100) / 100
      }
    },
    sumCarriers () {
      const sectors = this.createRect
      const sumValue = {}

      const dataArray = _.map(sectors, (sector, key) => {
        const fuels = sector.rects
        const data = _.map(fuels, (carrier, ckey) => {
          return fuels[ckey].carrierValue
        })
        return data
      })
      return dataArray.reduce((r, a) => a.map((b, i) => (r[i] || 0) + b), [])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

.visualization {
  width: 100%;
  height: 100%;
}

.fuel_rect {
  stroke: $color-gray;
}

.fuel-labels {
  font-size: 10px;
  text-anchor: middle;
  cursor: pointer;
}

.regionselect {
  top: $spacing * 2;
  left: 4.5em;
  position: absolute;
  width: 150px;
  z-index: 1;
}

#select-label {
  font-size: 10px;
  margin-top: 15px;
}

#emissions-label {
  margin-top: 15px;
}

.is-fill {
  stroke: $color-neon;
  fill: #ddd6ff;
}

.is-inactive {
  visibility: hidden;
}

.energy_sum {
  fill: $color-neon;
}
</style>
