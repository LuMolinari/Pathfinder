<template>
<div id="template">
  <b-navbar id="nav" toggleable="lg" type="dark" variant="dark" fixed="top" >
    <b-navbar-brand > 
        <img
          src="../assets/mountains.png"
          alt="Pathfinder Logo"
          height="120px"
          style="display:inline-block"
        /><h1 style="display:inline-block" class="websiteName ">Pathfinder</h1></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
            <b-nav-item href="#"><router-link to="/"><h2>Home</h2></router-link></b-nav-item>
            <b-nav-item href="#"><router-link to="/about"><h2>About</h2></router-link></b-nav-item>
            <b-nav-item href="#"><router-link to="/discover"><h2>Discover</h2></router-link></b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

</template>


<script>

</script>

<style scoped>

#template{
    margin-bottom: 175px;
}
#nav a.router-link-exact-active {
  color: #8ccfb9;
}


#nav a {
  font-weight: bold;
  color: white;
  margin: 5px;
  
}

.websiteName {
  font-family: "Pacifico", cursive;
  font-size: 2.0em;
  align-self: center;
}



</style>