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
                  solo
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
                  solo
                  v-model="participants"
                  @input="debounceGetRooms"
                  prepend-icon="group"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container fluid>
            <v-checkbox v-model="checkboxTv" @change="debounceGetRooms" color="indigo" label="TV"></v-checkbox>
            <v-checkbox
              v-model="checkboxRp"
              @change="debounceGetRooms"
              color="indigo"
              label="Retro Projecteur"
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
      checkboxTv: false,
      checkboxRp: false,
      rooms: [],
      participants: ""
    };
  },
  methods: {
    debounceGetRooms: _.debounce(async function() {
      const response = await Vue.axios.get("http://localhost:3000/rooms", {
        params: {
          participants: this.participants,
          tv: this.checkboxTv ? "TV" : "",
          rp: this.checkboxRp ? "Retro Projecteur" : ""
        }
      });
      this.rooms = response.data;
    }, 400)
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
.theme--light.v-icon {
  color: rgba(39, 100, 183, 0.78) !important;
}
input.display-time {
  background-color: white !important;
}
.vue__time-picker input.display-time {
  /* border: 1px solid #d2d2d2; */
  width: 10em;
  height: 2.2em;
  padding: 0.3em 0.5em;
  font-size: 1em;
}
input.display-time {
  background-color: aqua;
}
</style>