<template>
  <div class="mods-view">
    <h2 class="text-shadow">Mods Catalog</h2>
    
    <!-- Filters Section -->
    <ModFilters 
      class="mods-filters"
      @apply-filters="applyFilters"
      @reset-filters="resetFilters"
    />
    
    <!-- Loading and Error States -->
    <div v-if="isLoading" class="loading-state aero-panel">
      <p>Loading mods catalog...</p>
    </div>
    
    <div v-else-if="error" class="error-state aero-panel">
      <p>Error loading mods: {{ error }}</p>
      <button class="glossy-button" @click="fetchMods">Retry</button>
    </div>
    
    <!-- No Results -->
    <div v-else-if="filteredMods.length === 0" class="no-results aero-panel">
      <p>No mods found matching your filters. Try adjusting your search criteria.</p>
      <button class="glossy-button" @click="resetFilters">Reset Filters</button>
    </div>
    
    <!-- Mods Grid -->
    <div v-else class="mods-grid">
      <ModCard 
        v-for="mod in filteredMods" 
        :key="mod.id" 
        :mod="mod"
        @click="openModal(mod.id)"
      />
    </div>
    
    <!-- Mod Modal (opened when a mod is clicked) -->
    <ModModal 
      v-if="activeMod" 
      :mod="activeMod" 
      @close="closeModal" 
    />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useModsStore } from '@/stores/mods'
import { useFiltersStore } from '@/stores/filters'
import ModCard from '@/components/mods/ModCard.vue'
import ModFilters from '@/components/mods/ModFilters.vue'
import ModModal from '@/components/mods/ModModal.vue'

// Route and router
const route = useRoute()
const router = useRouter()

// Mods store
const modsStore = useModsStore()
const { isLoading, error, activeMod } = storeToRefs(modsStore)
const { fetchMods, setActiveMod, clearActiveMod } = modsStore

// Filters store
const filtersStore = useFiltersStore()
const { filteredMods } = storeToRefs(filtersStore)
const { resetFilters, loadFromUrl, updateUrl } = filtersStore

// Load mods on component mount
onMounted(async () => {
  // If mods are not loaded yet, fetch them
  if (modsStore.mods.length === 0) {
    await fetchMods()
  }
  
  // Check if there's a mod ID in the route params
  if (route.params.id) {
    setActiveMod(route.params.id)
  }
  
  // Load filters from URL parameters
  loadFromUrl(route)
})

// Update URL when filters change
watchEffect(() => {
  if (!isLoading.value) {
    updateUrl(router)
  }
})

// Methods
function applyFilters() {
  updateUrl(router)
}

function openModal(modId) {
  setActiveMod(modId)
  
  // Update URL to include mod ID
  router.push({ 
    name: 'mod-detail', 
    params: { id: modId }, 
    query: route.query
  })
}

function closeModal() {
  clearActiveMod()
  
  // Update URL to remove mod ID
  router.push({ 
    name: 'mods', 
    query: route.query
  })
}

// Clean up when component is unmounted
onUnmounted(() => {
  clearActiveMod()
})
</script>

<style lang="scss" scoped>
.mods-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.mods-filters {
  margin-bottom: 20px;
}

.loading-state,
.error-state,
.no-results {
  padding: 30px;
  text-align: center;
  
  p {
    margin-bottom: 20px;
  }
}

.mods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

// Media queries for responsive design
@media (max-width: 768px) {
  .mods-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .mods-grid {
    grid-template-columns: 1fr;
  }
}
</style>