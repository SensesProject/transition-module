<template>
  <g class="arrows" width="90%">
    <g id="arrows" :transform="'scale(' + height / 1000 + ')'">
        <g id="industry" v-if="step >= 8">
            <path d="M76,511 L67,511 C29.9969218,511 4.53157013e-15,481.003078
            0,444 L0,80 C-4.53157013e-15,42.9969218 29.9969218,13 67,13 L76,13
            L76,13" id="Path-ind">
            </path>
            <polyline class="arrow" points="63 26 76 13 63 0"></polyline>
        </g>
        <g id="transport" transform="translate(0.000000, 168.000000)" v-if="step >= 9">
            <path d="M76,343 L67,343 C29.9969218,343 4.53157013e-15,313.003078
            0,276 L0,80 C-4.53157013e-15,42.9969218 29.9969218,13 67,13 L76,13
            L76,13"
            id="Path-tr">
            </path>
            <polyline class="arrow" points="63 26 76 13 63 0"></polyline>
        </g>
        <g id="residential" transform="translate(0.000000, 333.000000)" v-if="step >= 10">
            <path d="M76,178 L67,178 C29.9969218,178 4.53157013e-15,148.003078
            0,111 L0,80 C-4.53157013e-15,42.9969218 29.9969218,13 67,13 L76,13 L76,13"
            id="Path-res">
            </path>
            <polyline class="arrow" points="63 26 76 13 63 0"></polyline>
        </g>
    </g>
  </g>
</template>

<script>
export default {
  name: 'Arrows',
  props: ['width', 'height', 'scales', 'data', 'margin', 'step']
}
</script>

<style scoped lang="scss">
@import "library/src/style/variables.scss";

#arrows {
  stroke: #979797;
  stroke-width: 1;
  fill: none;
}

#transport {
  width: 50%;
}
</style>
