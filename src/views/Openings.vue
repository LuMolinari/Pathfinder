
<template>
    <div>
        <h1>test</h1>
            <vc-date-picker
            :key="loadedKey"
            v-model='availableDates'
            :attributes='available'>
            </vc-date-picker>
        <h2>
        {{test}}
        </h2>
           
    </div>


</template>

<script>
    export default {
        data() {
            return {
                test: 15,
                loadedKey: 0,
                availableDates: new Date(), // Jan 25th, 2021
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
                }
            },
            mounted() {
                //fetch dates available in the current month from inputed date
                fetch(
                    "https://www.recreation.gov/api/camps/availability/campground/" +
                    this.$route.params.ID +
                    "/month?start_date=2021-04-01T00%3A00%3A00.000Z"
                )
                .then((res) => res.json())
                //save json dates into availableDates
                .then((data) => {
                    const campIDs = [];
                    for(const sites in data.campsites){
                        campIDs.push(sites)
                    }
                    for(var x = 0; x<campIDs.length; x++){
                        for(const dates in data.campsites[campIDs[x]].availabilities){
                            var object = new Date(parseInt(dates.substring(0,4)), 
                            parseInt(dates.substring(5,7))-1, parseInt(dates.substring(8,10)));
                            this.available[0].dates.push(object);
                        }
                        
                    }

                    console.log("this.available.dates = ", this.available[0].dates[0]);
                    console.log("this.loadedKey = ", this.loadedKey);
                    this.forceRerender();
                    console.log("this.loadedKey = ", this.loadedKey);
                })

                //fetch dates available in the next month from inputed date
                fetch(
                    "https://www.recreation.gov/api/camps/availability/campground/" +
                    this.$route.params.ID +
                    "/month?start_date=2021-05-01T00%3A00%3A00.000Z"
                )
                .then((res) => res.json())
                //save json dates into availableDates
                .then((data) => {
                    const campIDs = [];
                    for(const sites in data.campsites){
                        campIDs.push(sites)
                    }
                    for(var x = 0; x<campIDs.length; x++){
                        for(const dates in data.campsites[campIDs[x]].availabilities){
                            var object = new Date(parseInt(dates.substring(0,4)), 
                            parseInt(dates.substring(5,7))-1, parseInt(dates.substring(8,10)));
                            this.available[0].dates.push(object);
                        }
                        
                    }

                    console.log("this.available.dates = ", this.available[0].dates[0]);
                    console.log("this.loadedKey = ", this.loadedKey);
                    this.forceRerender();
                    console.log("this.loadedKey = ", this.loadedKey);
                })

                //fetch dates available 2 months from current date
                fetch(
                    "https://www.recreation.gov/api/camps/availability/campground/" +
                    this.$route.params.ID +
                    "/month?start_date=2021-06-01T00%3A00%3A00.000Z"
                )
                .then((res) => res.json())
                //save json dates into availableDates
                .then((data) => {
                    const campIDs = [];
                    for(const sites in data.campsites){
                        campIDs.push(sites)
                    }
                    for(var x = 0; x<campIDs.length; x++){
                        for(const dates in data.campsites[campIDs[x]].availabilities){
                            var object = new Date(parseInt(dates.substring(0,4)), 
                            parseInt(dates.substring(5,7))-1, parseInt(dates.substring(8,10)));
                            this.available[0].dates.push(object);
                        }
                        
                    }

                    console.log("this.available.dates = ", this.available[0].dates[0]);
                    console.log("this.loadedKey = ", this.loadedKey);
                    this.forceRerender();
                    console.log("this.loadedKey = ", this.loadedKey);
                })

            },
            computed: {
                attributes() {
                    return this.available.map(a => ({
                        key: `avail.${a.id}`,
                        dot: {
                        backgroundColor: 'red',
                        },
                        dates: a.dates,
                        customData: a,
                    }));
                },
            }
        };
            
</script>