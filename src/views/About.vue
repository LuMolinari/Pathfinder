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
          <b-tab title="resources"   class="slide-content resources-slide overlay"> <h2>resources</h2>
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
            value="resources"
            type="radio"
            id="resourcesRadio"
          />
          <label id="labelForresources" for="resourcesRadio"> Resources </label>
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
                ratione molestias culpa magnam? Aperiam, sunt! Voluptatibus,
                error vel. Cum facere vel eaque fuga, assumenda totam nisi
                tenetur eos sapiente, rem aperiam. Nisi accusamus quis facere
                vitae. Tenetur aspernatur consequuntur autem quod blanditiis
                fugiat, amet quae pariatur provident velit?
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
                ratione molestias culpa magnam? Aperiam, sunt! Voluptatibus,
                error vel. Cum facere vel eaque fuga, assumenda totam nisi
                tenetur eos sapiente, rem aperiam. Nisi accusamus quis facere
                vitae. Tenetur aspernatur consequuntur autem quod blanditiis
                fugiat, amet quae pariatur provident velit?
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
                ratione molestias culpa magnam? Aperiam, sunt! Voluptatibus,
                error vel. Cum facere vel eaque fuga, assumenda totam nisi
                tenetur eos sapiente, rem aperiam. Nisi accusamus quis facere
                vitae. Tenetur aspernatur consequuntur autem quod blanditiis
                fugiat, amet quae pariatur provident velit?
              </p>
            </div>
          </div>

          <!-- content div -->
          <div
            v-if="picked === 'resources'"
            class="slide-content resources-slide"
          >
            <div class="overlay">
              <h2>Resources</h2>
              <p>
                Below are a few links you may find helpful regarding your next
                trip to any national park.
              </p>
              <ul>
                <li>
                  <a href="#" target="_blank"
                    >National Park Service - Official site from the US
                    government</a
                  >
                </li>
                <li>
                  <a href="#" target="_blank"
                    >Recreation - Camping, rental, passes and more.</a
                  >
                </li>
                <li>
                  <a href="#" target="_blank"
                    >National Park Foundation - Donate to those that help
                    protect our parks.</a
                  >
                </li>
                <li>
                  <a href="#" target="_blank"
                    >National Park Conservation Association - National park news
                    and resources.</a
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- Changed this slide to resources for links to park resources links/info -->
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
}

/* main styles */
.about {
  width: 100%;
  height: 100%;
  color: white;
  margin: 0px auto;
  /* width at which view changes from desktop to tablet or mobile */
  /* min-width: 600px; */
  /* prevents stretching content too far */
  /* max-width: 1000px; */
}

/* button styling */
.radio-buttons {
  height: 7%;
  width: 100%;
  /* 4 column grid */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

/* inactive label */
label {
  width: 100%;
  height: 50px;
  /* make labels seem clickable */
  cursor: pointer;
  color: white;
  background-color: #212429;
  font-weight: 400;
  font-size: 1rem;
  /* padding-top: 3px; */
  /* changes to the label will be linear (at single speed) and take .2 seconds */
  transition: linear 0.2s;
  /* hide the bottom border which appears during hover and clicked */
  border-bottom: 8px solid transparent;
  padding: 10px 7px 4px 7px;
  white-space: nowrap;
}

/* label hover */
label:hover {
  font-size: 1.1rem;
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
#resourcesRadio:checked ~ #labelForresources {
  border-bottom: 8px solid #8ccfb9;
  font-weight: 600;
  font-size: 1.1rem;
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
  font-size: 2em;
  padding: 40px 0px;
}

/* copy */
p {
  text-align: left;
  font-size: 1.5em;
}

/* content */
.slide-content {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  font-size: 16px;
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

.resources-slide {
  background-image: url(../assets/resources-image.jpg);
}

/* transparent black image overlay */
.overlay {
  width: 100%;
  height: 100%;
  min-height: 600px;
  background-color: rgba(0, 0, 0, 0.55);
  padding: 0px 7%;
}

/* needed to add this because the default cursor is a pointer but i couldnt figure out why */
h2:hover {
  cursor: default;
}

.resources-slide p {
  margin: 0px 0;
  text-align: left;
}

.resources-slide ul {
  margin: 0px 15%;
  font-size: 1.2em;
  text-align: left;
  list-style: none;
  list-style-position: outside;
}

.resources-slide ul li {
  margin: 25px 0;
  padding-left: 15px;
}

/* pseudo element for styling the list bullets */
.resources-slide ul li::marker {
  color: white;
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzIiIGhlaWdodD0iMzIiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTg2LDIxLjVjLTE5LjgxNzk3LDAgLTM2LjIyNDE5LDEzLjY0MzY2IC00MS4xNjI4NCwzMS45NjY1NWMtMTMuNzY5MTgsNy4xNzE4OSAtMjMuMzM3MTYsMjEuMzUzOCAtMjMuMzM3MTYsMzcuOTA4NDVjMCwyMy42ODQ2IDE5LjMxNTQsNDMgNDMsNDNoMTYuMTI1djE2LjEyNWgxMC43NXYtMzUuMzk5NDJsMjUuMzAwMjksLTI1LjMwMDI5bC03LjYwMDU4LC03LjYwMDU4bC0xNy42OTk3MSwxNy42OTk3MXYtNDYuMTQ5NDJoLTEwLjc1djM1LjM5OTQybC0xNy42OTk3MSwtMTcuNjk5NzFsLTcuNjAwNTgsNy42MDA1OGwyNS4zMDAyOSwyNS4zMDAyOXYxOS4yNzQ0MmgtMTYuMTI1Yy0xNy44NzQ5LDAgLTMyLjI1LC0xNC4zNzUxIC0zMi4yNSwtMzIuMjVjMCwtMTMuMTQ5NDMgNy44Mzk5OSwtMjQuMzcyMTIgMTkuMDY0NDUsLTI5LjQxNTUzbDIuNTMwMDMsLTEuMTMzNzlsMC41NDU5LC0yLjcwODQ5YzIuOTYwMjgsLTE0Ljc0NjE3IDE1LjkyNjczLC0yNS44NjcxOSAzMS42MDk2MiwtMjUuODY3MTljMTUuNjgyODksMCAyOC42NDkzNCwxMS4xMjEwMiAzMS42MDk2MiwyNS44NjcxOWwwLjU0NTksMi43MDg0OWwyLjUzMDAzLDEuMTMzNzljMTEuMjI0NDYsNS4wNDM0MSAxOS4wNjQ0NSwxNi4yNjYwOSAxOS4wNjQ0NSwyOS40MTU1M2MwLDE3Ljg3NDkgLTE0LjM3NTEsMzIuMjUgLTMyLjI1LDMyLjI1aC01LjM3NXYxMC43NWg1LjM3NWMyMy42ODQ2LDAgNDMsLTE5LjMxNTQgNDMsLTQzYzAsLTE2LjU1NDY1IC05LjU2Nzk4LC0zMC43MzY1NiAtMjMuMzM3MTYsLTM3LjkwODQ1Yy00LjkzODY1LC0xOC4zMjI5IC0yMS4zNDQ4NywtMzEuOTY2NTUgLTQxLjE2Mjg0LC0zMS45NjY1NXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==");
}

a,
a:visited {
  text-decoration: none;
  color: #fff;
}

a:hover {
  text-decoration: none;
  color: #8ccfb9;
}

/* Adjusting radio button / tab labels */
@media only screen and (max-width: 360px) {
  .radio-buttons {
    display: block;
  }
}
</style>

