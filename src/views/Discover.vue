<template>
  <div>
    <!-- <DiscoverHero /> -->
    <div class="route-view" id="discover">
      <!-- main section -->
      <b-container fluid class="bg-dark px-3 py-2 w-100 rounded mt-5">
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
                    id="popover-target-1"
                    class="ml-2 mr-3"
                    size="md"
                    variant="primary"
                    @click="search()"
                    >Search</b-button
                  >
                  <b-popover
                    v-if="dropDownValue === ''"
                    target="popover-target-1"
                    triggers="focus"
                    placement="top"
                  >
                    Please select a search type
                  </b-popover>
                  <b-popover
                    v-if="searchText === ''"
                    target="popover-target-1"
                    triggers="focus"
                    placement="top"
                  >
                    Please enter a park name or state
                  </b-popover>
                </b-button-toolbar>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>

      <h1
        v-if="!searchButtonClickedOnce"
        class="mt-3"
        style="font-weight: bold"
      >
        Search by name or state
      </h1>
      <h1
        v-else-if="parkResults.length < 1"
        class="mt-3"
        style="font-weight: bold"
      >
        {{ displayMessage }}
        <div
          v-if="displayMessage === 'Searching...'"
          class="mt-5"
          style="font-weight: bold"
        >
          <b-spinner id="search-spinner" label="Loading..."></b-spinner>
        </div>
      </h1>
      <h1 v-else class="mt-3">{{ parkResults.length }} Results</h1>
      <div v-for="park in parkResults" :key="park.parkCode">
        <SearchResultCard :park="park" />
      </div>
    </div>
  </div>
</template>



<script>
import SearchResultCard from "../components/SearchResultCard";
// import DiscoverHero from "../components/DiscoverHero";

