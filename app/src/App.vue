<script>
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  components: {
    TheNavbar,
    TheFooter,
  },
}
</script>

<template>
  <TheNavbar tagline="Tag Eul"/>
  <RouterView />
  <TheFooter />
</template>

<style></style>
