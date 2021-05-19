<template>
  <div class="campgroundTile">
    <b-container>
      <b-row cols="1" cols-sm="1" cols-md="2" align-v="center">
        <b-col v-if="photosExist()">
          <b-img thumbnail :src="images[0].url" alt="park image"></b-img>
        </b-col>
        <b-col class="vHTML" v-html="facilityDescription"> </b-col>
      </b-row>
    </b-container>

      <b-button class="availability-button" v-if="reservable()">
        <router-link
          class="link-to-availability"
          :to="{ name: 'OpeningsDisplay', params: { ID: facilityID } }"
          >Check Availability</router-link
        >
      </b-button>
      <b-button v-else disabled class="availability-button" variant="outline-secondary">
          Check Availability
      </b-button>
  </div>
</template>

<script>
export default {
  name: "CampgroundTile",
  props: ["facilityID"],
  data() {
    return {
      facilityInfo: Object,
      facilityDescription: "",
      images: [],
    };
  },
  methods: {
    photosExist() {
      return this.images.length != 0;
    },
    reservable() {
      return this.facilityInfo.Reservable;
    }
  },
  mounted() {
    let self = this;
    //make API call to get facility data
    let id = self.facilityID;
    console.log("Facility ID", id);

    console.log(
      "API Called on :>> ",
      "https://ridb.recreation.gov/api/v1/facilities/" +
        id +
        "?full=true&apikey=13f17cb4-1da1-402a-ac14-dc6f430a8bd5"
    );
    fetch(
      "https://ridb.recreation.gov/api/v1/facilities/" +
        id +
        "?full=true&apikey=13f17cb4-1da1-402a-ac14-dc6f430a8bd5"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("Individual campgrounds ", result);
        this.facilityInfo = result;
        let string = this.facilityInfo.FacilityDescription;
        //let string = ('<div class="b">' + result.FacilityDescription + '</div>');
        let start = 0;
        if (string.includes("<h2>Overview</h2>")) {
          start = string.indexOf("<h2>Overview</h2>") + 17;
        }
        let end = string.indexOf("<h2>Recreation</h2>");
        string = string.slice(start, end);
        string = '<div class="b">' + string + "</div>";
        this.facilityDescription = string;
        for (let i = 0; i < result.MEDIA.length; i++) {
          this.images.push({
            url: result.MEDIA[i].URL,
            caption: result.MEDIA[i].Description,
          });
        }
      });
  },
};
</script>

<style scoped>
/* It's complicated but it's the only way i can do css and use v-html together  */
.campgroundTile {
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 80%;
  margin: 30px auto;
  background: whitesmoke;
  border-radius: 50px;
}
.carousel-fade {
  margin: 20px;
  width: 75%;
  height: 400px;
}

.availability-button {
  margin-top: 15px;
}

.col img {
  min-height: 300px;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.carousel-item {
  filter: brightness(90%);
  height: 400px;
  object-fit: contain !important;
}
.carousel-item img {
  height: 100vh !important ;
}

.vHTML >>> .b {
  font-size: 1em;
  text-align: left;
}

.link-to-availability {
  color: whitesmoke;
  text-decoration: none;
}
</style>