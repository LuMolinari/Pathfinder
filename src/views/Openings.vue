
<template>
  <div class="pageWrapper">
    <div class="mainWrapper">
      <div class="title">
        <h1>{{ name }}</h1>
      </div>

      <b-container style="margin: 30px auto">
        <b-row cols="1" cols-sm="1" cols-md="2" align-v="center" align-h="center">
          <b-col>
            <b-carousel
              v-if="photosExist()"
              :interval="5000"
              controls
              no-animation
              indicators
              class="left"
              fluid
              style="text-shadow: 1px 1px 2px #333; width:100%"
            >
              <b-carousel-slide
                class="carousel-inner"
                v-for="image in images"
                :key="image.url"
                :text="image.caption"
                :img-src="image.url"
                :caption="image.title"
              />
            </b-carousel>
          </b-col>
          <b-col>
            <h3 v-if="!isLoaded()">Campground Activities</h3>

            <b-badge
              v-for="item in items"
              :key="item.message"
              pill
              variant="secondary"
            >
              {{ item.message }}
            </b-badge>
          </b-col>
        </b-row>
      </b-container>

      <!-- <div class="imageTile">
        <b-carousel
          v-if="photosExist()"
          :interval="5000"
          controls
          no-animation
          indicators
          class="left"
          style="text-shadow: 1px 1px 2px #333"
        >
          <b-carousel-slide
            class="carousel-inner"
            v-for="image in images"
            :key="image.url"
            :text="image.caption"
            :img-src="image.url"
            :caption="image.title"
          />
        </b-carousel>
        <div class="right" v-if="isAvailable()">
          <h3 v-if="!isLoaded()">Campground Activities</h3>

          <b-badge
            v-for="item in items"
            :key="item.message"
            pill
            variant="secondary"
          >
            {{ item.message }}
          </b-badge>
        </div>
      </div> -->

      <h2 v-if="isLoaded()">Loading...</h2>
      <b-spinner variant="light" label="Spinning" v-if="isLoaded()"></b-spinner>

      <h3 v-if="!isLoaded()">Availabilities</h3>

      <vc-date-picker
        v-if="!isLoaded()"
        :key="loadedKey"
        v-model="availableDates"
        :attributes="available"
      >
      </vc-date-picker>

      <div class="description" v-html="Description"></div>
      <div class="directions" v-if="false">
        <h2>Directions:</h2>
        {{ Directions }}
      </div>

      <div class="contactInfo">
        <h2 v-if="!isAvailable()">
          The campground is currently unavailable for reservations. Please try
          again later.
        </h2>
        <h3 class="centered" v-if="!isLoaded()">Contact Info:</h3>
        <h5 v-if="isAvailable()">{{ phone }}</h5>
        <h5 v-if="isAvailable()">{{ email }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
var date = new Date();
var curMonth = date.getMonth() + 1;
var curYear = date.getFullYear();
export default {
  data() {
    return {
      name: "",
      loadedKey: 0,
      availableDates: new Date(), // Jan 25th, 2021
      phone: "",
      email: "",
      Description: "",
      Directions: "",
      Reservable: true,
      Loaded: false,
      items: [],
      images: [],
      available: [
        {
          id: 1,
          dot: {
            backgroundColor: "red",
          },
          dates: [],
        },
      ],
    };
  },
  methods: {
    forceRerender() {
      this.loadedKey += 1;
    },

    photosExist() {
      return this.images.length != 0;
    },
    isAvailable() {
      return this.Reservable;
    },
    isLoaded() {
      return !this.Loaded;
    },
    onContext(ctx) {
      this.context = ctx;
    },
  },
  mounted() {
    var monthDif, monthVal, yearVal, y;
    if (this.name == "") {
      fetch(
        "https://desolate-earth-53850.herokuapp.com/https://ridb.recreation.gov/api/v1/facilities/" +
          this.$route.params.ID +
          "?full=true&apikey=13f17cb4-1da1-402a-ac14-dc6f430a8bd5"
      )
        .then((res) => res.json())
        .then((result) => {
          console.log("Individual campgrounds ", result);
          this.name = result.FacilityName;
          this.phone = "Contact Number: " + result.FacilityPhone;
          this.email = "Facility Email: " + result.FacilityEmail;
          this.Description = result.FacilityDescription;
          this.Directions = result.FacilityDirections;
          if (result.Reservable == true) {
            for (y = 0; y < result.ACTIVITY.length; y++) {
              console.log(result.ACTIVITY[y].ActivityName);
              this.items.push({ message: result.ACTIVITY[y].ActivityName });
            }
            for (y = 0; y < result.MEDIA.length; y++) {
              this.images.push({
                url: result.MEDIA[y].URL,
                caption: result.MEDIA[y].Description,
                title: result.MEDIA[y].Title,
              });
            }
          } else {
            this;
          }
          this.Loaded = true;
          this.Reservable = result.Reservable;
          this.forceRerender();
        });
    }

    for (var x = 1; x <= 6; x++) {
      /*Handle for case of the month value being greater than 12
                      update the month and year value to match*/
      if (curMonth + x <= 12) {
        monthVal = curMonth + x;
        yearVal = curYear;
      } else {
        monthVal = curMonth + x - 12;
        yearVal = curYear + 1;
      }

      //Alters the string for when months are 2 digits or a single digit
      if (monthVal >= 10) {
        monthDif = "-";
      } else {
        monthDif = "-0";
      }
      console.log(
        "https://www.recreation.gov/api/camps/availability/campground/" +
          this.$route.params.ID +
          "/month?start_date=" +
          yearVal +
          monthDif +
          monthVal +
          "-01T00%3A00%3A00.000Z"
      );
      //fetch dates available in the current month and the following 12 months
      fetch(
        "https://www.recreation.gov/api/camps/availability/campground/" +
          this.$route.params.ID +
          "/month?start_date=" +
          yearVal +
          monthDif +
          monthVal +
          "-01T00%3A00%3A00.000Z"
      )
        .then((res) => res.json())
        //save json dates into availableDates
        .then((data) => {
          const campIDs = [];
          for (const sites in data.campsites) {
            campIDs.push(sites);
          }
          for (var x = 0; x < campIDs.length; x++) {
            for (const dates in data.campsites[campIDs[x]].availabilities) {
              var object = new Date(
                parseInt(dates.substring(0, 4)),
                parseInt(dates.substring(5, 7)) - 1,
                parseInt(dates.substring(8, 10))
              );
              this.available[0].dates.push(object);
            }
          }

          this.forceRerender();
        });
    }
  },
};
</script>

<style scoped>
.imageTile {
  color: black;
  display: grid;
  justify-items: center;
  column-gap: 0.1vw;
  align-items: stretch;

  width: 80%;
  margin: 30px auto;
  border-radius: 50px;
}

.carousel-inner {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-color: rgba(208, 223, 247, 0.3);
}

.mainWrapper {
  display: flex;
  flex-direction: column;
  width: 65%;
  min-width: 450px;
  align-items: center;
  background-color: rgba(70, 71, 70, 0.8);
}

.description {
  width: 75%;
  font-size: calc(0.5vw + 10px);
  text-align: left;
}

.description >>> h2 {
  text-align: center;
  font-size: calc(1vw + 18px);
}

.title {
  width: 100%;
  padding-top: 1vh;
  height: auto;
  min-height: 150px;
  background-size: 100% 100%;
  background-image: url("https://www.rtw-trip.com/wp-content/uploads/2016/09/Nacht-Zelt.png");
}

.directions {
  width: 75%;
}

.contactInfo {
  width: 60%;
  text-align: left;
}

.pageWrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: url("https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=949&q=80")
    no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.centered {
  text-align: center;
}

.contactInfo >>> h2 {
  font-size: calc(1vw + 18px);
}

.contactInfo >>> h3 {
  font-size: calc(1vw + 12px);
}

.contactInfo >>> h5 {
  font-size: calc(0.5vw + 9px);
}

.list {
  margin-left: 0;
  padding-left: 0;
  list-style-type: square;
  text-align: left;
}

.right {
  grid-column: 2/3;
  grid-row: 1/3;
  color: white;
}

.left {
  grid-column: 1/2;
  grid-row: 1/3;
  background-size: cover;
}

.carousel-item {
  filter: brightness(90%);
  height: 400px;
}
.carousel-item img {
  height: 100vh !important ;
}

.badge {
  font-size: calc(0.5vw + 5px);
  padding: 10px;
  margin: 0.2vw;
}

/* Tablet Landscape Screen Sizes */
@media only screen and (max-width: 1200px) {
  .right {
    grid-column: 1/2;
    grid-row: 3/5;
  }

  .left {
    grid-column: 1/2;
    grid-row: 1/3;
    margin-left: 0;
    padding-left: 0;
    background-size: cover;
    margin-right: 10;
  }


  .title >>> h1 {
    font-size: calc(4vw + 10px);
  }
}
</style>