/**
 * ============================================
 * APP.JS - Main Application Logic
 * ============================================
 * Contains all UI logic, event handling, and interactions
 * Data is imported from languages.js and projects.js
 */

/* ============================================
   CONFIGURATION
   ============================================ */
const CONFIG = {
    // About section image (set your image URL here or leave empty for gradient)
    aboutImageUrl: './img/minimal-tech-banner.png',
    
    // Projects per page (auto-adjusts for mobile)
    projectsPerPage: window.innerWidth <= 768 ? 3 : 6,
    
    // Visit counter ('none' for auto-increment, or set a number)
    manualVisitCount: 'none',
    
    // Auto-sort projects alphabetically
    autoSortProjects: true,
    
    // Premium theme unlock keys
    unlockKeys: {
        premium: 'Admin2008',
        exclusive: 'Year2026',
        rainbow: 'Rainbow2025',
        sunset: 'Sunset2025',
        ocean: 'Ocean2025',
        fire: 'Fire2025',
        aurora: 'Aurora2025',
        neon: 'Neon2025'
    },
    
    // Theme names mapping
    themeNames: {
        premium: 'gradient-premium',
        exclusive: 'gradient-exclusive',
        rainbow: 'rainbow',
        sunset: 'sunset',
        ocean: 'ocean',
        fire: 'fire',
        aurora: 'aurora',
        neon: 'neon'
    },
    
    // Available themes
    themes: [
        { id: 'blue', name: 'theme-blue', colors: ['#1e3a8a', '#3b82f6', '#06b6d4'] },
        { id: 'purple', name: 'theme-purple', colors: ['#7c3aed', '#a78bfa', '#c084fc'] },
        { id: 'green', name: 'theme-green', colors: ['#047857', '#10b981', '#34d399'] },
        { id: 'orange', name: 'theme-orange', colors: ['#c2410c', '#f97316', '#fb923c'] },
        { id: 'pink', name: 'theme-pink', colors: ['#be185d', '#ec4899', '#f9a8d4'] },
        { id: 'yellow', name: 'theme-yellow', colors: ['#ca8a04', '#eab308', '#fbbf24'] },
        { id: 'red', name: 'theme-red', colors: ['#b91c1c', '#ef4444', '#f87171'] },
        { id: 'gradient-premium', name: 'theme-gradient-premium', colors: ['#0891b2', '#06b6d4', '#14b8a6'], premium: true },
        { id: 'gradient-exclusive', name: 'theme-gradient-exclusive', colors: ['#F1C9FD', '#FC0061'], premium: true }
    ],
    
    // Main category filters
    mainFilters: [
        { id: 'all', label: 'filter-all', icon: '🎯' },
        { id: 'website', label: 'filter-website', icon: '🌐' },
        { id: 'game', label: 'filter-game', icon: '🎮' },
        { id: 'css', label: 'filter-css', icon: '🎨' }
    ]
};

/* ============================================
   STATE MANAGEMENT
   ============================================ */
let currentLanguage = localStorage.getItem('language') || 'vi';
let currentPage = 1;
let currentMainFilter = 'all';
let currentSubFilters = [];
let filteredProjects = [];

