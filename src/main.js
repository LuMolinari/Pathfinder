import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as GmapVue from 'gmap-vue'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons} from 'bootstrap-vue'
import VCalendar from 'v-calendar';
import firebase from 'firebase'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const firebaseConfig = {
  apiKey: "AIzaSyDYByEn684AW9-ikuAMWVJu-IwT9EeooWU",
  authDomain: "pathfinder-17a7e.firebaseapp.com",
  projectId: "pathfinder-17a7e",
  storageBucket: "pathfinder-17a7e.appspot.com",
  messagingSenderId: "545674674712",
  appId: "1:545674674712:web:599d42b0d4b548767f796d",
  measurementId: "G-VC3C92EF31"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});

// MAke Google Maps Module available throughout module
Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyAU5_yxQ1bYFWZlIhJlCJLyK9Karrx1W3M',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'gmap-vue/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
