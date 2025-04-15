<template>
  <div class="guides-view">
    <div class="aero-panel guides-content">
      <h2 class="text-shadow">Guides</h2>
      
      <div class="redirect-message">
        <p>Guides are maintained on GitHub Wiki for easier collaborative editing and maintenance.</p>
        <p>You'll be redirected to the GitHub Wiki in a moment...</p>
        
        <div class="loading-indicator">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        
        <div class="manual-redirect">
          <p>If you're not redirected automatically, click the button below:</p>
          <a :href="wikiUrl" target="_blank" class="glossy-button">Go to Guides</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const wikiUrl = 'https://github.com/mugenrei/mugenrei.github.io/wiki'
const redirectTimer = ref(null)

onMounted(() => {
  // Redirect after a short delay
  redirectTimer.value = setTimeout(() => {
    window.location.href = wikiUrl
  }, 3000)
  
  // Clean up the timer if the component is unmounted
  return () => {
    if (redirectTimer.value) {
      clearTimeout(redirectTimer.value)
    }
  }
})
</script>

<style lang="scss" scoped>
.guides-view {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.guides-content {
  max-width: 800px;
  width: 100%;
  
  h2 {
    text-align: center;
    margin-bottom: 30px;
  }
}

.redirect-message {
  text-align: center;
  
  p {
    margin-bottom: 15px;
  }
}

.loading-indicator {
  display: flex;
  justify-content: center;
  margin: 30px 0;
  
  .dot {
    width: 12px;
    height: 12px;
    margin: 0 5px;
    background-color: #00aaff;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
    
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
}

.manual-redirect {
  margin-top: 30px;
  
  p {
    margin-bottom: 15px;
    font-size: 0.9rem;
    color: #ccc;
  }
  
  .glossy-button {
    display: inline-block;
  }
}

@keyframes bounce {
  0%, 80%, 100% { 
    transform: scale(0);
  } 
  40% { 
    transform: scale(1.0);
  }
}
</style>