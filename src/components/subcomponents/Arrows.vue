<template>
  <g class="arrows" width="100%">
    <g id="arrows">
        <g id="industry" v-if="step >= 8 || step === 4.3">
            <path :d="industry.path" id="Path-ind"/>
            <polyline class="arrow" :points="industry.arrow"></polyline>
        </g>
        <g id="transport" v-if="step >= 9 || step === 4.3">
          <path :d="transport.path" id="Path-ind"/>
            <polyline class="arrow" :points="transport.arrow"></polyline>
        </g>
        <g id="residential" v-if="step >= 10 || step === 4.3">
          <path :d="building.path" id="Path-ind"/>
            <polyline class="arrow" :points="building.arrow"></polyline>
        </g>
    </g>
  </g>
</template>

<script>
import { sum, map } from 'lodash'
export default {
  name: 'Arrows',
  props: ['width', 'height', 'step', 'coordinates'],
  computed: {
    industry () {
      const industry = this.coordinates[0]
      const electricity = this.coordinates[3]
      return {
        path: `M10,${industry.sectorHeight * 2} Q10,${industry.sectorHeight * 2}-10,${industry.sectorHeight * 2} L-10,${industry.sectorHeight * 2} L-10,${electricity.sectorHeight} L10,${electricity.sectorHeight}`,
        arrow: `0,${industry.sectorHeight * 2 - 10} 10,${industry.sectorHeight * 2} 0,${industry.sectorHeight * 2 + 10}`
      }
    },
    transport () {
      const transport = this.coordinates[1]
      const electricity = this.coordinates[3]
      return {
        path: `M10,${transport.sectorHeight} L-10,${transport.sectorHeight}`,
        arrow: `0,${transport.sectorHeight - 10} 10,${transport.sectorHeight} 0,${transport.sectorHeight + 10}`
      }
    },
    building () {
      const building = this.coordinates[2]
      const electricity = this.coordinates[3]
      return {
        path: `M10,${building.sectorHeight} L-10,${building.sectorHeight}`,
        arrow: `0,${building.sectorHeight - 10} 10,${building.sectorHeight} 0,${building.sectorHeight + 10}`
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";

#arrows {
  stroke: $color-yellow;
  stroke-width: 1;
  fill: none;
}

#transport {
  width: 50%;
}
</style>
