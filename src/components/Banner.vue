
<template>
  <div class="header">
    <div class="left">
      <img src="../assets/mountains.png" alt="Pathfinder Logo" height="120px" />
      <h1>Pathfinder</h1>
    </div>
    <div class="right">
      <h2 @click="clickedHome()">Home</h2>
      <h2  @click="clickedAbout()">About</h2>
      <h2  @click="clickedDiscover()">Discover</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  methods:{
    clickedHome(){
        console.log("ClickedHome");
    },
    clickedAbout(){
        console.log("ClickedAbout");
    },
    clickedDiscover(){
        console.log("ClickedDiscover");
    },
  }
};
</script>

<style scoped>

.header {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  background: rgb(0, 0, 0, 0.7);
  color: #FFFFFF;
}

h1 {
  font-family: "Pacifico", serif;
  font-size: 2.5em;
  align-self: center;

}
h2{
    padding: 15px;
    align-self: center;
}

h2:hover{
    cursor: pointer;
}

.left{
    display: inherit;
    align-content: center;
}

.right{
    display: inherit;
    align-content: center;
}
</style>