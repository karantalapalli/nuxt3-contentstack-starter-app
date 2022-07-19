<template>
  <div v-if="data" class="demo-section">
    <template :key="index.title_h3" v-for="index in data.cards">
      <div class="cards">
        <h3>{{ index.title_h3 }}</h3>
        <p>{{ index.description }}</p>
        <div class="card-cta">
          <NuxtLink class="btn primary-btn" :to="index.call_to_action.href">
            {{ index.call_to_action.title }}
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
    const props = defineProps({
        data: Object
    })
</script>
