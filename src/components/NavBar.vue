<template>
  <b-navbar id="nav" toggleable="lg" type="dark" variant="dark"  >
    <b-navbar-brand class="websiteName"> 
        <img
          src="../assets/mountains.png"
          alt="Pathfinder Logo"
          height="100px"
          class="d-inline-block align-middle"
        />
        Pathfinder
        </b-navbar-brand>

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
</template>


<script>

</script>

<style scoped>

#nav a.router-link-exact-active {
  color: #8ccfb9;
}


#nav a {
  color: white;
  margin: 5px;
}

.websiteName {
  font-family: "Pacifico", cursive;
  color: white;
  align-self: center;
}



</style>