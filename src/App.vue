<template>
  <div id="app" ref="vis">
    <SensesMenu :id="'transition-path-1'" :min-width="800"/>
    <div class="noscroll introduction">
      <h1 class="t" id="cover">Towards an Electric Future</h1>
      <h1 class="subtitle">CO<span class="subscript">2</span>
        emissions and energy carriers across sectors and countries</h1>
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
            In this module, you will learn about the sources of CO<span class="subscript">2</span>
            emissions across sectors of the energy system and how we can abate those
            emissions in the future by a transition towards renewable energy
            and electrification.
          </p>
          <div class="scroll-invitation">
            <div class="icon-menus">
              <span class="glyph-emissions"/>
              <span class="glyph-power"/>
              <span class="glyph-world"/>
            </div>
            <h4>Scroll down to start your reading</h4>
          </div>
        </div>
        <div class="noscroll current-emissions">
          <div class="gridder">
            <div class="row">
              <span class="glyph-emissions"/>
            </div>
            <div class="row">
              <h4>Chapter 1</h4>
              <h2>Current and future energy-related CO<span class="subscript">2</span>
                emissions</h2>
            </div>
          </div>
          <p>
            CO<span class="subscript">2</span> emissions from the energy system have been steadily increasing
            in the past decades. We dive into CO<span class="subscript">2</span>
            emissions from the different energy sectors and show what is
            needed for stabilizing the climate: Net Zero.
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
          <h2 class="title" id="net__zero">What is Net Zero?</h2>
          <p>
            To stop climate change and stabilize global mean temperature,
            CO<span class="subscript">2</span> emissions must be reduced to net-zero.<br /><br />
            Net-zero CO<span class="subscript">2</span> emissions means reducing fossil <span class="highlight" id="emissions">CO<span class="subscript">2</span> emissions</span> towards
            zero (and potentially compensating remaining fossil CO<span class="subscript">2</span> emissions
            by removing CO<span class="subscript">2</span> from the atmosphere). Net-zero is also called
            <strong>carbon neutrality.</strong>
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="1.1" align="right">
          <p>
            The time schedule for the energy transition is tight!
            The Paris Agreement demands limiting global warming to 1.5°C to 2°C
            above pre-industrial levels.
            <strong>Limiting global warming to 2°C levels will require net-zero
            CO<span class="subscript">2</span> emissions by 2070.</strong>
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="1.2" align="right">
          <p>A limit of 1.5°C will require carbon neutrality even by 2050.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="2" align="right">
          <p>
            Let us take a closer look at the past 30 years where emissions have
            been steadily increasing.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3" align="right">
          <h2 class="title" id="sector__emissions">
            Where do the current emissions come from?</h2>
          <p>
            The current energy-related CO<span class="subscript">2</span> emissions come from four different
            sectors: electricity, transport, industry and buildings and other
            energy uses. Please note that the electricity sector <strong>supplies</strong>
            electricity to the demand sectors (transport, industry and buildings).
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.1" align="right">
          <h2 class="title">Electricity Sector (Supply)</h2>
          <p>
            Emissions from electricity generation represent about one third and
            have been steadily increasing over the past decades. The main
            contribution of current growth are new coal-power plants in developing
            countries and emerging economies.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.2" align="right">
          <h2 class="title">Industry Sector</h2>
          <p>
            The industry sector comprises a range of sub-sectors such as the
            energy-intensive production of steel, cement or chemicals.
            CO<span class="subscript">2</span> emissions are mainly caused by combusting fossil fuels for
            industrial heat (combustion) or by chemical reactions in industrial
            processes (process emissions).
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.3" align="right">
          <h2 class="title">Transport Sector</h2>
          <p>
            Increasing road transport, aviation and shipping all contribute to
            a global rise of transport emissions. Ground transportation includes
            passenger cars, trucks and buses as well as trains (freight and passenger).
            Most of the transport activities are currently based on oil-based fuels.
            Decarbonization of transport is a key challenge.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.4" align="right">
          <h2 class="title">Building Sector</h2>
          <p>
            The building sector contributes emissions mainly from space heating
            with coal, gas or oil-based fuels as well as from cooking and heating
            water. Emissions have remained constant over recent decades,
            such that the share of buildings emissions in total emissions decreases.
            This was driven by improvements in energy efficiency and a gradual
            shift from coal to gas in space heating.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.5" align="right">
          <h2 class="title">Other Energy</h2>
          <p>
            There are a number of energy-related processes that also cause
            emissions but are not part of the four main sectors. These are,
            for example, emissions from mining coal and natural gas, refineries
            or from district heating. We summarized them into “other energy”
            and will not discuss them in detail here.
          </p>
        </IntersectionObserver>
      </div>
      </LayoutScrollytelling>
      <div class="noscroll electr-share">
        <div class="gridder">
          <div class="row">
            <span class="glyph-power"/>
          </div>
          <div class="row">
            <h4>Chapter 2</h4>
            <h2>Main energy carriers and the role of electricity</h2>
          </div>
        </div>
        <p>
          Understanding the pathways to net zero requires looking closer into
          the types of energy (energy carriers) consumed across sectors.
          This includes fossil fuels (coal, gas, oil) and potentially net-zero
          sources such as biomass. Electricity is a special energy carrier as
          it can be efficiently used across sectors, and generated at low costs
          without CO<span class="subscript">2</span> emissions (e.g. wind and solar power).
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
            <transition name="component-fade" mode="out-in">
              <EnergyCarriers v-if="step >= 3 && step <= 12" :step="step" :width="width" :height="height"/>
            </transition>
          </div>
        </template>
        <div slot="text" class="observer">
          <IntersectionObserver :step="3" align="left">
            <p>
              The height of the bars indicate the relative share of energy
              consumption across sectors, while types of energy are shown along
              the horizontal axis.
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
            >biomass</span>. While the traditional use of biomass can lead to negative
            impacts on human health,
            more sustainable modern biomass technologies are increasingly
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
            Generating electricity currently relies on combusting fossil fuels
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
            By using the selector, you can look at the energy mix across the four
            sectors in all countries. Some countries have transitioned to a
            renewable-based energy system, while other countries are still
            dependent on coal.
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
            reducing CO<span class="subscript">2</span> emissions in electricity can be achieved at low costs.
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
            technologies such as heat pumps, electric boilers and electric furnaces.
            Other options are needed to replace fossil feedstock demands in the
            chemical industry (e.g. hydrogen-based synthetic fuels) and process
            emissions in cement manufacturing (e.g. carbon capture and storage, CCS).
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
      <div class="noscroll trends-chart">
        <div class="gridder">
          <div class="row">
            <span class="glyph-world"/>
          </div>
          <div class="row">
            <h4>Chapter 3</h4>
            <h2>How fast can electrification cut emissions?</h2>
          </div>
        </div>
        <p>
          We cannot predict the future, but we can calculate a range of plausible
          scenarios of limiting warming to 1.5°C or 2°C and compare them with
          scenarios with less climate protection ambition (e.g. a business-as-usual scenario, BAU).
          Here we focus on sectoral CO<span class="subscript">2</span> emissions and electrification rates.
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
            The selectors allows you to filter global electrification scenarios
            from the REMIND model:
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
            Some CO<span class="subscript">2</span> emissions remain in each of the sectors as this scenario assumes that negative
            emission technologies can be used to reach net-zero CO<span class="subscript">2</span> around 2070.
          </p>
        </IntersectionObserver>
      </div>
    </LayoutScrollytelling>
    <div class="noscroll end">
      <div class="gridder">
        <div class="row">
          <span class="glyph-policies"/>
        </div>
        <div class="row">
          <h4>Conclusion</h4>
          <h2>Electrification as part of a wider Mitigation Strategy</h2>
        </div>
      </div>
      <p class="final-par">
        Renewable expansion and electrification are promising strategies for a
        successful future decarbonization of the energy system. However,
        other measures like energy efficiency improvements, the switch to
        low-carbon fuels like biofuels or hydrogen and the deployment of negative
        emissions play a role in future decarbonization scenarios as well.
      </p>
   </div>
   <div class="meta">
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

