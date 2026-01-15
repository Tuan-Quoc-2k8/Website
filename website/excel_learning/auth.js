// ==================== AUTHENTICATION SYSTEM ====================

const Auth = {
  currentUser: null,
  currentUserData: null,
  
  init() {
    const sessionUser = sessionStorage.getItem('currentUser');
    if (sessionUser) {
      this.currentUser = sessionUser;
      this.loadUserProgress();
    } else {
      // Redirect to login page if not logged in
      if (!window.location.pathname.includes('login') && !window.location.pathname.includes('index')) {
        window.location.href = 'login.html';
      }
    }
  },
  
  loadUserProgress() {
    if (!this.currentUser) return;
    
    const progressKey = `progress_${this.currentUser}`;
    const savedProgress = localStorage.getItem(progressKey);
    
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      UserStore.userProgress = {
        ...UserStore.userProgress,
        ...progress,
        username: this.currentUser
      };
    }
    
    UserStore.updateStreak();
    UserStore.updateUI();
  },
  
  saveUserProgress() {
    if (!this.currentUser) return;
    
    const progressKey = `progress_${this.currentUser}`;
    const progressData = { ...UserStore.userProgress };
    delete progressData.username; // Don't save username in progress
    
    localStorage.setItem(progressKey, JSON.stringify(progressData));
  },
  
  logout() {
    UI.confirm(
      I18n.t('ui.logoutConfirmTitle'),
      I18n.t('ui.confirmLogout'),
      (confirmed) => {
        if (confirmed) {
          this.saveUserProgress();
          this.currentUser = null;
          this.currentUserData = null;
          sessionStorage.removeItem('currentUser');
          
          // Redirect to login page
          window.location.href = 'login.html';
        }
      }
    );
  },
  
  isAdmin() {
    return this.currentUserData && this.currentUserData.role === 'admin';
  },
  
  isTeacher() {
    return this.currentUserData && (this.currentUserData.role === 'teacher' || this.currentUserData.role === 'admin');
  }
};