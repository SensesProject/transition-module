<template>
<g>
  <g v-if="step <= 1">
    <text class="twofifteen_emissions" :x="scales.x(2017)" :y="scales.y(35600000)">
      35.600.000
    </text>
    <text class="twofifteen_emissions" id="subtext" :x="scales.x(2017)" :y="scales.y(34500000)">
      tons of C02 released in the athmosphere in 2015
    </text>
    <circle id="curr_emissions" :cx="scales.x(2015)" :cy="scales.y(35600000 / 1000000)" r="5" />
    <circle id="curr_emissions" :cx="scales.x(2015)" :cy="scales.y(35600000 / 1000000)" r="5">
        <animate
          attributeName="r"
          from="1"
          to="10"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
          />
        <animate
        attributeName="opacity"
        from="1"
        to="0"
        dur="1.5s"
        begin="0s"
        repeatCount="indefinite"
        />
    </circle>
  </g>
  <g v-if="step === 1.2">
    <line :x1="scales.x(2020)" :y1="scales.y(35600000 / 1000000)" :x2="scales.x(2050)" :y2="scales.y(0)"/>
    <line :x1="scales.x(2015)" :y1="scales.y(35600000 / 1000000)" :x2="scales.x(2020)" :y2="scales.y(35600000 / 1000000)"/>
    <circle class="net_one" :cx="scales.x(2050)" :cy="scales.y(0)" r="5" />
    <circle class="net_one" :cx="scales.x(2050)" :cy="scales.y(0)" r="5">
        <animate
        attributeName="r"
        from="1"
        to="10"
        dur="1.5s"
        begin="0s"
        repeatCount="indefinite"
        />
        <animate
        attributeName="opacity"
        from="1"
        to="0"
        dur="1.5s"
        begin="0s"
        repeatCount="indefinite"
        />
    </circle>
  </g>
  <g v-if="step >= 1.1 && step < 2">
    <line :x1="scales.x(2015)" :y1="scales.y(35600000 / 1000000)" :x2="scales.x(2020)" :y2="scales.y(35600000 / 1000000)"/>
    <line :x1="scales.x(2020)" :y1="scales.y(35600000 / 1000000)" :x2="scales.x(2070)" :y2="scales.y(0)"/>
    <circle class="net_two" :cx="scales.x(2070)" :cy="scales.y(0)" r="5" />
    <circle class="net_two" :cx="scales.x(2070)" :cy="scales.y(0)" r="5">
        <animate
          attributeName="r"
          from="1"
          to="10"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
          />
        <animate
        attributeName="opacity"
        from="1"
        to="0"
        dur="1.5s"
        begin="0s"
        repeatCount="indefinite"
        />
    </circle>
  </g>
</g>
</template>

<script>
export default {
  name: 'EmissionsDots',
  props: ['width', 'height', 'scales', 'data', 'margin', 'step']
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";

#curr_emissions {
  fill: $color-red;
}

.net_two,
.net_one {
  fill: $color-neon;
}

line {
  stroke-dasharray: 5;
  stroke: gray;
}

.twofifteen_emissions {
  font-family: $font-sans;
  font-size: 1em;
}

#subtext {
  font-size: 0.75em;
}
</style>
