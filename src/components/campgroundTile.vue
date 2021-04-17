<template>
  <div v-html="campground.FacilityDescription"> </div>
</template>

<script>
export default {
  name: "CampgroundTile",
  props: {
    campground: Object,
  },
};
</script>

<style>
</style>