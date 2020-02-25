<template>
  <div id="app" ref="vis">
    <SensesMenu />
    <div class="noscroll">
      <h1 class="title" id="cover">Towards an Electric Future</h1>
        <h4 class="title">Relevant Concepts</h4>
        <p class="title mono">
          Net Zero,
          Electrification,
          Decarbonization Pathways,
          Policy,
          Mitigation Strategies,
          Fossil Fuels
        </p>
        <h4 class="title">What will you learn?</h4>
          <p class="title">
            In this module you will be able to break down historical emissions
            according to the sector that generate them. You will be introduced
            to the concept of Electrification and to the broad strategy to go
            Carbon Neutral by reducing emissions. In the last section you will
            be able to explore the compatibility of different scenarios with
            this decarbonization strategy.
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
            To stabilize global temperatures and stop global warming, net
            greenhouse gas emissions to the atmosphere have to be reduced to
            zero.
            <br /><span class="highlight" id="emissions">CO2 emissions</span> from the
              energy sector represent the lion share
            of global greenhouse gas emissions and have steadily increased over
            the past 30 years.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="1.1">
          <p>
            However, limiting global warming to 2°C above pre-industrial levels
            will require net-zero emissions by 2075.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="1.2">
          <p>A limit of 1.5°C will require carbon neutrality even by 2050.
          <br/>
          <br/>
          To learn more about global and regional decarbonization plans, see the
          <a href='https://dev.climatescenarios.org/stocktake/'>Global Stocktake module</a>.
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
            The emission from electricity generation represent about one third
            and have been steadily increasing over the past decades. The main
            reason is the economic growth in the developing countries,
            especially in India and China, where the demand for electricity
            soars and leads to the construction of more and more coal-fired
            power plants.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.2">
          <h2 class="p mono" id="transport">Other Energy</h2>
          <p>
            There are a number of energy-related processes that also cause
            emissions but are not part of the four main sectors. These are, for
            example, emissions from mining c oal and natural gas or from the
            combustion of waste. We summarized them under the category of “other
            energy” and will not discuss them in detail here.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.3">
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
        <IntersectionObserver :step="3.4">
          <h2 class="p mono" id="industry">Transport Sector</h2>
          <p>
            Increasing road transport, aviation and shipping all contribute to
            the globally rising transport emissions. Road transport includes
            small passenger cars as well as trucks and buses. Most of the
            transport activities are currently fueled by oil-based products and
            its decarbonization will be a key future challenge.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="3.5">
          <h2 class="p mono" id="other">Residential Sector</h2>
          <p>
            The residential sector mainly contributed emissions from space
            heating with coal, gas or oil-based products. The emissions have
            remained constant over recent decades, hence decreasing the share of
            residential emissions in total emissions. It was driven by
            increasing energy efficiency and a gradual shift from coal to gas in
            space heating.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4" align="left">
          <h2 class="title" id="sector__closeup">What are the main energy carriers for sectors?</h2>
          <p>
            Each sector uses a different mix of energy carriers such as coal,
            gas, oil, nuclear or renewables.
            All sectors currently use fossil fuels like
            <span class="highlight"
            id="coal"
            @mouseover="hover = ['coal', '#8a8a93']"
            @mouseleave="hover = 'empty'"
            >coal</span>,
            <span class="highlight" id="gas"
            @mouseover="hover = ['gas', '#ed96ab']"
            @mouseleave="hover = 'empty'"
            >gas</span>
            and <span class="highlight" id="oil"
            @mouseover="hover = ['oil', '#fcb69f']"
            @mouseleave="hover = 'empty'"
            >oil</span> to a large extent.
            To decarbonize the energy system, they have to be replaced by low-carbon
            alternatives like nuclear or renewables. In the next steps we will compare different
            countries and their energy productions to explain how and why decarbonization
            needs specific strategies to happen and how fast we need to implement them.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="4.1" align="left">
          <h2 class="title" id="china">China Energy Production</h2>
          <p>
          China energy production equals 129.79 EJ/yr in 2015. This is almost
          24% of the entire asian continent energy production. Here decarbonization
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
            countries showed above. However it makes the 2.50% of the entire Europe
            area emissions. As a further observation Germany electricity sector is still
            mainly relying on coal and renewables potential is far from being developed.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="5" align="right" class="height__change">
          <h2 class="title" id="country__perspectives">Country Perspectives</h2>
          <p>
            Depending on their energy resources and needs, different countries
            face different challenges of decarbonization. In tropical and
            subtropical countries, for example, space cooling plays a greater
            role, while space heating is relevant for higher latitudes. Hence,
            the global mitigation strategies need to be fine tuned on a
            country-level.
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
            and other renewable energy. There are two main strategies to decarbonize the industry,
            transport and residential sectors: electrification using
            <span class="highlight" id="elect">low-carbon electricity</span> or
            a switch to low-carbon alternatives like biofuels or renewable
            hydrogen.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="7">
          <h2 class="title" id="electricity__first">The electricity sector has to go clean first.</h2>
          <p>
            The first step is thus to replace coal and gas in the electricity
            sector by renewable sources like wind, solar and bioenergy.
            <br />
            However we also need to double the clean electricity production for this sector.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="8">
          <h2 class="title" id="industry__second">Industry Electrification.</h2>
          <p>
            In the industry sectors, a lot of applications that require heat can
            up to certain temperatures be electrified by heat pumps and electric
            boilers. If the electricity comes from renewable sources, this could
            save substantial emissions. However, full electrification will not
            be possible in sectors like the cement or the chemical industry.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="9">
          <h2 class="title" id="transport__third">Electrifying Transports.</h2>
          <p>
            Transport can be electrified, for example, by switching to electric
            cars and trucks or by replacing shipping or aviation by rail
            transport. The shipping and aviation sectors both are difficult to
            electrify such that there are also limits to full electrification.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="10">
          <h2 class="title" id="building__fourth">Electrifying Buildings.</h2>
          <p>
            Finally, there is also potential to electrify the residential
            sector, for example, by switching from gas heating to electric heat
            pumps for space heating.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="11">
          <h2 class="title" id="electrification">Decarbonization by electrification!</h2>
          <p>
            Switching from fossil to renewable electricity and electrifying the
            industry, transport and residential sector is a promising strategy
            for decarbonization. However, to reach net-zero by midcentury,
            renewable electricity and electrification have to be scaled up very
            rapidly and simultaneously. To explore how this transition of the
            energy system could look like, we use models to generate different
            scenarios of future decarbonization pathways.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="12">
          <h2 class="title" id="electrification">Clean energy will free us from pollution.</h2>
          <p>
            By using clean electricity we would be able to phase out all other
            energy carriers and their emissions.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="13" align="right">
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
      <p class="title">
        Electrification is part of a more extensive and complex strategy to decarbonize
        energy across sectors. Depending on how effective will be the policies implemented
        and on which geographical region we are looking at, Electrification could play
        a role in the future volume of emissions.
        To explore how electrification will play a role in a global decarbonization pathway,
        you can use the Global Pathway tool.
      </p>
      <p class="author__section">
        <span class="tiny uppercase mono">Content:</span> <span class="tiny author mono">Dr. Falko Ueckerdt, Felix Schreyer</span>
        <br /><span class="tiny uppercase mono">Design:</span> <span class="tiny author mono">Francesca Morini</span>
        <br /><span class="tiny uppercase mono">Code:</span> <span class="tiny author mono">Francesca Morini, Christopher Pietsch</span>
      </p>
      <h4 class="title">READ NEXT: </h4>
      <p class="title">
        <a href='#'>➔ Where is our electricity coming from? [Sector Transition II]</a>
        <br />
        <a href='https://dev.climatescenarios.org/stocktake/'>➔ Global Stocktake</a>
        <br />
        <a href='https://dev.climatescenarios.org/primary-energy-scenarios/#/walkthrough/0'>➔ Primary Energy</a>
      </p>
      <h4 class="title">ADDITIONAL SOURCES: </h4>
      There are no additional sources available for this module.
      <!-- <SensesDownload
      :selected="currentDownloadID"
      :ids="currentDownloadIDs"
      :title="currentDownloadTitle"
      :close="close" /> -->
      <div class='back'>
        <a class='button' href='https://sensesproject.github.io/policy-portal/'>Return to the Policy Portal</a>
        <a class='button' id="toolkit" href='https://dev.climatescenarios.org/toolkit/'>Return to the Toolkit</a>
      </div>
   </div>
  </div>
</template>

<script>
import SensesMenu from 'library/src/components/SensesMenu.vue'
// import SensesDownload from 'library/src/components/SensesDownload.vue'

// Template Components
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'

// Visualization Components
import EmissionsChart from './components/EmissionsChart.vue'
import EnergyCarriers from './components/EnergyCarriers.vue'
import ElecTrends from './components/ElecTrends.vue'

export default {
  name: 'app',
  components: {
    LayoutScrollytelling,
    IntersectionObserver,
    EmissionsChart,
    EnergyCarriers,
    ElecTrends,
    SensesMenu
    // SensesDownload
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

.default.center,
.default.right,
.default.left  {
  border: 1px solid black;
}

.noscroll {
  padding-top: $spacing;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
  height: 550px;
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

.title {
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
  font-family: $font-serif;
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

#cover {
  font-family: $font-serif;
}

#toolkit {
  margin-left: 5px;
}
#end {
  height: 70%;
  margin-top: 20%;
  margin-bottom: 20%;
  border-top: 1px solid black;
}
</style>
