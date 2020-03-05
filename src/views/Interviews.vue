<template>
    <div>
        <v-sheet
                class="d-flex"
                color="grey lighten-3"
                height="54"
                tile
        >
            <v-btn
                    @click="$refs.calendar.prev()"
                    class="ma-2"
                    icon
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-select
                    :items="types"
                    class="ma-2"
                    dense
                    hide-details
                    label="type"
                    outlined
                    v-model="type"
            ></v-select>
            <v-select
                    :items="modes"
                    class="ma-2"
                    dense
                    hide-details
                    label="event-overlap-mode"
                    outlined
                    v-model="mode"
            ></v-select>
            <v-select
                    :items="weekdays"
                    class="ma-2"
                    dense
                    hide-details
                    label="weekdays"
                    outlined
                    v-model="weekday"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn
                    @click="$refs.calendar.next()"
                    class="ma-2"
                    icon
            >
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-sheet>
        <v-sheet height="600">
            <v-calendar
                    :event-color="getEventColor"
                    :event-overlap-mode="mode"
                    :event-overlap-threshold="30"
                    :events="events"
                    :type="type"
                    :weekdays="weekday"
                    @change="getEvents"
                    ref="calendar"
                    v-model="value"
            ></v-calendar>
        </v-sheet>
    </div>
</template>
<script>
  export default {
    data: () => ({
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        {text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6]},
        {text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0]},
        {text: 'Mon - Fri', value: [1, 2, 3, 4, 5]},
        {text: 'Mon, Wed, Fri', value: [1, 3, 5]},
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    methods: {
      getEvents({start, end}) {
        const events = [];

        const min = new Date(`${start.date}T00:00:00`);
        const max = new Date(`${end.date}T23:59:59`);
        const days = (max.getTime() - min.getTime()) / 86400000;
        const eventCount = this.rnd(days, days + 20);

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0;
          const firstTimestamp = this.rnd(min.getTime(), max.getTime());
          const first = new Date(firstTimestamp - (firstTimestamp % 900000));
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
          const second = new Date(first.getTime() + secondTimestamp);

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: this.formatDate(first, !allDay),
            end: this.formatDate(second, !allDay),
            color: this.colors[this.rnd(0, this.colors.length - 1)],
          })
        }

        this.events = events
      },
      getEventColor(event) {
        return event.color
      },
      rnd(a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      formatDate(a, withTime) {
        return withTime
          ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
          : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
      },
    },
  }
</script>
