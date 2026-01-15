// ==================== USER STORE ====================

const UserStore = {
  currentLevel: 'beginner',
  currentCategory: 'all',
  currentLessonId: null,
  
  userProgress: {
    xp: 0,
    score: 0,
    gems: 100,
    level: 'beginner',
    completedLessons: [],
    lessonProgress: {},
    achievements: [],
    streak: 0,
    lastActive: null,
    username: 'Guest',
    allUnlocked: false
  },
  
  init() {
    this.updateStreak();
    this.updateUI();
  },
  
  save() {
    Auth.saveUserProgress();
  },
  
  updateStreak() {
    const today = new Date().toDateString();
    const last = this.userProgress.lastActive;
    
    if (last !== today) {
      const daysDiff = last ? Math.floor((new Date() - new Date(last)) / 86400000) : 999;
      
      if (daysDiff === 1) {
        this.userProgress.streak++;
      } else if (daysDiff > 1) {
        this.userProgress.streak = 1;
      }
      
      this.userProgress.lastActive = today;
      this.save();
    }
  },
  
  addXP(amount) {
    this.userProgress.xp += amount;
    const xp = this.userProgress.xp;
    
    // Update level based on XP
    if (xp >= 1000) {
      this.userProgress.level = 'advanced';
    } else if (xp >= 500) {
      this.userProgress.level = 'intermediate';
    } else {
      this.userProgress.level = 'beginner';
    }
    
    this.save();
    this.updateUI();
  },
  
  addScore(amount) {
    this.userProgress.score += amount;
    this.save();
    this.updateUI();
  },
  
  addGems(amount) {
    this.userProgress.gems += amount;
    this.save();
    this.updateUI();
  },
  
  spendGems(amount) {
    if (this.userProgress.gems >= amount) {
      this.userProgress.gems -= amount;
      this.save();
      this.updateUI();
      return true;
    }
    return false;
  },
  
  completeLesson(id, xp, gems) {
    if (!this.userProgress.completedLessons.includes(id)) {
      this.userProgress.completedLessons.push(id);
    }
    
    this.addXP(xp);
    this.addScore(100);
    this.addGems(gems);
    
    const achievements = this.checkAchievements();
    this.save();
    
    return achievements;
  },
  
  checkAchievements() {
    const newAchievements = [];
    const count = this.userProgress.completedLessons.length;
    
    if (count >= 1 && !this.userProgress.achievements.includes('first')) {
      newAchievements.push({ id: 'first', name: 'First Steps', icon: '🎯' });
      this.userProgress.achievements.push('first');
    }
    
    if (count >= 5 && !this.userProgress.achievements.includes('five')) {
      newAchievements.push({ id: 'five', name: 'Quick Learner', icon: '⚡' });
      this.userProgress.achievements.push('five');
    }
    
    if (count >= 10 && !this.userProgress.achievements.includes('ten')) {
      newAchievements.push({ id: 'ten', name: 'Master', icon: '👑' });
      this.userProgress.achievements.push('ten');
    }
    
    if (this.userProgress.streak >= 7 && !this.userProgress.achievements.includes('week')) {
      newAchievements.push({ id: 'week', name: 'Dedicated', icon: '🔥' });
      this.userProgress.achievements.push('week');
    }
    
    return newAchievements;
  },
  
  updateUI() {
    document.getElementById('user-xp').textContent = this.userProgress.xp;
    document.getElementById('user-score').textContent = this.userProgress.score;
    document.getElementById('user-gems').textContent = this.userProgress.gems;
    document.getElementById('stat-completed').textContent = this.userProgress.completedLessons.length;
    document.getElementById('stat-streak').textContent = this.userProgress.streak;
    document.getElementById('stat-badges').textContent = this.userProgress.achievements.length;
    
    const allLessons = Object.values(LessonData.lessons).flat();
    const progress = Math.round((this.userProgress.completedLessons.length / allLessons.length) * 100);
    document.getElementById('stat-progress').textContent = progress + '%';
  },
  
  applyRewardCode() {
    const code = document.getElementById('reward-code-input').value.trim().toUpperCase();
    
    const rewardCodes = {
      'ADMIN2026': { type: 'unlock', value: true },
      'UNLOCK': { type: 'unlock', value: true },
      'GEM100': { type: 'gems', value: 100 },
      'GEM500': { type: 'gems', value: 500 },
      'BONUS': { type: 'gems', value: 250 },
      'STARTER': { type: 'gems', value: 50 }
    };
    
    if (rewardCodes[code]) {
      const reward = rewardCodes[code];
      
      if (reward.type === 'unlock') {
        this.userProgress.allUnlocked = true;
        this.save();
        Toast.show('All lessons unlocked!', I18n.t('ui.codeSuccess'), 'success');
      } else if (reward.type === 'gems') {
        this.addGems(reward.value);
        Toast.show(`+${reward.value}G gems added!`, I18n.t('ui.codeSuccess'), 'success');
      }
      
      UI.closeRewardModal();
      UI.closeAccountModal();
      LessonManager.renderLessons();
    } else {
      Toast.show(I18n.t('ui.invalidCode'), '', 'error');
    }
  }
};