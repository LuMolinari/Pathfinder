<template>
  <div class="tile" @click="goToPark(park.parkCode)">
    <img :src="park.parkImg" alt="Park Image" height="150px" />
    <h1>{{ park.parkName }}</h1>
    <!-- Park code can be accessed as {{ park.parkCode }} for a query parameter-->
  </div>
</template>

<script>
export default {
  name: "ParkTile",
  props: ["park"],
  methods:{
    goToPark(code){
      console.log("Park Code:", code);
    }
  }
};
</script>

<style scoped>
.tile {
  position: relative;
  text-align: center;
  color: white;
}
img {
  filter: brightness(80%);
  height: 300px;
  width: 500px;
  border-radius: 15px;
}

h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>