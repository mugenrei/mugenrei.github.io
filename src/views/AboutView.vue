<template>
  <div class="about-view">
    <div class="aero-panel about-content">
      <h2 class="text-shadow">About</h2>
      <div class="content-text">
        <p>Sometimes admins don't want some mods on their websites because it either hurts ad revenue, subjective views on the world or the site's bubble, this usually applies for mods that are too Spicy, too cute, too funny or all the alternatives.</p>
        
        <p>Since I just want to put my mods out there I might just split the sites. I plan to do all types of mods, that's why I've made this "hub".</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed for now
</script>

<style lang="scss" scoped>
.about-view {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.about-content {
  max-width: 800px;
  width: 100%;
  
  h2 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .content-text {
    line-height: 1.6;
    
    p {
      margin-bottom: 20px;
      text-align: left;
    }
  }
}
</style>