<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Stationf</span>
        <span class="font-weight-light">BOOK A ROOM</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text href="http://localhost:8080/" target="_blank">
        <span class="mr-2">Reload now</span>
      </v-btn>
    </v-app-bar>
    <v-container grid-list-xl>
      <v-layout row>
        <div class="options">
          <DatePicker />
          <v-container>
            <v-row>
              <v-col cols="12" lg="12">
                <div class="label">From ?</div>
                <v-icon>watch</v-icon>
                <vue-timepicker
                  :hour-range="[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]"
                  :minute-interval="10"
                ></vue-timepicker>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12">
                <div class="label">To ?</div>
                <v-icon>watch</v-icon>
                <vue-timepicker
                  :hour-range="[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]"
                  :minute-interval="10"
                ></vue-timepicker>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12">
                <v-text-field
                  label="Participants ?"
                  type="number"
                  min="1"
                  v-model="participants"
                  @input="debounceParticipants"
                  prepend-icon="group"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container fluid>
            <v-checkbox v-model="checkbox1" color="indigo" :label="`TV: ${checkbox1.toString()}`"></v-checkbox>
            <v-checkbox
              v-model="checkbox2"
              color="indigo"
              :label="`Retro Projecteur: ${checkbox2.toString()}`"
            ></v-checkbox>
          </v-container>
        </div>
        <ListRooms :rooms="rooms" />
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import Vue from "vue";
import ListRooms from "./components/ListRooms";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import DatePicker from "./components/DatePicker";
import TimePicker from "./components/TimePicker";
import _ from "lodash";

export default {
  name: "App",
  components: {
    ListRooms,
    VueTimepicker,
    TimePicker,
    DatePicker
  },
  data() {
    return {
      checkbox1: true,
      checkbox2: false,
      rooms: [],
      participants: ""
    };
  },
  methods: {
    debounceParticipants: _.debounce(function(value) {
      if (value) {
        Vue.axios
          .get("http://localhost:3000/rooms", {
            params: {
              participants: value
            }
          })
          .then(response => {
            console.log(response.data);
            this.rooms = response.data;
          });
      }
    }, 800)
  },
  mounted() {
    Vue.axios.get("http://localhost:3000/rooms").then(response => {
      console.log(response.data);
      this.rooms = response.data;
    });
  }
};
</script>
<style scoped>
.container.grid-list-xl .layout:only-child {
  margin: -12px;
  display: -webkit-inline-box;
}
.container.grid-list-xl {
  padding-top: 5em;
  margin-left: 0px;
  padding-right: 3% !important;
}
.options {
  width: 223px;
  background-color: #21212124;
}
.label {
  font-size: 12px;
  color: #646464;
  margin-left: 30px;
  margin-bottom: 4px;
  margin-top: 10px;
}
</style>