// ============================================
// DATA VALIDATION - Ensure data is loaded
// ============================================
if (typeof projectsData === 'undefined') {
    console.error('❌ projectsData not found! Check if projects.js is loaded correctly.');
}
if (typeof translations === 'undefined') {
    console.error('❌ translations not found! Check if languages.js is loaded correctly.');
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Scroll to section smoothly
 */
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Scroll to top
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Animate number counter
 */
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 125;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Check if a theme is unlocked
 */
function isThemeUnlocked(themeType) {
    return localStorage.getItem(`${themeType}Unlocked`) === 'true';
}

/**
 * Unlock a theme
 */
function unlockTheme(themeType) {
    localStorage.setItem(`${themeType}Unlocked`, 'true');
}

/**
 * Get currently open panels
 */
function getOpenPanels() {
    const panels = [];
    
    const nav = document.querySelector('nav');
    if (nav && nav.classList.contains('active')) {
        panels.push('nav');
    }
    
    const settings = document.getElementById('settings-modal');
    if (settings && settings.classList.contains('active')) {
        panels.push('settings');
    }
    
    const premium = document.querySelector('.premium-modal');
    if (premium) {
        panels.push('premium');
    }
    
    return panels;
}

/* ============================================
   LANGUAGE FUNCTIONS
   ============================================ */

/**
 * Apply language to UI
 */
function applyLanguage(lang) {
    // Update text content
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            const value = translations[lang][key];
            
            // Check if content contains HTML (for special cases)
            if (key.includes('warning-instructions') || key.includes('-desc')) {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder]').forEach(element => {
        const key = element.getAttribute('data-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    document.body.setAttribute('data-lang', lang);
    
    // Re-render projects to update titles/descriptions
    renderProjects();
}

/**
 * Set language
 */
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update active language card
    document.querySelectorAll('.lang-card').forEach(card => card.classList.remove('active'));
    const activeCard = document.querySelector(`[data-lang-code="${lang}"]`);
    if (activeCard) activeCard.classList.add('active');
    
    applyLanguage(lang);
    
    // Re-sort and re-render projects
    filterProjects(currentMainFilter);
}

/* ============================================
   THEME FUNCTIONS
   ============================================ */

/**
 * Set theme
 */
function setTheme(themeName) {
    // Extract theme type (e.g., 'gradient-exclusive' -> 'exclusive')
    const themeType = themeName.replace('gradient-', '');
    
    // Check if it's a locked premium theme
    const lockedThemes = ['premium', 'exclusive', 'rainbow', 'sunset', 'ocean', 'fire', 'aurora', 'neon'];
    
    if (lockedThemes.includes(themeType) && !isThemeUnlocked(themeType)) {
        showPremiumModal(themeType);
        return;
    }
    
    // Apply theme
    document.body.setAttribute('data-theme', themeName);
    
    // Update active theme card
    document.querySelectorAll('.theme-card').forEach(card => card.classList.remove('active'));
    const activeCard = document.querySelector(`.theme-card[data-theme="${themeName}"]`);
    if (activeCard) activeCard.classList.add('active');
    
    // Save to localStorage
    localStorage.setItem('theme', themeName);
}

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) toggle.classList.toggle('active');
    
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
}

/**
 * Show premium unlock modal
 */
