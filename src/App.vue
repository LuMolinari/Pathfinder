<template>
  <div id="app">  
      <NavBar/>
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar';

export default {
  data() {
    return {
      backgroundVisible: true,
    };
  },
  components:{
    NavBar
  }
 
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
  background:  #0f0f0f;

}

#app {
  font-family: "Merriweather", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;  
  background:  #0f0f0f;
  color: aliceblue;

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
