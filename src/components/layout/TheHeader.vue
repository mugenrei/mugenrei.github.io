<template>
  <header class="title-bar">
    <h1>mugenrei</h1>
  </header>
</template>

<script setup>
// No additional logic needed for now
</script>

<style lang="scss" scoped>
.title-bar {
  background: linear-gradient(to bottom, #444, #333);
  padding: 20px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    pointer-events: none; // So it doesn't interfere with clicks
  }
  
  h1 {
    margin: 0;
    font-size: 2.5rem;
    color: #f0f0f0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 1;
  }
}
</style>