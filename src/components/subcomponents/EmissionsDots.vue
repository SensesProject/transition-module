<template>
<g>
  <g v-if="step <= 1">
    <circle id="curr_emissions" :cx="scales.x(2015)" :cy="scales.y(35600000)" r="5" />
    <circle id="curr_emissions" :cx="scales.x(2015)" :cy="scales.y(35600000)" r="5">
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
  <g v-if="step === 1.1">
    <circle class="net_two" :cx="scales.x(2075)" :cy="scales.y(0)" r="5" />
    <circle class="net_two" :cx="scales.x(2075)" :cy="scales.y(0)" r="5">
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
</style>
