<template>
  <div class="route-view" id="discover">
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

                <!-- if the dropdown value is "" tooltip message: please select a search method -->
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

    <h1 v-if="!searchButtonClickedOnce" class="mt-3" style="color: black">
      Search by name, state, or activity
    </h1>
    <h1 v-else-if="parkResults.length < 1" class="mt-3" style="color: black">
      No parks found, try again
    </h1>
    <h1 v-else class="mt-3" style="color: black">Results</h1>
    <div v-for="park in parkResults" :key="park.parkCode">
      <SearchResultCard :park="park" />
    </div>
  </div>
</template>



<script>
import SearchResultCard from "../components/SearchResultCard.vue";

export default {
  name: "Discover",
  components: { SearchResultCard },
  data: function () {
    return {
      searchButtonClickedOnce: false,
      searchText: "",
      dropDownValue: "",
      options: [
        { value: "parkName", text: "Park Name" },
        { value: "state", text: "State" },
        { value: "activity", text: "Activity" },
      ],
      parkResults: [
        // {
        //   code: "seki",
        //   name: "Sequioa",
        //   city: "Three Kings",
        //   state: "CA",
        //   activities: [
        //     "hiking",
        //     "skiing",
        //     "snowboarding",
        //     "camping",
        //     "tours",
        //     "dining",
        //   ],
        //   weatherTemp: 80,
        // },
      ],
    };
  },
  watch: {},
  mounted() {},
  methods: {
    abbrState: function (input, to) {
      // function to convert state name to state code
      var states = [
        ["Arizona", "AZ"],
        ["Alabama", "AL"],
        ["Alaska", "AK"],
        ["Arkansas", "AR"],
        ["California", "CA"],
        ["Colorado", "CO"],
        ["Connecticut", "CT"],
        ["Delaware", "DE"],
        ["Florida", "FL"],
        ["Georgia", "GA"],
        ["Hawaii", "HI"],
        ["Idaho", "ID"],
        ["Illinois", "IL"],
        ["Indiana", "IN"],
        ["Iowa", "IA"],
        ["Kansas", "KS"],
        ["Kentucky", "KY"],
        ["Louisiana", "LA"],
        ["Maine", "ME"],
        ["Maryland", "MD"],
        ["Massachusetts", "MA"],
        ["Michigan", "MI"],
        ["Minnesota", "MN"],
        ["Mississippi", "MS"],
        ["Missouri", "MO"],
        ["Montana", "MT"],
        ["Nebraska", "NE"],
        ["Nevada", "NV"],
        ["New Hampshire", "NH"],
        ["New Jersey", "NJ"],
        ["New Mexico", "NM"],
        ["New York", "NY"],
        ["North Carolina", "NC"],
        ["North Dakota", "ND"],
        ["Ohio", "OH"],
        ["Oklahoma", "OK"],
        ["Oregon", "OR"],
        ["Pennsylvania", "PA"],
        ["Rhode Island", "RI"],
        ["South Carolina", "SC"],
        ["South Dakota", "SD"],
        ["Tennessee", "TN"],
        ["Texas", "TX"],
        ["Utah", "UT"],
        ["Vermont", "VT"],
        ["Virginia", "VA"],
        ["Washington", "WA"],
        ["West Virginia", "WV"],
        ["Wisconsin", "WI"],
        ["Wyoming", "WY"],
      ];

      var i;
      if (to == "abbr") {
        input = input.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        for (i = 0; i < states.length; i++) {
          if (states[i][0] == input) {
            return states[i][1];
          }
        }
      } else if (to == "name") {
        input = input.toUpperCase();
        for (i = 0; i < states.length; i++) {
          if (states[i][1] == input) {
            return states[i][0];
          }
        }
      }
    },
    search: function () {
      // set flag
      this.searchButtonClickedOnce = true;
      // init api variables
      // national parks api
      const npsAPIKey = "EoYJvbdhLZ0NUwj5io2JSXLWXXR7yTrYegUq02gC";

      // clear the current park results
      this.parkResults = [];

      // constructor for park objects
      function Park(
        parkCode,
        name,
        city,
        state,
        activities,
        weatherTemp,
        imageUrl
      ) {
        this.parkCode = parkCode;
        this.name = name;
        this.city = city;
        this.state = state;
        this.activities = activities;
        this.weatherTemp = weatherTemp;
        this.imageUrl = imageUrl;
      }

      // function to search based on state
      async function getNationalParksInState(state) {
        // fetch response from nps api
        var response = await fetch(
          `https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=${npsAPIKey}`
        );
        // if the reponse status is not 200
        if (!response.ok) {
          // response promise will only be rejected if network error occured
          throw new Error("HTTP request network error occurred");
        }
        // convert the response into json
        var jsonData = await response.json();
        return jsonData;
      }

      // search based on the dropdown value
      if (this.dropDownValue == "parkName") {
        console.log("Searching by park name");
      } else if (this.dropDownValue == "state") {
        console.log("Searching by state");
        // convert 'state' into state code if not already in state code format
        const stateCode = this.abbrState(this.searchText, "abbr");
        // exit the function if a valid state code wasnt found
        if (stateCode === undefined) {
          // alert state not found message
          return;
        }
        console.log("State code: ", stateCode);
        // pass state code into search
        getNationalParksInState(stateCode)
          .then((data) => {
            // path to park objects
            let parks = data["data"];
            // data: park
            for (var i = 0; i < parks.length; i++) {
              // check if park is designated as national park
              if (parks[i]["designation"] == "National Park") {
                // create new park object
                var nationalParkInState = new Park(
                  parks[i]["parkCode"],
                  parks[i]["fullName"],
                  parks[i]["addresses"][0]["city"],
                  parks[i]["addresses"][0]["stateCode"],
                  parks[i]["activities"],
                  90,
                  parks[i]["images"][0]["url"]
                );
                // add the park to the array of result parks
                this.parkResults.push(nationalParkInState);
              }
            }
            // displays all of the parks and their properties in nice json format
            // console.log("park results: ", this.parkResults);
          })
          .catch((error) => {
            console.log("Error occured: ", error);
          });
      } else if (this.dropDownValue == "activity") {
        console.log("Searching by activity");
      } else {
        // do nothing, no selection
        console.log("not searching");
      }
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