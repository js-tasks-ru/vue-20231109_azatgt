<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" @click="previous" aria-label="Previous month"/>
        <div class="calendar-view__date">{{ title }}</div>
        <button class="calendar-view__control-right" type="button" @click="next" aria-label="Next month"/>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div v-for="(item, index) in calendar" :key="index" tabindex="0"
           class="calendar-view__cell" :class="{'calendar-view__cell_inactive': item.inactive}">
        <div class="calendar-view__cell-day">{{ item.day }}</div>
        <div class="calendar-view__cell-content">
          <slot :date="item.date"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiCalendarView',

  data() {
    const today = new Date()
    return {
      firstDay: new Date(today.getFullYear(), today.getMonth(), 1)
    }
  },

  methods: {
    previous() {
      const d = this.firstDay
      this.firstDay = new Date(d.setMonth(d.getMonth() - 1))
    },
    next() {
      const d = this.firstDay
      this.firstDay = new Date(d.setMonth(d.getMonth() + 1))
    }
  },

  computed: {
    calendar() {
      let day = new Date(this.firstDay)
      let lDay = new Date(day.getFullYear(), day.getMonth() + 1, 0)
      const calendar = []

      while(day.getDay() !== 1) {
        day.setDate(day.getDate() - 1)
        calendar.push({ day: day.getDate(), date: day.valueOf(), inactive: true })
      }
      calendar.reverse()

      day = new Date(this.firstDay)
      while(day <= lDay) {
        calendar.push({ day: day.getDate(), date: day.valueOf(), inactive: false })
        day.setDate(day.getDate() + 1)
      }

      while(lDay.getDay() !== 0) {
        lDay.setDate(lDay.getDate() + 1)
        calendar.push({ day: lDay.getDate(), date: lDay.valueOf(), inactive: true })
      }

      return calendar
    },

    title() {
      return this.firstDay.toLocaleDateString(
        navigator.language, 
        { month: 'long', year: 'numeric' }
      )
    }
  }
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
