
<template>
    <div>
        <h2>{{name}}</h2>
        <h3>Availabilities</h3>
            <vc-date-picker
            :key="loadedKey"
            v-model='availableDates'
            :attributes='available'>
            </vc-date-picker>
            <h2 v-if="!isAvailable()">
                The campground is currently unavailable for reservations. 
                Please try again later.
            </h2>
                <h2 v-if="isAvailable()">{{phone}}</h2>
                <h2 v-if="isAvailable()">{{email}}</h2>
            <ul v-if="isAvailable()">
                <li v-for="item in items" :key="item.message">
                 {{ item.message }}
                 </li>
            </ul>



            <b-carousel
                v-if="photosExist()"
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
                    :caption="image.title"
                >
            </b-carousel-slide>
    </b-carousel>
           
    </div>


</template>

<script>
    var date = new Date;
    var curMonth = date.getMonth() +1;
    var curYear = date.getFullYear();
    export default {
        data() {
            return {
                name: "Loading...",
                loadedKey: 0,
                availableDates: new Date(), // Jan 25th, 2021
                phone: "",
                email: "",
                Reservable: true,
                items: [],
                images: [],
                available: [
                    {
                        id: 1,
                        dot: {
                            backgroundColor: 'red',
                        },
                        dates:[
                           
                        ],
                    },
                ],
                
                
                };
            },  
            methods:{
                forceRerender() {
                    this.loadedKey += 1;
                },

                photosExist(){
                     return this.images.length != 0;
                 },
                 isAvailable(){
                     return this.Reservable;
                 }

            },
            mounted() {
                var monthDif, monthVal, yearVal, y;
                if(this.name=="Loading..."){
                    fetch(
                        "https://ridb.recreation.gov/api/v1/facilities/" + this.$route.params.ID + 
                        "?full=true&apikey=13f17cb4-1da1-402a-ac14-dc6f430a8bd5")
                        .then((res) => res.json())
                        .then((result) => {
                            console.log("Individual campgrounds ", result);
                                this.name = result.FacilityName;
                                this.phone = "Contact Number: "+ result.FacilityPhone;
                                this.email = "Facility Email: "+ result.FacilityEmail;
                            if(result.Reservable == true){
                                for( y = 0; y<result.ACTIVITY.length; y++){
                                    console.log(result.ACTIVITY[y].ActivityName);
                                    this.items.push({message: result.ACTIVITY[y].ActivityName});
                                }
                                for( y = 0; y<result.MEDIA.length; y++){
                                    this.images.push({ url: result.MEDIA[y].URL, caption: result.MEDIA[y].Description, title: result.MEDIA[y].Title});
                                }
                            }
                            else{
                                this
                            }
                            this.Reservable = result.Reservable;
                                this.forceRerender();
                        })
                }

                for(var x = 1; x <= 6; x++){
                    /*Handle for case of the month value being greater than 12
                      update the month and year value to match*/
                    if(curMonth+x <= 12){
                        monthVal = curMonth+x;
                        yearVal = curYear;
                    }
                    else{
                        monthVal = curMonth + x - 12;
                        yearVal = curYear + 1;
                    }

                    //Alters the string for when months are 2 digits or a single digit
                    if(monthVal >= 10){
                        monthDif = '-';
                    }
                    else{
                        monthDif = "-0"
                    }
                    console.log("https://www.recreation.gov/api/camps/availability/campground/" +
                        this.$route.params.ID +
                        "/month?start_date=" + yearVal + monthDif +
                        (monthVal) + "-01T00%3A00%3A00.000Z")
                    //fetch dates available in the current month and the following 12 months
                    fetch(
                        "https://www.recreation.gov/api/camps/availability/campground/" +
                        this.$route.params.ID +
                        "/month?start_date=" + yearVal + monthDif +
                        (monthVal) + "-01T00%3A00%3A00.000Z"
                    )
                    .then((res) => res.json())
                    //save json dates into availableDates
                    .then((data) => {
                        const campIDs = [];
                        for(const sites in data.campsites){
                            campIDs.push(sites);
                        }
                        for(var x = 0; x<campIDs.length; x++){
                            for(const dates in data.campsites[campIDs[x]].availabilities){
                                var object = new Date(parseInt(dates.substring(0,4)), 
                                parseInt(dates.substring(5,7))-1, parseInt(dates.substring(8,10)));
                                this.available[0].dates.push(object);
                            }
                            
                        }

                        this.forceRerender();
                    })
                }
                
            },
            
            
        };
            
</script>