function showPremiumModal(themeType = 'premium') {
    const themeConfigs = {
        'premium': {
            titleKey: 'unlock-premium-title',
            descKey: 'unlock-premium-desc',
            gradient: 'linear-gradient(135deg, #0891b2, #06b6d4, #14b8a6)',
            themeName: 'gradient-premium'
        },
        'exclusive': {
            titleKey: 'unlock-exclusive-title',
            descKey: 'unlock-exclusive-desc',
            gradient: 'linear-gradient(135deg, #F1C9FD, #FC0061)',
            themeName: 'gradient-exclusive'
        },
        'rainbow': {
            titleKey: 'unlock-rainbow-title',
            descKey: 'unlock-rainbow-desc',
            gradient: 'linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
            themeName: 'rainbow'
        },
        'sunset': {
            titleKey: 'unlock-sunset-title',
            descKey: 'unlock-sunset-desc',
            gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53, #FFD93D, #FFB74D, #6BCB77)',
            themeName: 'sunset'
        },
        'ocean': {
            titleKey: 'unlock-ocean-title',
            descKey: 'unlock-ocean-desc',
            gradient: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #4facfe, #00f2fe)',
            themeName: 'ocean'
        }
    };
    
    const config = themeConfigs[themeType] || themeConfigs['premium'];
    const lang = currentLanguage;
    
    const modal = document.createElement('div');
    modal.className = 'premium-modal';
    modal.innerHTML = `
        <div class="premium-modal-content">
            <div class="premium-modal-header">
                <h3>${translations[lang][config.titleKey]}</h3>
                <button class="premium-modal-close">×</button>
            </div>
            <div class="premium-modal-body">
                <div style="width: 100%; height: 60px; background: ${config.gradient}; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"></div>
                <p>${translations[lang][config.descKey]}</p>
                <input type="text" id="premium-key-input" class="premium-input" 
                       placeholder="${translations[lang]['unlock-key-placeholder']}" autocomplete="off">
                <div id="premium-error" class="premium-error"></div>
            </div>
            <div class="premium-modal-footer">
                <button class="btn btn-secondary premium-cancel-btn">${translations[lang]['unlock-cancel']}</button>
                <button class="btn btn-primary premium-unlock-btn">${translations[lang]['unlock-button']}</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event handlers
    const closeBtn = modal.querySelector('.premium-modal-close');
    const cancelBtn = modal.querySelector('.premium-cancel-btn');
    const unlockBtn = modal.querySelector('.premium-unlock-btn');
    const keyInput = modal.querySelector('#premium-key-input');
    
    const closeModal = () => {
        modal.remove();
        setTimeout(() => {
            const remaining = getOpenPanels();
            const hasBlockingPanel = remaining.some(panel => 
                panel === 'settings' || panel === 'premium'
            );
            if (!hasBlockingPanel) {
                document.body.style.overflow = '';
            }
        }, 100);
    };
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    unlockBtn.addEventListener('click', () => verifyPremiumKey(themeType));
    keyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyPremiumKey(themeType);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Focus input
    setTimeout(() => keyInput.focus(), 100);
}

/**
 * Verify premium unlock key
 */
function verifyPremiumKey(themeType = 'premium') {
    const input = document.getElementById('premium-key-input');
    const error = document.getElementById('premium-error');
    const key = input.value.trim();
    
    const correctKey = CONFIG.unlockKeys[themeType];
    const themeToApply = CONFIG.themeNames[themeType];
    
    if (key === correctKey) {
        unlockTheme(themeType);
        
        // Update theme card
        const themeCard = document.getElementById(`${themeType}-theme-card`);
        if (themeCard) themeCard.classList.add('unlocked');
        
        error.style.color = '#10b981';
        error.textContent = translations[currentLanguage]['unlock-success'];
        
        setTimeout(() => {
            document.querySelector('.premium-modal').remove();
            setTheme(themeToApply);
        }, 800);
    } else {
        error.style.color = '#ef4444';
        error.textContent = translations[currentLanguage]['unlock-error'];
        input.value = '';
        input.focus();
    }
}

/* ============================================
   PROJECT FUNCTIONS
   ============================================ */

/**
 * Sort projects by language
 */
function sortProjectsByLanguage(projectsArray, lang) {
    if (!CONFIG.autoSortProjects) return projectsArray;
    
    const titleKeys = {
        vi: 'title',
        en: 'titleEn',
        ko: 'titleKo',
        ja: 'titleJa',
        zh: 'titleZh'
    };
    
    const key = titleKeys[lang] || 'titleEn';
    
    return [...projectsArray].sort((a, b) => {
        const titleA = (a[key] || a.titleEn || a.title || '').toLowerCase();
        const titleB = (b[key] || b.titleEn || b.title || '').toLowerCase();
        return titleA.localeCompare(titleB);
    });
}

/**
 * Get available tags from filtered projects
 */
function getAvailableTags(mainFilter) {
    const projectsToCheck = mainFilter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === mainFilter);
    
    const tagsSet = new Set();
    projectsToCheck.forEach(project => {
        if (project.tags) {
            project.tags.forEach(tag => tagsSet.add(tag));
        }
    });
    
    return Array.from(tagsSet).sort();
}

/**
 * Toggle a sub-filter tag
 */
function toggleSubFilter(tag) {
    const index = currentSubFilters.indexOf(tag);
    
    if (index > -1) {
        currentSubFilters.splice(index, 1);
    } else {
        currentSubFilters.push(tag);
    }
    
    applyFilters();
    renderSubFilters();
}

/**
 * Clear all sub-filters
 */
function clearAllSubFilters() {
    currentSubFilters = [];
    applyFilters();
    renderSubFilters();
}

/**
 * Apply both main and sub filters
 */
function applyFilters() {
    currentPage = 1;
    
    // Start with main category filter
    let filtered = currentMainFilter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === currentMainFilter);
    
    // Apply sub-filters (tags)
    if (currentSubFilters.length > 0) {
        filtered = filtered.filter(project => {
            return currentSubFilters.every(tag => 
                project.tags && project.tags.includes(tag)
            );
        });
    }
    
    filteredProjects = sortProjectsByLanguage(filtered, currentLanguage);
    
    renderProjects();
    renderPagination();
}

/**
 * Filter projects by category
 */
function filterProjects(filter) {
    currentMainFilter = filter;
    currentSubFilters = [];
    applyFilters();
    renderSubFilters();
}

/**
 * Render main category filters
 */
function renderMainFilters() {
    const container = document.getElementById('main-filters');
    if (!container) return;
    
    const html = CONFIG.mainFilters.map(filter => `
        <button class="filter-btn ${filter.id === 'all' ? 'active' : ''}" 
                data-filter="${filter.id}">
            <span class="filter-icon">${filter.icon}</span>
            <span data-lang="${filter.label}">${translations[currentLanguage][filter.label]}</span>
        </button>
    `).join('');
    
    container.innerHTML = html;
    
    // Add event listeners
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(btn.getAttribute('data-filter'));
        });
    });
}

/**
 * Render sub-filters (tags)
 */
function renderSubFilters() {
    const container = document.getElementById('sub-filters');
    if (!container) return;
    
    const availableTags = getAvailableTags(currentMainFilter);
    
    if (availableTags.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'flex';
    container.innerHTML = '';
    
    // Add tag buttons
    availableTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'sub-filter-btn';
        btn.textContent = tag;
        btn.dataset.tag = tag;
        
        if (currentSubFilters.includes(tag)) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => toggleSubFilter(tag));
        container.appendChild(btn);
    });
    
    // Add clear button if needed
    if (currentSubFilters.length > 0) {
        const clearBtn = document.createElement('button');
        clearBtn.className = 'sub-filter-clear show';
        clearBtn.innerHTML = `<span>✕</span> <span>${translations[currentLanguage]['filter-clear'] || 'Clear'}</span>`;
        clearBtn.addEventListener('click', clearAllSubFilters);
        container.appendChild(clearBtn);
    }
}

/**
 * Render projects grid
 */
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    const start = (currentPage - 1) * CONFIG.projectsPerPage;
    const end = start + CONFIG.projectsPerPage;
    const pageProjects = filteredProjects.slice(start, end);
    
    const keyMap = {
        vi: ['title', 'desc'],
        en: ['titleEn', 'descEn'],
        ko: ['titleKo', 'descKo'],
        ja: ['titleJa', 'descJa'],
        zh: ['titleZh', 'descZh']
    };
    
    const [titleKey, descKey] = keyMap[currentLanguage] || keyMap.en;
    
    const html = pageProjects.map(project => {
        const title = project[titleKey] || project.titleEn || project.title;
        const desc = project[descKey] || project.descEn || project.desc;
        const isMaintenance = project.badge === 'MAINTENANCE';
        
        const badge = project.badge
            ? `<span class="badge badge-${project.badge.toLowerCase()}" 
                     data-lang="badge-${project.badge.toLowerCase()}">
                     ${translations[currentLanguage]['badge-' + project.badge.toLowerCase()] || project.badge}
               </span>`
            : '';
        
        const actionBtn = isMaintenance
            ? `<span class="btn btn-primary btn-maintenance" 
                     data-lang="badge-maintenance" 
                     aria-disabled="true">
                     ${translations[currentLanguage]['badge-maintenance']}
               </span>`
            : `<a href="${project.link}" 
                  class="btn btn-primary project-link" 
                  ${project.link !== '#' ? 'target="_blank"' : ''} 
                  data-lang="access-project">
                  ${translations[currentLanguage]['access-project']}
               </a>`;
        
        return `
            <div class="project-card show" data-category="${project.category}">
                <div class="project-img">
                    ${project.image
                        ? `<img src="${project.image}" alt="${title}">`
                        : `<span class="project-img-icon">${project.icon}</span>`
                    }
                </div>
                <div class="project-body">
                    <h3 class="project-title">${title}${badge}</h3>
                    <p class="project-desc">${desc}</p>
                    <div class="project-tags">
                        ${project.tags ? project.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                    </div>
                    ${actionBtn}
                </div>
            </div>
        `;
    }).join('');
    
    grid.innerHTML = html;
}

/**
 * Render pagination (Desktop & Mobile)
 */
function renderPagination() {
    const container = document.getElementById('pagination');
    if (!container) return;
    
    const totalPages = Math.ceil(filteredProjects.length / CONFIG.projectsPerPage);
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        renderMobilePagination(container, currentPage, totalPages);
    } else {
        renderDesktopPagination(container, currentPage, totalPages);
    }
}

/**
 * Render mobile pagination (compact)
 */
function renderMobilePagination(container, current, total) {
    let html = '';
    
    // Previous button
    html += `<button class="page-btn" onclick="changePage(${current - 1})" 
                     ${current === 1 ? 'disabled' : ''}>←</button>`;
    
    // Current page info
    html += `<span class="page-info">${current} / ${total}</span>`;
    
    // Next button
    html += `<button class="page-btn" onclick="changePage(${current + 1})" 
                     ${current === total ? 'disabled' : ''}>→</button>`;
    
    container.innerHTML = html;
}

/**
 * Render desktop pagination (full)
 */
function renderDesktopPagination(container, current, total) {
    let html = '';
    
    // Previous button
    html += `<button class="page-btn" onclick="changePage(${current - 1})" 
                     ${current === 1 ? 'disabled' : ''}>←</button>`;
    
    // Page numbers
    if (total <= 7) {
        // Show all pages
        for (let i = 1; i <= total; i++) {
            html += `<button class="page-btn ${i === current ? 'active' : ''}" 
                             onclick="changePage(${i})">${i}</button>`;
        }
    } else {
        // Smart pagination for 8+ pages
        html += `<button class="page-btn ${1 === current ? 'active' : ''}" 
                         onclick="changePage(1)">1</button>`;
        
        if (current <= 3) {
            for (let i = 2; i <= 4; i++) {
                html += `<button class="page-btn ${i === current ? 'active' : ''}" 
                                 onclick="changePage(${i})">${i}</button>`;
            }
            html += `<span class="page-ellipsis" style="padding:0 .5rem">...</span>`;
        } else if (current >= total - 2) {
            html += `<span class="page-ellipsis" style="padding:0 .5rem">...</span>`;
            for (let i = total - 3; i < total; i++) {
                html += `<button class="page-btn ${i === current ? 'active' : ''}" 
                                 onclick="changePage(${i})">${i}</button>`;
            }
        } else {
            html += `<span class="page-ellipsis" style="padding:0 .5rem">...</span>`;
            for (let i = current - 1; i <= current + 1; i++) {
                html += `<button class="page-btn ${i === current ? 'active' : ''}" 
                                 onclick="changePage(${i})">${i}</button>`;
            }
            html += `<span class="page-ellipsis" style="padding:0 .5rem">...</span>`;
        }
        
        html += `<button class="page-btn ${total === current ? 'active' : ''}" 
                         onclick="changePage(${total})">${total}</button>`;
    }
    
    // Next button
    html += `<button class="page-btn" onclick="changePage(${current + 1})" 
                     ${current === total ? 'disabled' : ''}>→</button>`;
    
    container.innerHTML = html;
}

/**
 * Change page
 */
function changePage(page) {
    const totalPages = Math.ceil(filteredProjects.length / CONFIG.projectsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderProjects();
    renderPagination();
    scrollToSection('projects');
}

/* ============================================
   SETTINGS & MODAL FUNCTIONS
   ============================================ */

/**
 * Open settings modal
 */
function openSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close settings modal
 */
function closeSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            const openPanels = getOpenPanels();
            const isMobile = window.innerWidth <= 768;
            const hasBlockingPanel = openPanels.some(panel => 
                panel === 'settings' || panel === 'premium'
            );
            
            if (openPanels.length === 0 || (isMobile && !hasBlockingPanel)) {
                document.body.style.overflow = '';
            }
        }, 100);
    }
}

/**
 * Close topmost panel
 */
function closeTopmostPanel() {
    const openPanels = getOpenPanels();
    
    if (openPanels.length === 0) return;
    
    const topPanel = openPanels[openPanels.length - 1];
    
    switch (topPanel) {
        case 'premium':
            const premiumModal = document.querySelector('.premium-modal');
            if (premiumModal) premiumModal.remove();
            break;
        case 'settings':
            closeSettings();
            break;
        case 'nav':
            const nav = document.querySelector('nav');
            const navOverlay = document.querySelector('.nav-overlay');
            if (nav) nav.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            break;
    }
}

/**
 * Render theme grid
 */
function renderThemeGrid() {
    const container = document.getElementById('theme-grid');
    if (!container) return;
    
    const html = CONFIG.themes.map(theme => {
        const isUnlocked = theme.premium ? isThemeUnlocked(theme.id.replace('gradient-', '')) : true;
        const colorGradient = `linear-gradient(135deg, ${theme.colors.join(', ')})`;
        
        return `
            <div class="theme-card ${theme.premium && !isUnlocked ? '' : ''} ${isUnlocked ? 'unlocked' : ''}" 
                 data-theme="${theme.id}" 
                 id="${theme.id}-theme-card">
                <div class="theme-color" style="background:${colorGradient}"></div>
                <div class="theme-name" data-lang="${theme.name}">
                    ${translations[currentLanguage][theme.name]}
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
    
    // Add event listeners
    container.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
            setTheme(card.getAttribute('data-theme'));
        });
    });
}

