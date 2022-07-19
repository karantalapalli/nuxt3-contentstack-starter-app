<template>
  <div class="container">
    <div class="error-page">
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <NuxtLink to="/">
        Navigate to home page
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    error: Object
  })
</script>
