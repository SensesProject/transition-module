<template>
  <div id="app" ref="vis">
    <SensesMenu />
    <div class="noscroll">
      <h1 class="t" id="cover">Towards an Electric Future</h1>
      <h1 class="subtitle">A guide to clean electricity production and sectors electrification</h1>
        <h4 class="title">Relevant Concepts</h4>
        <p class="mono">
          Net-zero /
          energy system /
          energy sectors /
          renewable electricity /
          electrification
        </p>
        <h4>What will you learn?</h4>
          <p>
            In this module, you will learn about the sources of CO2 emissions
            in the energy sector and how we can abate those emissions in the
            future by a transition towards renewable energy and electrification. <br />
            Scroll down to start your journey!
          </p>
        </div>
    <LayoutScrollytelling>
      <template v-slot:vis="{ width, height, step }">
        <div
          class="vis-inner"
          :style="{
            width: `${width}px`,
            height: `${height}px`
          }"
        >
          <EmissionsChart v-if="step <= 3.5" :step="step" :width="width" :height="height" />
          <!-- <EnergyCarriers v-if="step >= 4 && step <= 11" :step="step" :width="width" :height="height" :hover="hover"/>
          <ElecTrends v-if="step >= 12 && step <= 13" :step="step" :width="width" :height="height" /> -->
        </div>
      </template>
      <div slot="text" class="observer">
        <IntersectionObserver :step="1">
          <h2 class="title" id="net__zero">What is Net-Zero?</h2>
          <p>
            To stop climate change and stabilize global temperature, global
            greenhouse gas emissions must reduce to net-zero. Net-zero means
            that all remaining emissions to the atmosphere would need to be
            balanced by removing CO2 from the atmosphere.<br /><br />
            As CO2 removal difficult, the focus must be on minimizing emissions
            in the first place. Here, we will focus on
            <span class="highlight" id="emissions">CO2 emissions</span> from
            the energy sector that represent the lion share of global
            greenhouse gas emissions.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="1.1">
          <p>
            The time schedule for the energy transition is tight!
            The Paris Agreement demands stabilizing global warming at 1.5°C to
            2°C above preindustrial levels. Limiting global warming to 2°C
            levels will require net-zero CO2 emissions by 2070.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="1.2">
          <p>A limit of 1.5°C will require carbon neutrality even by 2050.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="2">
          <h2 class="title" id="increasing__emissions">Emission have been steadily increasing</h2>
          <p>
            Let us take a closer look at the past 30 years where emissions have
            been steadily increasing.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3">
          <h2 class="title" id="sector__emissions">
            Where do the current emissions come from?</h2>
          <p>
            The current energy-related CO2 emissions come from four different
            sectors: electricity, transport, industry and buildings and other
            energy uses.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.1">
          <h2 class="p mono" id="electricity">Electricity Sector</h2>
          <p>
            Emissions from electricity generation represent about one third
            and have been steadily increasing over the past decades.
            The main reason is the economic growth in developing countries,
            especially in India and China, where demand for electricity soars
            and leads to the construction of more and more coal-fired power plants.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.2">
          <h2 class="p mono" id="residential">Industry Sector</h2>
          <p>
            Industry is a complex sector that causes emissions either by
            combusting fossil fuels for heating or using them as feedstocks
            for industrial goods like cement or plastics. The main contributors
            to industry emissions are the energy-intensive production of steel
            and cement, both of which have experienced a strong growth over
            the past 30 years.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.3">
          <h2 class="p mono" id="industry">Transport Sector</h2>
          <p>
            Increasing road transport, aviation and shipping all contribute to
            global rise of transport emissions. Road transport includes small
            passenger cars as well as trucks and buses. Most of the transport
            activities are currently fueled by oil-based products. Decarbonization
            of transport will be a key future challenge.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.4">
          <h2 class="p mono" id="other">Building Sector</h2>
          <p>
            The building sector contributes emissions mainly from space heating
            with coal, gas or oil-based products. Emissions have remained constant
            over recent decades, decreasing the share of buildings emissions
            in total emissions. This was driven by improvements in energy
            efficiency and a gradual shift from coal to gas in space heating.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.5">
          <h2 class="p mono" id="transport">Other Energy</h2>
          <p>
            There are a number of energy-related processes that also cause
            emissions but are not part of the four main sectors. These are,
            for example, emissions from mining coal and natural gas or from
            the combustion of waste. We summarized them under the category
            of “other energy” and will not discuss them in detail here.
          </p>
        </IntersectionObserver>
      </div>
      </LayoutScrollytelling>
      <div class="noscroll electr-share">
        <h4>Chapter 2</h4>
        <h2>What are the main energy carriers for sectors?</h2>
        <p>
          Each sector uses a different mix of energy carriers.
          Electricity can be generated either by coal, gas, oil, renewables or
          nuclear. The buildings, transport and industry sectors use
          combustible fuels such as coal, gas, oil-based products
          or biomass but also electricity.
        </p>
     </div>
      <LayoutScrollytelling>
        <template v-slot:vis="{ width, height, step }">
          <div
            class="vis-inner"
            :style="{
              width: `${width}px`,
              height: `${height}px`
            }"
          >
            <!-- <EmissionsChart v-if="step <= 3.5" :step="step" :width="width" :height="height" /> -->
            <EnergyCarriers v-if="step >= 4 && step <= 11" :step="step" :width="width" :height="height" :hover="hover"/>
            <!-- <ElecTrends v-if="step >= 12 && step <= 13" :step="step" :width="width" :height="height" /> -->
          </div>
        </template>
        <div slot="text" class="observer">
        <IntersectionObserver :step="4" align="left">
          <p>
            All four sectors currently
            rely to a large extent on fossil fuels in the form of
            <span class="highlight"
            id="coal"
            @mouseover="hover = ['coal', '#8a8a93']"
            @mouseleave="hover = 'empty'"
            >coal</span>,
            <span class="highlight" id="gas"
            @mouseover="hover = ['gas', '#ed96ab']"
            @mouseleave="hover = 'empty'"
            >gas</span> and
            <span class="highlight" id="oil"
            @mouseover="hover = ['oil', '#fcb69f']"
            @mouseleave="hover = 'empty'">
            oil</span>.
            However, there are significant differences between the energy
            systems of different countries.
            Let us take a closer look at a few examples.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4.1" align="left">
          <h2 class="title" id="china">China Energy Production</h2>
          <p>
          China is the largest coal consumer in the world. As a rapidly growing
          economy, coal is used to meet increasing demand of electricity
          and industrial heat. Wind and solar power still make up a relatively
          small share of electricity generation but grow strongly and may
          replace coal in the future. As an economy in transition,
          there is still some traditional biomass used for residential heating.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4.2" align="left">
          <h2 class="title" id="china">USA Energy Production</h2>
          <p>
           In the United States, due to large reserves and low prices, natural
           gas is more present than in other countries. It makes up a
           significant share of the electricity generation, is used in industrial
           applications and in gas heating systems in buildings.
           There is a recently increasing share of wind and solar power generation
           that are, alongside nuclear power, the key low-carbon sources of the country.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4.3" align="left">
          <h2 class="title" id="china">Germany Energy Production</h2>
          <p>
            Although Germany has fostered and experienced a strong growth in
            renewables over the past years, its electricity generation is still
            dependent on coal for power generation and industrial applications.
            One of the reasons is that there are few gas power stations
            and nuclear power is phased-out, too. The buildings sector has a
            relatively low share of electricity since space cooling applications
            do not play a role (unlike in the US). As for the other countries,
            alternative fuels in the transport sector (biomass, electricity)
            are still in their infancy.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="5" align="right" class="height__change">
          <h2 class="title" id="country__perspectives">The status quo in different countries</h2>
          <p>
            Here, you can look at the energy mix across the four sectors in all
            countries. Some countries like Norway or Iceland have already
            transitioned to a renewable-based energy sector, while countries
            like Australia are still relatively dependent on coal.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="6" align="left">
          <h2 class="title" id="decarbonize__sectors">How do we decarbonize the sectors?</h2>
          <p>
            Across all sectors, fossil fuels need to be replaced by low-carbon
            energy. In the electricity sector, this can be done by increasing
            the share of
            <span class="highlight"
            id="renewables">wind, solar, hydro</span>
            and other renewable energy.
            There are two main strategies to decarbonize the industry, transport
            and buildings sector: electrification using low-carbon electricity
            or a switch to low-carbon alternatives like biofuels or renewable
            hydrogen. <br />Here, we will focus on electrification.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="7">
          <h2 class="title" id="electricity__first">The electricity sector has to go clean first.</h2>
          <p>
            The first step is thus to replace coal and gas in the electricity
            sector by renewable sources like wind, solar and bioenergy.
            <br />
            However we also need to double the clean electricity production for this sector.
            Second, using more low-carbon electricity in the buildings,
            industry and transport sector instead of fossil fuels reduces
            emissions in these sectors. This is the concept of electrification.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="8">
          <h2 class="title" id="industry__second">Industry Electrification.</h2>
          <p>
            Up to certain temperatures, heating applications in industry can be
            electrified by heat pumps and electric boilers. If the electricity
            comes from renewable sources, this could save substantial emissions.
            However, full electrification will not be possible in sectors
            like the cement or the chemical industry.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="9">
          <h2 class="title" id="transport__third">Electrifying Transports.</h2>
          <p>
            Transport can be electrified by switching to electric cars and trucks
            or by substituting aviation with electric rail transport. However,
            the shipping and aviation sectors themselves are both difficult
            to electrify such that there are also limits to full electrification.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="10">
          <h2 class="title" id="building__fourth">Electrifying Buildings.</h2>
          <p>
            Finally, the buildings sector can, in principle, be fully electrified.
            Space heating applications that run by gas or oil today could be
            switched to electric heat pumps.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="11">
          <h2 class="title" id="electrification">Decarbonization by electrification!</h2>
          <p>
            Transitioning from fossil to renewable electricity and electrifying
            the industry, transport and buildings sector is a promising strategy
            for decarbonization. However, to reach net-zero by midcentury,
            renewable electricity and electrification have to be scaled up
            very rapidly and simultaneously. To explore how this transition
            of the energy system could look like, we use models to generate
            different scenarios of future decarbonization pathways.
          </p>
        </IntersectionObserver>
        </div>
      </LayoutScrollytelling>
      <div class="noscroll electr-share">
        <h4>Chapter 3</h4>
        <h2>How fast can electrification cut emissions?</h2>
        <p>
          We cannot predict the future, but we can create different plausible
          scenarios of how a future decarbonization pathway could look like.
          Across our scenario, we vary key uncertain parameters and analyze
          how net-zero emissions can be reached. For example, we look at
          different electrification shares per sector and think about how the
          residual emissions can be erased by low-carbon alternatives.
        </p>
     </div>
      <LayoutScrollytelling>
        <template v-slot:vis="{ width, height, step }">
          <div
            class="vis-inner"
            :style="{
              width: `${width}px`,
              height: `${height}px`
            }"
          >
            <ElecTrends v-if="step >= 12 && step <= 13" :step="step" :width="width" :height="height" />
          </div>
        </template>
        <div slot="text" class="observer">
        <IntersectionObserver :step="13" align="right" class="height__change">
          <p>
            The selectors allows you to filter global electrification trends
            from the REMIND model across three scenarios:
            Business-as-usual, 2°C Stabilization, 1.5°C.
          </p>
        </IntersectionObserver>
      </div>
    </LayoutScrollytelling>
    <div class="noscroll" id="end">
      <h2 id="end-title">Electrification as part of a wider Mitigation Strategy</h2>
      <p class="final-par">
        Renewable expansion and electrification are promising strategies for a
        successful future decarbonization of the energy system. However,
        other measures like energy efficiency improvements, the switch to
        low-carbon fuels like biofuels or hydrogen and the deployment of negative
        emissions play a role in future decarbonization scenarios as well.
        To explore in more detail how the interplay of these strategies can
        bring us to net-zero emissions, you can use the
        <a href="https://dev.climatescenarios.org/global-pathway/">Mitigation Strategies Tool</a>.
      </p>
      <SensesMeta :id="'transition-path-1'" />
   </div>
  </div>
