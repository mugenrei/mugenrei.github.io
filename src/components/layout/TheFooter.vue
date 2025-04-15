<template>
  <footer class="footer aero-glass">
    <p>&copy; {{ currentYear }} mugenrei.</p>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer {
  padding: 10px 0;
  text-align: center;
  margin-top: auto;
  
  &.aero-glass {
    background-color: rgba(51, 51, 51, 0.85);
    backdrop-filter: blur(10px);
    box-shadow: 
      0 -1px 0 rgba(255, 255, 255, 0.1) inset,
      0 -1px 3px rgba(0, 0, 0, 0.2);
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
  
  p {
    margin: 0;
    color: #ccc;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  }
}
</style>