<template>
  <div v-html="facilityInfo.FacilityDescription"></div>
</template>

<script>
export default {
  name: "CampgroundTile",
  props: ["FacilityID"],
  data() {
    return {
      facilityInfo: "",
    };
  },
  mounted() {
    let self = this;
    //make API call to get facility data
    console.log("Facility ID", self.FacilityID);
    fetch(
      "https://ridb.recreation.gov/api/v1/facilities/" + self.FacilityID + "?full=true&apikey=13f17cb4-1da1-402a-ac14-dc6f430a8bd5"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("Individual campgrounds ", result);
        this.facilityInfo = result;
      });
  },
};
</script>

<style>
</style>