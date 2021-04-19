<template>
  <div id="app">
    <div id="nav">
      <div class="left">
        <img
          src="./assets/mountains.png"
          alt="Pathfinder Logo"
          height="120px"
        />
        <h1 class="websiteName">Pathfinder</h1>
      </div>
      <div class="right">
        <h2><router-link to="/">Home</router-link></h2>
        <h2><router-link to="/about">About</router-link></h2>
        <h2><router-link to="/discover">Discover</router-link></h2>
      </div>
    </div>
    <!-- <div v-if="backgroundVisible"> -->
    <img
      class="backgroundPhoto"
      src="./assets/Canyonlands.jpg"
      alt="Canyonlands National Park"
      height="140px"
    />
    <!-- </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundVisible: true,
    };
  },
  // watch:{
  //   '$route'(){
  //     if(this.$route.name === 'ParkDetails'){
  //       this.backgroundVisible = false;
  //     } else {
  //       this.backgroundVisible = true;
  //     }
  //   }
  // }
};
</script>



<style>
@import url("https://fonts.googleapis.com/css2?family=Merriweather&family=Pacifico&display=swap");

/* global styles to prevent default browser styling */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  margin: 0 !important;
}

#app {
  font-family: "Merriweather", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  background: rgb(0, 0, 0, 0.5);
  color: #ffffff;
  width: 100%;
  position: absolute;
}

#nav a {
  font-weight: bold;
  color: white;
  margin: 10px;
}

#nav a.router-link-exact-active {
  color: #8ccfb9;
}

.left {
  display: inherit;
  align-content: center;
}

.right {
  display: inherit;
  align-content: center;
}

.websiteName {
  font-family: "Pacifico", cursive;
  font-size: 2.5em;
  align-self: center;
}

h2 {
  padding: 15px;
  align-self: center;
}

h2:hover {
  cursor: pointer;
}

.backgroundPhoto {
  width: 100%;
  object-fit: cover;
  background-repeat: no-repeat;
}

/* This overides bootstrap css, to keep images within the carousel  */
.img-fluid{
    max-width: 100%;
    height: -webkit-fill-available !important;
    object-fit: contain !important;
}



</style>
