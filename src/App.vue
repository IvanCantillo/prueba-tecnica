<template>
  <main>
    <px-header></px-header>
    <router-view class="container-fluid"></router-view>
  </main>
</template>

<script>

import PxHeader from "@/components/PxHeader";

export default {
  name: "App",
  components: {PxHeader},  
}
</script>

<style>

</style>
