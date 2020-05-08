<template>
  <div class="visualization" id="carriers" ref="inWrapper">
      <div class="regionselect" ref="proportionDiv">
          <p class="graph-title sans" v-if="step >= 6">Possible electrification pathway based on current World energy production.</p>
          <p class="graph-title sans" v-if="step < 6">Energy Use across Sectors (2015)</p>
      <div v-if="step < 5" class="energy-proportion">
        <div class="highlight">{{ stepSelection }}</div>
      </div>
      <div v-if="step === 5" class="energy-proportion">
         <SensesSelect class="selector" :options="regionsArray" v-model="selected"/>
         <div id="reset" v-on:click="selected = selected != 'World' ? 'World' : selected">Reset</div>
         <p id="select-label">Use the selector above to see energy carriers distribution across regions.</p>
         <EnergyProportion v-show="selected != 'World'"
         :data="{ allData: dataNest, selection: dataFilter, select: selected, perc: findPerc.perc, abs: findPerc.absValue }" :width="divHeight" :height="235"/>
      </div>
    </div>
    <svg :width="graphWidth" :height="graphHeight" :transform="`translate(${margin.left}, ${margin.top})`">
      <Arrows
      :height="innerHeight"
      :step="step"
      :transform="'translate('+ (graphWidth / 5.5) + ',' + (innerHeight / 12) + ')'"
      v-if="step >= 4.3"
      />
      <g :transform="'translate('+ (graphWidth / 4) + ',0)'">
      <g>
        <text
        :transform="'rotate(45,' + energy.posX + ',' + (graphHeight - margin.bottom) + ')'"
        v-for="(energy, i) in createRect[0].rects"
        class="fuel-labels"
        :class="[
        clicked === false ? 'on' : '',
        isActive === energy.labels ? ['on', energy.klass] : ['off', energy.klass],
        energy.activeCarriers
        ]"
        v-bind:key="'labels' + i"
        :id='energy.labels'
        :x="energy.posX"
        :y= 'graphHeight - margin.bottom'
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
        :y= 'height / 1.3  + 20'
        class="energy_sum"
        :class='isActive === energy.labels ? "is-active" : "is-inactive"'
        >
        {{ Math.round(sumCarriers[i] * 100) / 100 }} EJ/yr
        </tspan>
      </text>
      </g>
        <g v-for="(sector, i) in createRect" v-bind:key="`${sector}${i}-group`" :id="sector.sector" :class="visible[i]">
          <rect
            class="fuel_rect"
            :class='isActive !== rect.labels && clicked ?
            [sector.sector, rect.klass, "is-empty", visibleCarrier[i]] :
            [sector.sector, rect.klass, "is-fill", visibleCarrier[i]]'
            v-for="(rect, i) in sector.rects"
            v-bind:key="`${i}-${rect.labels}`"
            :id="rect.labels"
            :x="rect.dist"
            :y="sector.sectorHeight"
            :width="rect.rectWidth"
            :height="sector.rectHeight"
          />
        </g>
        <text
        :class="visible[i]"
        class="sector-labels"
        v-for="(sector, i) in createRect"
        v-bind:key="sector.sector"
        x='0'
        :y='sector.sectorHeight - 5'
        >
        {{sector.sector}}
      </text>
      <!-- <path :d="selectedRectsPath" v-if="isActive" class="selectedRectsPath" /> -->
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