/* ============================================
   INITIALIZATION
   ============================================ */

/**
 * Initialize application
 */
function initializeApp() {
    // Set about image
    const aboutImg = document.getElementById('about-img');
    if (aboutImg && CONFIG.aboutImageUrl) {
        aboutImg.innerHTML = `<img src="${CONFIG.aboutImageUrl}" alt="About">`;
    }
    
    // Create loading particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.setProperty('--x-offset', `${(Math.random() - 0.5) * 100}px`);
            particlesContainer.appendChild(particle);
        }
    }
    
    // Loading progress
    let progress = 0;
    const progressBar = document.querySelector('.loading-progress-bar');
    const percentage = document.querySelector('.loading-percentage');
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        if (progressBar) progressBar.style.width = progress + '%';
        if (percentage) percentage.textContent = Math.floor(progress) + '%';
    }, 100);
    
    // Hide loading screen
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('hide');
        
        // Animate stats
        document.querySelectorAll('.stat-number[data-count]').forEach(element => {
            animateNumber(element, parseInt(element.getAttribute('data-count')));
        });
        
        // Animate skill progress bars
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.progress-fill').forEach(fill => {
                            fill.style.width = fill.getAttribute('data-width') + '%';
                        });
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
        
        // Visit counter
        let visitCount;
        if (CONFIG.manualVisitCount === 'none') {
            visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
            localStorage.setItem('visitCount', visitCount);
        } else {
            visitCount = parseInt(CONFIG.manualVisitCount) || 0;
        }
        
        const visitElement = document.getElementById('visit-count');
        if (visitElement) animateNumber(visitElement, visitCount);
    }, 2000);
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'blue';
    setTheme(savedTheme);
    
    // Load dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) toggle.classList.add('active');
    }
    
    // Apply language
    applyLanguage(currentLanguage);
    
    // Set active language card
    document.querySelectorAll('.lang-card').forEach(card => card.classList.remove('active'));
    const activeLangCard = document.querySelector(`[data-lang-code="${currentLanguage}"]`);
    if (activeLangCard) activeLangCard.classList.add('active');
    
    // Initialize projects
    filteredProjects = sortProjectsByLanguage([...projectsData], currentLanguage);
    renderMainFilters();
    renderSubFilters();
    renderProjects();
    renderPagination();
    
    // Initialize theme grid
    renderThemeGrid();
    
    // Setup event listeners
    setupEventListeners();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (nav) nav.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
        });
    }
    
    // Nav overlay click
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            const openPanels = getOpenPanels();
            if (openPanels[openPanels.length - 1] === 'nav') {
                if (nav) nav.classList.remove('active');
                navOverlay.classList.remove('active');
            }
        });
    }
    
    // Nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (link.getAttribute('onclick') !== 'openSettings()') {
                if (nav) nav.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
            }
        });
    });
    
    // Skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });
    
    // Language cards
    document.querySelectorAll('.lang-card').forEach(card => {
        card.addEventListener('click', () => {
            setLanguage(card.getAttribute('data-lang-code'));
        });
    });
    
    // Settings modal overlay
    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target.id === 'settings-modal') {
                closeTopmostPanel();
            }
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = currentLanguage === 'vi' ? 'Đang gửi...' : 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = currentLanguage === 'vi' ? '✓ Đã gửi!' : '✓ Sent!';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    e.target.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newPerPage = window.innerWidth <= 768 ? 3 : 6;
            if (newPerPage !== CONFIG.projectsPerPage) {
                CONFIG.projectsPerPage = newPerPage;
                filterProjects(currentMainFilter);
            }
            
            // Close mobile menu on desktop
            if (window.innerWidth > 768) {
                if (nav) nav.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
            }
            
            // Re-render pagination for responsive design
            renderPagination();
        }, 250);
    });
}

// ============================================
// START APPLICATION
// ============================================
document.addEventListener('DOMContentLoaded', initializeApp);