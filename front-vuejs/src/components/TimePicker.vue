<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="12">
        <v-menu
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="200px"
          min-width="200px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="picker"
              :label="option"
              persistent-hint
              prepend-icon="watch"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker no-title width="190" v-model="picker" @change="pickChange"></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["option"],
  data() {
    return {
      picker: null,
      landscape: false
    };
  },
  methods: {
    pickChange() {
      console.log(this.picker);
    }
  }
};
</script>
<style scoped>
.v-text-field {
  color: white !important;
}
.v-menu__content {
  box-shadow: none;
}
</style>