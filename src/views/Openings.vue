
<template>
    <div>
        <h1>test</h1>
            <vc-date-picker
            v-model='selectedDate'
            :attributes='available'>
            </vc-date-picker>

           
    </div>


</template>

<script>
    export default {
        data() {
            return {
                selectedDate: new Date(), // Jan 25th, 2021
                available: [
                    {
                        dot: {
                            backgroundColor: 'red',
                        },
                        dates:[
                            new Date(2021, 3, 1),
                            new Date(2021, 3, 10),
                            new Date(2021, 3, 22),
                            new Date(2021, 4, 6),
                            new Date(2021, 4, 16),
                        ],
                    },
                ]
                
                };
            },  
            
        };
</script>