export default {
  name: "Discover",
  components: {
    SearchResultCard,
    // DiscoverHero,
  },

  data: function () {
    return {
      npsAPIKey: "EoYJvbdhLZ0NUwj5io2JSXLWXXR7yTrYegUq02gC",
      openweatherAPIKey: "e7db91ac0cb2743fa68bd0ea5700c42d",
      searchButtonClickedOnce: false,
      searchText: "",
      dropDownValue: "",
      options: [
        { value: "parkName", text: "Park Name" },
        { value: "state", text: "State" },
      ],
      parkResults: [],
      displayMessage: "",
    };
  },
  watch: {},
  mounted() {},
  methods: {
    /* park object constructor */
    Park(parkCode, name, city, state, activities, temp, imageUrl) {
      this.parkCode = parkCode;
      this.name = name;
      this.city = city;
      this.state = state;
      this.activities = activities;
      this.temp = temp;
      this.imageUrl = imageUrl;
    },
    getNationalParkCurrentTemperature: async function (city) {
      // TODO: pull data from openweather
      var response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${this.openweatherAPIKey}`
      );
      /* if the reponse status is not 200 */
      if (!response.ok) {
        /* response promise will only be rejected if network error occured */
        throw new Error("HTTP request network error occurred");
      }
      var jsonData = await response.json();
      return jsonData;
    },
    getNationalParksInState: async function (state) {
      // fetch response from nps api: park data with the specified state code
      var response = await fetch(
        `https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=${this.npsAPIKey}`
      );
      /* if the reponse status is not 200 */
      if (!response.ok) {
        /* response promise will only be rejected if network error occured */
        throw new Error("HTTP request network error occurred");
      }
      /* convert the response into json */
      var jsonData = await response.json();
      return jsonData;
    },
    getNationalParkByName: async function (name) {
      /* fetch response from nps api: all parks data (play with url queries 
      for more efficient way to reach park name and fullName properties) */
      var response = await fetch(
        `https://developer.nps.gov/api/v1/parks?q=${name}&api_key=${this.npsAPIKey}`
      );
      /* if the reponse status is not 200 */
      if (!response.ok) {
        /* response promise will only be rejected if network error occured */
        throw new Error("HTTP request network error occurred");
      }
      /* convert the response into json */
      var jsonData = await response.json();

      return jsonData;
    },
    storeNationalParkResults: function (data) {
      // path to park objects
      let parks = data["data"];
      // data: park
      for (var i = 0; i < parks.length; i++) {
        /* check if park is designated as national park(s)
        values are case sensitive */
        if (
          parks[i]["designation"] == "National Park" ||
          parks[i]["designation"] == "National Parks"
        ) {
          /* create new park object */
          var nationalParkInState = new this.Park(
            parks[i]["parkCode"],
            parks[i]["fullName"],
            parks[i]["addresses"][0]["city"],
            parks[i]["addresses"][0]["stateCode"],
            parks[i]["activities"],
            90,
            parks[i]["images"][0]["url"]
          );
          /* add the park to the array of result parks */
          this.parkResults.push(nationalParkInState);
        }
      }

      // if parkResults is empty, return, else get temps
      if (this.parkResults.length > 0) {
        /* fetch and update the temp in each city */
        this.parkResults.forEach((park) => {
          park.temp = this.getNationalParkCurrentTemperature(park.city)
            .then((data) => {
              /* console.log(
                `Current temp at ${park.city} is ${data["main"][
                  "temp"
                ].toPrecision(2)}`
              ); */
              if (park.city === "Death Valley") {
                console.log("hello");
              }
              park.temp = data["main"]["temp"].toPrecision(2);
            })
            .catch((error) => {
              if (error.message === "HTTP request network error occurred") {
                console.log(`${park.city} weather not found`);
                park.temp = "--";
              }
              console.log(
                "Error occured retreiving weather info for " +
                  park.city +
                  ": " +
                  error.message
              );
            });
        });
      } else {
        this.displayMessage = "0 results found. Try another search.";
      }
    },
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
          // check to validate
          if (states[i][0] == input || states[i][1] == input.toUpperCase()) {
            // return the same state code
            return states[i][1];
          }
        }
      }
      // this converts from state code to state but not needed for this project
      /* else if (to == "name") {
        input = input.toUpperCase();
        for (i = 0; i < states.length; i++) {
          if (states[i][1] == input) {
            return states[i][0];
          }
        }
      } */
    },
    search: function () {
      if (this.dropDownValue != "" && this.searchText != "") {
        /* set flag */
        this.searchButtonClickedOnce = true;
        /* clear the current park results */
        this.parkResults = [];

        /* search based on the dropdown value */
        if (this.dropDownValue == "parkName") {
          console.log("Searching by park name");

          /* split the user input into word array */
          var inputName = this.searchText.split(" ");

          /* convert words into lowercase */
          var lowerCaseWords = [];
          inputName.forEach((element) => {
            lowerCaseWords.push(element.toLowerCase());
          });

          /* if the last two words are National and Park || Parks, remove them
          the query url returns better results without them */
          if (lowerCaseWords[lowerCaseWords.length - 1] === "park") {
            lowerCaseWords.pop();
            if (lowerCaseWords[lowerCaseWords.length - 1] === "national") {
              lowerCaseWords.pop();
            }
          }

          /* convert the array into a string */
          var lowerCasedInputString = lowerCaseWords.join(" ");
          console.log("Lower case input string: ", lowerCasedInputString);
          this.displayMessage = "Searching...";

          /* fetch and store the results */
          this.getNationalParkByName(lowerCasedInputString)
            .then((data) => this.storeNationalParkResults(data))
            .catch((error) => {
              console.log("Error occured: ", error);
            });
        } else if (this.dropDownValue == "state") {
          console.log("Searching by state");
          /* convert 'state' into state code if not already in state code format */
          const stateCode = this.abbrState(this.searchText, "abbr");
          /* exit the function if a valid state code wasnt found */
          if (stateCode === undefined) {
            // TODO: alert state not found message
            this.displayMessage = "State is not found. Try another search.";
            return;
          }
          console.log("State code: ", stateCode);
          this.displayMessage = "Searching...";
          /* pass state code into search, 
            fetch and store data */
          this.getNationalParksInState(stateCode)
            .then((data) => this.storeNationalParkResults(data))
            .catch((error) => {
              console.log("Error occured: ", error);
            });
        } else {
          /* do nothing, no selection */
          console.log("not searching");
        }

        // if (this.parkResults.length === 0) {
        //
        // }
      }
    },
  },
};
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
  background: url("../assets/Canyonlands.jpg") no-repeat center center fixed;
  background-size: cover;

  /* fixed to remove the scroll bar */
  /* position: fixed; */
  padding: 2% 7%;
  /* font-family: "Titillium Web", Arial, sans-serif; */
  color: white;
}

#search-spinner {
  height: 3rem;
  width: 3rem;
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