// data
import CarriersReport from '../assets/data/World-region-report.json'
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
        left: 245,
        top: 30,
        bottom: 60,
        right: 40
      },
      innerWidth: 0,
      innerHeight: 0,
      divHeight: 0
    }
  },
  computed: {
    hoverValue () {
      return this.hover
    },
    graphWidth () {
      return this.innerWidth - 245
    },
    graphHeight () {
      return this.innerHeight - this.margin.top
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
    visible () {
      let visible = []
      if (this.step >= 3) { visible = ['visible', 'visible', 'visible', 'none'] }
      if (this.step >= 4.3) { visible = ['visible', 'visible', 'visible', 'visible'] }
      return visible
    },
    visibleCarrier () {
      let carriers = []
      if (this.step >= 3) { carriers = ['zero', 'zero', 'zero', 'zero', 'zero', 'zero', 'zero', 'zero'] }
      if (this.step >= 4) { carriers = ['zero', 'zero', 'zero', 'zero', 'done', 'done', 'done', 'done'] }
      if (this.step >= 4.1) { carriers = ['zero', 'zero', 'done', 'done', 'done', 'off', 'off', 'off'] }
      if (this.step >= 4.2) { carriers = ['done', 'off', 'off', 'off', 'off', 'off', 'off', 'off'] }
      if (this.step >= 4.3) { carriers = ['done', 'done', 'done', 'done', 'done', 'done', 'done', 'done'] }
      if (this.step >= 5) { carriers = [] }
      return carriers
    },
    stepSelection () {
      let selected = this.selected
      if (this.step === 5 || this.step === 4) { selected = this.selected }
      if (this.step === 6) { selected = 'World' }
      if (this.step === 7) { selected = 'World-step1' }
      if (this.step === 8) { selected = 'World-step2' }
      if (this.step === 9) { selected = 'World-step3' }
      if (this.step >= 10) { selected = 'World-step4' }
      return selected
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
    dataFilter () {
      const groupsbyregion = this.dataNest
      const selected = this.stepSelection
      return groupsbyregion[selected]
    },
    // Scales
    scaleY () {
      const selectedRegion = this.dataFilter
      let maxEnergy = []
      const totalEnergy = _.map(selectedRegion, (value, fuel) => {
        let fuels = d3.values(selectedRegion[fuel])
        let maxValue = d3.sum(fuels)
        maxEnergy.push(maxValue)
      })

      const y = d3.scaleLinear()
        .domain([0, maxEnergy.reduce((sum, val) => sum + val, 0)])
        .range([0, this.graphHeight / 2])

      let maxRegValue = maxEnergy.reduce((sum, val) => sum + val, 0)
      return {
        y,
        maxRegValue
      }
    },
    scaleX () {
      const selectedRegion = this.dataFilter
      const barWidth = this.graphWidth - (this.graphWidth / 2.5)
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
        absValue: maxRegValue
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
    createRect () {
      const selectedRegion = this.dataFilter
      const scale = this.scaleX
      const { y } = this.scaleY
      const barWidth = this.graphWidth - (this.graphWidth / 2.5)
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
          distance = distance + (barWidth / 7.5)
          return {
            klass: i === 'Wind/Hydro/Solar' | i === 'Wind/Solar/Hydro' ? 'WindSolHy' : i,
            labels: i,
            dist: initialDist,
            rectWidth: scale[key](item),
            carrierValue: item,
            posX: initialPos
          }
        })
        return {
          rects,
          sector: key === 'Electricity' ? ' Electricity Supply' : key,
          sectorHeight: initialHeight,
          rectHeight: yValue
        }
      })
      return sectors
    }
  },
  methods: {
    calcSizes () {
      const { inWrapper: el, proportionDiv: div } = this.$refs
      const innerHeight = el.clientHeight || el.parentNode.clientHeight
      const innerWidth = el.clientWidth || el.parentNode.clientWidth
      const divHeight = div.clientHeight || div.parentNode.clientHeight
      this.innerHeight = Math.max(innerHeight, 500)
      this.innerWidth = Math.max(innerWidth, 500)
      this.divHeight = Math.max(divHeight / 3.5)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

.visualization {
  width: 100%;
  height: 90%;
}

g {
  #sector {
  transition: transform 1s;
  }

  .zero {
    fill-opacity: 0;
    transition: fill-opacity 0.5s;
  }

  .off {
    fill-opacity: 0.4;
    transition: fill-opacity 0.5s;
  }

  .done, .on {
    fill-opacity: 1;
    transition: fill-opacity 0.5s;
  }

}

.fuel_rect {
  stroke: black;
  stroke-width: 0.5;
}

.is-empty {
  fill-opacity: 0.4;
  transition: fill-opacity 0.5s;
}

.Electricity {
  fill: getColor(yellow, 80);
}

.Other {
  fill: white;
}

.WindSolHy {
  fill: #acc3ac;
}

.Biomass {
  fill: #618879;
}

.Nuclear {
  fill: #0c514a;
}

.Gas {
  fill: $color-light-gray;
}

.Oil {
  fill: #75757a;
}

.Coal {
  fill: #4a4a4a;
}

.graph-title {
  margin-bottom: 20px;
}

.fuel-labels {
  text-anchor: left;
  font-size: 10.5px;
  cursor: pointer;
}

.regionselect {
  top: $spacing;
  left: 3.5em;
  position: absolute;
  width: 245px;
  height: 100%;
  z-index: 1;
}

.energy-proportion {
  height: 100%;
}

#reset {
  cursor: pointer;
  color: $color-neon;
  display: inline;
  margin-left: 15px;
}

#select-label {
  margin-top: 15px;
  font-family: $font-serif;
}

#emissions-label {
  margin-top: 15px;
}

.is-inactive {
  visibility: hidden;
}

.energy_sum {
  fill: $color-neon;
}

.sector-labels {
  text-anchor: start;
}

.invisible_carriers {
  visibility: hidden;
  transition: visibility 0.5s;
}

rect {
  transition: width 0.5s, x 0.5s, y 0.5s, height 0.5s, fill 0.5s;
}

text {

  &.Other {
    fill: black;
  }
  &.Electricity {
    fill: darken($color-yellow, 10);
  }
  transition: y 0.5s;
}

.none {
  opacity: 0;
  transition: opacity 0.5s;
}

.visible {
  opacity: 1;
  transition: opacity 0.5s;
}

</style>
