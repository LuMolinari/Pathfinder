<template>
 <div>
  <b-nav tabs>
    <b-nav-item active><router-link to="/">Home</router-link></b-nav-item>
    <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
    <b-nav-item>Another Link</b-nav-item>
    <b-nav-item disabled>Disabled</b-nav-item>
  </b-nav>
</div>
</template>

<script>
export default {
 
};
</script>

<style scoped>

</style>