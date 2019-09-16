<template>
  <v-container grid-list-xl>
    <Room
      v-for="room in rooms"
      :key="room._id"
      :roomData="room"
      :date="date"
      :startTime="startTime"
      :endTime="endTime"
      :participants="participants"
    />
  </v-container>
</template>

<script>
import Vue from "vue";
import Room from "./Room";

export default {
  name: "ListRooms",
  components: {
    Room
  },
  props: ["rooms", "date", "startTime", "endTime", "participants"]
};
</script>

<style scoped>
.container {
  width: 85% !important;
  padding-top: 1em !important;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: wrap;
  flex-flow: wrap;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  justify-content: flex-start;
  margin-left: 5px !important;
}
</style>