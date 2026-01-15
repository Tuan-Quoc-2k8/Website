// ==================== UI MODALS & NOTIFICATIONS ====================

const Toast = {
  show(message, title = '', type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = { success: '✓', error: '✗', warning: '⚠', info: 'ℹ' };
    
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || 'ℹ'}</div>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut .3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

const UI = {
  confirmCallback: null,
  currentTab: 'stats',
  
  openRewardModal() {
    document.getElementById('reward-modal').classList.remove('hidden');
    document.getElementById('reward-code-input').value = '';
    document.getElementById('reward-code-input').focus();
  },
  
  closeRewardModal() {
    document.getElementById('reward-modal').classList.add('hidden');
  },
  
  switchTab(tabName) {
    this.currentTab = tabName;
    
    // Update tab buttons
    document.querySelectorAll('.modal-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.add('hidden');
    });
    document.getElementById(`tab-${tabName}-content`).classList.remove('hidden');
  },
  
  openAccountModal() {
    const username = Auth.currentUser || 'Guest';
    document.getElementById('modal-username').textContent = username;
    
    // Show level badge
    const levelBadge = document.getElementById('account-level-badge');
    levelBadge.textContent = I18n.t(`level.${UserStore.userProgress.level}`);
    levelBadge.className = `account-level-badge-small level-${UserStore.userProgress.level}`;
    
    // Update stats in modal
    document.getElementById('modal-xp').textContent = UserStore.userProgress.xp;
    document.getElementById('modal-score').textContent = UserStore.userProgress.score;
    document.getElementById('modal-gems').textContent = UserStore.userProgress.gems;
    document.getElementById('modal-completed').textContent = UserStore.userProgress.completedLessons.length;
    document.getElementById('modal-streak').textContent = UserStore.userProgress.streak;
    document.getElementById('modal-badges').textContent = UserStore.userProgress.achievements.length;
    
    // Render achievements
    const achievementsList = document.getElementById('achievements-list-compact');
    if (UserStore.userProgress.achievements.length === 0) {
      achievementsList.innerHTML = '<p style="color:#94a3b8;font-size:.875rem;text-align:center;padding:1rem">' + I18n.t('ui.noAchievements') + '</p>';
    } else {
      achievementsList.innerHTML = UserStore.userProgress.achievements.map(achId => {
        const badges = {
          first: { name: I18n.t('achievements.first'), icon: '🎯', desc: I18n.t('achievements.firstDesc') },
          five: { name: I18n.t('achievements.five'), icon: '⚡', desc: I18n.t('achievements.fiveDesc') },
          ten: { name: I18n.t('achievements.ten'), icon: '👑', desc: I18n.t('achievements.tenDesc') },
          week: { name: I18n.t('achievements.week'), icon: '🔥', desc: I18n.t('achievements.weekDesc') }
        };
        const badge = badges[achId];
        return badge ? `
          <div class="achievement-badge-compact">
            <div class="achievement-icon-compact">${badge.icon}</div>
            <div>
              <div class="achievement-name-compact">${badge.name}</div>
              <div class="achievement-desc-compact">${badge.desc}</div>
            </div>
          </div>
        ` : '';
      }).join('');
    }
    
    // Sync theme toggle with current theme
    const themeToggle = document.getElementById('theme-toggle-modal');
    const isDark = document.body.classList.contains('dark');
    if (isDark) {
      themeToggle.classList.add('active');
    } else {
      themeToggle.classList.remove('active');
    }
    
    // Reset to stats tab
    this.switchTab('stats');
    
    document.getElementById('account-modal').classList.remove('hidden');
  },
  
  closeAccountModal() {
    document.getElementById('account-modal').classList.add('hidden');
  },
  
  openSuccessModal(xp, gems, achievements) {
    document.getElementById('xp-earned').textContent = `+${xp} XP`;
    document.getElementById('gems-earned').textContent = `+${gems}G`;
    
    const achDiv = document.getElementById('achievement-notification');
    if (achievements.length > 0) {
      achDiv.innerHTML = achievements.map(a => 
        `<div class="achievement-unlocked">${a.icon} ${a.name}</div>`
      ).join('');
    } else {
      achDiv.innerHTML = '';
    }
    
    document.getElementById('success-modal').classList.remove('hidden');
  },
  
  closeSuccessModal() {
    document.getElementById('success-modal').classList.add('hidden');
  },
  
  confirm(title, message, callback) {
    this.confirmCallback = callback;
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    document.getElementById('confirm-modal').classList.remove('hidden');
  },
  
  closeConfirmModal(confirmed) {
    document.getElementById('confirm-modal').classList.add('hidden');
    if (this.confirmCallback) {
      this.confirmCallback(confirmed);
      this.confirmCallback = null;
    }
  },
  
  toggleTheme() {
    document.body.classList.toggle('dark');
    const headerToggle = document.getElementById('theme-toggle');
    const modalToggle = document.getElementById('theme-toggle-modal');
    
    if (headerToggle) headerToggle.classList.toggle('active');
    if (modalToggle) modalToggle.classList.toggle('active');
    
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    LuckysheetService.updateTheme(isDark);
  }
};