<template>
<SensesSelect />
</template>

<script>
import { mapState } from 'vuex'

// data
// Components
import SensesSelect from 'library/src/components/SensesSelect.vue'

export default {
  name: 'CountrySelector',
  components: {
    SensesSelect
  },
  data () {
    return{
      options: [
        {
          'label': 'Option 1',
          'value': 1
        },
        {
          'label': 'Option 2',
          'value': 2
        },
        {
          'label': 'Option 3',
          'value': 3
        }
      ] }
  },
  computed: {
    ...mapState({
      step: state => (state.scrollytelling ? state.scrollytelling.step : null)
    })
  }
}
</script>
