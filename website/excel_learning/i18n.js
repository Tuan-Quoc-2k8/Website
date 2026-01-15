// ==================== I18N - INTERNATIONALIZATION ====================

const translationsEN = {
  app: { title: 'Excel Master', tagline: 'Master Excel formulas interactively' },
  ui: {
    points: 'points', gems: 'gems', home: 'Home', check: 'Check All', hint: 'Show Hint',
    explain: 'Show Explanation', reset: 'Reset', refresh: 'Refresh', back: 'Back to Home',
    continue: 'Continue', start: 'Start Lesson', review: 'Review Lesson',
    locked: 'Locked', progress: 'Progress', tasks: 'Tasks', currentTask: 'Current Task',
    excel: 'Excel Spreadsheet', congratulations: 'Congratulations!',
    lessonCompleted: 'Lesson completed successfully!', allTasksCompleted: 'All tasks completed!',
    noExercise: 'No exercise loaded', noFormulas: 'No formulas found. Please enter formulas in the cells!',
    confirmReset: 'Reset this exercise? All progress will be lost.', tips: 'Quick Tips',
    account: 'Account', settings: 'Settings', logout: 'Logout',
    confirmLogout: 'Are you sure you want to logout? Your progress has been saved.',
    theme: 'Theme',
    language: 'Language', rewardCode: 'Reward Code',
    rewardDesc: 'Enter a reward code to unlock special features', apply: 'Apply Code',
    invalidCode: 'Invalid reward code', codeSuccess: 'Code applied successfully!',
    task: 'Task', confirmAction: 'Confirm Action', cancel: 'Cancel', confirm: 'Confirm',
    resetConfirmTitle: 'Reset Exercise?', logoutConfirmTitle: 'Logout?',
    viewResults: 'View Results', achievements: 'Achievements',
    notEnoughGems: 'Not enough gems! You need {amount}G to use this feature.',
    explainCost: 'Explain (25G)', gemReward: 'Gem Reward',
    insertInto: 'Insert into', copyFormula: 'Copy',
    insertTip: 'Tip: Click "Insert" to automatically add the formula, or copy and type it manually in cell {cell}',
    spentGems: 'Spent {amount}G for explanation',
    taskAlreadyCompleted: 'This task is already completed!',
    noExplanationShown: 'No explanation is currently shown',
    explanationOutdated: 'This explanation is for a different task. Get a new explanation for the current task.',
    noAchievements: 'No achievements yet. Complete lessons to earn badges!',
    availableCodes: 'Available codes:',
    codeUnlock: 'Unlock all lessons',
    codeStarter: '50 gems',
    codeBonus: '250 gems',
    score: 'Score',
    completed: 'Completed',
    streak: 'Streak',
    badges: 'Badges'
  },
  level: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
  difficulty: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
  stats: { completed: 'Completed', streak: 'Day Streak', overall: 'Progress', badges: 'Badges' },
  achievements: {
    first: 'First Steps',
    firstDesc: 'Complete your first lesson',
    five: 'Quick Learner',
    fiveDesc: 'Complete 5 lessons',
    ten: 'Master',
    tenDesc: 'Complete 10 lessons',
    week: 'Dedicated',
    weekDesc: 'Maintain a 7-day streak'
  },
  tabs: {
    stats: 'Stats',
    achievements: 'Badges',
    settings: 'Settings'
  },
  feedback: {
    correct: '✓ Correct! Well done!',
    noFormula: '✗ Please enter a formula (formulas start with =)',
    wrongFunction: '✗ Try using the {function} function',
    missingRange: '✗ Use a cell range (e.g., A1:A5)',
    incorrect: '✗ Not quite right. Check your formula.',
    hardcoded: '✗ Use a formula, not a hardcoded value',
    formulaCommitted: 'Formula saved. Click Check to validate.'
  },
  course: { title: 'Choose Your Learning Path', allCategories: 'All Categories' },
  categories: {
    all: 'All Categories', basics: 'Basics', analysis: 'Analysis',
    finance: 'Finance', text: 'Text', logic: 'Logic',
    lookup: 'Lookup & Reference', datetime: 'Date & Time'
  },
  tips: [
    'Formulas always start with =',
    'Click cells to reference them',
    'Use : for cell ranges (A1:A10)',
    'Check your progress regularly'
  ]
};

