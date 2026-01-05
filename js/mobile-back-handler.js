/**
 * ============================================
 * MOBILE BACK BUTTON HANDLER
 * ============================================
 * 
 * This module enables mobile users to close modals and panels
 * using the browser's back button (◀) instead of only X button.
 * 
 * Features:
 * - Settings modal back button support
 * - Premium unlock modal back button support
 * - Mobile navigation menu back button support
 * - Automatic history management
 * - Works with multiple overlays
 * 
 * Usage: Include this file after your main scripts
 */

(function() {
    'use strict';
    
    // ============================================
    // CONFIGURATION
    // ============================================
    
    const CONFIG = {
        // Enable/disable debug logging
        debug: false,
        
        // State identifiers for different modals
        states: {
            settings: 'settings-modal-open',
            premium: 'premium-modal-open',
            navigation: 'mobile-nav-open'
        }
    };
    
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    
    /**
     * Track currently open modals/panels
     */
    let activeOverlays = [];
    
    /**
     * Log debug messages if enabled
     */
    function log(...args) {
        if (CONFIG.debug) {
            console.log('[Mobile Back Handler]', ...args);
        }
    }
    
    /**
     * Add a history state for back button support
     * @param {string} stateId - Unique identifier for the state
     */
    function pushModalState(stateId) {
        // Only push if not already in history
        if (!activeOverlays.includes(stateId)) {
            const state = { modal: stateId };
            history.pushState(state, '', window.location.href);
            activeOverlays.push(stateId);
            log('Pushed state:', stateId, 'Active overlays:', activeOverlays);
        }
    }
    
    /**
     * Remove state when modal closed normally (not via back button)
     * @param {string} stateId - State identifier to remove
     */
    function removeModalState(stateId) {
        const index = activeOverlays.indexOf(stateId);
        if (index > -1) {
            activeOverlays.splice(index, 1);
            
            // Go back in history to remove the state
            if (history.state && history.state.modal === stateId) {
                history.back();
            }
            
            log('Removed state:', stateId, 'Active overlays:', activeOverlays);
        }
    }
    
    /**
     * Clear all modal states
     */
    function clearAllStates() {
        const count = activeOverlays.length;
        activeOverlays = [];
        
        // Go back for each active overlay
        for (let i = 0; i < count; i++) {
            if (history.state && history.state.modal) {
                history.back();
            }
        }
        
        log('Cleared all states');
    }
    
    // ============================================
    // MODAL HANDLERS
    // ============================================
    
    /**
     * Handle settings modal
     */
    function handleSettingsModal() {
        const settingsModal = document.getElementById('settings-modal');
        if (!settingsModal) return;
        
        // INTERCEPT: When settings opens - ADD HISTORY STATE
        const originalOpenSettings = window.openSettings;
        window.openSettings = function() {
            if (originalOpenSettings) {
                originalOpenSettings();
            }
            
            // Push state after modal is visible
            setTimeout(() => {
                pushModalState(CONFIG.states.settings);
            }, 50);
        };
        
        // INTERCEPT: When settings closes normally - REMOVE HISTORY STATE
        const originalCloseSettings = window.closeSettings;
        window.closeSettings = function() {
            if (originalCloseSettings) {
                originalCloseSettings();
            }
            removeModalState(CONFIG.states.settings);
        };
        
        log('Settings modal handler installed');
    }
    
    /**
     * Handle premium unlock modals
     */
    function handlePremiumModals() {
        // INTERCEPT: Premium modal creation
        const originalShowPremiumModal = window.showPremiumModal;
        
        if (originalShowPremiumModal) {
            window.showPremiumModal = function(...args) {
                originalShowPremiumModal.apply(this, args);
                
                // Push state after modal is created
                setTimeout(() => {
                    const premiumModal = document.querySelector('.premium-modal');
                    if (premiumModal) {
                        pushModalState(CONFIG.states.premium);
                    }
                }, 50);
            };
        }
        
        // INTERCEPT: Premium modal close
        // Use MutationObserver to detect modal removal
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.removedNodes.forEach((node) => {
                    if (node.classList && node.classList.contains('premium-modal')) {
                        removeModalState(CONFIG.states.premium);
                        log('Premium modal removed from DOM');
                    }
                });
            });
        });
        
        observer.observe(document.body, { childList: true });
        
        log('Premium modal handler installed');
    }
    
    /**
     * Handle mobile navigation menu
     */
    function handleMobileNavigation() {
        const nav = document.querySelector('nav');
        const navOverlay = document.querySelector('.nav-overlay');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (!nav || !navOverlay || !menuToggle) return;
        
        // INTERCEPT: Menu open
        menuToggle.addEventListener('click', () => {
            // Check if menu is opening (will be active after this click)
            setTimeout(() => {
                if (nav.classList.contains('active')) {
                    pushModalState(CONFIG.states.navigation);
                }
            }, 50);
        });
        
        // INTERCEPT: Menu close via overlay click
        navOverlay.addEventListener('click', () => {
            removeModalState(CONFIG.states.navigation);
        });
        
        // INTERCEPT: Menu close via nav link clicks
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (link.getAttribute('onclick') !== 'openSettings()') {
                    removeModalState(CONFIG.states.navigation);
                }
            });
        });
        
        log('Mobile navigation handler installed');
    }
    
    // ============================================
    // BACK BUTTON HANDLER
    // ============================================
    
    /**
     * Close the appropriate modal when back button is pressed
     * @param {string} stateId - The state identifier to close
     */
    function closeModalByState(stateId) {
        log('Back button pressed, closing:', stateId);
        
        switch (stateId) {
            case CONFIG.states.settings:
                // Close settings modal
                const settingsModal = document.getElementById('settings-modal');
                if (settingsModal && settingsModal.classList.contains('active')) {
                    // Don't remove state here - closeSettings will handle it
                    activeOverlays = activeOverlays.filter(s => s !== stateId);
                    if (window.closeSettings) {
                        window.closeSettings();
                    }
                }
                break;
                
            case CONFIG.states.premium:
                // Close premium modal
                const premiumModal = document.querySelector('.premium-modal');
                if (premiumModal) {
                    // Don't remove state here - removal observer will handle it
                    activeOverlays = activeOverlays.filter(s => s !== stateId);
                    const closeBtn = premiumModal.querySelector('.premium-modal-close');
                    if (closeBtn) {
                        closeBtn.click();
                    } else {
                        premiumModal.remove();
                    }
                }
                break;
                
            case CONFIG.states.navigation:
                // Close mobile navigation
                const nav = document.querySelector('nav');
                const navOverlay = document.querySelector('.nav-overlay');
                if (nav && nav.classList.contains('active')) {
                    // Don't remove state here - click handler will handle it
                    activeOverlays = activeOverlays.filter(s => s !== stateId);
                    nav.classList.remove('active');
                    if (navOverlay) {
                        navOverlay.classList.remove('active');
                    }
                }
                break;
                
            default:
                log('Unknown state:', stateId);
        }
    }
    
    /**
     * Listen for browser back button
     */
    function setupBackButtonListener() {
        window.addEventListener('popstate', (event) => {
            log('Popstate event:', event.state);
            
            // If we have an active overlay and back button was pressed
            if (activeOverlays.length > 0) {
                const lastOverlay = activeOverlays[activeOverlays.length - 1];
                closeModalByState(lastOverlay);
            }
        });
        
        log('Back button listener installed');
    }
    
    // ============================================
    // INITIALIZATION
    // ============================================
    
    /**
     * Initialize the back button handler
     */
    function init() {
        log('Initializing mobile back button handler...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // Setup all handlers
        handleSettingsModal();
        handlePremiumModals();
        handleMobileNavigation();
        setupBackButtonListener();
        
        // Handle page unload - clear states
        window.addEventListener('beforeunload', () => {
            clearAllStates();
        });
        
        log('Mobile back button handler initialized successfully!');
    }
    
    // Start initialization
    init();
    
    // ============================================
    // PUBLIC API (Optional)
    // ============================================
    
    /**
     * Expose public methods if needed
     */
    window.MobileBackHandler = {
        // Enable/disable debug mode
        setDebug: (enabled) => {
            CONFIG.debug = enabled;
            log('Debug mode:', enabled);
        },
        
        // Get current active overlays
        getActiveOverlays: () => [...activeOverlays],
        
        // Manually push/remove states (advanced usage)
        pushState: pushModalState,
        removeState: removeModalState,
        clearAll: clearAllStates
    };
    
})();