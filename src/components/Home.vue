<template>
  <div id="Home">
    <GmapMap ref="mapRef" id="gmap" :center="center"
             :zoom="zoom"
             map-type-id="roadmap"
    >
      <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="markerClick(index)"
      ></GmapMarker>
    </GmapMap>

    <div id="timeline">
      <ul>
        <gmap-autocomplete id="autocompleteInput"
                           @place_changed="validPlaceInput"
                           :select-first-on-enter="true" v-model="message">
        </gmap-autocomplete>
        <li v-for="(place, index) in places" :key='index'>
          {{index}}, {{place.nom}} : {{place.lat}},{{place.lng}}
          <button v-on:click="removePlace(index)">
            <font-awesome-icon icon="times"/>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import json from '../database.json'

  export default {
    name: 'Home',
    data() {
      return {
        zoom: 4,
        center: {lat: 50.0, lng: 0.0},
        places: json.places,
        placeInfos: '',
        latLng: {},
        message: '',
        markers: [{
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
    methods: {
      //on post of place input autocomplete
      validPlaceInput(place) {
        if (place) {
          this.addPlace(place)
        } else {
          console.log("Error : Place not found")
        }
      },

      //add new place to places
      addPlace(place) {
        var name_select = document.getElementById('autocompleteInput').value
        this.places.push(
          {
            nom: name_select,
            //fix the latlng precision to 4 digit after decimal
            lat: place.geometry.location.lat().toFixed(4),
            lng: place.geometry.location.lng().toFixed(4),
          }
        )

      },

      removePlace(id) {
        this.places.splice(id, 1)
      },

      markerClick(id) {
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo(this.markers[id].position)
          this.displayInfos(id)
          this.addDataForm = id

        })
      },
      displayInfos(id) {
        if (this.placeInfos === '') {
          this.placeInfos = this.markers[id]
        } else {
          this.placeInfos = ''
        }
      }
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style/Home.css" scoped>

</style>
