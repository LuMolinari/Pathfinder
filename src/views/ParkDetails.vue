<template>
  <div v-if="parkInfo != null">
    <img :src="parkInfo.images[0].url" alt="" width="100%" />
    <h1>{{ parkInfo.fullName }}</h1>

    <!-- Gathering Contact Info -->
    <div class="contactInfo">
      <h2>
        {{ parkInfo.addresses[0].city }}, {{ parkInfo.addresses[0].stateCode }}
      </h2>
      <hr />
      <h3>Contact Info</h3>
      <p>Phone</p>
      <p>{{ parkInfo.contacts.phoneNumbers[0].phoneNumber }}</p>
      <p>Email</p>
      {{ parkInfo.contacts.emailAddresses[0].emailAddress }}
      <button>Official Site</button>
    </div>

    <p class="description">
      {{ parkInfo.description }}
    </p>

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
    </div>
  </div>

  <!-- Display google maps -->
</template>

<script>
export default {
  data() {
    return {
      parkInfo: null,
      campInfo: null,
    };
  },
  created() {
    //fetch general park info from  nps api
    fetch(
      "https://developer.nps.gov/api/v1/parks?parkCode=" +
        this.$route.params.code +
        "&api_key=EoYJvbdhLZ0NUwj5io2JSXLWXXR7yTrYegUq02gC"
    )
      .then((res) => res.json())
      //save json into parkInfo
      .then((data) => (this.parkInfo = data.data[0]))
      .catch((error) => console.log("Error calling NPS.gov", error));

    //fetch campsite info from nps api
    fetch(
      "https://developer.nps.gov/api/v1/campgrounds?parkCode=" +
        this.$route.params.code +
        "&api_key=EoYJvbdhLZ0NUwj5io2JSXLWXXR7yTrYegUq02gC"
    )
      .then((res) => res.json())
      //save json into parkInfo
      .then((campData) => {
        console.log(campData);
        this.campInfo = campData.data.slice(0, 5);
      })
      .catch((error) => console.log("Error calling NPS.gov", error));
  },
};
</script>

<style scoped>
</style>