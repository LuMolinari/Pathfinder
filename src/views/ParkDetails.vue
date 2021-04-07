<template>
  <div>
      <h1>Park Info</h1>
      <p>The Park code is : <b>{{code}}</b></p>
      <p>We need to use this to make our api call for park data.</p>
  </div>
</template>

<script>
export default {
    data() {
        return{
            code: this.$route.params.code,
        }
    }
}
</script>

<style scoped>

</style>