</template>

<script>
import SensesMenu from 'library/src/components/SensesMenu.vue'
import SensesMeta from 'library/src/components/SensesMeta.vue'

// Template Components
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'

// Visualization Components
import EmissionsChart from './components/EmissionsChart.vue'
import EnergyCarriers from './components/EnergyCarriers.vue'
import ElecTrends from './components/ElecTrendsN.vue'

export default {
  name: 'app',
  components: {
    LayoutScrollytelling,
    IntersectionObserver,
    EmissionsChart,
    EnergyCarriers,
    ElecTrends,
    SensesMenu,
    SensesMeta
  },
  data () {
    return {
      hover: 'empty'
    }
  }
}
</script>

<style lang="scss">
@import "library/src/style/base.scss";
@import "library/src/style/variables.scss";

h2 {
  hyphens: none;

  &.title {
    margin-bottom: 10px;
  }
}

.noscroll {
  padding-top: $spacing;
  margin: 20px auto;
  max-width: 900px;
  width: 100%;
  height: 550px;

  .title {
    border-top: 1px solid black;
    padding-top: $spacing * 2;
  }

  .subtitle {
    font-size: 20px;
    margin-bottom: $spacing * 2;
  }

  h4 {
    margin-top: 20px;
  }
}

.electr-share {
  border-top: 1px solid black;
  h2 {
    margin-bottom: 20px;
  }
}
.author__section {
  margin-bottom: $spacing;
}

