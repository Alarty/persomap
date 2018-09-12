<template>
  <div class="hello">
    <div class="holder">
      <ul>
        <form @submit.prevent="addSkill">
          <input type="text" name="" placeholder="Enter a skill" v-model="skillForm">


          <input type="checkbox" name="" id="checkbox" v-model="checked">

        </form>

        <li v-for="(data, index) in skills" :key='index'>
          {{index}}.{{data.skill }}
          <button v-on:click="remove(index)"></button>
        </li>
      </ul>

      <p>These are the skills you possess :</p>

      <p v-if="skills.length >= 1"> You have more than one skills</p>
      <p v-else>You have less than one skills</p>

      <div v-bind:class="{alert : showAlert, 'another-class' : showClass }"></div>
      <div v-bind:class="alertObject"></div>

      <div v-bind:style="{ backgroundColor: bgColor, width: bgWidth, height: bgHeight }"></div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Example',
  data () {
    return {
      skills: [
      {"skill" : "Vue.js"},
      {"skill" : "Frontend"}
      ],
      showAlert: true,
      showClass: true,

      alertObject:{
        alert: true,
        'another-class': true
      },

      bgColor : 'yellow',
      bgWidth : '100%',
      bgHeight : '30px',

      skillForm: '',
      checked:true
    }
  },
  methods:{
    addSkill(){
      this.skills.push({skill:this.skillForm})
      this.skillForm = '';
      //console.log('This checkbox value is '+this.checked)
    },
    remove(id){
      this.skills.splice(id,1)
    }
  }

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Example.css" scoped>

</style>
