<template>
  <div class="about">
    <h1>Hello {{ the_name }}</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali...</p>
  </div>
</template>

<script>
	
	export default {
  name: 'Example2',
  data () {
    return {
      the_name : this.$route.params.username
    }
  },

}

</script>