<template>
  <UiCalendarView v-slot="{date}">
    <div v-for="(meetup, key) in getMeetups(date)" :key="key">
      <UiCalendarEvent tag="a" :href="`/meetups/${meetup.id}`">
        {{ meetup.title }}
      </UiCalendarEvent>
    </div>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getMeetups(date) {
      return this.meetups.filter(m => {
        const _date = new Date(new Date(m.date).toDateString()).valueOf()
        return date === _date
      })
    }
  }
};
</script>

<style scoped></style>