.height__change {
  padding: 30vh 0 2000px !important;
}

.author {
  font-style: 12px;
  font-weight: bold;
  margin-right: 1em;
  color: $color-neon;
}

.t {
    font-size: 60px;
    margin-bottom: $spacing / 2;
  }

#app {
  width: 100vw;
}

.observer {
  pointer-events: none;
}

p {
  text-align: left;
  font-weight: lighter;
}

.vis-inner {
  margin-top: -$spacing * 2;
  color: getColor(gray, 10) !important;
}

.senses-tooltip-select {
  overflow-x: hidden;
  max-height: 400px;
  max-width: 300px;
}

#emissions {
  background: getColor(red, 100);
  color: $color-red;
}

#oil {
  background: getColor(orange, 100);
  color: $color-orange;
}

#coal {
  background: $color-light-gray;
  color: $color-black;
}

#gas {
  background: getColor(red, 80);
  color: getColor(red, 40);
}

#renewables {
  background: getColor(green, 80);
  color: getColor(green, 40);
}

#elect {
  background: getColor(yellow, 80);
  color: getColor(yellow, 40);
}

#ff {
  background: lighten(#1A1100, 35);
  color: #1A1100;
}

.back {
  margin: 0 auto;
  margin-top: 20%;
  margin-bottom: 20%;
  position: relative;
  width: 405px;
}

#toolkit {
  margin-left: 5px;
}

.final-par, #end-title {
    margin-bottom: $spacing;
}

.graph-title {
  font-size: 20px;
  font-weight: bold;
  hyphens: none;
}

#end {
  margin-top: 20%;
  margin-bottom: $spacing * 4;
  border-top: 1px solid black;
  height: 100%;
}
</style>
