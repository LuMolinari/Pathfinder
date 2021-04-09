<template>
  <div>{{ campground.description }}</div>
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