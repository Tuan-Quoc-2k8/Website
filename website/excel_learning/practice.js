// ==================== PRACTICE UI ====================

const Practice = {
  lesson: null,
  exercise: null,
  taskIndex: 0,
  taskStates: [],
  
  init(lessonId) {
    this.lesson = LessonManager.getLesson(lessonId);
    if (!this.lesson) {
      Toast.show('Lesson not found', '', 'error');
      return;
    }
    
    this.exercise = this.lesson.exercises[0];
    this.taskIndex = 0;
    this.taskStates = this.exercise.tasks.map(() => ({ done: false, tries: 0 }));
    
    this.renderPage();
    setTimeout(() => this.initSpreadsheet(), 100);
  },
  
  renderPage() {
    const lang = I18n.currentLang;
    const title = this.lesson.title[lang] || this.lesson.title.en;
    const content = this.lesson.content[lang] || this.lesson.content.en;
    const exerciseDesc = this.exercise.description[lang] || this.exercise.description.en;
    
    document.getElementById('practice-lesson-title').textContent = title;
    document.getElementById('lesson-content').innerHTML = content;
    document.getElementById('exercise-description').textContent = exerciseDesc;
    
    this.updateCurrentTask();
    this.updateTasksList();
    this.updateProgress();
    
    document.getElementById('hint-container').classList.add('hidden');
    document.getElementById('explanation-container').classList.add('hidden');
  },
  
  updateCurrentTask() {
    const task = this.exercise.tasks[this.taskIndex];
    const description = task.description[I18n.currentLang] || task.description.en;
    document.getElementById('current-task-text').textContent = description;
    document.querySelector('.task-number').textContent = this.taskIndex + 1;
  },
  
  updateTasksList() {
    const container = document.getElementById('tasks-list');
    container.innerHTML = this.exercise.tasks.map((task, idx) => {
      const state = this.taskStates[idx];
      const locked = idx > 0 && !this.taskStates[idx - 1].done;
      
      let statusClass = 'pending';
      let icon = '';
      
      if (state.done) {
        statusClass = 'completed';
        icon = '✓';
      } else if (state.tries > 0) {
        statusClass = 'error';
        icon = '✗';
      } else if (locked) {
        statusClass = 'locked';
        icon = '🔒';
      }
      
      const description = task.description[I18n.currentLang] || task.description.en;  // ✅ Use description
      const itemClass = `task-item ${state.done ? 'completed' : ''} ${locked ? 'locked' : ''} ${state.tries > 0 && !state.done ? 'error' : ''}`;
      
      return `
        <div class="${itemClass}">
          <div class="task-status-icon ${statusClass}">${icon}</div>
          <div class="task-text">
            <strong>${task.cell}:</strong> ${description}  <!-- ✅ Show description in task list -->
          </div>
        </div>
      `;
    }).join('');
  },
  
  updateProgress() {
    const completed = this.taskStates.filter(s => s.done).length;
    const total = this.taskStates.length;
    const percent = Math.round((completed / total) * 100);
    
    document.getElementById('task-progress-text').textContent = `${completed}/${total}`;
    document.getElementById('task-progress-bar').style.width = percent + '%';
    
    if (!UserStore.userProgress.lessonProgress) {
      UserStore.userProgress.lessonProgress = {};
    }
    UserStore.userProgress.lessonProgress[this.lesson.id] = percent;
    UserStore.save();
  },
  
  initSpreadsheet() {
    LuckysheetService.init('luckysheet-container', this.exercise.initialData, I18n.currentLang);
    
    const taskCells = this.exercise.tasks.map(t => t.cell);
    LuckysheetService.setTaskCells(taskCells);
    
    // Prevent scrolling when clicking spreadsheet
    this.preventSpreadsheetScroll();
  },

  preventSpreadsheetScroll() {
    const container = document.getElementById('luckysheet-container');
    if (!container) return;
    
    let savedScrollY = 0;
    
    // Save scroll position when interacting with spreadsheet
    container.addEventListener('mousedown', () => {
      savedScrollY = window.scrollY;
    }, true);
    
    container.addEventListener('click', () => {
      savedScrollY = window.scrollY;
    }, true);
    
    // Restore scroll if it changed
    container.addEventListener('focusin', () => {
      setTimeout(() => {
        if (Math.abs(window.scrollY - savedScrollY) > 5) {
          window.scrollTo(0, savedScrollY);
        }
      }, 0);
    }, true);
    
    // Watch for scroll attempts and restore
    let scrollTimeout;
    const checkScroll = () => {
      if (Math.abs(window.scrollY - savedScrollY) > 5) {
        window.scrollTo(0, savedScrollY);
      }
    };
    
    container.addEventListener('focus', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkScroll, 10);
    }, true);
  },
  
  checkAllFormulas() {
    if (!this.exercise) {
      Toast.show(I18n.t('ui.noExercise'), '', 'error');
      return;
    }
    
    let totalTasks = this.exercise.tasks.length;
    let newlyChecked = 0;
    let newlyCorrect = 0;
    let missingCells = [];
    
    this.exercise.tasks.forEach((task, idx) => {
      if (this.taskStates[idx].done) {
        return;
      }
      
      const formula = LuckysheetService.getFormula(task.cell);
      
      if (formula) {
        newlyChecked++;
        if (this.validateTask(task.cell, formula)) {
          newlyCorrect++;
        }
      } else {
        missingCells.push(task.cell);
      }
    });
    
    const finalCompleted = this.taskStates.filter(s => s.done).length;
    
    if (newlyChecked === 0 && finalCompleted < totalTasks) {
      if (missingCells.length > 0) {
        Toast.show(
          `${I18n.t('ui.noFormulas')}\nMissing: ${missingCells.join(', ')}`, 
          '', 
          'warning'
        );
      } else {
        Toast.show(I18n.t('ui.noFormulas'), '', 'warning');
      }
    } else if (finalCompleted === totalTasks) {
      Toast.show(I18n.t('ui.allTasksCompleted'), '', 'success');
    } else if (newlyChecked > 0) {
      const message = `Checked ${newlyChecked} formula(s). ${newlyCorrect} correct.`;
      Toast.show(message, '', newlyCorrect > 0 ? 'success' : 'error');
    }
  },
  
  validateTask(cell, formula) {
    const taskIdx = this.exercise.tasks.findIndex(t => t.cell === cell);
    if (taskIdx === -1) return false;
    
    const task = this.exercise.tasks[taskIdx];
    const result = FormulaValidator.validate(formula, task);
    
    this.taskStates[taskIdx].tries++;
    
    if (result.ok) {
      if (!this.taskStates[taskIdx].done) {
        this.taskStates[taskIdx].done = true;
        this.showFeedback(result.msg, 'success');
        
        const container = document.getElementById('explanation-container');
        if (!container.classList.contains('hidden')) {
          const explanationTaskIndex = parseInt(container.dataset.taskIndex || '-1');
          if (explanationTaskIndex === taskIdx) {
            container.classList.add('hidden');
          }
        }
        
        if (taskIdx === this.taskIndex && taskIdx < this.exercise.tasks.length - 1) {
          this.taskIndex++;
          this.updateCurrentTask();
        }
        
        this.updateTasksList();
        this.updateProgress();
        
        if (this.taskStates.every(s => s.done)) {
          setTimeout(() => this.completeLesson(), 1000);
        }
      }
      return true;
    } else {
      this.showFeedback(result.msg, 'error');
      this.updateTasksList();
      return false;
    }
  },
  
  showFeedback(message, type) {
    const currentTaskBox = document.querySelector('.current-task');
    let feedback = currentTaskBox.querySelector('.feedback-message');
    
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'feedback-message';
      currentTaskBox.appendChild(feedback);
    }
    
    feedback.className = `feedback-message ${type}`;
    feedback.textContent = message;
    feedback.style.opacity = '1';
    
    if (type === 'success') {
      setTimeout(() => feedback.remove(), 3000);
    } else {
      setTimeout(() => {
        feedback.style.transition = 'opacity 2s';
        feedback.style.opacity = '0.5';
      }, 8000);
    }
  },
  
  showHint() {
    if (!this.exercise || this.taskIndex >= this.exercise.tasks.length) return;
    
    const task = this.exercise.tasks[this.taskIndex];
    const hint = task.hint[I18n.currentLang] || task.hint.en;
    const container = document.getElementById('hint-container');
    const label = I18n.t('ui.hint');
    
    container.className = 'hint-box';
    container.innerHTML = `
      <div class="hint-header">💡 ${label}</div>
      <p>${hint}</p>
    `;
    container.classList.remove('hidden');
  },
  
  showExplanation() {
    if (!this.exercise || this.taskIndex >= this.exercise.tasks.length) return;
    
    const COST = 25;
    const task = this.exercise.tasks[this.taskIndex];
    
    if (this.taskStates[this.taskIndex].done) {
      Toast.show(I18n.t('ui.taskAlreadyCompleted'), '', 'info');
      return;
    }
    
    const container = document.getElementById('explanation-container');
    const isAlreadyShown = !container.classList.contains('hidden') && 
                          container.dataset.taskIndex === String(this.taskIndex);
    
    if (isAlreadyShown) {
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }
    
    if (UserStore.userProgress.gems < COST) {
      const message = I18n.t('ui.notEnoughGems').replace('{amount}', COST);
      Toast.show(message, '', 'error');
      return;
    }
    
    if (!UserStore.spendGems(COST)) {
      Toast.show(I18n.t('ui.notEnoughGems').replace('{amount}', COST), '', 'error');
      return;
    }
    
    const explanation = task.explanation[I18n.currentLang] || task.explanation.en;
    const label = I18n.t('ui.explain');
    
    container.className = 'explanation-box';
    container.dataset.taskIndex = this.taskIndex;
    container.dataset.taskCell = task.cell;
    container.dataset.taskFormula = task.requiredFormula;
    container.innerHTML = `
      <div class="explanation-header">📖 ${label} (-${COST}G)</div>
      <p>${explanation}</p>
      <p style="margin-top:.5rem"><strong>Formula:</strong> <code>${task.requiredFormula}</code></p>
      <div style="display:flex;gap:.5rem;margin-top:1rem">
        <button class="btn btn-primary" onclick="Practice.insertCurrentFormula()" style="flex:1">
          ✓ ${I18n.t('ui.insertInto')} ${task.cell}
        </button>
        <button class="btn btn-secondary" onclick="Practice.copyFormulaToClipboard()" style="flex:1">
          📋 ${I18n.t('ui.copyFormula')}
        </button>
      </div>
      <p style="margin-top:.5rem;font-size:.85rem;color:#64748b">
        💡 ${I18n.t('ui.insertTip').replace('{cell}', task.cell)}
      </p>
    `;
    container.classList.remove('hidden');
    
    Toast.show(I18n.t('ui.spentGems').replace('{amount}', COST), '', 'info');
  },
  
  insertCurrentFormula() {
    const container = document.getElementById('explanation-container');
    
    if (container.classList.contains('hidden')) {
      Toast.show(I18n.t('ui.noExplanationShown'), '', 'error');
      return;
    }
    
    const explanationTaskIndex = parseInt(container.dataset.taskIndex || '-1');
    if (explanationTaskIndex !== this.taskIndex) {
      Toast.show(I18n.t('ui.explanationOutdated'), '', 'warning');
      return;
    }
    
    const taskCell = container.dataset.taskCell;
    const taskFormula = container.dataset.taskFormula;
    
    if (!taskCell || !taskFormula) {
      Toast.show(I18n.t('ui.noExplanationShown'), '', 'error');
      return;
    }
    
    const inserted = LuckysheetService.insertFormula(taskCell, taskFormula);
    
    if (inserted) {
      setTimeout(() => {
        this.validateTask(taskCell, taskFormula);
      }, 500);
    }
  },
  
  copyFormulaToClipboard() {
    if (!this.exercise || this.taskIndex >= this.exercise.tasks.length) return;
    
    const task = this.exercise.tasks[this.taskIndex];
    const formula = task.requiredFormula;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(formula).then(() => {
        Toast.show(`Formula copied: ${formula}`, 'Clipboard', 'success');
      }).catch(err => {
        console.error('Clipboard error:', err);
        this.fallbackCopy(formula);
      });
    } else {
      this.fallbackCopy(formula);
    }
  },
  
  fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      Toast.show(`Formula copied: ${text}`, 'Clipboard', 'success');
    } catch (err) {
      Toast.show('Failed to copy. Please copy manually.', 'Error', 'error');
    }
    
    document.body.removeChild(textarea);
  },
  
  refreshFormulas() {
    const count = LuckysheetService.refreshFormulas();
    
    if (count > 0) {
      setTimeout(() => {
        this.checkAllFormulas();
      }, 500);
    }
  },
  
  resetExercise() {
    UI.confirm(
      I18n.t('ui.resetConfirmTitle'),
      I18n.t('ui.confirmReset'),
      (confirmed) => {
        if (confirmed) {
          LuckysheetService.destroy();
          setTimeout(() => this.init(UserStore.currentLessonId), 200);
        }
      }
    );
  },
  
  completeLesson() {
    const xp = this.lesson.estimatedTime * 5;
    
    const gemRewards = {
      easy: 25,
      medium: 50,
      hard: 75
    };
    const gems = gemRewards[this.lesson.difficulty] || 25;
    
    const achievements = UserStore.completeLesson(this.lesson.id, xp, gems);
    UI.openSuccessModal(xp, gems, achievements);
  }
};