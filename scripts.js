let mods = []; // Store all mods
let currentPage = 1; // Page for loading mods
const itemsPerPage = 999; // Number of mods to load per page
let isLoading = false; // Flag to prevent multiple simultaneous fetches

// Function to display general content (Home, About, Contact)
function showContent(section) {
    const content = {
        home: `
        <div class="home-grid">
            <div class="intro-section">
                <p>Welcome to a unified catalog of all the mods I've created and chosen to list here, alongside links to other mod platforms. This list is regularly updated, but for real-time uploads, you can visit the individual mod pages.<br><br>Hover on 'Mods' to browse them!</p>
            </div>
            <div class="profile-section">
                <h3>My Profiles</h3>
                <div class="profile-grid">
                    <div class="profile-card">
                        <a href="https://github.com/mugenrei" target="_blank">
                            <svg width="40" height="40" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
                            </svg>
                        </a>
                        <p><a href="https://github.com/mugenrei" target="_blank">GitHub</a></p>
                    </div>
                    <div class="profile-card pixel">
                        <a href="https://gamebanana.com/members/submissions/mods/2054898?" target="_blank">
                            <img src="./assets/brand/banana.png" alt="GameBanana" class="profile-pic">
                        </a>
                        <p><a href="https://gamebanana.com/members/submissions/mods/2054898?" target="_blank">GameBanana</a></p>
                    </div>
                    <div class="profile-card">
                        <a href="https://next.nexusmods.com/profile/mugenreisan/mods" target="_blank">
                            <img src="./assets/brand/nexus.svg" alt="NexusMods" class="profile-pic">
                        </a>
                        <p><a href="https://next.nexusmods.com/profile/mugenreisan/mods" target="_blank">NexusMods</a></p>
                    </div>
                </div>
            </div>
            <div class="support-section">
                <h3>Commissions or Support</h3>
                <p>If you enjoy whatever I did you can like it on the mod page or send me a beverage worth exchange! I also do paid commissions that you will like it for sure!</p>
                <div class="support-grid">
                    <a href="https://ko-fi.com/mugenrei" target="_blank" class="donation-button">Ko-fi Page</a>
                    <a href="https://ko-fi.com/mugenrei/commissions" target="_blank" class="donation-button">Commissions</a>
                </div>
            </div>
        </div>`,
        about: `
        <div class='intro-section'>
            <p>Sometimes admins don't want some mods on their websites because it either hurts ad revenue, subjective views on the world or the site's bubble, this usually applies for mods that are too too Spicy, too cute, too funny or all the alternatives. Since i just want to put my mods out there i might just split the sites. I plan to do all types of mods, that's why I've made this \"hub\".</p>
        </div>
        `,
        contact: `
        <div class='intro-section'>
            <p>Private message me in any site I have account or discord mugenrei.</p>
        </div>
        `,
    };

    document.getElementById("mainContent").innerHTML = content[section] || content['home'];
    document.getElementById("secondaryContent").style.display = 'none';  // Hide secondary container when non-game content is selected
}


// Function to convert timestamp to readable date
function convertTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
}

// Function to generate HTML for each mod entry
function generateModHTML(mod) {
    let thumbnailUrl = '';

    if (mod.localData && mod.localData.thumbnail) {
        thumbnailUrl = mod.localData.thumbnail;
    } else if (mod.modSiteData && mod.modSiteData.GameBanana) {
        thumbnailUrl = mod.modSiteData.GameBanana.thumbnailBaseUrl + "/" + mod.modSiteData.GameBanana.thumbnailFilename;
    }

    const publishDate = convertTimestamp(mod.publishDate);
    
    return `
        <div class="mod-item" id="${mod.id}">
            <div class="mod-details">
                <h3>${mod.modName}</h3>
                <p>Published on: ${publishDate}</p>
                <div class="mod-links">
                    ${mod.modSiteData && mod.modSiteData.GameBanana ? `<a href="${mod.modSiteData.GameBanana.itemUrl}">GameBanana</a>` : ''}
                    ${mod.localData && mod.localData.mirrors ? Object.keys(mod.localData.mirrors).map(mirror => `<a href="${mod.localData.mirrors[mirror]}">${mirror}</a>`).join('') : ''}
                </div>
            </div>
            <div class="mod-thumbnail">
                ${thumbnailUrl ? `<img src="${thumbnailUrl}" alt="${mod.modName} thumbnail">` : ''}
            </div>
        </div>
    `;
}

// Add hover event listeners to each mod item
function addHoverListeners() {
    const modItems = document.querySelectorAll('.mod-item');

    modItems.forEach((modItem) => {
        modItem.addEventListener('mouseover', () => {
            const modId = modItem.id; // Get the id of the mod item
            const mod = mods.find(m => m.id === modId); // Find the corresponding mod data using the id
            updateDescription(mod);
        });
    });
}

