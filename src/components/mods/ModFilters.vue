<template>
  <div class="mod-filters aero-panel">
    <h3 class="filter-heading text-shadow">Filter Mods</h3>
    
    <!-- Search Bar -->
    <div class="search-bar">
      <input 
        type="text" 
        v-model="localFilters.search" 
        placeholder="Search mods..." 
        class="aero-input"
      >
    </div>
    
    <div class="filter-grid">
      <!-- Game Filter -->
      <div class="filter-group">
        <label for="game-filter">Game:</label>
        <select 
          id="game-filter" 
          v-model="localFilters.game" 
          class="aero-select"
        >
          <option value="">All Games</option>
          <option value="ALL">ALL</option>
          <option v-for="game in games" :key="game" :value="game">
            {{ game === 'Shin Megami Tensei V' ? 'SMTV' : 
              game === 'Shin Megami Tensei V: Vengeance' ? 'SMT5V' : game }}
          </option>
        </select>
      </div>
      
      <!-- Series Filter -->
      <div class="filter-group">
        <label for="series-filter">Series:</label>
        <select 
          id="series-filter" 
          v-model="localFilters.series" 
          class="aero-select"
        >
          <option value="">All Series</option>
          <option v-for="series in seriesList" :key="series" :value="series">
            {{ series }}
          </option>
        </select>
      </div>
      
      <!-- Date From Filter -->
      <div class="filter-group date-filter">
        <label for="date-from">From:</label>
        <input 
          type="date" 
          id="date-from" 
          v-model="dateFromString" 
          class="aero-input date-input"
        >
      </div>
      
      <!-- Date To Filter -->
      <div class="filter-group date-filter">
        <label for="date-to">To:</label>
        <input 
          type="date" 
          id="date-to" 
          v-model="dateToString" 
          class="aero-input date-input"
        >
      </div>
      
      <!-- Spicy Content Toggle -->
      <div class="filter-group spicy-toggle">
        <label class="toggle-label">
          <input 
            type="checkbox" 
            v-model="localFilters.showSpicy" 
            class="toggle-checkbox"
          >
          <span class="toggle-switch"></span>
          <span class="toggle-text">{{ localFilters.showSpicy ? 'Include Spicy' : 'Family Friendly' }}</span>
        </label>
      </div>
    </div>
    
    <!-- Filter Actions -->
    <div class="filter-actions">
      <button class="aero-button reset-button" @click="handleReset">
        Reset Filters
      </button>
      <button class="glossy-button" @click="handleApply">
        Apply Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useModsStore } from '@/stores/mods'
import { useFiltersStore } from '@/stores/filters'

// Emits
const emit = defineEmits(['apply-filters', 'reset-filters'])

// Store access
const modsStore = useModsStore()
const filtersStore = useFiltersStore()

// Get unique games and series lists from the store
const { uniqueGames, uniqueSeries } = storeToRefs(modsStore)
const { filters } = storeToRefs(filtersStore)

// Computed lists
const games = computed(() => uniqueGames.value)
const seriesList = computed(() => uniqueSeries.value)

// Local filters state (to avoid updating the store until 'Apply' is clicked)
const localFilters = ref({
  search: '',
  game: '',
  series: '',
  dateFrom: null,
  dateTo: null,
  showSpicy: false
})

// Date string conversions for the date inputs
const dateFromString = computed({
  get: () => {
    if (!localFilters.value.dateFrom) return ''
    return localFilters.value.dateFrom.toISOString().substring(0, 10)
  },
  set: (val) => {
    localFilters.value.dateFrom = val ? new Date(val) : null
  }
})

const dateToString = computed({
  get: () => {
    if (!localFilters.value.dateTo) return ''
    return localFilters.value.dateTo.toISOString().substring(0, 10)
  },
  set: (val) => {
    localFilters.value.dateTo = val ? new Date(val) : null
  }
})

// Watch for changes in the filters store
watch(
  () => filters.value,
  (newFilters) => {
    // Update local filters when store filters change
    localFilters.value = { ...newFilters }
  },
  { deep: true }
)

// Initialize local filters from store on component mount
onMounted(() => {
  localFilters.value = { ...filters.value }
})

// Methods
function handleApply() {
  // Update store with local filters
  Object.keys(localFilters.value).forEach(key => {
    filtersStore.setFilter(key, localFilters.value[key])
  })
  
  emit('apply-filters')
}

function handleReset() {
  filtersStore.resetFilters()
  localFilters.value = { ...filters.value }
  emit('reset-filters')
}
</script>

<style lang="scss" scoped>
.mod-filters {
  width: 100%;
}

.filter-heading {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.3rem;
  text-align: center;
}

.search-bar {
  margin-bottom: 20px;
  
  input {
    width: 100%;
    padding: 12px 15px;
    font-size: 1rem;
    border-radius: 25px;
  }
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  
  label {
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: #ccc;
  }
}

.aero-input, .aero-select {
  background-color: rgba(51, 51, 51, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  color: #fff;
  padding: 8px 12px;
  font-size: 0.9rem;
  box-shadow: 
    0 1px 0 rgba(255, 255, 255, 0.05) inset,
    0 1px 2px rgba(0, 0, 0, 0.2) inset;
    
  &:focus {
    outline: none;
    border-color: rgba(0, 170, 255, 0.5);
    box-shadow: 
      0 0 0 2px rgba(0, 170, 255, 0.2),
      0 1px 2px rgba(0, 0, 0, 0.2) inset;
  }
}

.aero-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='10'%3E%3Cpath fill='%23FFF' d='M0 0l8 10 8-10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;
}

// Spicy toggle
.spicy-toggle {
  .toggle-label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .toggle-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: rgba(51, 51, 51, 0.7);
    border-radius: 10px;
    margin-right: 10px;
    box-shadow: 
      0 1px 0 rgba(255, 255, 255, 0.05) inset,
      0 1px 2px rgba(0, 0, 0, 0.2) inset;
    
    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background: linear-gradient(to bottom, #ddd, #aaa);
      border-radius: 50%;
      transition: 0.3s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
  }
  
  .toggle-checkbox:checked + .toggle-switch {
    background-color: rgba(0, 170, 255, 0.4);
    
    &:before {
      transform: translateX(20px);
      background: linear-gradient(to bottom, #fff, #ccc);
    }
  }
  
  .toggle-text {
    font-size: 0.9rem;
  }
}

.filter-actions {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  
  button {
    flex: 1;
    padding: 10px;
    cursor: pointer;
    font-size: 0.9rem;
    border-radius: 4px;
    
    &.reset-button {
      background: linear-gradient(to bottom, #666, #444);
      color: #ccc;
      border: 1px solid #333;
      
      &:hover {
        background: linear-gradient(to bottom, #777, #555);
      }
    }
  }
}

// Media queries for responsive design
@media (max-width: 768px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-actions {
    flex-direction: column;
  }
}
</style>