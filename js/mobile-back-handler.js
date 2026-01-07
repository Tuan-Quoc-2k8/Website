/**
 * ============================================
 * MOBILE BACK BUTTON HANDLER v2.0 (FIXED)
 * ============================================
 * 
 * FIX: Prevents cascade closing when manually closing panels
 * - Manual close (X/overlay): Only closes current panel
 * - Back button: Closes panels step by step
 */

(function() {
    'use strict';
    
    // ============================================
    // CONFIGURATION
    // ============================================
    
    const CONFIG = {
        debug: false,
        states: {
            settings: 'settings-modal-open',
            premium: 'premium-modal-open',
            navigation: 'mobile-nav-open'
        },
        mobileBreakpoint: 768
    };
    
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    
    let activeOverlays = [];
    
    // 🆕 NEW: Flag to prevent cascade closing
    let isManualClose = false;
    
    function log(...args) {
        if (CONFIG.debug) {
            console.log('[Mobile Back Handler]', ...args);
        }
    }
    
    function isMobile() {
        return window.innerWidth <= CONFIG.mobileBreakpoint;
    }
    
    function pushModalState(stateId) {
        if (!isMobile()) {
            log('Skipping state push on desktop:', stateId);
            return;
        }
        
        if (!activeOverlays.includes(stateId)) {
            const state = { modal: stateId };
            history.pushState(state, '', window.location.href);
            activeOverlays.push(stateId);
            log('✅ Pushed state:', stateId, '| Active:', activeOverlays);
        }
    }
    
    /**
     * 🔧 FIXED: Remove state without triggering cascade close
     */
    function removeModalState(stateId) {
        const index = activeOverlays.indexOf(stateId);
        if (index === -1) return;
        
        // Remove from tracking array
        activeOverlays.splice(index, 1);
        
        // 🆕 Set flag to prevent popstate handler from closing other panels
        isManualClose = true;
        
        // Go back in history to clean up
        if (history.state && history.state.modal === stateId) {
            history.back();
        }
        
        // 🆕 Reset flag after a short delay
        setTimeout(() => {
            isManualClose = false;
        }, 50);
        
        log('❌ Removed state:', stateId, '| Active:', activeOverlays);
    }
    
    function clearAllStates() {
        const count = activeOverlays.length;
        activeOverlays = [];
        
        isManualClose = true;
        
        for (let i = 0; i < count; i++) {
            if (history.state && history.state.modal) {
                history.back();
            }
        }
        
        setTimeout(() => {
            isManualClose = false;
        }, 50);
        
        log('🗑️ Cleared all states');
    }
    
    // ============================================
    // MODAL HANDLERS
    // ============================================
    
    function handleSettingsModal() {
        const settingsModal = document.getElementById('settings-modal');
        if (!settingsModal) return;
        
        const originalOpenSettings = window.openSettings;
        window.openSettings = function() {
            if (originalOpenSettings) {
                originalOpenSettings();
            }
            
            setTimeout(() => {
                pushModalState(CONFIG.states.settings);
            }, 50);
        };
        
        const originalCloseSettings = window.closeSettings;
        window.closeSettings = function() {
            // 🆕 Remove state BEFORE closing (prevents race condition)
            removeModalState(CONFIG.states.settings);
            
            if (originalCloseSettings) {
                originalCloseSettings();
            }
        };
        
        log('⚙️ Settings modal handler installed');
    }
    
    function handlePremiumModals() {
        const originalShowPremiumModal = window.showPremiumModal;
        
        if (originalShowPremiumModal) {
            window.showPremiumModal = function(...args) {
                originalShowPremiumModal.apply(this, args);
                
                setTimeout(() => {
                    const premiumModal = document.querySelector('.premium-modal');
                    if (premiumModal) {
                        pushModalState(CONFIG.states.premium);
                    }
                }, 50);
            };
        }
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.removedNodes.forEach((node) => {
                    if (node.classList && node.classList.contains('premium-modal')) {
                        removeModalState(CONFIG.states.premium);
                        log('💎 Premium modal removed');
                    }
                });
            });
        });
        
        observer.observe(document.body, { childList: true });
        
        log('💎 Premium modal handler installed');
    }
    
    function handleMobileNavigation() {
        const nav = document.querySelector('nav');
        const navOverlay = document.querySelector('.nav-overlay');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (!nav || !navOverlay || !menuToggle) return;
        
        // Menu open
        menuToggle.addEventListener('click', () => {
            setTimeout(() => {
                if (nav.classList.contains('active') && isMobile()) {
                    pushModalState(CONFIG.states.navigation);
                }
            }, 50);
        });
        
        // 🔧 FIXED: Remove state BEFORE closing nav
        const closeNav = () => {
            if (nav.classList.contains('active')) {
                removeModalState(CONFIG.states.navigation);
                
                // 🔧 FIX: Ensure scroll is enabled when nav closes
                setTimeout(() => {
                    const openPanels = getOpenPanels();
                    const hasBlockingPanel = openPanels.some(panel => 
                        panel === 'settings' || panel === 'premium'
                    );
                    
                    if (!hasBlockingPanel) {
                        document.body.style.overflow = '';
                        log('✅ Scroll restored after nav close');
                    }
                }, 100);
            }
        };
        
        // Overlay click
        navOverlay.addEventListener('click', closeNav);
        
        // Nav link clicks
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (link.getAttribute('onclick') !== 'openSettings()') {
                    closeNav();
                }
            });
        });
        
        log('📱 Mobile navigation handler installed');
    }
    
    // ============================================
    // BACK BUTTON HANDLER (FIXED)
    // ============================================
    
    function closeModalByState(stateId) {
        log('◀️ Back button closing:', stateId);
        
        // Remove from tracking (without calling history.back again)
        const index = activeOverlays.indexOf(stateId);
        if (index > -1) {
            activeOverlays.splice(index, 1);
        }
        
        switch (stateId) {
            case CONFIG.states.settings:
                const settingsModal = document.getElementById('settings-modal');
                if (settingsModal && settingsModal.classList.contains('active')) {
                    settingsModal.classList.remove('active');
                    
                    // 🔧 FIX: Add delay to ensure DOM updates before checking
                    setTimeout(() => {
                        const openPanels = getOpenPanels();
                        
                        // 🔧 FIX: On mobile, only modal panels block scroll
                        const hasBlockingPanel = openPanels.some(panel => 
                            panel === 'settings' || panel === 'premium'
                        );
                        
                        if (!hasBlockingPanel) {
                            document.body.style.overflow = '';
                            log('✅ Scroll restored via back button');
                        }
                    }, 100);
                }
                break;
                
            case CONFIG.states.premium:
                const premiumModal = document.querySelector('.premium-modal');
                if (premiumModal) {
                    const closeBtn = premiumModal.querySelector('.premium-modal-close');
                    if (closeBtn) {
                        closeBtn.click();
                    } else {
                        premiumModal.remove();
                    }
                }
                break;
                
            case CONFIG.states.navigation:
                const nav = document.querySelector('nav');
                const navOverlay = document.querySelector('.nav-overlay');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (navOverlay) {
                        navOverlay.classList.remove('active');
                    }
                }
                break;
                
            default:
                log('❓ Unknown state:', stateId);
        }
    }
    
    /**
     * 🔧 FIXED: Only close panel if back button was pressed (not manual close)
     */
    function setupBackButtonListener() {
        window.addEventListener('popstate', (event) => {
            log('📍 Popstate event:', event.state, '| Manual close:', isManualClose);
            
            if (!isMobile()) {
                log('🖥️ Ignoring popstate on desktop');
                return;
            }
            
            // 🆕 CRITICAL FIX: Skip if this was triggered by manual close
            if (isManualClose) {
                log('⏭️ Skipping - manual close in progress');
                return;
            }
            
            // Only process if back button was actually pressed
            if (activeOverlays.length > 0) {
                const lastOverlay = activeOverlays[activeOverlays.length - 1];
                closeModalByState(lastOverlay);
            }
        });
        
        log('◀️ Back button listener installed');
    }
    
    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    /**
     * 🆕 Helper to check what panels are open (from main code)
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
    
    function handleResize() {
        if (!isMobile() && activeOverlays.length > 0) {
            log('📏 Switched to desktop, clearing mobile states');
            clearAllStates();
        }
    }
    
    // ============================================
    // INITIALIZATION
    // ============================================
    
    function init() {
        log('🚀 Initializing mobile back button handler v2.0...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        handleSettingsModal();
        handlePremiumModals();
        handleMobileNavigation();
        setupBackButtonListener();
        
        window.addEventListener('resize', handleResize);
        
        window.addEventListener('beforeunload', () => {
            clearAllStates();
        });
        
        log('✅ Mobile back button handler v2.0 initialized!');
        log('📱 Mobile mode:', isMobile());
    }
    
    init();
    
    // ============================================
    // PUBLIC API
    // ============================================
    
    window.MobileBackHandler = {
        setDebug: (enabled) => {
            CONFIG.debug = enabled;
            log('🐛 Debug mode:', enabled);
        },
        
        getActiveOverlays: () => [...activeOverlays],
        isMobile: isMobile,
        pushState: pushModalState,
        removeState: removeModalState,
        clearAll: clearAllStates,
        
        // 🆕 New: Check if manual close is in progress
        isManualClose: () => isManualClose
    };
    
})();