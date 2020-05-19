<template>
  <div id="app" ref="vis">
    <SensesMenu :id="'transition-path-1'" :min-width="1024"/>
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
        </div>
      </template>
      <div slot="text" class="observer">
        <IntersectionObserver :step="1" align="right">
          <h2 class="title" id="net__zero">What is Net-Zero?</h2>
          <p>
            To stop climate change and stabilize global temperature,
            global CO2 emissions must be reduced to net-zero.<br /><br />
            Net-zero <span class="highlight" id="emissions">CO2 emissions</span>
            mean that all remaining CO2 emissions to the
            atmosphere would need to be balanced by removing CO2 from the atmosphere.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="1.1" align="right">
          <p>
            The time schedule for the energy transition is tight!
            The Paris Agreement demands stabilizing global warming at 1.5°C to
            2°C above preindustrial levels. Limiting global warming to 2°C
            levels will require net-zero CO2 emissions by 2070.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="1.2" align="right">
          <p>A limit of 1.5°C will require carbon neutrality even by 2050.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="2" align="right">
          <h2 class="title" id="increasing__emissions">Emission have been steadily increasing</h2>
          <p>
            Let us take a closer look at the past 30 years where emissions have
            been steadily increasing.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3" align="right">
          <h2 class="title" id="sector__emissions">
            Where do the current emissions come from?</h2>
          <p>
            The current energy-related CO2 emissions come from four different
            sectors: electricity, transport, industry and buildings and other
            energy uses.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.1" align="right">
          <h2 class="p mono" id="electricity">Electricity Sector</h2>
          <p>
            Emissions from electricity generation represent about one third
            and have been steadily increasing over the past decades.
            The main reason is the economic growth in developing countries,
            especially in India and China, where demand for electricity soars
            and leads to the construction of more and more coal-fired power plants.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.2" align="right">
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
        <IntersectionObserver :step="3.3" align="right">
          <h2 class="p mono" id="industry">Transport Sector</h2>
          <p>
            Increasing road transport, aviation and shipping all contribute to
            global rise of transport emissions. Road transport includes small
            passenger cars as well as trucks and buses. Most of the transport
            activities are currently fueled by oil-based products. Decarbonization
            of transport will be a key future challenge.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.4" align="right">
          <h2 class="p mono" id="other">Building Sector</h2>
          <p>
            The building sector contributes emissions mainly from space heating
            with coal, gas or oil-based products. Emissions have remained constant
            over recent decades, decreasing the share of buildings emissions
            in total emissions. This was driven by improvements in energy
            efficiency and a gradual shift from coal to gas in space heating.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.5" align="right">
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
      <div class="noscroll electr-share second-chart">
        <h4>Chapter 2</h4>
        <h2>What are the main energy carriers across sectors and what is the role of electricity?</h2>
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
            <transition name="component-fade" mode="out-in">
              <EnergyCarriers v-if="step >= 3 && step <= 12" :step="step" :width="width" :height="height"/>
            </transition>
          </div>
        </template>
        <div slot="text" class="observer">
          <IntersectionObserver :step="3" align="left">
            <p>
              Understanding the pathways to net zero, requires looking closer
              into the types of energy (energy carriers) consumed across sectors.
              This includes fossil fuels (coal, gas, oil) and potentially net-zero
              sources such as biomass. Electricity is a special energy carrier as
              it can be efficiently used across sectors, and generated at low
              costs without CO2 emissions (e.g. wind and solar power).
            </p>
          </IntersectionObserver>
        <IntersectionObserver :step="4" align="left">
          <p>Today, the final energy demand in industry, buildings and transport
            heavily relies on the direct use of fossil fuels, e.g.
            <span class="highlight" id="coal">coal</span>
            and <span class="highlight" id="gas">gas</span>
            for heat in buildings, process heat and feedstocks in industrial sectors,
            and <span class="highlight" id="oil">oil</span> for transport
            (road, maritime, and aviation).
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4.1" align="left">
          <p>
            The most prominent way of directly replacing fossil fuels in end-use
            sectors is making use of <span class="highlight" id="biomass"
            >biomass</span>. While the traditional use of biomass
            leads to negative impacts on human health and the environment;
            yet, more sustainable modern biomass technologies are increasingly
            deployed in many countries.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4.2" align="left">
          <p>
           <span class="highlight" id="elect">Electricity</span>
           is another important energy carrier used across sectors.
           Most electricity is generated and transported in centralized
           power grids.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4.3" align="left">
          <p>
            Generating electricity relies on combusting fossil fuels
            (e.g. in coal power plants), which leads to additional emissions.
            However, the energy transition is most advanced in the electricity
            supply sector. <br/>Wind and solar PV are the cheapest new source of
            electricity in many countries: <span class="highlight" id="WindSolHy"
            >Wind/Hydro/Solar</span>.<br/><br/>Other low-carbon
            electricity sources are <span class="highlight" id="nuclear">
              nuclear</span> and biomass electricity.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="5" class="height__change">
          <h2 class="title" id="country__perspectives">The status quo in different countries</h2>
          <p>
            By using the selector on the left, you can look at the energy mix
            across the four sectors in all
            countries. Some countries like Norway or Iceland have already
            transitioned to a renewable-based energy sector, while countries
            like Australia are still relatively dependent on coal.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="6" align="left">
          <h2 class="title" id="decarbonize__sectors">How do we decarbonize the sectors?</h2>
          <p>
            Across all sectors, fossil fuels need to be replaced by low-carbon energy sources.
            In the electricity supply sector, this is mainly done by increasing the share of
            wind and solar PV electricity generation. For the other sectors industry,
            transport and buildings, two main strategies are 1) electrification,
            i.e. directly using low-carbon electricity in e.g. battery electric
            cars or heat pumps or 2) switching to low-carbon alternatives like
            biofuels or renewable hydrogen. Here, we will focus on
            <span class="highlight" id="elect">electrification</span>.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="7" align="left">
          <h2 class="title" id="electricity__first">The electricity sector leads the way.</h2>
          <p>
            In many countries, the electricity sector is in the middle of a
            transition towards very high shares of wind and solar PV generation,
            which increasingly replace coal and gas.
            With wind and solar PV having become cheap energy sources,
            reducing CO2 emissions in electricity can be achieved at low costs.
            The bigger challenge is replacing fossil fuels in industry, transport
            and buildings.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="7.1" align="left">
          <p>
            In each energy demand sector there are several technologies that can
            utilize cheap and low-carbon electricity. The electricity sector is
            becoming the backbone of the energy transition across sectors
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="8" align="left">
          <h2 class="title" id="industry__second">Electrifying Industry.</h2>
          <p>
            Industrial heat demands can be almost fully electrified with available
            technologies such as heat pumps, electric boilers and electric furnaces
            (Cite Silvia’s paper in the footnote). Other options are needed to
            replace fossil feedstock demands in the chemical industry
            (e.g. hydrogen-based synthetic fuels) and process emissions in cement
            manufacturing (e.g. carbon capture and storage, CCS).
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="9" align="left">
          <h2 class="title" id="transport__third">Electrifying Transports.</h2>
          <p>
            The energy demand for transportation can be electrified by switching
            to electric cars, more rail transport and electric trucks
            (overhead cables). However, the shipping and aviation sectors are
            difficult to electrify such that there are limits to electrification
            and need for alternatives (e.g. biofuels and hydrogen-based synthetic fuels).
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="10" align="left">
          <h2 class="title" id="building__fourth">Electrifying Buildings.</h2>
          <p>
            Energy demand for space heating, cooking and hot water in buildings
            can be fully electrified at low costs and based on today’s technologies
            (electric boilers, electric cookers, electric heating systems and
            heat pumps). Complementing options are biofuels and (high-cost)
            synthetic fuels.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="12" align="left">
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
            <ElecTrends v-if="step >= 12 && step <= 15" :step="step" :width="width" :height="height" />
          </div>
        </template>
        <div slot="text" class="observer">
        <IntersectionObserver :step="13" align="right">
          <p>
            The selectors allows you to filter global electrification trends
            from the REMIND model across three scenarios:
            Business-as-usual, 2°C Stabilization, 1.5°C.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="14" align="right">
          <p>
            In a Business-as-usual scenario, no mitigation strategies will be
            implemented in the short term, therefore emissions will skyrocket across
            all sectors - almost doubling.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="15" align="right" class="height__change">
          <p>
            In a 2°C scenario, the electricity sector rapidly transforms to low-carbon energy.
            In the buildings, industry and transport sector this low-carbon electricity increasingly
            replaces fossil fuels. In addition to electrification, energy efficiency gains as well
            as the use of biofuels and hydrogen contribute to decarbonization.
            Some CO2 emissions remain in each of the sectors as this scenario assumes that negative
            emission technologies can be used to reach net-zero CO2 around 2070.
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
        <a href="https://dev.climatescenarios.org/" class="coming-soon">Mitigation Strategies Tool</a>.
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

.second-chart {
  height: 250px;
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

.vis-inner {
  margin-top: -$spacing * 2;
  color: getColor(gray, 10) !important;
}

.senses-tooltip-select {
  overflow-x: hidden;
  max-height: 400px;
  max-width: 300px;
}

p {
  text-align: left;
  font-weight: lighter;

  #emissions {
    background: getColor(red, 100);
    color: $color-red;
  }

  #oil {
    background: #75757a;
    color: lighten(#75757a, 50);
  }

  #coal {
    background: #4a4a4a;
    color: lighten(#4a4a4a, 50);
  }

  #gas {
    background: #9898a1;
    color: lighten(#9898a1, 50);
  }

  #elect {
    background: getColor(yellow, 80);
    color: getColor(yellow, 40);
  }

  #biomass {
    background: #618879;
    color: lighten(#618879, 40);
  }

  #nuclear {
    background: #0c514a;
    color: lighten(#0c514a, 30);
  }

  #WindSolHy {
    background: #acc3ac;
    color: darken(#acc3ac, 40);
  }

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

.coming-soon:hover {
  color: gray;
  text-underline: none;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
