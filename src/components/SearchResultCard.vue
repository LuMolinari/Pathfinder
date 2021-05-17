<template>
  <!-- link to ParkDetails route when clicked and pass in parkCode -->
  <router-link :to="{ name: 'ParkDetails', params: { code: park.parkCode } }">
    <!-- bootstrap card -->
    <b-card no-body class="bg-dark mt-4 overflow-hidden main-card-view">
      <!-- main row (single row, two columns)-->
      <b-row cols="2" no-gutters>
        <!-- image -->
        <b-col cols="5" md="5">
          <!-- park image -->
          <b-card-img
            v-bind:src="park.imageUrl"
            alt="Image"
            class="rounded-0 image"
            style="min-height: 178px"
            fluid
            center
          ></b-card-img>
        </b-col>

        <!-- card content -->
        <b-col class="text-left py-2 px-2" cols="7" md="7">
          <!-- park name -->
          <b-card-title class="h5 mb-3 ml-1">{{ park.name }}</b-card-title>

          <!-- nested rows below used to position icons and text correctly -->
          <!-- map and location row -->
          <b-row cols="2" class="ml-0 mr-n5 mb-1 align-content-center px-1">
            <!-- icon column -->
            <b-col cols="1" class="mx-0 align-self-center"
              ><b-icon-map
                class="mr-1 justify-self-center icon"
                shift-h="-8"
              ></b-icon-map
            ></b-col>
            <!-- info column -->
            <b-col class="text-left park-info pl-1" cols="8" sm="10"
              ><b-card-text class="my-0 medium"
                >{{ park.city }}, {{ park.state }}</b-card-text
              ></b-col
            >
          </b-row>

          <!-- bike icon and activities row -->
          <b-row cols="2" class="ml-0 mr-n5 my-2 align-content-center px-1">
            <!-- icon column -->
            <b-col cols="1" class="mx-0"
              ><b-icon-bicycle
                shift-h="-8"
                class="mr-1 justify-self-center icon"
              ></b-icon-bicycle
            ></b-col>
            <!-- info column -->
            <b-col class="text-left park-info pl-1" cols="8" sm="10"
              ><b-card-text class="my-0 medium text-truncate">
                <span v-for="(activity, index) in park.activities" :key="index"
                  >{{ activity["name"] }},
                </span>
              </b-card-text></b-col
            >
          </b-row>

          <!-- thermometer icon and weather temp -->
          <b-row cols="2" class="ml-0 mr-n5 mb-1 px-1">
            <!-- icon column -->
            <b-col cols="1" class="mx-0 align-self-center"
              ><b-icon-thermometer-half
                shift-h="-8"
                class="mr-1 justify-self-center icon"
              ></b-icon-thermometer-half
            ></b-col>
            <!-- info column -->
            <b-col
              class="text-left park-info align-self-center pl-1"
              cols="8"
              sm="10"
              ><b-card-text class="my-0 medium text-left"
                >{{ park.temp }}&deg;</b-card-text
              ></b-col
            >
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </router-link>
</template>

<script>
/* to be imported else where */
export default {
  /* to better identify component in inspector */
  name: "SearchResultCard",
  /* paramters passed into this component */
  props: ["park"],
};
</script>

<style scoped>
/* Mobile first design */
/* styling for any devices with max-width of 600px*/
.main-card-view {
  max-height: 250px;
}

/* add filter to card on hover */
.main-card-view:hover {
  max-height: 250px;
  filter: brightness(1.3);
}
.h5 {
  font-size: 1.4em;
}
.park-info {
  font-size: 0.9em;
}
.icon {
  font-size: 0.9em;
}
/* remove default link behavior */
a {
  text-decoration: none;
  color: white;
}

a:visited {
  color: white;
}

a:hover {
  text-decoration: none;
  color: white;
}

/* adjustments made for bigger devices */
/* portrait tablets, large phones */
@media only screen and (min-width: 600px) {
  .h5 {
    font-size: 1.6em;
  }
  .park-info {
    font-size: 1.2em;
  }
  .icon {
    font-size: 1.2em;
  }
}
/* larger devices */
@media only screen and (min-width: 768px) {
  .h5 {
    font-size: 1.8em;
  }
  .park-info {
    font-size: 1.4em;
  }
  .icon {
    font-size: 1.4em;
  }
}
</style>