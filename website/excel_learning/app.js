// ==================== MAIN APP ====================

const App = {
  init() {
    // Check authentication first
    Auth.init();
    
    // Load saved language
    const savedLang = localStorage.getItem('lang');
    if (savedLang) I18n.currentLang = savedLang;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) themeToggle.classList.add('active');
    }
    
    // Initialize stores
    UserStore.init();
    
    // Update UI
    I18n.updateUI();
    LessonManager.renderLessons();
    this.updateAuthUI();
  },
  
  updateAuthUI() {
    const userNameDisplay = document.getElementById('user-name-display');
    
    if (Auth.currentUser) {
      userNameDisplay.textContent = Auth.currentUser;
      userNameDisplay.classList.remove('hidden');
    } else {
      userNameDisplay.classList.add('hidden');
    }
  },
  
  goToHome() {
    document.getElementById('course-page').classList.remove('hidden');
    document.getElementById('practice-page').classList.add('hidden');
    LuckysheetService.destroy();
    LessonManager.renderLessons();
    UserStore.updateUI();
  },
  
  startLesson(id) {
    UserStore.currentLessonId = id;
    document.getElementById('course-page').classList.add('hidden');
    document.getElementById('practice-page').classList.remove('hidden');
    Practice.init(id);
  },
  
  switchLevel(level) {
    UserStore.currentLevel = level;
    document.querySelectorAll('.level-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-level') === level);
    });
    LessonManager.renderLessons();
  },
  
  filterByCategory() {
    UserStore.currentCategory = document.getElementById('category-filter').value;
    LessonManager.renderLessons();
  }
};

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});