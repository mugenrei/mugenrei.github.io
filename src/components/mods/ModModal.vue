<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal-container aero-glass">
      <button class="close-button" @click="closeModal">
        <span>×</span>
      </button>
      
      <div class="modal-content">
        <!-- Mod Header -->
        <div class="mod-header">
          <h2 class="text-shadow">{{ mod.modName }}</h2>
          <div class="mod-meta">
            <span class="mod-game">{{ mod.game }}</span>
            <span class="mod-date">{{ formatDate(mod.publishDate) }}</span>
            <span v-if="mod.isSpicy" class="mod-badge spicy">Spicy</span>
          </div>
        </div>
        
        <!-- Mod Content -->
        <div class="mod-content">
          <!-- Left column: Thumbnail and Details -->
          <div class="mod-main-info">
            <div class="mod-thumbnail">
              <img v-if="mod.thumbnail" :src="mod.thumbnail" :alt="mod.modName">
              <div v-else class="placeholder-thumbnail">
                <span>{{ mod.modName.charAt(0) }}</span>
              </div>
            </div>
            
            <div class="mod-details">
              <div v-if="mod.modTargetDemon" class="detail-item">
                <strong>Replaces:</strong> {{ mod.modTargetDemon }}
              </div>
              
              <div v-if="mod.modSeries" class="detail-item">
                <strong>Series:</strong> {{ mod.modSeries }}
              </div>
              
              <div v-if="mod.modCommissioner" class="detail-item">
                <strong>Thanks to:</strong> {{ mod.modCommissioner }}
              </div>
              
              <div class="detail-item mod-description" v-html="mod.modDescription"></div>
            </div>
          </div>
          
          <!-- Right column: Download Links -->
          <div class="mod-download">
            <h3>Download Links</h3>
            
            <!-- GameBanana -->
            <div v-if="hasSiteLink('GameBanana')" class="download-group">
              <h4>GameBanana</h4>
              <a :href="getSiteUrl('GameBanana')" target="_blank" class="download-button">
                <img src="/assets/brand/banana.png" alt="GameBanana" class="site-icon">
                <span>View on GameBanana</span>
              </a>
            </div>
            
            <!-- Mirror Links -->
            <div v-if="hasAnyMirrors" class="download-group">
              <h4>Mirror Links</h4>
              <a 
                v-for="(url, name) in mod.mirrors" 
                :key="name" 
                :href="url" 
                target="_blank" 
                class="download-button"
              >
                <span>{{ name }}</span>
              </a>
            </div>
            
            <!-- No Downloads -->
            <div v-if="!hasAnyMirrors && !hasSiteLink('GameBanana')" class="no-downloads">
              <p>No download links available for this mod.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  mod: {
    type: Object,
    required: true
  }
})

// Emit events
const emit = defineEmits(['close'])

// Methods
const closeModal = () => {
  emit('close')
}

// Format date
const formatDate = (timestamp) => {
  if (!timestamp) return 'Unknown date'
  
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Check if mod has GameBanana link
const hasSiteLink = (site) => {
  if (site === 'GameBanana') {
    return props.mod.modSiteData && 
           props.mod.modSiteData.GameBanana && 
           props.mod.modSiteData.GameBanana.itemUrl
  }
  return false
}

// Get site URL
const getSiteUrl = (site) => {
  if (site === 'GameBanana' && hasSiteLink('GameBanana')) {
    return props.mod.modSiteData.GameBanana.itemUrl
  }
  return '#'
}

// Check if mod has any mirror links
const hasAnyMirrors = computed(() => {
  return props.mod.mirrors && Object.keys(props.mod.mirrors).length > 0
})

// Trap focus and handle Escape key
const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

// Lifecycle hooks
import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
  // Add keydown event listener
  window.addEventListener('keydown', handleKeydown)
  
  // Prevent body scrolling
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  // Remove keydown event listener
  window.removeEventListener('keydown', handleKeydown)
  
  // Re-enable body scrolling
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(5px);
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: modal-appear 0.3s ease-out;
  
  &.aero-glass {
    background-color: rgba(34, 34, 34, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 30%;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
      pointer-events: none;
    }
  }
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #666, #444);
  border: 1px solid rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 1.5rem;
  line-height: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: linear-gradient(to bottom, #777, #555);
  }
  
  &:active {
    background: linear-gradient(to bottom, #555, #444);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) inset;
  }
}

.modal-content {
  padding: 20px;
  max-height: 90vh;
  overflow-y: auto;
  
  // Custom scrollbar
  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

// Mod Header
.mod-header {
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;
  
  h2 {
    margin: 0 0 10px 0;
    font-size: 1.8rem;
  }
  
  .mod-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
    
    .mod-game, .mod-date {
      font-size: 0.9rem;
      color: #ccc;
    }
    
    .mod-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: bold;
      
      &.spicy {
        background-color: rgba(255, 59, 48, 0.2);
        color: #ff3b30;
        border: 1px solid rgba(255, 59, 48, 0.3);
      }
    }
  }
}

// Mod Content
.mod-content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}

.mod-main-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mod-thumbnail {
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .placeholder-thumbnail {
    width: 100%;
    padding-top: 56.25%; // 16:9 aspect ratio
    background: linear-gradient(135deg, #333, #444);
    position: relative;
    
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 4rem;
      color: rgba(255, 255, 255, 0.3);
    }
  }
}

.mod-details {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 15px;
  
  .detail-item {
    margin-bottom: 12px;
    
    strong {
      color: #00aaff;
    }
  }
  
  .mod-description {
    line-height: 1.5;
    
    a {
      color: #00aaff;
      text-decoration: underline;
      
      &:hover {
        color: lighten(#00aaff, 10%);
      }
    }
  }
}

// Download Section
.mod-download {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 15px;
  height: fit-content;
  
  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.3rem;
    text-align: center;
  }
  
  .download-group {
    margin-bottom: 20px;
    
    h4 {
      margin-bottom: 10px;
      font-size: 1rem;
      color: #ccc;
    }
  }
  
  .download-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background: linear-gradient(to bottom, #00aaff, #0077cc);
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    box-shadow: 
      0 1px 0 rgba(255, 255, 255, 0.2) inset,
      0 1px 3px rgba(0, 0, 0, 0.3);
    transition: background 0.2s ease;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
      pointer-events: none;
    }
    
    &:hover {
      background: linear-gradient(to bottom, lighten(#00aaff, 5%), lighten(#0077cc, 5%));
    }
    
    &:active {
      background: linear-gradient(to bottom, darken(#00aaff, 5%), darken(#0077cc, 5%));
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) inset;
      
      &::after {
        opacity: 0.5;
      }
    }
    
    .site-icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
  }
  
  .no-downloads {
    text-align: center;
    padding: 20px 0;
    color: #aaa;
  }
}

// Animation
@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Media queries for responsive design
@media (max-width: 768px) {
  .modal-container {
    max-width: 100%;
    border-radius: 6px;
  }
  
  .mod-content {
    grid-template-columns: 1fr;
  }
  
  .mod-header {
    h2 {
      font-size: 1.5rem;
    }
  }
}
</style>