<template>
  <div id="app" ref="vis">
    <SensesMenu />
    <div class="noscroll">
      <h1 class="t" id="cover">Towards an Electric Future</h1>
      <h1 class="subtitle">A guide to clean electricity production and sectors electrification</h1>
        <h4 class="title">Relevant Concepts</h4>
        <p class="mono">
          Net Zero,
          Electrification,
          Decarbonization Pathways,
          Policy,
          Mitigation Strategies,
          Fossil Fuels
        </p>
        <h4>What will you learn?</h4>
          <p>
            In this module, you will learn about the sources of CO2 emissions in
            the energy sector and how we can abate those emissions in the future
            by a transition towards renewable energy and electrification.
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
          <EnergyCarriers v-if="step >= 4 && step <= 11" :step="step" :width="width" :height="height" :hover="hover"/>
          <ElecTrends v-if="step >= 12 && step <= 13" :step="step" :width="width" :height="height" />
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
            The time schedule for the energy transition is tight.
            Limiting global warming to 2°C above preindustrial levels will
            require net-zero CO2 emissions by 2070.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="1.2">
          <p>A limit of 1.5°C will require carbon neutrality even by 2050.
          <br/>
          <br/>
          (To learn more about global and regional decarbonization plans, see the
          <a href='https://dev.climatescenarios.org/stocktake/'>Global Stocktake module</a>.)
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
            Emissions from electricity generation represent about one third and
            have been steadily increasing over the past decades. The main reason
            is the economic growth in developing countries, especially in India
            and China, where demand for electricity soars and leads to the
            construction of more and more coal-fired power plants.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.2">
          <h2 class="p mono" id="residential">Industry Sector</h2>
          <p>
            Industry is a complex sector that causes emissions either by
            combusting fossil fuels for heating or using them as feedstocks for
            industrial goods like cement or plastics. The main contributors to
            industry emissions are the energy-intensive production of steel and
            cement, both of which have experienced a strong growth over the past
            30 years.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.3">
          <h2 class="p mono" id="industry">Transport Sector</h2>
          <p>
            Increasing road transport, aviation and shipping all contribute to
            global rise of transport emissions. Road transport includes small
            passenger cars as well as trucks and buses. Most of the transport
            activities are currently fueled by oil-based products.
            Decarbonization of transport will be a key future challenge.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.4">
          <h2 class="p mono" id="other">Residential Sector</h2>
          <p>
            The building sector contributes emissions mainly from space heating
            with coal, gas or oil-based products. Emissions have remained
            constant over recent decades, decreasing the share of buildings
            emissions in total emissions. This was driven by improvements in
            energy efficiency and a gradual shift from coal to gas in space
            heating.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.5">
          <h2 class="p mono" id="transport">Other Energy</h2>
          <p>
            There are a number of energy-related processes that also cause
            emissions but are not part of the four main sectors. These are,
            for example, emissions from mining coal and natural gas or from
            the combustion of waste. We summarized them under the category of
            “other energy” and will not discuss them in detail here.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4" align="left">
          <h2 class="title" id="sector__closeup">What are the main energy carriers for sectors?</h2>
          <p>
            Each sector uses a different mix of energy carriers.
            Electricity can be generated either by coal, gas, oil, renewables
            or nuclear. The buildings, transport and industry sectors combust
            fuels like
            <span class="highlight"
            id="coal"
            @mouseover="hover = ['coal', '#8a8a93']"
            @mouseleave="hover = 'empty'"
            >coal</span>,
            <span class="highlight" id="gas"
            @mouseover="hover = ['gas', '#ed96ab']"
            @mouseleave="hover = 'empty'"
            >gas</span>,
            <span class="highlight" id="oil"
            @mouseover="hover = ['oil', '#fcb69f']"
            @mouseleave="hover = 'empty'"
            >oil-based</span> products or biomass but also use
            electricity to run their applications. All four sectors currently
            use fossil fuels like coal, gas and oil to a large extent. However,
            there are significant differences between the energy systems of
            different countries. Let us take a closer look at a few examples.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4.1" align="left">
          <h2 class="title" id="china">China Energy Production</h2>
          <p>
          China energy production equals 129.79 EJ/yr in 2015. This is almost
          24% the global energy production. Here decarbonization
          is particularly difficult due to the high share of coal used in
          electricity and industrial sectors. Mitigation strategies will have to be
          drastic and quick in order to cut China's dependency on fossil fuels.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4.2" align="left">
          <h2 class="title" id="china">USA Energy Production</h2>
          <p>
           The United States is a big developed western society, its energy production
           makes up for 97.35 EJ/yr and again is heavily relying on fossil fuels.
           However wind, solar and in general non bio renewables share an encouraging
           slice of the produced energy, especially for the residential sector.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4.3" align="left">
          <h2 class="title" id="china">Germany Energy Production</h2>
          <p>
            Germany has a relatively small energy production compared to the other
            countries showed above. However it makes the 2.50% of the global energy production.
            As a further observation Germany electricity sector is still
            mainly relying on coal and renewables potential is far from being developed.
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
            the industry, transport and buildlings sector is a promising strategy
            for decarbonization. However, to reach net-zero by midcentury,
            renewable electricity and electrification have to be scaled up very
            rapidly and simultaneously. To explore how this transition of the
            energy system could look like, we use models to generate different
            scenarios of future decarbonization pathways.
          </p>
        </IntersectionObserver>
        <!-- <IntersectionObserver :step="12">
          <h2 class="title" id="electrification">Clean energy will free us from pollution.</h2>
          <p>
            We cannot predict the future, but we can create different plausible
            scenarios of how a future decarbonization pathway could look like.
            Here, you can see renewable expansion, electrification and emissions
            reduction across the sectors in global 1.5°C or 2°C transformation
            pathways. In our modeling work, we typically look at many scenarios
            and vary key uncertain parameters to examine what are the most viable
            and cost-efficient strategies to reduce emissions. A crucial question,
            for example, is how fast renewables can be scaled-up and how much
            electrification can contribute to the required transformation.
          </p>
        </IntersectionObserver> -->
        <IntersectionObserver :step="13" align="right" class="height__change">
          <h2
            class="title"
            id="electrification__scenarios"
          >How fast can electrification cut emissions?</h2>
          <p>
            We cannot predict the future, but we can create different plausible
            scenarios of how a future decarbonization pathway could look like.
            Across our scenario, we vary key uncertain parameters and analyze
            how net-zero emissions can be reached. For example, we look at
            different electrification shares per sector and think about how the
            residual emissions can be erased by low-carbon alternatives.
          </p>
        </IntersectionObserver>
      </div>
    </LayoutScrollytelling>
    <div class="noscroll" id="end">
      <h2 id="end-title">Electrification as part of a wider Mitigation Strategy</h2>
      <p class="final-par">
        Renewable expansion and electrification are promising strategies for a
        successful future decarbonization of the energy system.
        However, other measures like energy efficiency improvements, the switch
        to low-carbon fuels like biofuels or hydrogen and the deployment of
        negative emissions play a role in future decarbonization scenarios as well.
        To explore in more detail how the interplay of these strategies can bring
        us to net-zero emissions, you can use the Global Pathway Tool.
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
  font-family: $font-mono !important;
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

#end {
  margin-top: 20%;
  margin-bottom: $spacing * 4;
  border-top: 1px solid black;
}
</style>
