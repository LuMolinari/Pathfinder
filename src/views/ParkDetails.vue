<template>
  <div v-if="parkInfo != null" class="wrapper">
    <!-- Large Park Image and Name -->
    <div
      class="hero-img"
      v-bind:style="{ backgroundImage: 'url(' + parkInfo.images[0].url + ')' }"
    >
      <div class="hero-text">
        <h1>{{ parkInfo.fullName }}</h1>
      </div>
    </div>

    <!-- Bar with information about park -->
    <b-container class="info-bar">
      <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="4">
        <b-col
          ><h2>Location</h2>
          <p v-if="parkInfo.addresses[0] != null">
            {{ parkInfo.addresses[0].city }},
            {{ parkInfo.addresses[0].stateCode }}
          </p></b-col
        >

        <b-col>
          <h2>Phone</h2>
          <p v-if="parkInfo.contacts.phoneNumbers[0] != null">
            {{ parkInfo.contacts.phoneNumbers[0].phoneNumber }}
          </p>
          <p v-else>No Phone Number Found</p></b-col
        >
        <b-col
          ><h2>Email</h2>
          <p v-if="parkInfo.contacts.emailAddresses[0] != null">
            {{ parkInfo.contacts.emailAddresses[0].emailAddress }}
          </p>
          <p v-else>No Email Found</p>
        </b-col>
        <b-col class="official-site-button">
          <!-- <h2>Learn More</h2> -->
          <b-button>
            <a :href="parkInfo.url" target="_blank" rel="noopener noreferrer"
              >Official Site</a
            >
          </b-button></b-col
        >
      </b-row>
    </b-container>

    <b-container class="overview">
      <b-row cols="1" cols-sm="1" cols-md="2">
        <b-col
          ><h2>
            <b-icon icon="caret-right-fill" aria-hidden="true"></b-icon>Overview
          </h2></b-col
        >
        <b-col
          ><p>{{ parkInfo.description }}</p></b-col
        >
      </b-row>
    </b-container>

    <b-container class="overview">
      <b-row cols="1" cols-sm="1" cols-md="2">
        <b-col
          ><h2>
            <b-icon icon="caret-right-fill" aria-hidden="true"></b-icon
            >Activities
          </h2></b-col
        >
        <b-col>
          <b-badge
            v-for="activity in parkInfo.activities.slice(0, 7)"
            :key="activity.id"
            pill
            variant="secondary"
            class="activity"
          >
            {{ activity.name }}
          </b-badge></b-col
        >
      </b-row>
    </b-container>

    <!-- Any Current Park Alerts -->
    <b-alert
      v-if="alerts != null"
      class="alerts-wrapper"
      variant="info"
      show
      fade
      dismissible
    >
      <h2 style="text-align: center">Park Alerts</h2>
      <div v-for="alert in alerts" :key="alert.id">
        <h3>{{ alert.title }}</h3>
        <p>{{ alert.description }}</p>
        <hr />
      </div>
    </b-alert>

    <div>
      <b-container fluid>
        <b-row>
          <b-col
            class="container-bg"
            v-for="image in parkInfo.images.slice(1, 4)"
            :key="image.url"
            lg="3"
            md="6"
            sm="12"
          >
            <div ></div>
            <b-img
              thumbnail
              :src="image.url"
              alt="park image"
            ></b-img>
            <h3>{{ image.title }}</h3>
            <p>{{ image.caption }}</p>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div v-if="campgroundsExist()">
    <!-- Displaying Campsites Name -->
    <b-form-group
      label="Check Available campsites"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-radio-group
        id="btn-radios-2"
        v-model="selected"
        :options="options.slice(0, 3)"
        :aria-describedby="ariaDescribedby"
        button-variant="outline-light"
        size="md"
        name="radio-btn-outline"
        buttons
      ></b-form-radio-group>
    </b-form-group>

    <!-- The campground Tile will make the necessary API calls -->
    <CampgroundTile
      v-for="camp in options"
      :key="camp.value"
      :facilityID="camp.value"
      :contractType="camp.type"
      v-show="camp.value == selected"
    />
  </div>
    <!-- Google maps comnponent -->
    <GmapMap
      :center="center"
      :zoom="12"
      map-type-id="hybrid"
      style="width: 100%; height: 600px"
    >
      <!-- Placeholder component if we want to add any markers -->
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
import CampgroundTile from "../components/campgroundTile.vue";
export default {
  name: "ParkInfo",
  data() {
    return {
      parkInfo: null,
      campInfo: null,
      alerts: null,
      // If you decide to add any map markers
      markers: [],
      center: { lat: 4.5, lng: 99 },
      selected: "test",
      options: [],
      items: [],
    };
  },
  components: {
    CampgroundTile,
  },
  methods:{
    campgroundsExist(){
      return this.options.length != 0;
    }
  },
  mounted() {
    //fetch general park info from  nps api
    fetch(
      "https://developer.nps.gov/api/v1/parks?parkCode=" +
        this.$route.params.code +
        "&api_key=EoYJvbdhLZ0NUwj5io2JSXLWXXR7yTrYegUq02gC"
    )
      .then((res) => res.json())
      //save json into parkInfo
      .then((data) => {
        this.parkInfo = data.data[0];
        console.log("NPS API: ", data);
  
        //saving data used for centering map
        this.center.lat = parseFloat(data.data[0].latitude);
        this.center.lng = parseFloat(data.data[0].longitude);
        for (let i = 0; i < this.parkInfo.images.length; i++) {
          this.items.push({
            src: this.parkInfo.images[i].url,
            caption: this.parkInfo.images[i].title,
          });
        }
        //I can use latitude and longitude to call rec.gov API here
        // https://ridb.recreation.gov/api/v1/facilities?offset=0&latitude=37.29839254&longitude=-113.0265138&radius=10&activity=CAMPING,9&lastupdated=10-01-2018
        
        fetch(
          "https://desolate-earth-53850.herokuapp.com/https://ridb.recreation.gov/api/v1/facilities?offset=0&latitude=" +
            this.center.lat +
            "&longitude=" +
            this.center.lng +
            "&radius=25&activity=CAMPING,9&lastupdated=01-01-2018&apikey=13f17cb4-1da1-402a-ac14-dc6f430a8bd5"
        )
          .then((res) => res.json())
          .then((result) => {
            console.log("RIDB CAMPS:", result.RECDATA);
            let selected = false
            for (let i = 0; i < result.RECDATA.length; i++) {
              console.log(
                "Checking Recdata",
                i + ": " + result.RECDATA[i].FacilityName
              );
              if (
                result.RECDATA[i].FacilityName.includes("Camp") ||
                result.RECDATA[i].FacilityName.includes("camp") ||
                result.RECDATA[i].FacilityName.includes("CAMP")
              ) {
                if (selected == false) {
                  this.selected = result.RECDATA[i].FacilityID;
                  selected = true
                }
                this.options.push({
                  text: result.RECDATA[i].FacilityName,
                  value: result.RECDATA[i].FacilityID,
                });
              }
              if (this.options.length == 3) {
                break;
              }
            }
          });
      })
      .catch(() => this.$router.push({ name: 'NotFound'}));
    fetch(
      "https://developer.nps.gov/api/v1/alerts?parkCode=" +
        this.$route.params.code +
        "&api_key=EoYJvbdhLZ0NUwj5io2JSXLWXXR7yTrYegUq02gC"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Alerts API: ", data);
        if (data.total != "0") {
          this.alerts = data.data;
        }
      });
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
/* Top image and text  */
.hero-img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 600px;
  max-height: 700px;
}
.hero-text {
  width: 100%;
  min-height: 600px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 1px 1px 5px #000000, 0 0 3em #000000;
}
.hero-text h1 {
  font-size: 5vw;
  width: 70%;
}
/* info bar */
.info-bar {
  color: black;
  margin: 25px auto;
  margin-top: -40px;
  background: rgba(255, 255, 255);
  border-radius: 15px;
  padding: 15px;
}
.overview {
  text-align: left;
  margin: 25px auto;
}
/* wrapper around the alerts to center it */
.alerts-wrapper {
  width: 75%;
  margin: 25px auto;
  text-align: left;
}
.alerts-wrapper h2 {
  font-size: 2em;
}
.alerts-wrapper h3 {
  font-size: 1.2em;
}
.alerts-wrapper p {
  font-size: 0.8em;
}
.activity {
  font-size: 1em;
  padding: 10px;
  margin: 5px;
}
.container-bg {
  width: 100%;
  margin: 15px 10px;
  background: whitesmoke;
  padding: 15px;
  color: black;
  border-radius: 15px;
}
.container-bg img{
  height: 400px;
  width: 100%;
  object-fit: cover;
}
/* .photo-row:nth-child(odd) {
} */
.photo-row {
  padding: 30px;
}
.park-image {
  height: 300px;
}
.park-image2 {
  height: auto;
  width: 100%;
}

.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#carousel-fade {
  width: 75%;
  background: aqua;
  height: 700px;
  margin: 0px auto;
  object-fit: contain;
}
.carousel-item {
  height: 700px;
  object-fit: contain;
}
.carousel-item img {
  height: 100vh !important ;
}
a {
  text-decoration: none;
  color: white;
}
a:visited {
  color: white;
}
.official-site-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>