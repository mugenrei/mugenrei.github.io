<template>
  <div class="app-container">
    <TheHeader />
    <TheNavigation />
    
    <main class="content-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <TheFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheNavigation from '@/components/layout/TheNavigation.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

onMounted(() => {
  document.title = 'mugenrei'
})
</script>

<style lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>