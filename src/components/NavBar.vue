<template>
<div id="template">
  <b-navbar id="nav" toggleable="lg" type="dark" variant="dark" >
    <b-navbar-brand src='#./assets/mountains.png'>Pathfinder</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
        <b-nav-item href="#"><router-link to="/">Home</router-link></b-nav-item>
        <b-nav-item href="#"><router-link to="/about">About</router-link></b-nav-item>
        <b-nav-item href="#"><router-link to="/discover">Discover</router-link></b-nav-item>
      </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

</template>



<script>

</script>

<style scoped>
#nav {
    
    background-image: url('../assets/mountains.png')!important;
}
#nav a.router-link-exact-active {
  color: #8ccfb9;
}

/* #template{
    margin-bottom: 50px;
} */



</style>