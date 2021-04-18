<template>
  <div class="route-view">
    <!-- main section -->
    <b-container fluid class="bg-dark px-3 py-2 w-100 rounded">
      <!-- this section is good but the responsiveness is off -->
      <!-- keeping here in case the workaround below causes problems -->
      <!-- <b-row class="mb-3 text-left">
        <b-col>
          <p class="h2">Discover</p>
          <p class="lead text-muted mb-n1 mt-n1">
            Your next outdoor adventure awaits
          </p>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="12" md="8">
          <b-form-input
            size="md"
            class="w-100 mb-3"
            placeholder="Find a park"
          ></b-form-input>
        </b-col>

        <b-col sm="12" md="4">
          <b-row cols="2">
            <b-col sm="6" md="6">
              <b-dropdown
                class="mb-3"
                size="md"
                text="Search By"
                variant="primary"
              >
                <b-dropdown-item>Park Name</b-dropdown-item>
                <b-dropdown-item>Location</b-dropdown-item>
                <b-dropdown-item>Activity</b-dropdown-item>
              </b-dropdown>
            </b-col>

            <b-col sm="6" md="6">
              <b-button size="md" text="search" variant="success"
                >Search</b-button
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row> -->

      <!-- heading and subheading -->
      <b-row class="mb-3 text-left">
        <b-col>
          <p class="h2">Discover</p>
          <p class="lead text-muted mb-n1 mt-n1">
            Your next outdoor adventure awaits
          </p>
        </b-col>
      </b-row>

      <!-- search bar and 2 grouped buttons -->
      <!-- search bar -->
      <b-row class="mb-2">
        <b-col sm="12" md="8">
          <b-form-input
            size="md"
            class="w-100 mb-2"
            placeholder="Find a park"
          ></b-form-input>
        </b-col>

        <!-- dropdown and search button -->
        <b-col sm="12" md="4">
          <!-- bug from above: in order to move grouped buttons together, had to add negative margins-->
          <b-row class="mx-n5">
            <b-col>
              <b-button-toolbar class="justify-content-center">
                <b-dropdown
                  class="mr-3"
                  size="md"
                  text="Search By"
                  variant="primary"
                >
                  <b-dropdown-item>Park Name</b-dropdown-item>
                  <b-dropdown-item>Location</b-dropdown-item>
                  <b-dropdown-item>Activity</b-dropdown-item>
                </b-dropdown>

                <b-button class="ml-3" size="md" text="search" variant="success"
                  >Search</b-button
                >
              </b-button-toolbar>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>



<script>
export default {
  name: "Discover",
  data: function () {
    return {};
  },
};

// SearchBar and Submit
// /* for each result in the response, render result card with info interpolated */
// <SearchResultCardComponent paramsHere ></SearchResultCardComponent>
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap");

/* main view container */
.route-view {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 325px;
  /* add a dim white to background */
  background-color: #999;
  /* fixed to remove the scroll bar */
  /* position: fixed; */
  padding: 7% 7%;
  font-family: "Titillium Web", Arial, sans-serif;
  color: white;
}

/* Making the fonts responsive*/
@media only screen and (max-width: 480px) {
  .h2 {
    font-size: 1.6em;
  }
  .lead {
    font-size: 1.2em;
  }
}
</style>