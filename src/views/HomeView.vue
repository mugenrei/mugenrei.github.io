<template>
  <div class="home-view">
    <div class="home-grid">
      <div class="intro-section aero-panel">
        <p>Welcome to a unified catalog of all the mods I've created and chosen to list here, alongside links to other mod platforms. This list is regularly updated, but for real-time uploads, you can visit the individual mod pages.<br><br>Click on 'Mods' to browse them!</p>
      </div>
      
      <div class="profile-section aero-panel">
        <h3 class="text-shadow">My Profiles</h3>
        <div class="profile-grid">
          <div class="profile-card">
            <a href="https://github.com/mugenrei" target="_blank">
              <svg width="64" height="64" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
              </svg>
            </a>
            <p><a href="https://github.com/mugenrei" target="_blank">GitHub</a></p>
          </div>
          
          <div class="profile-card pixel">
            <a href="https://gamebanana.com/members/submissions/mods/2054898?" target="_blank">
              <img src="/assets/brand/banana.png" alt="GameBanana" class="profile-pic">
            </a>
            <p><a href="https://gamebanana.com/members/submissions/mods/2054898?" target="_blank">GameBanana</a></p>
          </div>
          
          <div class="profile-card">
            <a href="https://next.nexusmods.com/profile/mugenreisan/mods" target="_blank">
              <img src="/assets/brand/nexus.svg" alt="NexusMods" class="profile-pic">
            </a>
            <p><a href="https://next.nexusmods.com/profile/mugenreisan/mods" target="_blank">NexusMods</a></p>
          </div>
        </div>
      </div>
      
      <div class="support-section aero-panel">
        <h3 class="text-shadow">Commissions or Support</h3>
        <p>If you enjoy whatever I did you can like it on the mod page or send me a beverage worth exchange! I also do paid commissions that you will like it for sure!</p>
        <div class="support-grid">
          <a href="https://ko-fi.com/mugenrei" target="_blank" class="glossy-button">Ko-fi Page</a>
          <a href="https://ko-fi.com/mugenrei/commissions" target="_blank" class="glossy-button">Commissions</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic for HomeView
</script>

<style lang="scss" scoped>
.home-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 900px;
  margin: 20px auto;
  text-align: center;
}

.intro-section,
.profile-section,
.support-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}

.profile-card {
  background-color: rgba(68, 68, 68, 0.6);
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
}

.profile-pic,
svg {
  width: 64px;
  height: 64px;
  margin-bottom: 10px;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
}

.pixel {
  image-rendering: pixelated;
}

.support-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
}

// Media queries for responsive design
@media (max-width: 768px) {
  .profile-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  
  .support-grid {
    grid-template-columns: 1fr;
  }
}
</style>