<template>
      <b-container fluid >
        <b-row align-h="center" >
            <h2 class="team-title" >Meet the Team</h2> </b-row>
        <b-row>
          <b-col lg="6" md="6" sm="12" v-for="student in programmer" :key="student.name">
              <div>
                <b-card align="left" border-variant="secondary" v-bind:header="student.name" class="app-card" bg-variant="dark" text-variant="white" sub-title='University:'>
                      <b-card-text>{{student.school}}    </b-card-text>
                    
                    <b-row class="app-buttons"  align-h="start" cols-lg="3" cols-md="1" >
                      <b-col class="ml-auto ">
                          <b-button v-bind:href="student.gitHubRepo" variant="outline-light"> <b-icon shift-h="-5" icon="github" font-scale="1"></b-icon>GitHub</b-button>
                      </b-col>
                      <b-col class="ml-auto" >
                          <b-button v-bind:href="student.linkedinProfile" variant="outline-light"> <b-icon shift-h="-5" icon="linkedin" font-scale="1"></b-icon>Linkedin</b-button>
                      </b-col>
                      <b-col class="ml-auto" >
                          <b-button v-bind:href="student.youTubeProfile" variant="outline-light"> <b-icon shift-h="-5" icon="youtube" font-scale="1"></b-icon>YouTube</b-button>
                      </b-col>
                        
                    
                    </b-row>

                </b-card>
                </div>
          </b-col>
        </b-row>
    </b-container>
    
</template>

<script>
export default {
    data(){


        return {
            programmer:[
                {name: "Armando Guardado",linkedinProfile: "https://www.linkedin.com/home",gitHubRepo: "https://github.com/MandoGuardado",school:"California State Univesrity- Northridge", youTubeProfile:"https://www.youtube.com/" },
                {name:"Luca Molinari", linkedinProfile:"https://www.linkedin.com/home", gitHubRepo: "https://github.com/LuMolinari",school:"California State Univesrity- Northridge",youTubeProfile:"https://www.youtube.com/" },
                {name: "Joshua Foster",linkedinProfile: "https://www.linkedin.com/home",gitHubRepo: "https://github.com/JoshuaFoster208",school:"California State Univesrity- Northridge",youTubeProfile:"https://www.youtube.com/" },
                {name: "Edgar Mancia",linkedinProfile: "https://www.linkedin.com/home",gitHubRepo: "https://github.com/eddiemm",school:"California State Univesrity- Northridge",youTubeProfile:"https://www.youtube.com/" }
            ]       
        }
    }    
}
</script>


<style scooped >
.app-card{
    margin-bottom: 20px;
}


.team-title{
    margin: 20px;
}

    
</style>