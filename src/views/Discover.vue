<template>
  <div>
    <app-navbar></app-navbar>
    <div class="route-view">
    <!-- main section -->
    <b-container fluid class="bg-dark px-3 py-2 w-100 rounded">
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
            v-model="searchText"
          ></b-form-input>
        </b-col>

        <!-- dropdown and search button -->
        <b-col sm="12" md="4">
          <!-- bug from above: in order to move grouped buttons together, had to add negative margins-->
          <b-row class="mx-n5">
            <b-col>
              <b-button-toolbar class="justify-content-center">
                <!-- changed to dropdown select instead of button dropdown -->
                <b-form-select class="ml-3 mr-2 w-50" v-model="dropDownValue">
                  <!-- first option MUST be disabled with empty value to render -->
                  <option disabled value="">Search By</option>
                  <!-- for each option, bind the options value to this element and render its text -->
                  <option
                    v-for="option in options"
                    :key="option.id"
                    :value="option.value"
                  >
                    {{ option.text }}
                  </option>
                </b-form-select>

                <b-button
                  class="ml-2 mr-3"
                  size="md"
                  variant="primary"
                  @click="search()"
                  >Search</b-button
                >
              </b-button-toolbar>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <SearchResultCard></SearchResultCard>
  </div>

  </div>
  
</template>



<script>
import SearchResultCard from "../components/SearchResultCard.vue";
import NavBar from '../components/NavBar.vue';

export default {
  components: { 
    SearchResultCard,
    'app-navbar': NavBar
   },
  name: "Discover",
  data: function () {
    return {
      searchText: "",
      dropDownValue: "",
      options: [
        { value: "parkName", text: "Park Name" },
        { value: "location", text: "Location" },
        { value: "activity", text: "Activity" },
      ],
    };
  },
  watch: {
    searchText: function () {
      console.log("The search text is: " + this.searchText);
    },
  },
  methods: {
    search: function () {
      console.log(
        "Submit clicked - drop down selection: " + this.dropDownValue
      );
    },
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
  min-width: 320px;
  /* add a dim white to background */
  background-color: #ececec;
  /* fixed to remove the scroll bar */
  /* position: fixed; */
  padding: 7% 7%;
  font-family: "Titillium Web", Arial, sans-serif;
  color: white;
}

/* Adjusting fonts for responsiveness */
@media only screen and (max-width: 376px) {
  .h2 {
    font-size: 1.6em;
  }
  .lead {
    font-size: 1.2em;
  }
}
</style>