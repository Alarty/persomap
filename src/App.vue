<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'Home'}">MapSelector</router-link>
      <router-link :to="{ name: 'Stats'}">Stats</router-link>
      <router-link :to="{ name: 'Login'}">Login - Profile</router-link>
      <!--
          <router-link :to="{ name: 'Example2', params: { username: 123 }}">Example2</router-link>
      -->
    </nav>
    <!--Render the component of the current path if exist -->
    <router-view/>
  </div>
</template>

<script>

  import { mapActions } from 'vuex';

  import Home from './components/Home.vue'

  export default {
    name: 'app',
    components: {
      Home
    },
    methods: {
      //to map the vuex actions for fetching the token
      ...mapActions([
        'fetchAccessToken'
      ]),
    },
    //run code just after created instance
    created() {
      this.fetchAccessToken();
    }
  }
</script>

<style>

  body {
    background-color: #EEEEEE;
    font-family: 'Montserrat', sans-serif;
    display: grid;
    grid-template-rows: auto;
    justify-items: center;
    padding: 0;
    margin: 0;
  }

  nav {
    /*disable scroll for this*/
    overflow: hidden;
    padding: 20px 20px 20px 0;
  }

  nav a {
    padding: 10px;
    text-decoration: none;
    background: #fff;
    border-radius: 3px;
    color: rgb(0, 110, 255);
    font-weight: bold;
    margin-right: 15px;
  }

  #app {
    width: 100%;
    height: 100%;
  }
</style>
