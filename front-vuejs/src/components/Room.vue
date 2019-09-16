<template>
  <v-card class="containerCard">
    <v-img
      class="white--text"
      height="150px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="align-end fill-height">{{roomData.name}}</v-card-title>
      <div class="equipements">
        <v-chip v-for="equipement in roomData.equipements" :key="equipement.name">
          <v-avatar left>
            <v-icon>mdi-checkbox-marked-circle</v-icon>
          </v-avatar>
          {{equipement.name}}
        </v-chip>
      </div>
    </v-img>

    <v-card-text>
      <span>Capacité : {{roomData.capacity}} pers</span>
    </v-card-text>

    <v-card-actions>
      <!-- on click send reservation  -->
      <v-btn text @click="bookARoom" color="#2764b7">Réserver cette salle !</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";

export default {
  name: "Room",
  props: ["roomData", "date", "startTime", "endTime", "participants"],
  methods: {
    async bookARoom() {
      console.log(this.participants);
      const startTime = this.formatTime(this.startTime);
      const endTime = this.formatTime(this.endTime);
      const response = await Vue.axios.post(
        "http://localhost:3000/reservations",
        {
          params: {
            reservationDate: this.date,
            reservationStartTime: startTime,
            reservationEndTime: endTime,
            nbrPersons: this.participants,
            roomId: this.roomData._id
          }
        }
      );
      console.log(response);
    },
    formatTime(time) {
      return this.date + "T" + time.HH + ":" + time.mm + "Z";
    }
  }
};
</script>

<style>
.v-card {
  max-width: 240px !important;
  margin-top: 17px;
  max-height: 237px;
  margin-left: 12px;
}
.v-card__text {
  display: flex;
  justify-content: center;
  padding-bottom: 0px !important;
}
.equipements {
  margin-top: 3em;
  display: flex;
  margin-right: 0.5em;
  justify-content: flex-end;
}
.fill-height {
  height: 42% !important;
}
.theme--light.v-chip:not(.v-chip--active) {
  background: #0000006b !important;
  color: white;
}
.v-card__title {
  justify-content: center !important;
}
.theme--light.v-icon {
  color: rgba(255, 255, 255, 0.68) !important;
}
.v-card__actions {
  display: flex;
  justify-content: center;
}
</style>