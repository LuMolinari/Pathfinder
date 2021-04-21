<template>
  <div class="campgroundTile">
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
        v-for="image in images"
        :key="image.url"
        :text="image.caption"
        :img-src="image.url"
      >
      </b-carousel-slide>
    </b-carousel>
    <div class="vHTML" v-html="facilityDescription"></div>
    <b-button>Check Availability</b-button>
  </div>
</template>

<script>
var parseString = require("xml2js").parseString;

export default {
  name: "CampgroundTile",
  props: ["facilityID", "contractType"],
  data() {
    return {
      facilityInfo: Object,
      facilityDescription: "",
      images: [],
    };
  },
  mounted() {
    let self = this;
    //make API call to get facility data
    console.log("Facility ID", self.facilityID);
    console.log("CampType", self.contractType);
    console.log('API Called on :>> ', "http://api.amp.active.com/camping/campground/details?contractCode="+ self.contractType+"&parkId="+self.facilityID+"&api_key=wkktkqmdqgxgsuxm23nxsv8m");
    fetch(
      "http://api.amp.active.com/camping/campground/details?contractCode="+ self.contractType+"&parkId="+self.facilityID+"&api_key=wkktkqmdqgxgsuxm23nxsv8m"
    )
      .then((res) => res.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((result) => {
        console.log("Returned by Active API call: ", result);
        let xml = new XMLSerializer().serializeToString(result);
        parseString(xml, function (err, result) {
          console.dir(result);
      
        });
      });

    // fetch(
    //   "https://ridb.recreation.gov/api/v1/facilities/" + self.FacilityID + "?full=true&apikey=13f17cb4-1da1-402a-ac14-dc6f430a8bd5"
    // )
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log("Individual campgrounds ", result);

    //     this.facilityInfo =  result ;
    //     let string = ('<div class="b">' + result.FacilityDescription + '</div>');
    //     let end = string.indexOf("<h2>Recreation</h2>");
    //     string = string.slice(0, end);
    //     this.facilityDescription = string

    //     for (let i = 0; i < result.MEDIA.length; i++) {
    //         this.images.push({ url: result.MEDIA[i].URL, caption: result.MEDIA[i].Description});
    //     }

    //   });
  },
};
</script>

<style scoped>
/* It's complicated but it's the only way i can do css and use v-html together  */
.campgroundTile {
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 80%;
  margin: 30px auto;
  background: darkcyan;
  border-radius: 50px;
}

.carousel-fade {
  margin: 20px;
  width: 75%;
  height: 400px;
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
}

.vHTML >>> .b p {
  text-align: left;
}
</style>