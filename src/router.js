import Vue from 'vue'
import Router from 'vue-router'
import Example from './components/Example/Example.vue'
import Example2 from './components/Example/Example2.vue'
import Home from './components/Home.vue'
import Stats from './components/Stats.vue'
import Sign from './components/Sign.vue'
import Profile from './components/Profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Example/',
      name: 'Example',
      component: Example
    },
    {
      path: '/Example/Example2/:username',
      name: 'Example2',
      component: Example2
    },

    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },

    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    },

    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})

