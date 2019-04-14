import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router.js' //or whatever your router.js path is

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //state to display the spinner, when the user wait for AJAX answer
    loggingIn: false,
    //state to store the error string
    loginError: null,
    //state to store the token (replace the boolean Login Sucessful)
    accessToken: null,
  },
  mutations: {
    //in beginning of login, change state
    loginStart: state => state.loggingIn = true,
    //At end of login, set states for data content
    loginStop: (state, errorMessage) => {
      state.loggingIn = false
      state.loginError = errorMessage
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
    }
  },
  actions: {
    //When validate form
    doLogin({ commit }, loginData) {
      commit('loginStart');
      //ajax request passing data
      axios.post('https://reqres.in/api/login', {
        ...loginData
      })
        .then(response => {
          //put token in localStorage
          localStorage.setItem('accessToken', response.data.token)
          //finish commiting mutations
          commit('loginStop', null)
          commit('updateAccessToken', response.data.token)
          //redirect to main page
          router.push({ name: 'Home' })
        })
        .catch(error => {
          commit('loginStop', error.response.data.error)
          commit('updateAccessToken', null)

        })
      },
    //store the access token of localstorage when reload
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'))
    }
  }
})