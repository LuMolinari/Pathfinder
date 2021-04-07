<template>
  <div>
    <h2>Where will you find your next adventure?</h2>
    <div class="grid">
      <div  v-for="park in starterParks" :key="park.parkCode">
        <ParkTile :park="park"/>
      </div>
    </div>
  </div>
</template>

<script>
import ParkTile from "../components/ParkTile";

export default {
  name: "Home",
  data: function () {
    return {
      starterParks: [
        {
          parkName: "Zion National Park",
          parkImg:
            "https://www.nps.gov/common/uploads/structured_data/3C7F0098-1DD8-B71B-0B6C0191D7391384.jpg",
          parkCode: "zion",
        },
        {
          parkName: "Yellowstone National Park",
          parkImg:
            "https://www.nps.gov/common/uploads/structured_data/3C7D2FBB-1DD8-B71B-0BED99731011CFCE.jpg",
          parkCode: "yell",
        },
        {
          parkName: "Acadia National Park",
          parkImg:
            "https://www.nps.gov/common/uploads/structured_data/3C7B45AE-1DD8-B71B-0B7EE131C7DFC2F5.jpg",
          parkCode: "acad",
        },
        {
          parkName: "Yosemite National Park",
          parkImg:
            "https://www.nps.gov/common/uploads/structured_data/3C84CDD0-1DD8-B71B-0B6E5868AFC75B6B.jpg",
          parkCode: "yose",
        },
        {
          parkName: "Sequoia & Kings Canyon National Parks",
          parkImg:
            "https://www.nps.gov/common/uploads/structured_data/3C7A250B-1DD8-B71B-0BCF61A89A8B2970.jpg",
          parkCode: "seki",
        },
        {
          parkName: "Grand Canyon National Park",
          parkImg:
            "https://www.nps.gov/common/uploads/structured_data/3C7B143E-1DD8-B71B-0BD4A1EF96847292.jpg",
          parkCode: "grca",
        },
      ],
    };
  },
  components: {
    ParkTile,
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
.grid {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px 20px;
  }
</style>