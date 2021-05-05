<template>
  <div class="campgroundTile">
    <b-container>
      <b-row cols="1" cols-sm="1" cols-md="2">
        <b-col v-if="photosExist()">
          <!-- <b-row>
            <b-col v-for="image in images.slice(0,3)"
        :key="image.url">
        <b-img thumbnail :src="image.url"></b-img>
        {{image.caption}}
            </b-col>
          </b-row> -->
          <b-carousel
      v-if="photosExist()"
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
        </b-col>
        <b-col  class="vHTML" v-html="facilityDescription">
          
        </b-col>
      </b-row>
    </b-container>




    <!-- <b-carousel
      v-if="photosExist()"
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
    <div class="vHTML" v-html="facilityDescription"></div> -->

<<<<<<< HEAD
    <b-button><router-link :to="{name:'OpeningsDisplay', params: { ID:facilityID}} ">Check Availability</router-link></b-button>
=======
    <b-button><router-link class="link-to-availability" :to="{name:'OpeningsDisplay', params: { ID:facilityID}} ">Check Availability</router-link></b-button>
>>>>>>> 5cb9211edc17ad83d20ca1bb086d66b4ad8afc5b
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
  methods:{
    photosExist(){
      return this.images.length != 0;
    }
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
        let string =  this.facilityInfo.FacilityDescription;
        //let string = ('<div class="b">' + result.FacilityDescription + '</div>');
        let start = 0;
        if (string.includes("<h2>Overview</h2>")) {
          start = string.indexOf("<h2>Overview</h2>") + 17;
        }
        let end = string.indexOf("<h2>Recreation</h2>");
        string = string.slice(start, end);
        string = ('<div class="b">' + string + '</div>');
        this.facilityDescription = string;
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
.vHTML >>> .b p {
}
.link-to-availability{
  color:whitesmoke;
  text-decoration: none;
}
</style>