.subscript {
  vertical-align: bottom;
  font-size: 10px;
}

.noscroll {
  padding-top: $spacing;
  margin: 20px auto;
  max-width: 900px;
  width: 100%;
  height: 550px;

  &.introduction {
    padding-top: $spacing / 2;
    height: 650px;

    .scroll-invitation {
      width: 30%;
      margin: 5em auto;
      text-align: center;

      .icon-menus {
        span {
          font-size: 3em;
          &.glyph-emissions {
            color: $color-red;
          }
          &.glyph-power {
            color: $color-yellow;
          }
          &.glyph-world {
            color: $color-neon;
          }
        }
      }
    }
  }

  .t {
      font-size: 60px;
      margin-bottom: $spacing / 2;
    }

  h2 {
    hyphens: none;
  }

  h4 {
    margin-top: 20px;
  }

  .title {
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 20px;
    margin-bottom: $spacing * 2;
  }

  &.current-emissions {
    border-top: 1px solid black;
    height: 250px;

    .gridder {
      display: inline-flex;

      .glyph-emissions {
        font-size: 4em;
        color: $color-red;
      }

    }
  }

  &.electr-share {
    height: 350px;
    border-top: 1px solid black;
    h2 {
      margin-bottom: 20px;
    }
    .gridder {
      display: inline-flex;

      .glyph-power {
        font-size: 4em;
        color: $color-yellow;
      }

    }
  }

  &.trends-chart {
    height: 350px;
    border-top: 1px solid black;
    h2 {
      margin-bottom: 20px;
    }
    .gridder {
      display: inline-flex;

      .glyph-world {
        font-size: 4em;
        color: $color-neon;
      }

    }
  }

  &.end {
    height: 150px;
    margin-top: 20%;
    margin-bottom: $spacing * 4;
    border-top: 1px solid black;

    .final-par, #end-title {
        margin-bottom: $spacing;
    }
    .gridder {
      display: inline-flex;

      .glyph-policies {
        font-size: 4em;
        color: $color-green;
      }

    }
  }

}

.meta {
  max-width: 1200px;
  margin: 20px auto;
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
      background: #347474;
      color: lighten(#347474, 40);
    }

    #WindSolHy {
      background: #acc3ac;
      color: darken(#acc3ac, 40);
    }

  }

.layout-scrollytelling {

  .graph-title {
    font-size: 20px;
    font-weight: bold;
    hyphens: none;
  }

  .vis-inner {
    margin-top: -$spacing * 2;
  }

  .height__change {
    padding: 30vh 0 200vh !important;
  }
}

.senses-tooltip-select {
  overflow-y: auto;
  max-height: 400px;
  max-width: 300px;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 1024px) {
  .noscroll {
    max-width: 800px;
    padding: 0 20px;
    margin-top: 50px;
    &.introduction {
      height: 100vh;

      .scroll-invitation {
        width: 50%;
        padding: 10% auto;
        text-align: center;
      }
    }

    &.electr-share {
      height: 500px;
    }
  }

  .layout-scrollytelling {
    width: 90%;
  }
}
</style>