const translationsVI = {
  app: { title: 'Học Excel', tagline: 'Thành thạo công thức Excel tương tác' },
  ui: {
    points: 'điểm', gems: 'đá quý', home: 'Trang chủ', check: 'Kiểm tra', hint: 'Gợi ý',
    explain: 'Giải thích', reset: 'Làm lại', refresh: 'Làm mới', back: 'Về trang chủ',
    continue: 'Tiếp tục', start: 'Bắt đầu', review: 'Ôn tập',
    locked: 'Đã khóa', progress: 'Tiến độ', tasks: 'Nhiệm vụ', currentTask: 'Nhiệm vụ hiện tại',
    excel: 'Bảng tính Excel', congratulations: 'Chúc mừng!',
    lessonCompleted: 'Hoàn thành bài học!', allTasksCompleted: 'Hoàn thành tất cả!',
    noExercise: 'Chưa có bài tập', noFormulas: 'Chưa có công thức. Hãy nhập công thức vào các ô!',
    confirmReset: 'Làm lại bài tập này? Tiến độ sẽ bị mất.', tips: 'Mẹo nhanh',
    account: 'Tài khoản', settings: 'Cài đặt', logout: 'Đăng xuất',
    confirmLogout: 'Bạn có chắc muốn đăng xuất? Tiến độ của bạn đã được lưu.',
    theme: 'Giao diện',
    language: 'Ngôn ngữ', rewardCode: 'Mã thưởng',
    rewardDesc: 'Nhập mã thưởng để mở khóa tính năng đặc biệt', apply: 'Áp dụng',
    invalidCode: 'Mã không hợp lệ', codeSuccess: 'Đã áp dụng mã thành công!',
    task: 'Nhiệm vụ', confirmAction: 'Xác nhận', cancel: 'Hủy', confirm: 'Đồng ý',
    resetConfirmTitle: 'Làm lại bài tập?', logoutConfirmTitle: 'Đăng xuất?',
    viewResults: 'Xem kết quả', achievements: 'Thành tích',
    notEnoughGems: 'Không đủ đá quý! Bạn cần {amount}G để sử dụng tính năng này.',
    explainCost: 'Giải thích (25G)', gemReward: 'Thưởng đá quý',
    insertInto: 'Chèn vào', copyFormula: 'Sao chép',
    insertTip: 'Mẹo: Nhấn "Chèn" để tự động thêm công thức, hoặc sao chép và gõ thủ công vào ô {cell}',
    spentGems: 'Đã chi {amount}G để xem giải thích',
    taskAlreadyCompleted: 'Nhiệm vụ này đã hoàn thành!',
    noExplanationShown: 'Hiện không có giải thích nào đang hiển thị',
    explanationOutdated: 'Giải thích này dành cho nhiệm vụ khác. Lấy giải thích mới cho nhiệm vụ hiện tại.',
    noAchievements: 'Chưa có thành tích. Hoàn thành bài học để nhận huy hiệu!',
    availableCodes: 'Mã khả dụng:',
    codeUnlock: 'Mở khóa tất cả bài học',
    codeStarter: '50 đá quý',
    codeBonus: '250 đá quý',
    score: 'Điểm',
    completed: 'Hoàn thành',
    streak: 'Chuỗi',
    badges: 'Huy hiệu'
  },
  level: { beginner: 'Cơ bản', intermediate: 'Trung cấp', advanced: 'Nâng cao' },
  difficulty: { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó' },
  stats: { completed: 'Hoàn thành', streak: 'Chuỗi ngày', overall: 'Tiến độ', badges: 'Huy hiệu' },
  achievements: {
    first: 'Bước Đầu',
    firstDesc: 'Hoàn thành bài học đầu tiên',
    five: 'Học Nhanh',
    fiveDesc: 'Hoàn thành 5 bài học',
    ten: 'Bậc Thầy',
    tenDesc: 'Hoàn thành 10 bài học',
    week: 'Kiên Trì',
    weekDesc: 'Duy trì chuỗi 7 ngày'
  },
  tabs: {
    stats: 'Thống kê',
    achievements: 'Huy hiệu',
    settings: 'Cài đặt'
  },
  feedback: {
    correct: '✓ Đúng rồi! Tuyệt vời!',
    noFormula: '✗ Vui lòng nhập công thức (bắt đầu bằng =)',
    wrongFunction: '✗ Thử dùng hàm {function}',
    missingRange: '✗ Dùng phạm vi ô (ví dụ: A1:A5)',
    incorrect: '✗ Chưa đúng. Kiểm tra lại công thức.',
    hardcoded: '✗ Dùng công thức, không phải giá trị cố định',
    formulaCommitted: 'Đã lưu công thức. Nhấn Kiểm tra để xác thực.'
  },
  course: { title: 'Chọn lộ trình học', allCategories: 'Tất cả danh mục' },
  categories: {
    all: 'Tất cả danh mục', basics: 'Cơ bản', analysis: 'Phân tích',
    finance: 'Tài chính', text: 'Văn bản', logic: 'Logic',
    lookup: 'Tra cứu', datetime: 'Ngày & Giờ'
  },
  tips: [
    'Công thức luôn bắt đầu bằng =',
    'Nhấn vào ô để tham chiếu',
    'Dùng : cho phạm vi (A1:A10)',
    'Kiểm tra tiến độ thường xuyên'
  ]
};

const I18n = {
  currentLang: localStorage.getItem('lang') || 'en',
  translations: { en: translationsEN, vi: translationsVI },
  
  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];
    for (const k of keys) value = value?.[k];
    return value || key;
  },
  
  changeLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    this.updateUI();
    Toast.show(this.t('ui.codeSuccess'), '', 'success');
  },
  
  updateUI() {
    document.getElementById('app-title').textContent = this.t('app.title');
    document.getElementById('points-label').textContent = this.t('ui.points');
    document.getElementById('gems-label').textContent = this.t('ui.gems');
    document.getElementById('home-btn').textContent = this.t('ui.home');
    document.getElementById('stat-completed-label').textContent = this.t('stats.completed');
    document.getElementById('stat-streak-label').textContent = this.t('stats.streak');
    document.getElementById('stat-progress-label').textContent = this.t('stats.overall');
    document.getElementById('stat-badges-label').textContent = this.t('stats.badges');
    document.getElementById('page-title').textContent = this.t('course.title');
    document.getElementById('level-beginner').textContent = this.t('level.beginner');
    document.getElementById('level-intermediate').textContent = this.t('level.intermediate');
    document.getElementById('level-advanced').textContent = this.t('level.advanced');
    
    document.getElementById('back-btn').textContent = this.t('ui.back');
    document.getElementById('progress-label').textContent = this.t('ui.progress');
    document.getElementById('task-label').textContent = this.t('ui.task');
    document.getElementById('current-task-label').textContent = this.t('ui.currentTask');
    document.getElementById('tasks-label').textContent = this.t('ui.tasks');
    document.getElementById('tips-label').textContent = this.t('ui.tips');
    document.getElementById('excel-label').textContent = this.t('ui.excel');
    document.getElementById('check-btn').textContent = this.t('ui.check');
    document.getElementById('hint-btn').textContent = this.t('ui.hint');
    document.getElementById('explain-btn').textContent = this.t('ui.explainCost');
    document.getElementById('refresh-btn').textContent = this.t('ui.refresh');
    document.getElementById('reset-btn').textContent = this.t('ui.reset');
    
    document.getElementById('congrats-title').textContent = this.t('ui.congratulations');
    document.getElementById('lesson-complete-msg').textContent = this.t('ui.lessonCompleted');
    document.getElementById('continue-btn').textContent = this.t('ui.continue');
    document.getElementById('view-results-btn').textContent = this.t('ui.viewResults');
    document.getElementById('theme-label').textContent = this.t('ui.theme');
    document.getElementById('language-label').textContent = this.t('ui.language');
    document.getElementById('reward-code-btn').textContent = this.t('ui.rewardCode');
    document.getElementById('logout-btn').textContent = this.t('ui.logout');
    document.getElementById('reward-title').textContent = this.t('ui.rewardCode');
    document.getElementById('reward-desc').textContent = this.t('ui.rewardDesc');
    document.getElementById('apply-code-btn').textContent = this.t('ui.apply');
    
    // Compact modal translations
    document.getElementById('tab-stats').textContent = this.t('tabs.stats');
    document.getElementById('tab-achievements').textContent = this.t('tabs.achievements');
    document.getElementById('tab-settings').textContent = this.t('tabs.settings');
    document.getElementById('modal-score-label').textContent = this.t('ui.score');
    document.getElementById('modal-gems-label').textContent = this.t('ui.gems');
    document.getElementById('modal-completed-label').textContent = this.t('ui.completed');
    document.getElementById('modal-streak-label').textContent = this.t('ui.streak');
    document.getElementById('modal-badges-label').textContent = this.t('ui.badges');
    
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.innerHTML = Object.keys(this.t('categories')).map(cat => 
      `<option value="${cat}">${this.t('categories.' + cat)}</option>`
    ).join('');
    
    const tipsList = document.getElementById('tips-list');
    tipsList.innerHTML = this.t('tips').map(tip => `<li>${tip}</li>`).join('');
    
    document.getElementById('confirm-cancel').textContent = this.t('ui.cancel');
    document.getElementById('confirm-ok').textContent = this.t('ui.confirm');
    
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
      langSelect.value = this.currentLang;
    }
    
    if (!document.getElementById('course-page').classList.contains('hidden')) {
      LessonManager.renderLessons();
    }
  }
};