<template>
  <div class="not-found">
    <div class="aero-panel not-found-content">
      <h2 class="text-shadow">404 - Page Not Found</h2>
      
      <div class="error-illustration">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF9900" stroke-width="2"/>
          <path d="M8 8L16 16" stroke="#FF9900" stroke-width="2" stroke-linecap="round"/>
          <path d="M16 8L8 16" stroke="#FF9900" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      
      <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
      
      <div class="actions">
        <router-link to="/" class="glossy-button">Go Home</router-link>
        <button @click="goBack" class="aero-button">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  min-height: 60vh;
}

.not-found-content {
  max-width: 500px;
  width: 100%;
  text-align: center;
  
  h2 {
    margin-bottom: 30px;
    color: #FF9900;
  }
  
  .error-illustration {
    margin: 20px 0;
    
    svg {
      max-width: 100%;
      height: auto;
    }
  }
  
  p {
    margin-bottom: 30px;
    font-size: 1.2rem;
  }
  
  .actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    
    .glossy-button, .aero-button {
      min-width: 120px;
    }
    
    .aero-button {
      background: linear-gradient(to bottom, #666, #444);
      color: #fff;
      border: 1px solid #333;
      border-radius: 4px;
      font-weight: bold;
      padding: 8px 16px;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.3);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
        border-radius: 4px 4px 0 0;
      }
      
      &:hover {
        background: linear-gradient(to bottom, #777, #555);
      }
      
      &:active {
        background: linear-gradient(to bottom, #555, #444);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) inset;
        
        &::after {
          opacity: 0.6;
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .actions {
    flex-direction: column;
    gap: 10px;
    
    .glossy-button, .aero-button {
      width: 100%;
    }
  }
}
</style>