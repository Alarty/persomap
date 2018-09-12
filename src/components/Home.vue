<template>
  <div id="Home">
      <GmapMap ref="mapRef" id="gmap"  :center="center"
                :zoom="zoom"
                map-type-id="roadmap"
      >
          <GmapMarker :key="index"
                           v-for="(m, index) in markers"
                           :position="m.position"
                           :clickable="true"
                           :draggable="true"
                           @click="markerClick(index)"
          ></GmapMarker>
      </GmapMap>

    <div v-html="placeInfos"></div>
    <div id="infos">
      <ul>
        <form @submit.prevent="addData">
          <input type="text" name="" placeholder="Enter data" v-model="addDataForm">
        </form>

        <li v-for="(place, index) in places" :key='index'>
          {{place.id}}, {{place.nom}} : {{place.lat}},{{place.long}}
          <button v-on:click="remove(index)">
            <font-awesome-icon icon="times"/>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import json from '../database.json'

export default {
  name: 'Home',
  data () {
    return {
      zoom : 4,
      center : {lat : 50.0, lng: 0.0 },
      places : json.places,
      addDataForm : '',
      placeInfos : '',
      markers : [{
          position: {
              lat: 50.0,
              lng: 0.0,
          }
      }, {
          position: {
              lat: 50.1,
              lng: 0.0,
          }
      }]
    }
  },
  methods:{
    addData(){
      this.places.push({data:this.addDataForm})
      this.addDataForm = '';
    },
    remove(id){
      this.places.splice(id,1)
    },
    markerClick(id){
        this.$refs.mapRef.$mapPromise.then((map) => {
            map.panTo(this.markers[id].position)
            this.displayInfos(id)
            this.addDataForm = id

        })
    },
      displayInfos(id){
          if (this.placeInfos === ''){
              this.placeInfos = this.markers[id]
          } else{
              this.placeInfos = ''
          }
      }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style/Home.css" scoped>

</style>
