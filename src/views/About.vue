<template>
<div>
   <div class="route-view">
     
    <!-- main section-->
    <div class="about">
      <!-- <b-tabs  tabs justified class="slide-content-area">
          <b-tab title="Meet The Team" active class="slide-content meet-slide overlay"> <h2>Meet the Team</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              ullam nam iusto sed nisi placeat culpa minus nihil tempore
              quibusdam! Totam beatae maxime corrupti odio aspernatur
              consectetur fugit mollitia adipisci? Vitae id non voluptatum nam
              aut? Repellat, architecto illum. Corporis ea, voluptatum cum
              repellat quod, officiis officia voluptates nihil maiores, magni
              ratione molestias culpa magnam? Aperiam, sunt! Voluptatibus, error
              vel. Cum facere vel eaque fuga, assumenda totam nisi tenetur eos
              sapiente, rem aperiam. Nisi accusamus quis facere vitae. Tenetur
              aspernatur consequuntur autem quod blanditiis fugiat, amet quae
              pariatur provident velit?
            </p></b-tab>
          <b-tab title="Mission" active class="slide-content mission-slide overlay">   
            <h2>Our Mission</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              ullam nam iusto sed nisi placeat culpa minus nihil tempore
              quibusdam! Totam beatae maxime corrupti odio aspernatur
              consectetur fugit mollitia adipisci? Vitae id non voluptatum nam
              aut? Repellat, architecto illum. Corporis ea, voluptatum cum
              repellat quod, officiis officia voluptates nihil maiores, magni
              ratione molestias culpa magnam? Aperiam, sunt! Voluptatibus, error
              vel. Cum facere vel eaque fuga, assumenda totam nisi tenetur eos
              sapiente, rem aperiam. Nisi accusamus quis facere vitae. Tenetur
              aspernatur consequuntur autem quod blanditiis fugiat, amet quae
              pariatur provident velit?
            </p></b-tab>
          <b-tab title="Purpose" class="slide-content purpose-slide overlay"><h2>Purpose</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              ullam nam iusto sed nisi placeat culpa minus nihil tempore
              quibusdam! Totam beatae maxime corrupti odio aspernatur
              consectetur fugit mollitia adipisci? Vitae id non voluptatum nam
              aut? Repellat, architecto illum. Corporis ea, voluptatum cum
              repellat quod, officiis officia voluptates nihil maiores, magni
              ratione molestias culpa magnam? Aperiam, sunt! Voluptatibus, error
              vel. Cum facere vel eaque fuga, assumenda totam nisi tenetur eos
              sapiente, rem aperiam. Nisi accusamus quis facere vitae. Tenetur
              aspernatur consequuntur autem quod blanditiis fugiat, amet quae
              pariatur provident velit?
            </p></b-tab>
          <b-tab title="Sustainability"   class="slide-content sustainability-slide overlay"> <h2>Sustainability</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              ullam nam iusto sed nisi placeat culpa minus nihil tempore
              quibusdam! Totam beatae maxime corrupti odio aspernatur
              consectetur fugit mollitia adipisci? Vitae id non voluptatum nam
              aut? Repellat, architecto illum. Corporis ea, voluptatum cum
              repellat quod, officiis officia voluptates nihil maiores, magni
              ratione molestias culpa magnam? Aperiam, sunt! Voluptatibus, error
              vel. Cum facere vel eaque fuga, assumenda totam nisi tenetur eos
              sapiente, rem aperiam. Nisi accusamus quis facere vitae. Tenetur
              aspernatur consequuntur autem quod blanditiis fugiat, amet quae
              pariatur provident velit?
            </p></b-tab>
      </b-tabs> -->


        <!-- radio button wrapper -->
      <div class="radio-buttons">
        <!-- radio button -->
        <input
          v-model="picked"
          value="meet"
          type="radio"
          id="meetRadio"
          checked
        />
        <label id="labelForMeetTheTeam" for="meetRadio">Meet The Team</label>

        <!-- radio button -->
        <input
          v-model="picked"
          value="mission"
          type="radio"
          id="missionRadio"
        />
        <label id="labelForMission" for="missionRadio">Mission</label>

        <!-- radio button -->
        <input
          v-model="picked"
          value="purpose"
          type="radio"
          id="purposeRadio"
        />
        <label id="labelForPurpose" for="purposeRadio">Purpose</label>

        <!-- radio button -->
        <input
          v-model="picked"
          value="sustainability"
          type="radio"
          id="sustainabilityRadio"
        />
        <label id="labelForSustainability" for="sustainabilityRadio">
          Sustainability
        </label>
      </div>



      <!-- slide content wrapper -->
      <div class="slide-content-area">
        <!-- each content div below depends on value of 'picked' -->
        <div v-if="picked === 'meet'" class="slide-content meet-slide">
          <!-- dark overlay for the background of the slide -->
          <div class="overlay">
            <h2>Meet the Team</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              ullam nam iusto sed nisi placeat culpa minus nihil tempore
              quibusdam! Totam beatae maxime corrupti odio aspernatur
              consectetur fugit mollitia adipisci? Vitae id non voluptatum nam
              aut? Repellat, architecto illum. Corporis ea, voluptatum cum
              repellat quod, officiis officia voluptates nihil maiores, magni
              ratione molestias culpa magnam? Aperiam, sunt! Voluptatibus, error
              vel. Cum facere vel eaque fuga, assumenda totam nisi tenetur eos
              sapiente, rem aperiam. Nisi accusamus quis facere vitae. Tenetur
              aspernatur consequuntur autem quod blanditiis fugiat, amet quae
              pariatur provident velit?
            </p>
          </div>
        </div>

        <!-- content div -->
        <div v-if="picked === 'mission'" class="slide-content mission-slide">
          <div class="overlay">
            <h2>Our Mission</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              ullam nam iusto sed nisi placeat culpa minus nihil tempore
              quibusdam! Totam beatae maxime corrupti odio aspernatur
              consectetur fugit mollitia adipisci? Vitae id non voluptatum nam
              aut? Repellat, architecto illum. Corporis ea, voluptatum cum
              repellat quod, officiis officia voluptates nihil maiores, magni
              ratione molestias culpa magnam? Aperiam, sunt! Voluptatibus, error
              vel. Cum facere vel eaque fuga, assumenda totam nisi tenetur eos
              sapiente, rem aperiam. Nisi accusamus quis facere vitae. Tenetur
              aspernatur consequuntur autem quod blanditiis fugiat, amet quae
              pariatur provident velit?
            </p>
          </div>
        </div>

        <!-- content div -->
        <div v-if="picked === 'purpose'" class="slide-content purpose-slide">
          <div class="overlay">
            <h2>Purpose</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              ullam nam iusto sed nisi placeat culpa minus nihil tempore
              quibusdam! Totam beatae maxime corrupti odio aspernatur
              consectetur fugit mollitia adipisci? Vitae id non voluptatum nam
              aut? Repellat, architecto illum. Corporis ea, voluptatum cum
              repellat quod, officiis officia voluptates nihil maiores, magni
              ratione molestias culpa magnam? Aperiam, sunt! Voluptatibus, error
              vel. Cum facere vel eaque fuga, assumenda totam nisi tenetur eos
              sapiente, rem aperiam. Nisi accusamus quis facere vitae. Tenetur
              aspernatur consequuntur autem quod blanditiis fugiat, amet quae
              pariatur provident velit?
            </p>
          </div>
        </div>

        <!-- content div -->
        <div
          v-if="picked === 'sustainability'"
          class="slide-content sustainability-slide"
        >
          <div class="overlay">
            <h2>Sustainability</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              ullam nam iusto sed nisi placeat culpa minus nihil tempore
              quibusdam! Totam beatae maxime corrupti odio aspernatur
              consectetur fugit mollitia adipisci? Vitae id non voluptatum nam
              aut? Repellat, architecto illum. Corporis ea, voluptatum cum
              repellat quod, officiis officia voluptates nihil maiores, magni
              ratione molestias culpa magnam? Aperiam, sunt! Voluptatibus, error
              vel. Cum facere vel eaque fuga, assumenda totam nisi tenetur eos
              sapiente, rem aperiam. Nisi accusamus quis facere vitae. Tenetur
              aspernatur consequuntur autem quod blanditiis fugiat, amet quae
              pariatur provident velit?
            </p>
          </div>
        </div>

        <!-- Changed this slide to sustainability for links to park sustainability links/info -->
        <!-- <h2>National Park Service History</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos ullam nam
          iusto sed nisi placeat culpa minus nihil tempore quibusdam! Totam beatae
          maxime corrupti odio aspernatur consectetur fugit mollitia adipisci?
          Vitae id non voluptatum nam aut? Repellat, architecto illum. Corporis
          ea, voluptatum cum repellat quod, officiis officia voluptates nihil
          maiores, magni ratione molestias culpa magnam? Aperiam, sunt!
          Voluptatibus, error vel. Cum facere vel eaque fuga, assumenda totam nisi
          tenetur eos sapiente, rem aperiam. Nisi accusamus quis facere vitae.
          Tenetur aspernatur consequuntur autem quod blanditiis fugiat, amet quae
          pariatur provident velit?
        </p> -->
      </div>
    </div>
  </div>
  