// Call this function after loading mods to attach hover listeners
function loadMoreMods() {
    if (isLoading) return;
    isLoading = true;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const modsToLoad = mods.slice(startIndex, endIndex);

    const mainContent = document.getElementById("mainContent");

    modsToLoad.forEach(mod => {
        const modHTML = generateModHTML(mod);
        mainContent.innerHTML += modHTML;
    });

    addHoverListeners(); // Add hover listeners after adding mods to the DOM

    currentPage++;
    isLoading = false;
}

// Function to update description region on mod hover
function updateDescription(mod) {
    const descriptionRegion = document.getElementById('descriptionRegion');
    let descriptionHTML = '';

    // Check for localData
    if (mod.localData) {
        const modTargetDemon = mod.localData.modTargetDemon || '';
        const modSeries = mod.localData.modSeries || '';
        const modCommissioner = mod.localData.modCommissioner || '';
        const modDescription = mod.localData.modDescription || '';
    
        // Only add to descriptionHTML if they have values
        if (modTargetDemon) {
            descriptionHTML += `<p><strong>Replaces:</strong> ${modTargetDemon}</p>`;
        }

        if (modSeries) {
            descriptionHTML += `<p><strong>Series:</strong> ${modSeries}</p>`;
        }

        if (modCommissioner) {
            descriptionHTML += `<p>My sincere thanks to ${modCommissioner}</p>`;
        }

        descriptionHTML += `<p>${modDescription}</p>`;
        
    }

    // Check for modSiteData.GameBanana
    if (mod.modSiteData && mod.modSiteData.GameBanana) {
        const gameBanana = mod.modSiteData.GameBanana;``
        const addedDate = convertTimestamp(gameBanana.addedDate);
        const updatedDate = gameBanana.updatedDate ? convertTimestamp(gameBanana.updatedDate) : null;
        const interactionLikes = gameBanana.interactionLikes || 0;
        const interactionComments = gameBanana.interactionComments || 0;
        const interactionFeatured = gameBanana.interactionFeatured ? 'Yes' : ''; // Keep it empty if false
        const interactionViews = gameBanana.interactionViews || 0;
        const category = gameBanana.category || 'N/A';
        const version = gameBanana.version || 'N/A';

        descriptionHTML += `
            <p><strong>GameBanana</strong></p>
            `

        // Only display Featured if it is true
        if (interactionFeatured) {
            descriptionHTML += `<p><strong>Featured!</strong></p>`;
        }

        descriptionHTML += `
            <p><strong>Added Date:</strong> ${addedDate}</p>
            `;

        // Only display Featured if it is true
        if (updatedDate) {
            descriptionHTML += `<p><strong>Updated Date:</strong> ${updatedDate}</p>`;
        };
        descriptionHTML += `
            <p><strong>Likes:</strong> ${interactionLikes}</p>
            <p><strong>Comments:</strong> ${interactionComments}</p>
            <p><strong>Views:</strong> ${interactionViews}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Version:</strong> ${version}</p>
            `;
    }

    // Update the description region with the mod's details
    descriptionRegion.innerHTML = descriptionHTML;
}

// Function to reset the mod list and apply filtering
function filterModsByGame(gameFilter) {
    const mainContent = document.getElementById("mainContent");
    mainContent.innerHTML = ''; // Clear the list

    // Filter mods based on the selected game
    let filteredMods;
    if (gameFilter === 'ALL') {
        filteredMods = mods.slice().reverse(); // Reverse the list by default
    } else {
        filteredMods = mods
            .filter(mod => mod.game === gameFilter)
            .slice().reverse(); // Reverse order after filtering
    }

    filteredMods.forEach(mod => {
        const modHTML = generateModHTML(mod);
        mainContent.innerHTML += modHTML;
    });

    // Display secondary content
    document.getElementById("secondaryContent").style.display = 'block';
    addHoverListeners(); // Re-attach hover listeners for new mod list
}

// Fetch mods from mods.json
async function fetchMods() {
    try {
        const response = await fetch('assets/mods.json');
        mods = await response.json(); // Store mods
    } catch (error) {
        console.error('Error fetching mods:', error);
    }
}
showContent('home')
fetchMods()

// Event listeners for navbar filters
document.getElementById('navAll').addEventListener('click', () => {
    filterModsByGame('ALL');
});
document.getElementById('navSMTV').addEventListener('click', () => {
    filterModsByGame('Shin Megami Tensei V');
});
document.getElementById('navSMTVV').addEventListener('click', () => {
    filterModsByGame('Shin Megami Tensei V: Vengeance');
});

// Infinite scroll event listener
// window.addEventListener('scroll', () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//         loadMoreMods();
//     }
// });