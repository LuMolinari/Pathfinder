<template>
  <div class="app-error">
  <b-jumbotron header="404 ERROR" lead="CONGRATULATIONS!" text-variant="white" bg-variant="dark"  >

    <b-jumbotron  text-variant="dark" bg-variant="danger">
      <b-icon icon="exclamation-triangle-fill" animation="fade" scale="2" variant="warning" style="width: 100px; height: 90px;" ></b-icon>
    </b-jumbotron>
    <p>You are officially lost.....</p>
    <b-button bg-variant="danger" href="/">Return home</b-button>
  </b-jumbotron>
  </div>
</template>

<script>

import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
export default {

}
</script>

<style scoped>

.app-error{
  margin-top: 35px;
}


</style>