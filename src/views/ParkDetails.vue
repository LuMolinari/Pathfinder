<template>

  <div v-if="parkInfo != null" class="wrapper">
       
    <img :src="parkInfo.images[0].url" alt="" width="100%" />
    <h1>{{ parkInfo.fullName }}</h1>

    <!-- Gathering Contact Info -->
    <div class="contactInfo">
      <h2 v-if="parkInfo.addresses[0] != null">
        {{ parkInfo.addresses[0].city }}, {{ parkInfo.addresses[0].stateCode }}
      </h2>
      <hr />
      <h3>Contact Info</h3>
      <p>Phone</p>
      <p v-if="parkInfo.contacts.phoneNumbers[0] != null">
        {{ parkInfo.contacts.phoneNumbers[0].phoneNumber }}
      </p>
      <p v-else>No PHone Number Found</p>
      <p>Email</p>
      <p v-if="parkInfo.contacts.emailAddresses[0] != null">
        {{ parkInfo.contacts.emailAddresses[0].emailAddress }}
      </p>
      <p v-else>No Email Found</p>
      <a :href="parkInfo.url" target="_blank" rel="noopener noreferrer"
        >Official Site</a
      >
    </div>

    <p class="description">
      {{ parkInfo.description }}
    </p>

    <div v-if="alerts != null" class="alerts">
      <h2>Park Alerts</h2>
      <div v-for="alert in alerts" :key="alert.id">
        <h3>{{ alert.title }}</h3>
        <p>{{ alert.description }}</p>
      </div>
    </div>

    <!-- Using a for loop and v:bind to fill in images from the gallery -->
    <h2>Gallery</h2>
    <div class="gallery">
      <div v-for="image in parkInfo.images" :key="image.url">
        <div v-if="image.url != parkInfo.images[0].url">
          <h3>{{ image.title }}</h3>
          <img :src="image.url" :alt="image.altText" height="200px" />
          <p>{{ image.caption }}</p>
        </div>
      </div>
    </div>

    <h2>Activities</h2>
    <div class="Activities">
      <div v-for="activity in parkInfo.activities" :key="activity.id">
        {{ activity.name }}
      </div>
    </div>

    <!-- Displaying Campsite Name -->
    <h2>Campsites</h2>
    <div v-for="camp in campInfo" :key="camp.id">
      <button>{{ camp.name }}</button>
      <CampgroundTile :campground="camp" />
    </div>


    <!-- Google maps integration -->
     <GmapMap
      :center="center"
      :zoom="9"
      map-type-id="hybrid"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>

    
  </div>

</template>

<script>
import CampgroundTile from '../components/campgroundTile.vue'

export default {
  name: 'ParkInfo',
  data() {
    return {
      parkInfo: null,
      campInfo: null,
      alerts: null,
      // If you decide to add any map markers
      markers: [], 
      center: { lat: 4.5, lng: 99 },

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
        this.center.lat = parseFloat(data.data[0].latitude)
        this.center.lng = parseFloat(data.data[0].longitude)

        this.$refs.mapRef.$mapPromise.then((map) => {
            map.panTo({lat: data.data[0].latitude, lng: data.data[0].longitude})
         })
      })
      .catch((error) => console.log("Error calling NPS.gov", error));

    //fetching any alerts for the park
    console.log(
      "Fetchiong from",
      "https://developer.nps.gov/api/v1/alerts?parkCode=" +
        this.$route.code +
        "&api_key=EoYJvbdhLZ0NUwj5io2JSXLWXXR7yTrYegUq02gC"
    );
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
</style>