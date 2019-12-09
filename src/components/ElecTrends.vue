<template>
  <div class="electrification_trend">
    <svg
    :width="innerWidth"
    :height="innerHeight"
    :transform="'translate('+ margin.left + ',' + margin.top + ')'"
    :data="modelSelection"
    >

    </svg>
  </div>
</template>
<script>
// Modules
import * as d3 from 'd3'
import _ from 'lodash'

// Data
import ElectrificationTrends from '../assets/data/electrification-trends.json'

export default {
  name: 'ElecTrends',
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
  data () {
    return {
      ElectrificationTrends,
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
    dataStructure () {
      let trends = this.ElectrificationTrends
      return {
        models: _.groupBy(trends, 'model')
      }
    },
    dataNest () {
      const { models } = this.dataStructure

      _.forEach(models, (model, m) => {
        const obj = {}
        let singleModel = _.groupBy(model, 'scenario')
        _.forEach(singleModel, (scenario, s) => {
          const scenarioObj = {}
          let variableArr = _.groupBy(scenario, 'variable')
          _.forEach(variableArr, (variable, v) => {
            scenarioObj[v] = variable[0]
          })
          obj[s] = scenarioObj
        })
        models[m] = obj
      })
      return models
    },
    modelSelection () {
      const models = this.dataNest
      return models['REMIND']['2020_400']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.electrification_trend {
  background-color: lightblue;
  width: 100%;
  height: 100%;
}

svg {
  background-color: white;
}
</style>