</div>
  <!-- view area -->
 
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      picked: "meet",
    };
  },

};
</script>

<style scoped>
/* Chose this font just for test design */
/* Titillium Web */
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap");

/* global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.route-view {
  width: 100%;
  height: 100%;
  /* add a dim white to background */
  /* background-color: #f0f0f0; */
  /* fixed to remove the scroll bar */
  position: relative;
  padding: 15px;

}

/* main styles */
.about {
  font-family: "Titillium Web", Arial, sans-serif;
  width: 100%;
  height: 100%;
  color: white;
  margin: 0% auto;
  /* width at which view changes from desktop to tablet or mobile */
  /* min-width: 600px; */
  /* prevents stretching content too far */
  /* max-width: 1000px; */
}

/* button styling */
.radio-buttons {
  height: 50px;
  width: 100%;
  /* 4 column grid */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

/* inactive label */
label {
  width: 100%;
  height: 100%;
  /* make labels seem clickable */
  cursor: pointer;
  color: white;
  background-color: #556575;
  font-weight: 400;
  padding-top: 3px;
  /* changes to the label will be linear (at single speed) and take .2 seconds */
  transition: linear 0.2s;
  /* hide the bottom border which appears during hover and clicked */
  border-bottom: 8px solid transparent;
  padding-top: 10px;
  padding-bottom: 4px;
}

/* label hover */
label:hover {
  /* bg color change */
  background-color: #88a0ba;
  font-size: 17px;
  /* bottom border appears */
  border-bottom: 8px solid #8ccfb9;
  /* specifies offset from element frame: offset-x offset-y color*/
  box-shadow: inset 0 -50px #8ccfb9;
}

/* selected radio/label */
/* label which immediately follows the checked radio button */
#meetRadio:checked ~ #labelForMeetTheTeam,
#missionRadio:checked ~ #labelForMission,
#purposeRadio:checked ~ #labelForPurpose,
#sustainabilityRadio:checked ~ #labelForSustainability {
  background-color: #284b63;
  border-bottom: 8px solid #8ccfb9;
  font-weight: 600;
  font-size: 17px;
}

/* hide the radio buttons */
input {
  display: none;
}

/* content wrapper */
.slide-content-area {
  width: 100%;
  height: 100%;
  color: white;
}
 
/* headings */
h2 {
  padding: 30px 0;
}

/* copy */
p {
  text-align: left;
}

/* content */
.slide-content {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* background images for each individual slide */
.meet-slide {
  background-image: url(../assets/team-image.jpg);
}

.mission-slide {
  background-image: url(../assets/mission-image.jpg);
}

.purpose-slide {
  background-image: url(../assets/purpose-image.jpg);
}

.sustainability-slide {
  background-image: url(../assets/sustainability-image.jpg);
}

/* transparent black image overlay */
.overlay {
  width: 100%;
  height: 100%;
  min-height: 600px;
  background-color: rgba(0, 0, 0, 0.55);
  padding: 0 100px;
}

/* needed to add this because the default cursor is a pointer but i couldnt figure out why */
h2:hover {
  cursor: default;
}
</style>