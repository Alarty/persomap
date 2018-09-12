<template>
  <div id="Home">
    <GmapMap ref="mapRef" id="gmap" :center="center"
             :zoom="zoom"
             map-type-id="roadmap"
    >
      <GmapMarker
          :key="index"
          v-for="(m, index) in places"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="markerClick(index)"
      ></GmapMarker>
    </GmapMap>

    <div id="timeline">
      <gmap-autocomplete id="autocompleteInput"
                         @place_changed="validPlaceInput"
                         :select-first-on-enter="true" v-model="message">
      </gmap-autocomplete>
      <ul id="placesList">

        <li v-for="(place, index) in places" :key='index'  class="listedPlace" :class="{selected:index === selectedPlace}" @click="clickList(place,index)">
          {{index}}, {{place.nom}} : {{place.position.lat}},{{place.position.lng}}
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
        selectedPlace: undefined,
        placeInfos: '',
        latLng: {},
        message: ''
      }
    },
    methods: {
      //on post of place input autocomplete
      validPlaceInput(_place) {
        if (_place) {
          this.addPlace(_place)
        } else {
          console.log("Error : Place not found")
        }
      },

      //add new place to places
      addPlace(_place) {
        var _name_select = document.getElementById('autocompleteInput').value
        var _LatLng = {
          //fix the latlng precision to 4 digit after decimal
          lat: _place.geometry.location.lat().toFixed(4),
          lng: _place.geometry.location.lng().toFixed(4)
        }
        this.places.push(
          {
            nom: _name_select,
            position: _LatLng
          }
        )

      },

      removePlace(_id) {
        this.places.splice(_id, 1)
      },

      markerClick(_id) {
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo(this.places[_id].position)

        })

      },
      //get the place elem and it index place in the list
      clickList(_place,_index){
        //Center map on place
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo(_place.position)
        })
        //Set the index as selected (to select on list
        this.selectedPlace = _index

      }

    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style/Home.css" scoped>

</style>
