<template>
  <div id="app">
    <Banner />
    <Home/>
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
import Home from './components/Home.vue'


export default {
  name: 'App',
  components: {
    Banner,
    Home
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather&family=Pacifico&display=swap');

/* This will be any default styling shared throughought the whole application */
/*All google fonts imported here are available throughout our application */
#app {
  font-family: 'Merriweather', serif;
}

</style>
