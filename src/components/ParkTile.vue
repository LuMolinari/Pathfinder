<template>
  <div class="tile" >
    <img :src="park.parkImg" alt="Park Image" height="150px" />
    <router-link :to="{name:'ParkDetails', params: { code:park.parkCode}}"> 
      <h1>{{ park.parkName }}</h1>
    </router-link>
    <!-- Park code can be accessed as {{ park.parkCode }} for a query parameter-->
  </div>
</template>

<script>
export default {
  name: "ParkTile",
  props: ["park"],
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

a{
  text-decoration: none;
  color: white;
}

a:visited{
  color: white;
}
h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>