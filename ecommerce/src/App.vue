<template>
  <RouterView />
  <Toast position="bottom-right" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'

export default defineComponent({
  name: 'App',
  components: { Toast },
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}

body {
  font-family: var(--font-body);
  margin: 0;
  padding: 0;
}
</style>