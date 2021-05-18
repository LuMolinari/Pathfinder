<template>
  <div class="app-error">
    <b-container>
      <b-row  cols="1" cols-sm="1" cols-md="2" align-v="end">
        <b-col align-v="stretch">
          <img src="../assets/hiker.svg"  alt="Responsive image" class="hiker-img"/>
        </b-col>
        <b-col>
          <b-jumbotron
            header="Please stay on the trails"
            lead="We can't find the page you're looking for"
            text-variant="white"
            bg-variant="dark"
          >
            <b-button bg-variant="danger" href="/">Return home</b-button>
          </b-jumbotron>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";
export default {};
</script>

<style scoped>
.hiker-img{
  width:100%
}

.app-error {
  margin-top: 35px;
}
</style>