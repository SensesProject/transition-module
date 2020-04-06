<template>
  <div class="visualization" id="carriers">
      <div class="regionselect">
      <p class="graph-title sans" v-if="step >= 6">
        Possible electrification pathway based on current World energy production.
      </p>
      <p class="graph-title sans" v-if="step < 6">Energy production (Ej/y) per energy carrier across sectors in 2015</p>
      <div v-if="step === 5">
     <SensesSelect
       class="selector"
       :options="regionsArray"
       v-model="selected"
     />
     <div
     id="reset"
     v-on:click="
     selected = selected != 'World' ? 'World' : selected"
     >Reset</div>
     <p id="select-label">
       Use the selector above to see energy carriers distribution across regions.
     </p>
   </div>
     <EnergyProportion
     v-if="selected != 'World' && step < 6"
     :data="{
       allData: dataNest,
       selection: dataFilter,
       select: selected,
       perc: findPerc.perc,
       abs: findPerc.absValue
       }"
       :width="width"
       :height="height"
     />
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
      <g>
        <text
        fill="#4e40b2"
        :x="(innerWidth + (margin.left * 4)) / 2"
        :y="height - (margin.top * 5)"
        >← Select a carrier!</text>
        <text
        :transform="'rotate(45,' + energy.posX + ',' + height / 1.3 + ')'"
        v-for="(energy, i) in createRect[0].rects"
        class="fuel-labels"
        :class="[isActive === '' ? 'on' : '', isActive === energy.labels ? 'on' : 'off', carrierActive]"
        v-bind:key="'labels' + i"
        :id='energy.labels'
        :x="energy.posX"
        :y= 'height / 1.3'
        v-on:click=";[
        isActive = isActive === energy.labels ? 'initial' : energy.labels,
        clicked = isActive !== 'initial'
        ]"
        >
        {{ energy.labels }}
        <tspan
        font-size="10px"
        :data="sumCarriers"
        :id='energy.labels'
        :x="energy.posX"
        :y= 'height / 1.3  + 15'
        class="energy_sum"
        :class='isActive === energy.labels ? "is-active" : "is-inactive"'
        >
        {{ Math.round(sumCarriers[i] * 100) }} EJ/yr
        </tspan>
      </text>
      </g>
        <g
          v-for="(sector,i) in createRect"
          v-bind:key="i + 3"
          :id="sector.sector"
          :transform="'translate(0,' + sector.sectorHeight +')'"
        >
          <rect
            class="fuel_rect"
            :fill='rect.fill'
            :class='
            isActive === rect.labels ?
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
        :x='width / 2.08'
        :y='sector.sectorHeight - 20'
        >
        {{sector.sector}}
      </text>
      <path :d="selectedRectsPath" v-if="isActive" class="selectedRectsPath" />
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
import EnergyProportion from './subcomponents/EnergyProportion.vue'

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
    },
    hover: {
      type: String,
      default: null
    }
  },
  components: {
    SensesSelect,
    Arrows,
    EnergyProportion
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
    carrierActive () {
      let active = this.isActive
      if (this.step > 5) { active = 'Electricity' }
      return active
    },
    hoverValue () {
      return this.hover
    },
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
        sectors: ['Industry', 'Transport', 'Building', 'Electricity']
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
            const sum = d3.sum(data)
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
        return _.orderBy(allRegions, [key], ['desc'])
      })
      return allRegions
    },
    stepSelection () {
      let selected = this.selected
      if (this.step === 4.1) { selected = 'China (PRC)' }
      if (this.step === 4.2) { selected = 'USA' }
      if (this.step === 4.3) { selected = 'Germany' }
      if (this.step === 5 || this.step === 4) { selected = this.selected }
      if (this.step === 6) { selected = 'World' }
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
        .range([0, height / 2.3])

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
      const ele = d3.values(selectedRegion.Electricity)
      const ind = d3.values(selectedRegion.Industry)
      const tran = d3.values(selectedRegion.Transport)
      const res = d3.values(selectedRegion.Building)
      // defining scales for different sectors
      const Electricity = d3.scaleLinear()
        .domain([0, ele.reduce((sum, val) => sum + val, 0)])
        .range([0, barWidth])

      const Industry = d3.scaleLinear()
        .domain([0, ind.reduce((sum, val) => sum + val, 0)])
        .range([0, barWidth])

      const Transport = d3.scaleLinear()
        .domain([0, tran.reduce((sum, val) => sum + val, 0)])
        .range([0, barWidth])

      const Building = d3.scaleLinear()
        .domain([0, res.reduce((sum, val) => sum + val, 0)])
        .range([0, barWidth])

      return {
        Electricity,
        Industry,
        Building,
        Transport
      }
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
    },
    selectedRects () {
      if(this.isActive === 'initial') return false

      const selectedRects = this.createRect.map(sector => {
        const selectedRect = sector.rects.find(s => s.labels === this.isActive)

        return {
          y1: sector.sectorHeight,
          y2: sector.sectorHeight + sector.rectHeight,
          x1: selectedRect.carrierValue ? selectedRect.dist : 0,
          x2: selectedRect.carrierValue ? selectedRect.dist + selectedRect.rectWidth : 0
        }
      })
      return selectedRects
    },
    selectedRectsPath () {
      if(!this.selectedRects) return ''
      const data = this.selectedRects

      var path = d3.path()
      path.moveTo(data[0].x2, data[0].y1)
      path.lineTo(data[0].x2, data[0].y2)
      path.lineTo(data[1].x2, data[1].y1)
      path.lineTo(data[1].x2, data[1].y2)
      path.lineTo(data[2].x2, data[2].y1)
      path.lineTo(data[2].x2, data[2].y2)
      path.lineTo(data[3].x2, data[3].y1)
      path.lineTo(data[3].x2, data[3].y2)
      path.lineTo(data[3].x1, data[3].y2)
      path.lineTo(data[3].x1, data[3].y1)
      path.lineTo(data[2].x1, data[2].y2)
      path.lineTo(data[2].x1, data[2].y1)
      path.lineTo(data[1].x1, data[1].y2)
      path.lineTo(data[1].x1, data[1].y1)
      path.lineTo(data[0].x1, data[0].y2)
      path.lineTo(data[0].x1, data[0].y1)
      // path.closePath();
      const pathString = path.toString()
      return pathString
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
            fill:
              this.hover[0] === i ? this.hover[1] : 'white' &&
              this.step === 6 && i === 'wind/solar/hydro' ? '#a2e7c0' : 'white' &&
              this.step >= 7 && key === 'Electricity' ? '#a2e7c0' : 'white' &&
              this.step >= 8 && key === 'Industry' && i === 'Electricity' ? '#ffd89a' : 'white' &&
              this.step >= 9 && key === 'Transport' && i === 'Electricity' ? '#ffd89a' : 'white' &&
              this.step >= 10 && key === 'Building' && i === 'Electricity' ? '#ffd89a' : 'white' &&
              this.step >= 11 && i === 'biomass' | i === 'wind/solar/hydro' ? '#a2e7c0' : 'white'
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

.graph-title {
  margin-bottom: 20px;
}

.selectedRectsPath {
  fill: none;
  stroke: $color-neon;
  stroke-width: 1px;
  stroke-dasharray: 3 2;
  z-index: 1000;
}

.fuel-labels {
  text-anchor: left;
  font-size: 10.5px;
  cursor: pointer;
}

.regionselect {
  top: $spacing + 1;
  left: 3.5em;
  position: absolute;
  width: 245px;
  height: 700px;
  z-index: 1;
}

#reset {
  cursor: pointer;
  color: $color-neon;
  display: inline;
  margin-left: 15px;
}

#select-label {
  margin-top: 15px;
}

#emissions-label {
  margin-top: 15px;
}

.is-fill {
  stroke: $color-neon;
  fill: #ddd6ff;
}

#select-label {
  font-family: $font-serif;
}

.is-inactive {
  visibility: hidden;
}

.energy_sum {
  fill: $color-neon;
}

.sector-labels {
  text-anchor: end;
}

g {
  #sector {
  transition: transform 1s;
  }

.off {
  fill-opacity: 0.4;
}

.on {
  fill-opacity: 1;
}
}

rect {
  transition: width 0.5s 0.8s, x 0.5s 0.8s, y 0.2s, height 0.5s, fill 0.5s;
}
</style>
