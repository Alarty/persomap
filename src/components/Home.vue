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
                         @place_changed="EnterPlace"
                         :select-first-on-enter="true">
      </gmap-autocomplete>
      <ul id="placesList">

        <li v-for="(place, index) in places" :key='index'  class="listedPlace" :class="{selected:index === selectedPlace}" @click="listClick(place,index)">
          {{index}} : {{place.nom}}
          <button v-on:click="removePlace(index)" class="buttonRemove">
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
      }
    },
    methods: {

      centerOn(_position){
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo(_position)

        })
      },

      //on post of place input autocomplete
      EnterPlace(_place) {
        if (_place) {
          this.addPlace(_place)
        } else {
          console.log("Error : Place not found")
        }
      },

      //add new place to places
      addPlace(_place) {
        var _name_select = document.getElementById('autocompleteInput').value
        document.getElementById('autocompleteInput').value = ''
        var _LatLng = {
          //fix the latlng precision to 4 digit after decimal
          //parseFloat, because toFixed return a string
          lat: parseFloat(_place.geometry.location.lat().toFixed(4)),
          lng: parseFloat(_place.geometry.location.lng().toFixed(4))
        }
        var _new_place = {
            nom: _name_select,
            position: _LatLng
        }
        this.places.push(_new_place)
        console.log(this.places.length-1)
        console.log(_new_place)
        this.listClick(_new_place,this.places.length-1)
      },

      removePlace(_id) {
        this.places.splice(_id, 1)
      },

      markerClick(_id) {
        this.centerOn(this.places[_id].position)
      },

      //get the place elem and it index place in the list
      listClick(_place,_index){
        //Center map on place
        this.centerOn(_place.position)
        //Set the index as selected (to select on list)
        this.selectedPlace = _index

      }

    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style/Home.css" scoped>

</style>
