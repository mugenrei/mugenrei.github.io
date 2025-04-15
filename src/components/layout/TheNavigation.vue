<template>
  <nav class="navbar aero-glass">
    <ul>
      <li>
        <router-link to="/" exact-active-class="active">Home</router-link>
      </li>
      <li class="dropdown">
        <router-link to="/mods" active-class="active">Mods</router-link>
        <div class="dropdown-content aero-glass">
          <router-link 
            :to="{ path: '/mods', query: { game: 'ALL' }}" 
            class="dropdown-item"
          >ALL</router-link>
          <router-link 
            :to="{ path: '/mods', query: { game: 'Shin Megami Tensei V' }}" 
            class="dropdown-item"
          >SMTV</router-link>
          <router-link 
            :to="{ path: '/mods', query: { game: 'Shin Megami Tensei V: Vengeance' }}" 
            class="dropdown-item"
          >SMT5V</router-link>
        </div>
      </li>
      <li>
        <router-link to="/guides" active-class="active">Guides</router-link>
      </li>
      <li>
        <router-link to="/about" active-class="active">About</router-link>
      </li>
      <li>
        <router-link to="/contact" active-class="active">Contact</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// No additional logic needed for navigation component yet
</script>

<style lang="scss" scoped>
.navbar {
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  
  // Vista/Aero glass effect
  &.aero-glass {
    background-color: rgba(68, 68, 68, 0.85);
    backdrop-filter: blur(10px);
    box-shadow: 
      0 1px 0 rgba(255, 255, 255, 0.1) inset,
      0 1px 3px rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
      pointer-events: none;
    }
  }

  ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    position: relative;
    margin: 0 15px;
    
    a {
      display: block;
      color: #f0f0f0;
      text-decoration: none;
      font-size: 1.2rem;
      padding: 8px 12px;
      border-radius: 4px;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
      transition: color 0.2s ease;
      
      &:hover {
        color: #ff9900;
      }
      
      &.active {
        color: #00aaff;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, transparent, #00aaff, transparent);
        }
      }
    }
  }
  
  // Dropdown styles
  .dropdown {
    .dropdown-content {
      display: none;
      position: absolute;
      min-width: 160px;
      z-index: 1;
      border-radius: 5px;
      overflow: hidden;
      margin-top: 5px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      
      &.aero-glass {
        background-color: rgba(51, 51, 51, 0.9);
        backdrop-filter: blur(10px);
      }
      
      .dropdown-item {
        display: block;
        padding: 10px 15px;
        text-align: left;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        
        &:hover {
          background-color: rgba(0, 170, 255, 0.2);
        }
        
        &:last-child {
          border-bottom: none;
        }
      }
    }
    
    &:hover .dropdown-content {
      display: block;
    }
  }
}

// Media queries for responsive design
@media (max-width: 768px) {
  .navbar {
    ul {
      flex-direction: column;
      
      li {
        margin: 5px 0;
      }
    }
    
    .dropdown {
      .dropdown-content {
        position: static;
        min-width: unset;
        border-radius: 0;
        margin-top: 0;
        border: none;
        box-shadow: none;
        background-color: rgba(0, 0, 0, 0.2);
        
        .dropdown-item {
          padding-left: 30px;
        }
      }
    }
  }
}
</style>