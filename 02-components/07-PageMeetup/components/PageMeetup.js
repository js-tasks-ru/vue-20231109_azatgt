import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js'

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },

  props: {
    meetupId: { type: Number, required: true }
  },

  data() {
    return {
      meetup: null,
      error: null
    }
  },

  watch: {
    meetupId(newValue, oldValue) {
      this.meetup = null
      this.error = null
      this.fetch(newValue)      
    }
  },
  methods: {
    fetch(id) {
      fetchMeetupById(id)
        .then((data) => this.meetup = data)
        .catch((err) => this.error = err.message)
    }
  },
  mounted() {
    this.fetch(this.meetupId)
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup"/>

      <UiContainer v-else-if="!error">
        <UiAlert text="Загрузка..."/>
      </UiContainer>

      <UiContainer v-else>
        <UiAlert :text="error"/>
      </UiContainer>
    </div>`,
});
