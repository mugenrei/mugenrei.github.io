import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useModsStore } from './mods'

export const useFiltersStore = defineStore('filters', () => {
  // State
  const filters = ref({
    search: '',
    game: '',
    series: '',
    dateFrom: null,
    dateTo: null,
    showSpicy: false
  })
  
  // Actions
  function resetFilters() {
    filters.value = {
      search: '',
      game: '',
      series: '',
      dateFrom: null,
      dateTo: null,
      showSpicy: false
    }
  }
  
  function setFilter(key, value) {
    filters.value[key] = value
  }
  
  // Load filters from URL parameters
  function loadFromUrl(route) {
    const query = route.query
    
    if (query.search) filters.value.search = query.search
    if (query.game) filters.value.game = query.game
    if (query.series) filters.value.series = query.series
    if (query.dateFrom) filters.value.dateFrom = new Date(parseInt(query.dateFrom))
    if (query.dateTo) filters.value.dateTo = new Date(parseInt(query.dateTo))
    if (query.spicy) filters.value.showSpicy = query.spicy === 'true'
  }
  
  // Update URL with current filters
  function updateUrl(router) {
    const query = {}
    
    if (filters.value.search) query.search = filters.value.search
    if (filters.value.game) query.game = filters.value.game
    if (filters.value.series) query.series = filters.value.series
    if (filters.value.dateFrom) query.dateFrom = filters.value.dateFrom.getTime().toString()
    if (filters.value.dateTo) query.dateTo = filters.value.dateTo.getTime().toString()
    if (filters.value.showSpicy) query.spicy = 'true'
    
    router.replace({ query })
  }
  
  // Computed: filtered mods based on filters
  const filteredMods = computed(() => {
    const modsStore = useModsStore()
    let result = [...modsStore.normalizedMods]
    
    // Apply text search
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      result = result.filter(mod => 
        mod.modName.toLowerCase().includes(searchLower) ||
        (mod.modDescription && mod.modDescription.toLowerCase().includes(searchLower)) ||
        (mod.modTargetDemon && mod.modTargetDemon.toLowerCase().includes(searchLower))
      )
    }
    
    // Apply game filter
    if (filters.value.game && filters.value.game !== 'ALL') {
      result = result.filter(mod => mod.game === filters.value.game)
    }
    
    // Apply series filter
    if (filters.value.series) {
      result = result.filter(mod => mod.modSeries === filters.value.series)
    }
    
    // Apply date filters
    if (filters.value.dateFrom) {
      const fromDate = filters.value.dateFrom.getTime()
      result = result.filter(mod => {
        return mod.publishDate && (mod.publishDate * 1000 >= fromDate)
      })
    }
    
    if (filters.value.dateTo) {
      const toDate = filters.value.dateTo.getTime()
      result = result.filter(mod => {
        return mod.publishDate && (mod.publishDate * 1000 <= toDate)
      })
    }
    
    // Apply spicy filter
    if (!filters.value.showSpicy) {
      result = result.filter(mod => !mod.isSpicy)
    }
    
    return result
  })
  
  return {
    // State
    filters,
    
    // Actions
    resetFilters,
    setFilter,
    loadFromUrl,
    updateUrl,
    
    // Getters
    filteredMods
  }
})