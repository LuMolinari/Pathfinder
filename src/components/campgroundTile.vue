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

    <b-button><router-link :to="{name:'OpeningsDisplay', params: { ID:FacilityID}} ">Check Availability</router-link></b-button>
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
  mounted() {
    let self = this;
    //make API call to get facility data
    let id = self.facilityID
    console.log("Facility ID",  id);
    
    console.log('API Called on :>> ', "https://ridb.recreation.gov/api/v1/facilities/" +  id + "?full=true&apikey=13f17cb4-1da1-402a-ac14-dc6f430a8bd5");

    fetch(
      "https://ridb.recreation.gov/api/v1/facilities/" +  id + "?full=true&apikey=13f17cb4-1da1-402a-ac14-dc6f430a8bd5"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("Individual campgrounds ", result);

        this.facilityInfo =  result ;
        let string = ('<div class="b">' + result.FacilityDescription + '</div>');
        let end = string.indexOf("<h2>Recreation</h2>");
        string = string.slice(0, end);
        this.facilityDescription = string

        for (let i = 0; i < result.MEDIA.length; i++) {
            this.images.push({ url: result.MEDIA[i].URL, caption: result.MEDIA[i].Description});
        }

      });
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