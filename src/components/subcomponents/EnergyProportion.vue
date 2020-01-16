<template>
  <svg class="proportion" :data='seeData' height='247' width='247'>
    <rect class="perc" :width="data * 2.40" :height="data * 2.40" />
    <rect class="country_spec" id="usa" width="41.832" height="41.832" />
    <rect class="country_spec" id="chine_main" width="55.775999999999996" height="55.775999999999996" />
    <text class="country_text" x="25.832" y="52.832" fill="gray">USA</text>
    <text class="country_text" x="39.832" y="67.832" fill="gray">CHN</text>
    <rect class="total" width="240" height="240" />
  </svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Proportion',
  props: ['data'],
  computed: {
    seeData () {
      return console.log(this.data)
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";

.proportion {
  margin-top: $spacing;
  padding: 2px;
}
.total {
  fill-opacity: 0;
  stroke: $color-neon;
}

.perc {
  fill: $color-neon;
}

.country_spec {
  stroke-dasharray: 2;
  stroke-width: 0.5;
  stroke: $color-gray;
  fill-opacity: 0;
}

.country_text {
  font-size: 10px;
}
</style>
