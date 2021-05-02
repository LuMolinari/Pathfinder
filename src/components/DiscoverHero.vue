<template>
  <b-jumbotron
    class="text-center text-justify text-sm-left my-0 jumbotron-bg-image"
  >
    <span class="display-4"> Leave the road, <br />take the trails. </span>
  </b-jumbotron>
</template>

<script>
export default {
  name: "DiscoverHero",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap");

.jumbotron-bg-image {
  font-family: "Titillium Web", Arial, sans-serif;
  height: 75vh;
  background-image: url("../assets/17.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
  padding: 12% 7%;
  position: relative;
}

.jumbotron-bg-image::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

span {
  font-weight: 600;
  line-height: 1.5em;
  color: #fff;
  position: relative;
}
</style>
