import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Utility function to normalize mod data
function normalizeMod(mod) {
  // Create base normalized object
  const normalized = {
    id: mod.id,
    modName: mod.modName || '',
    game: mod.game || '',
    publishDate: mod.publishDate || null,
    modTargetDemon: '',
    modSeries: '',
    modDescription: '',
    modCommissioner: '',
    thumbnail: '',
    mirrors: {},
    isSpicy: false
  }
  
  // Apply modSiteData first (lower priority)
  if (mod.modSiteData && mod.modSiteData.GameBanana) {
    const gb = mod.modSiteData.GameBanana
    normalized.thumbnail = gb.thumbnailBaseUrl + "/" + gb.thumbnailFilename
    normalized.isSpicy = gb.isSpicy || false
  }
  
  // Override with localData (higher priority)
  if (mod.localData) {
    // Iterate through localData and override properties
    Object.entries(mod.localData).forEach(([key, value]) => {
      // Only override if the value is not empty/null
      if (value !== null && value !== '' && value !== undefined && normalized.hasOwnProperty(key)) {
        normalized[key] = value
      }
    })
  }
  
  return normalized
}

export const useModsStore = defineStore('mods', () => {
  // State
  const mods = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const activeModId = ref(null)
  
  // Getters
  const normalizedMods = computed(() => {
    return mods.value.map(mod => normalizeMod(mod))
  })
  
  const activeMod = computed(() => {
    if (!activeModId.value) return null
    return normalizedMods.value.find(mod => mod.id === activeModId.value)
  })
  
  const uniqueGames = computed(() => {
    const games = new Set(normalizedMods.value.map(mod => mod.game))
    return [...games].filter(Boolean).sort()
  })
  
  const uniqueSeries = computed(() => {
    const series = new Set(normalizedMods.value.map(mod => mod.modSeries))
    return [...series].filter(Boolean).sort()
  })
  
  // Actions
  async function fetchMods() {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch('/assets/mods.json')
      if (!response.ok) {
        throw new Error(`Failed to fetch mods: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      mods.value = data
    } catch (err) {
      console.error('Error fetching mods:', err)
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }
  
  function setActiveMod(id) {
    activeModId.value = id
  }
  
  function clearActiveMod() {
    activeModId.value = null
  }
  
  // For date formatting
  function formatDate(timestamp) {
    if (!timestamp) return ''
    
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString()
  }
  
  return {
    // State
    mods,
    isLoading,
    error,
    activeModId,
    
    // Getters
    normalizedMods,
    activeMod,
    uniqueGames,
    uniqueSeries,
    
    // Actions
    fetchMods,
    setActiveMod,
    clearActiveMod,
    formatDate
  }
})