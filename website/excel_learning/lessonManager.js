// ==================== LESSON MANAGER ====================

const LessonManager = {
  getLesson(id) {
    for (const level in LessonData.lessons) {
      const lesson = LessonData.lessons[level].find(l => l.id === id);
      if (lesson) return lesson;
    }
    return null;
  },
  
  getLessons(level, category = 'all') {
    let lessons = LessonData.lessons[level] || [];
    if (category !== 'all') {
      lessons = lessons.filter(l => l.category === category);
    }
    return lessons;
  },
  
  isLocked(lesson) {
    if (UserStore.userProgress.allUnlocked) return false;
    if (!lesson.prerequisites || lesson.prerequisites.length === 0) return false;
    
    return !lesson.prerequisites.every(prereq => 
      UserStore.userProgress.completedLessons.includes(prereq)
    );
  },
  
  renderLessons() {
    const level = UserStore.currentLevel;
    const category = UserStore.currentCategory;
    const lessons = this.getLessons(level, category);
    const container = document.getElementById('lessons-container');
    const lang = I18n.currentLang;
    
    container.innerHTML = lessons.map(lesson => {
      const completed = UserStore.userProgress.completedLessons.includes(lesson.id);
      const locked = this.isLocked(lesson);
      const progress = UserStore.userProgress.lessonProgress[lesson.id] || 0;
      const title = lesson.title[lang] || lesson.title.en;
      const description = lesson.description[lang] || lesson.description.en;
      const startText = completed ? I18n.t('ui.review') : I18n.t('ui.start');
      const difficultyText = I18n.t(`difficulty.${lesson.difficulty}`);
      
      return `
        <div class="lesson-card ${locked ? 'locked' : ''}" ${!locked ? `onclick="App.startLesson('${lesson.id}')"` : ''}>
          <div class="lesson-header">
            <div class="lesson-number">${lesson.id.toUpperCase()}</div>
            ${completed ? '<div class="completion-badge">✓</div>' : ''}
          </div>
          <div class="lesson-meta">
            <span class="lesson-tag tag-difficulty">${difficultyText}</span>
            <span class="lesson-tag tag-time">${lesson.estimatedTime}min</span>
            <span class="lesson-tag tag-category">${lesson.category}</span>
          </div>
          <div class="lesson-title">${title}</div>
          <div class="lesson-description">${description}</div>
          ${!locked ? 
            `<button class="btn ${completed ? 'btn-secondary' : 'btn-primary'}" onclick="event.stopPropagation();App.startLesson('${lesson.id}')">
              ${startText} →
            </button>` : 
            `<div class="feedback-message error">🔒 ${I18n.t('ui.locked')}</div>`
          }
          ${progress > 0 && !completed ? 
            `<div class="lesson-progress">
              <div class="lesson-progress-text">${I18n.t('ui.progress')}: ${progress}%</div>
              <div class="progress-bar">
                <div class="progress-fill" style="width:${progress}%"></div>
              </div>
            </div>` : ''
          }
        </div>
      `;
    }).join('');
  }
};