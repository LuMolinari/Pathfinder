<template>
  <b-jumbotron
    class="text-center text-justify text-sm-left my-0 jumbotron-bg-image"
  >
    <span class="display-3" id="jumbotron-header">
      Leave the road, <br />take the trails.
    </span>
  </b-jumbotron>
</template>

<script>
export default {
  name: "DiscoverHero",
};
</script>

<style scoped>
.jumbotron-bg-image {
  height: 75vh;
  background-image: url("../assets/17.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  font-weight: 600;
  padding-top: 10%;
}
</style>
