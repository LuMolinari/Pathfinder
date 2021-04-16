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
    <img class="backgroundPhoto" src="./assets/Canyonlands.jpg" alt="Canyonlands National Park" height="140px">
    <!-- </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  data(){
    return{
      backgroundVisible: true
    }
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
}
</script>



<style>
@import url("https://fonts.googleapis.com/css2?family=Merriweather&family=Pacifico&display=swap");

/* global styles to prevent default browser styling */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html{
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
  position:absolute;
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

.backgroundPhoto{
  width: 100%;
  object-fit: cover;
  background-repeat:no-repeat ;
}

/*Global Tooltip CSS */

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}

/* general styles */

.horizontal{
  display: flex;
  flex-direction: row;
}
</style>
