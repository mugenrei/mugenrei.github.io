<template>
  <div 
    class="mod-card aero-panel" 
    @mouseenter="showPreview = true" 
    @mouseleave="showPreview = false"
    @click="$emit('click')"
  >
    <div class="mod-thumbnail">
      <img v-if="mod.thumbnail" :src="mod.thumbnail" :alt="mod.modName">
      <div v-else class="placeholder-thumbnail">
        <span>{{ mod.modName.charAt(0) }}</span>
      </div>
    </div>
    
    <div class="mod-basic-info">
      <h3>{{ mod.modName }}</h3>
      <p class="mod-game">{{ mod.game }}</p>
      <p class="mod-date">{{ formatDate(mod.publishDate) }}</p>
    </div>
    
    <!-- Hover Preview (desktop only) -->
    <div v-if="showPreview && !isMobile" class="mod-preview">
      <div v-if="mod.modTargetDemon" class="preview-item">
        <strong>Replaces:</strong> {{ mod.modTargetDemon }}
      </div>
      
      <div v-if="mod.modSeries" class="preview-item">
        <strong>Series:</strong> {{ mod.modSeries }}
      </div>
      
      <div v-if="mod.modCommissioner" class="preview-item">
        <strong>Thanks to:</strong> {{ mod.modCommissioner }}
      </div>
      
      <div class="preview-item mod-description" v-html="truncatedDescription"></div>
      
      <div class="mod-click-hint">
        <span>Click for details</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  mod: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const showPreview = ref(false)

// Format date using timestamp
const formatDate = (timestamp) => {
  if (!timestamp) return 'Unknown date'
  
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString()
}

// Check if we're on mobile
const isMobile = computed(() => {
  return window.innerWidth < 768
})

// Truncate description for preview
const truncatedDescription = computed(() => {
  if (!props.mod.modDescription) return ''
  
  // Replace HTML tags for calculation
  const plainText = props.mod.modDescription.replace(/<[^>]*>/g, '')
  
  if (plainText.length <= 120) {
    return props.mod.modDescription
  }
  
  // Get first 120 characters without cutting words
  const truncated = plainText.substr(0, 120).split(' ').slice(0, -1).join(' ')
  return truncated + '...'
})
</script>

<style lang="scss" scoped>
.mod-card {
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 10px 20px rgba(0, 0, 0, 0.2),
      0 1px 0 rgba(255, 255, 255, 0.1) inset;
  }
}

.mod-thumbnail {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }
  
  .placeholder-thumbnail {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #333, #444);
    
    span {
      font-size: 3rem;
      color: rgba(255, 255, 255, 0.3);
    }
  }
}

.mod-basic-info {
  padding: 15px;
  
  h3 {
    margin: 0 0 8px 0;
    font-size: 1.2rem;
    line-height: 1.3;
  }
  
  .mod-game {
    font-size: 0.9rem;
    margin: 0;
    color: #ccc;
  }
  
  .mod-date {
    font-size: 0.8rem;
    margin: 5px 0 0;
    color: #aaa;
  }
}

.mod-preview {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(34, 34, 34, 0.9);
  backdrop-filter: blur(5px);
  padding: 15px;
  border-radius: 0 0 4px 4px;
  transform: translateY(0);
  transition: transform 0.3s ease;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  
  .preview-item {
    margin-bottom: 8px;
    font-size: 0.9rem;
    text-align: left;
    
    strong {
      color: #00aaff;
    }
  }
  
  .mod-description {
    font-size: 0.85rem;
    line-height: 1.4;
    max-height: 80px;
    overflow: hidden;
  }
  
  .mod-click-hint {
    margin-top: 10px;
    text-align: center;
    
    span {
      display: inline-block;
      background: rgba(0, 170, 255, 0.2);
      color: #00aaff;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
    }
  }
}

@media (max-width: 768px) {
  .mod-card {
    min-height: unset;
  }
  
  .mod-thumbnail {
    height: 130px;
  }
  
  .mod-basic-info {
    padding: 10px;
    
    h3 {
      font-size: 1rem;
    }
  }
}
</style>