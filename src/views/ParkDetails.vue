<template>
  <div v-if="parkInfo != null" class="wrapper">
    <!-- Large Park Image and Name -->
    <div
      class="hero-img"
      v-bind:style="{ backgroundImage: 'url(' + parkInfo.images[0].url + ')' }"
    >
      <div class="hero-text">
        <h1>{{ parkInfo.fullName }}</h1>
        <!-- Park Description -->
        <p>
          {{ parkInfo.description }}
        </p>
      </div>
    </div>

    <div>
      <!-- Gathering Contact Info -->
      <div class="contactInfo">
        <h2 v-if="parkInfo.addresses[0] != null">
          {{ parkInfo.addresses[0].city }},
          {{ parkInfo.addresses[0].stateCode }}
        </h2>
        <hr />
        <h3><u>Contact Info</u></h3>
        <p>Phone</p>
        <p v-if="parkInfo.contacts.phoneNumbers[0] != null">
          {{ parkInfo.contacts.phoneNumbers[0].phoneNumber }}
        </p>
        <p v-else>No Phone Number Found</p>
        <p>Email</p>
        <p v-if="parkInfo.contacts.emailAddresses[0] != null">
          {{ parkInfo.contacts.emailAddresses[0].emailAddress }}
        </p>
        <p v-else>No Email Found</p>
        <a :href="parkInfo.url" target="_blank" rel="noopener noreferrer"
          >Official Site</a
        >
      </div>
    </div>

    <!-- Any Current Park Alerts -->

    <b-alert
      v-if="alerts != null"
      class="alerts-wrapper"
      variant="warning"
      show
      dismissible
    >
      <h2 style="text-align: center">Park Alerts</h2>
      <div v-for="alert in alerts" :key="alert.id">
        <h3>{{ alert.title }}</h3>
        <p>{{ alert.description }}</p>
        <hr />
      </div>
    </b-alert>

    <!-- Using a for loop and v:bind to fill in images from the gallery -->
    <h2>Gallery</h2>
    <b-carousel
      id="carousel-fade"
      :interval="5000"
      controls
      fade
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333"
    >
      <b-carousel-slide
        v-for="image in parkInfo.images"
        :key="image.url"
        :caption="image.title"
        :text="image.caption"
        :img-src="image.url"
        :style="'object-fit:contain;'"
      >
      </b-carousel-slide>
    </b-carousel>
    <div class="tile" >
      <button style="color:black">
        <h2><router-link :to="{name:'openings', params: ID:10} >Openings</router-link></h2>

      </button>
    </div>
    <!-- List of possible activities -->
    <h2>Activities</h2>
    <div class="activities-wrapper">
      <b-badge
        v-for="activity in parkInfo.activities"
        :key="activity.id"
        pill
        variant="info"
        class="activity"
        href="#"
      >
        {{ activity.name }}
      </b-badge>
    </div>

    <!-- Displaying Campsites Name -->
    <b-form-group label="Campsites" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="btn-radios-2"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        button-variant="outline-info"
        size="md"
        name="radio-btn-outline"
        buttons
      ></b-form-radio-group>
    </b-form-group>
    <!-- The campground Tile will make the necessary API calls -->

    <CampgroundTile
      v-for="camp in options"
      :key="camp.value"
      :FacilityID="camp.value"
      v-show="camp.value == selected"
    />

    <!-- Google maps comnponent -->
    <GmapMap
      :center="center"
      :zoom="9"
      map-type-id="hybrid"
      style="width: 500px; height: 300px"
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
        console.log(
          "RIDB called with: ",
          "https://ridb.recreation.gov/api/v1/facilities?offset=0&latitude=" +
            this.center.lat +
            "&longitude=" +
            this.center.lng +
            "&radius=10&activity=CAMPING,9&lastupdated=01-01-2018&apikey=13f17cb4-1da1-402a-ac14-dc6f430a8bd5"
        );

        //I can use latitude and longitude to call active.gov
        fetch(
          "https://ridb.recreation.gov/api/v1/facilities?offset=0&latitude=" +
            this.center.lat +
            "&longitude=" +
            this.center.lng +
            "&radius=50&activity=CAMPING,9&lastupdated=01-01-2018&apikey=13f17cb4-1da1-402a-ac14-dc6f430a8bd5"
        )          .then((res) => res.json())
 .then((result) => {
            console.log("RIDB CAMPS:", result.RECDATA);
            this.campInfo = result.RECDATA.slice(0, 5);
            let range = 5;
            if (result.RECDATA.length < 5) {
              range = result.RECDATA.length;
            }
            for (let i = 0; i < range; i++) {
              if (i == 0) {
                this.selected = result.RECDATA[i].FacilityID;
                 }
              this.options.push({
                text: result.RECDATA[i].FacilityName,
                value: result.RECDATA[i].FacilityID,
              });
            }
                      });

      })
      .catch((error) => console.log("Error calling NPS.gov", error));

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

    //fetch campsite info from nps api
    fetch(
      "https://developer.nps.gov/api/v1/campgrounds?parkCode=" +
        this.$route.params.code +
        "&api_key=EoYJvbdhLZ0NUwj5io2JSXLWXXR7yTrYegUq02gC"
    )
      .then((res) => res.json())
      //save json into parkInfo
      .then((campData) => {
        console.log("Camping API", campData);
        this.campInfo = campData.data.slice(0, 5);
      })
      .catch((error) => console.log("Error calling Rec.gov", error));
  },
};
</script>

<style scoped>
<<<<<<< HEAD
.tile {
  position: relative;
  text-align: center;
  color: black;
  margin-bottom: 10px;
=======
.gallery {
  height: 700px;
>>>>>>> d660b3f402206c9ee0f33d0d639c0752fcdab3b2
}
.hero-img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  min-height: 500px;
  max-height: 700px;
}

.hero-text {
  backdrop-filter: blur(4px);
  min-height: 500px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 1px 1px 5px #000000, 0 0 3em #000000;
}

.hero-text p {
  margin-top: 30px;
  width: 70%;
}

.alerts-wrapper {
  width: 75%;
  margin: 0px auto;
  text-align: left;
}

.activity {
  font-size: 1em;
  padding: 10px;
  margin: 5px;
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
</style>