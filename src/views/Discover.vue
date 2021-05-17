<template>
  <div>
    <!-- route rendering area -->
    <div class="route-view" id="discover">
      <!-- input form area -->
      <b-container fluid class="main-container px-3 py-2 w-100 rounded mt-5">
        <!-- heading and subheading -->
        <b-row class="mb-3 text-left">
          <b-col>
            <p class="h2">Discover</p>
            <!-- lead increases font size and decreases weight to make text stand out slightly -->
            <p class="lead text-muted mb-n1 mt-n1">
              Your next outdoor adventure awaits
            </p>
          </b-col>
        </b-row>

        <!-- input group -->
        <!-- search bar and 2 buttons -->
        <b-row class="mb-2">
          <!-- specify columns used out of 12 for sm and md - lg screens. -->
          <!-- xs screens are targeted by default-->
          <b-col sm="12" md="8">
            <b-form-input
              size="md"
              class="w-100 mb-2"
              placeholder="Find a park"
              v-model="searchText"
            ></b-form-input>
          </b-col>

          <!-- dropdown and search button -->
          <!-- explicitly specifying the amount of cols used for xs screens -->
          <b-col class="col-12" sm="12" md="4">
            <!-- add negative margins here to override component default margins-->
            <b-row class="mx-n5">
              <b-col>
                <b-button-toolbar class="justify-content-center">
                  <!-- dropdown selector -->
                  <b-form-select class="ml-3 mr-2 w-50" v-model="dropDownValue">
                    <!-- options -->
                    <!-- first option MUST be disabled with empty value to render -->
                    <option disabled value="">Search By</option>

                    <!-- for each option, bind the options value to this element and render its text -->
                    <!-- the key binds to the options id so that vue knows exactly how to update and rerender data -->
                    <option
                      v-for="option in options"
                      :key="option.id"
                      :value="option.value"
                    >
                      {{ option.text }}
                    </option>
                  </b-form-select>

                  <!-- search button -->
                  <!-- @click is the same as v-on:click="doSomething" -->
                  <b-button
                    id="popover-target-1"
                    class="ml-2 mr-3"
                    size="md"
                    variant="primary"
                    @click="search()"
                    >Search</b-button
                  >
                  <!-- add popover prompts if text field is empty or search type is not selected -->
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

      <!-- display message -->
      <div class="prompt mt-2">
        <!-- if search button has not been clicked -->
        <h1 v-if="!searchButtonClickedOnce" style="font-weight: bold">
          Search by name or state
        </h1>
        <!-- if there aren't any results -->
        <h1 v-else-if="parkResults.length < 1" style="font-weight: bold">
          {{ displayMessage }}
          <!-- if searching, display a progress spinner -->
          <div
            v-if="displayMessage === 'Searching...'"
            style="font-weight: bold"
          >
            <b-spinner id="search-spinner" label="Loading..."></b-spinner>
          </div>
        </h1>
        <!-- else display the result count -->
        <h1 v-else>{{ parkResults.length }} Results</h1>
      </div>

      <!-- for each park result, render a SearchResultCard -->
      <div v-for="park in parkResults" :key="park.parkCode">
        <SearchResultCard :park="park" />
      </div>
    </div>
  </div>
</template>



<script>
/* import custom component */
import SearchResultCard from "../components/SearchResultCard";

/* make this component "importable" */
export default {
  /* Vue component options */
  /* name is more informative name during inspection in browsers */
  name: "Discover",
  /* specifies components available to this vue component */
  components: {
    SearchResultCard,
  },
  /* data object for this vue component */
  /* this is a function which must return a data object */
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
  /* methods for this vue component */
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
    /* gets the current weather for the city */
    getNationalParkCurrentTemperature: async function (city) {
      /* fetch weather data */
      var response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${this.openweatherAPIKey}`
      );
      /* if the reponse status is not 200 */
      if (!response.ok) {
        /* response promise will only be rejected if network error occured */
        throw new Error("HTTP request network error occurred");
      }
      /* convert the response to json */
      var jsonData = await response.json();

      return jsonData;
    },
    /* gets all the national parks in state */
    getNationalParksInState: async function (state) {
      /* fetch response from nps api: park data using specified state code */
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
    /* get the national park by its name */
    getNationalParkByName: async function (name) {
      /* fetch response from nps api: park data by name */
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
    /* store results from data fetch */
    storeNationalParkResults: function (data) {
      /* path to park object in json */
      let parks = data["data"];
      /* for each park in data */
      for (var i = 0; i < parks.length; i++) {
        /* check if park is designated as national park(s)
        values are case sensitive */
        if (
          parks[i]["designation"] == "National Park" ||
          parks[i]["designation"] == "National Parks"
        ) {
          /* create new park object from national park data object*/
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

      /* if there are no park results, return, else get temperatures */
      if (this.parkResults.length > 0) {
        /* fetch and update the temp in each city */
        this.parkResults.forEach((park) => {
          this.getNationalParkCurrentTemperature(park.city)
            .then((data) => {
              /* set temp to data from openweather and set to 3 digit precision */
              park.temp = data["main"]["temp"].toPrecision(3);
            })
            .catch((error) => {
              /* if weather not found, display placeholder -- */
              if (error.message === "HTTP request network error occurred") {
                console.log(`${park.city} weather not found`);
                park.temp = "--";
              }
              /* log the error of the data retrieval */
              console.log(
                "Error occured retreiving weather info for " +
                  park.city +
                  ": " +
                  error.message
              );
            });
        });
      } else {
        /* Results were not found */
        this.displayMessage = "No results found. Try another search.";
      }
    },
    /* function to convert state to state code */
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
    },
    /* performs search */
    search: function () {
      /* if dropdown option selected and search field is populated */
      if (this.dropDownValue != "" && this.searchText != "") {
        /* set flag */
        this.searchButtonClickedOnce = true;
        /* clear the current park results */
        this.parkResults = [];

        /* search based on the dropdown value */
        if (this.dropDownValue == "parkName") {
          /* search by park name */
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

          /* update display message while searching */
          this.displayMessage = "Searching...";

          /* fetch and store the results */
          this.getNationalParkByName(lowerCasedInputString)
            .then((data) => this.storeNationalParkResults(data))
            .catch((error) => {
              console.log("Error occured: ", error);
            });
        } else if (this.dropDownValue == "state") {
          /* search by state */
          console.log("Searching by state");

          /* convert 'state' into state code if not already in state code format */
          const stateCode = this.abbrState(this.searchText, "abbr");

          /* exit the function if a valid state code wasnt found */
          if (stateCode === undefined) {
            this.displayMessage = "State is not found. Try another search.";
            return;
          }

          /* update the display message */
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
  padding: 2% 7%;
  color: white;
}

/* add a more specific background color to main container */
.main-container {
  background-color: #212429;
}

/* change the size of the progress spinner */
#search-spinner {
  height: 3rem;
  width: 3rem;
}

/* style the prompt background for increased legibility */
.prompt {
  padding: 10px 0;
  background-color: rgb(0, 0, 0, 0.35);
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