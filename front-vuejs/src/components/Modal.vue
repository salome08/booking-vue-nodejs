<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn text @click="bookHandler" color="#2764b7" dark v-on="on">Réserver cette salle !</v-btn>
      </template>
      <v-card>
        <v-card-title
          v-bind:class="[validBooking ? 'successBook' : '', 'errorBook']"
          primary-title
        >Info</v-card-title>
        <v-card-text class="alertMessage">{{message}}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="onOK">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      dialog: false,
      message: "",
      validTime: "",
      validParticipants: "",
      validBooking: true
    };
  },
  props: ["roomData", "date", "startTime", "endTime", "participants"],
  methods: {
    onOK() {
      this.dialog = false;
      if (this.validBooking) this.$emit("needReload");
    },
    bookHandler() {
      this.message = "";
      //Valid time and participants ?
      this.validTime = !(
        this.endTime.HH < this.startTime.HH ||
        (this.endTime.HH === this.startTime.HH &&
          this.endTime.mm <= this.startTime.mm)
      );
      this.validParticipants = this.participants != "" ? true : false;

      if (!this.validParticipants) {
        this.validBooking = false;
        this.message = "Veuillez renseigner un nombre de participants.";
      }
      if (!this.validTime) {
        this.validBooking = false;
        this.message += "Les horaires de réservation indiqués sont érronés.";
      }
      if (this.validParticipants && this.validTime) {
        this.message = "Votre réservation est en cours de traitement...";
        this.bookARoom();
      }
    },
    bookARoom() {
      const startTime = this.formatTime(this.startTime);
      const endTime = this.formatTime(this.endTime);
      Vue.axios
        .post("http://localhost:3000/reservations", {
          params: {
            reservationDate: this.date,
            reservationStartTime: startTime,
            reservationEndTime: endTime,
            nbrPersons: this.participants,
            roomId: this.roomData._id
          }
        })
        .then(() => {
          this.message = "Votre réservation a bien été prise en compte";
          this.validBooking = true;
        })
        .catch(function(error) {
          this.message = "Veuillez réessayer ultérieurement";
          this.validBooking = false;
        });
    },
    formatTime(time) {
      return this.date + "T" + time.HH + ":" + time.mm + "Z";
    }
  }
};
</script>
<style scoped>
.errorBook {
  background-color: #d03535b3 !important;
  color: white;
}
.successBook {
  background-color: #8bc34a !important;
  color: white;
}
.v-card__text.alertMessage {
  margin-top: 2em;
  font-size: 17px;
  color: #1976d2 !important;
}
</style>
