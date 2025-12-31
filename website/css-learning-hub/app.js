// ES5 Compatible JavaScript - No arrow functions, let/const

// Global variables
var currentLang = 'en';
var currentTheme = 'light';
var currentLesson = null;

// Language Translations
var translations = {
    en: {
        headerTitle: 'CSS Learning Hub',
        settingsBtn: 'Settings',
        backBtn: 'Back to Lessons',
        playgroundTitle: '🎨 Interactive Playground',
        resetBtn: 'Reset',
        runBtn: 'Run',
        previewHeader: '👁️ Live Preview',
        settingsTitle: 'Settings',
        languageLabel: 'Language',
        themeLabel: 'Theme',
        themeLight: 'Light',
        themeDark: 'Dark',
        footerText: 'Built with ❤️ for CSS learners',
        compatWarning: '⚠️ You\'re using an in-app browser. For best experience, open in Chrome, Safari, or Firefox.',
        compatWarningBtn: 'Got it',
        keyPointsTitle: '📝 Key Points',
        challengeTitle: '🎯 Challenge'
    },
    vi: {
        headerTitle: 'Trung Tâm Học CSS',
        settingsBtn: 'Cài Đặt',
        backBtn: 'Quay Lại Danh Sách',
        playgroundTitle: '🎨 Sân Chơi Tương Tác',
        resetBtn: 'Đặt Lại',
        runBtn: 'Chạy',
        previewHeader: '👁️ Xem Trước',
        settingsTitle: 'Cài Đặt',
        languageLabel: 'Ngôn Ngữ',
        themeLabel: 'Giao Diện',
        themeLight: 'Sáng',
        themeDark: 'Tối',
        footerText: 'Xây dựng với ❤️ cho người học CSS',
        compatWarning: '⚠️ Bạn đang dùng trình duyệt trong ứng dụng. Để trải nghiệm tốt nhất, hãy mở bằng Chrome, Safari hoặc Firefox.',
        compatWarningBtn: 'Đã hiểu',
        keyPointsTitle: '📝 Điểm Chính',
        challengeTitle: '🎯 Thử Thách'
    }
};

// Lessons Database
var lessonsData = {
    'css-selectors': {
        id: 'css-selectors',
        level: 'beginner',
        title: {
            en: 'CSS Selectors',
            vi: 'Bộ Chọn CSS'
        },
        description: {
            en: 'Learn how to target HTML elements using CSS selectors. Selectors are patterns used to select the elements you want to style.',
            vi: 'Học cách nhắm đến các phần tử HTML bằng bộ chọn CSS. Bộ chọn là các mẫu được sử dụng để chọn các phần tử bạn muốn tạo kiểu.'
        },
        html: '<div class="box">Hello CSS!</div>\n<p id="special">I am special</p>\n<span class="text">Regular span</span>',
        css: '.box {\n  background: #3b82f6;\n  color: white;\n  padding: 20px;\n  border-radius: 8px;\n}\n\n#special {\n  color: #10b981;\n  font-weight: bold;\n}\n\n.text {\n  text-decoration: underline;\n}',
        js: null,
        keyPoints: {
            en: [
                'Element selector: targets all elements of a type (e.g., div, p)',
                'Class selector: targets elements with a specific class (.className)',
                'ID selector: targets a unique element with an ID (#idName)',
                'You can combine selectors for more specific targeting'
            ],
            vi: [
                'Bộ chọn phần tử: nhắm tất cả phần tử cùng loại (vd: div, p)',
                'Bộ chọn lớp: nhắm phần tử có lớp cụ thể (.className)',
                'Bộ chọn ID: nhắm một phần tử duy nhất với ID (#idName)',
                'Bạn có thể kết hợp các bộ chọn để nhắm chính xác hơn'
            ]
        },
        challenge: {
            en: 'Try changing the colors and adding styles to different selectors!',
            vi: 'Thử thay đổi màu sắc và thêm kiểu cho các bộ chọn khác nhau!'
        }
    },
    'colors-backgrounds': {
        id: 'colors-backgrounds',
        level: 'beginner',
        title: {
            en: 'Colors & Backgrounds',
            vi: 'Màu Sắc & Nền'
        },
        description: {
            en: 'Explore different ways to add colors and backgrounds to your elements. CSS offers multiple color formats and background properties.',
            vi: 'Khám phá các cách khác nhau để thêm màu sắc và nền cho các phần tử. CSS cung cấp nhiều định dạng màu và thuộc tính nền.'
        },
        html: '<div class="gradient-box">Gradient Background</div>\n<div class="image-box">Background Properties</div>\n<div class="color-box">Color Values</div>',
        css: '.gradient-box {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 30px;\n  margin: 10px 0;\n  border-radius: 12px;\n}\n\n.image-box {\n  background-color: #e0e7ff;\n  padding: 30px;\n  margin: 10px 0;\n  border-radius: 12px;\n}\n\n.color-box {\n  background: rgba(59, 130, 246, 0.2);\n  color: #1e40af;\n  padding: 30px;\n  margin: 10px 0;\n  border-radius: 12px;\n  border: 2px solid #3b82f6;\n}',
        js: null,
        keyPoints: {
            en: [
                'Use hex colors: #3b82f6',
                'Use RGB: rgb(59, 130, 246)',
                'Use RGBA for transparency: rgba(59, 130, 246, 0.5)',
                'Create gradients with linear-gradient() or radial-gradient()'
            ],
            vi: [
                'Dùng màu hex: #3b82f6',
                'Dùng RGB: rgb(59, 130, 246)',
                'Dùng RGBA cho độ trong suốt: rgba(59, 130, 246, 0.5)',
                'Tạo gradient với linear-gradient() hoặc radial-gradient()'
            ]
        },
        challenge: {
            en: 'Create a card with a gradient background and semi-transparent overlay!',
            vi: 'Tạo một thẻ với nền gradient và lớp phủ bán trong suốt!'
        }
    },
    'flexbox': {
        id: 'flexbox',
        level: 'intermediate',
        title: {
            en: 'Flexbox Layout',
            vi: 'Bố Cục Flexbox'
        },
        description: {
            en: 'Flexbox is a powerful layout model for creating flexible and responsive layouts. It makes alignment and distribution of space easy.',
            vi: 'Flexbox là một mô hình bố cục mạnh mẽ để tạo các bố cục linh hoạt và responsive. Nó giúp căn chỉnh và phân bổ không gian dễ dàng.'
        },
        html: '<div class="flex-container">\n  <div class="flex-item">Item 1</div>\n  <div class="flex-item">Item 2</div>\n  <div class="flex-item">Item 3</div>\n</div>',
        css: '.flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #f3f4f6;\n  padding: 20px;\n  border-radius: 8px;\n  gap: 15px;\n  min-height: 200px;\n}\n\n.flex-item {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 30px;\n  border-radius: 8px;\n  flex: 1;\n  text-align: center;\n  font-weight: bold;\n}',
        js: null,
        keyPoints: {
            en: [
                'display: flex - creates a flex container',
                'justify-content - aligns items horizontally',
                'align-items - aligns items vertically',
                'gap - adds space between flex items',
                'flex: 1 - makes items grow to fill space'
            ],
            vi: [
                'display: flex - tạo một flex container',
                'justify-content - căn chỉnh các item theo chiều ngang',
                'align-items - căn chỉnh các item theo chiều dọc',
                'gap - thêm khoảng cách giữa các flex item',
                'flex: 1 - làm các item mở rộng để lấp đầy không gian'
            ]
        },
        challenge: {
            en: 'Try changing justify-content and align-items to see different layouts!',
            vi: 'Thử thay đổi justify-content và align-items để xem các bố cục khác nhau!'
        }
    },
    'css-animations': {
        id: 'css-animations',
        level: 'advanced',
        title: {
            en: 'CSS Animations',
            vi: 'Hoạt Ảnh CSS'
        },
        description: {
            en: 'Create complex animations using keyframes. Animations allow you to define multiple steps and create sophisticated effects.',
            vi: 'Tạo hoạt ảnh phức tạp bằng keyframes. Hoạt ảnh cho phép bạn định nghĩa nhiều bước và tạo hiệu ứng tinh vi.'
        },
        html: '<div class="animation-demo">\n  <div class="bounce">Bouncing</div>\n  <div class="pulse">Pulsing</div>\n  <div class="spin">Spinning</div>\n</div>',
        css: '@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}\n\n@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n}\n\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n.animation-demo {\n  display: flex;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n\n.animation-demo > div {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 30px;\n  border-radius: 12px;\n  font-weight: bold;\n  flex: 1;\n  min-width: 150px;\n  text-align: center;\n}\n\n.bounce {\n  animation: bounce 2s ease-in-out infinite;\n}\n\n.pulse {\n  animation: pulse 1.5s ease-in-out infinite;\n}\n\n.spin {\n  animation: spin 3s linear infinite;\n}',
        js: null,
        keyPoints: {
            en: [
                '@keyframes defines the animation sequence',
                'animation: name duration timing-function iteration-count',
                'Use percentages (0%, 50%, 100%) for keyframes',
                'infinite makes animation loop forever'
            ],
            vi: [
                '@keyframes định nghĩa chuỗi hoạt ảnh',
                'animation: tên thời-gian hàm-thời-gian số-lần-lặp',
                'Dùng phần trăm (0%, 50%, 100%) cho keyframes',
                'infinite làm hoạt ảnh lặp mãi mãi'
            ]
        },
        challenge: {
            en: 'Create a loading spinner with a custom animation!',
            vi: 'Tạo một spinner loading với hoạt ảnh tùy chỉnh!'
        }
    },
    'interactive-button': {
        id: 'interactive-button',
        level: 'intermediate',
        title: {
            en: 'Interactive Button with JavaScript',
            vi: 'Nút Tương Tác với JavaScript'
        },
        description: {
            en: 'Learn how to combine CSS and JavaScript to create interactive elements. This lesson shows how to handle click events and change styles dynamically.',
            vi: 'Học cách kết hợp CSS và JavaScript để tạo các phần tử tương tác. Bài học này cho thấy cách xử lý sự kiện click và thay đổi kiểu động.'
        },
        html: '<div class="container">\n  <button id="myButton" class="interactive-btn">Click Me!</button>\n  <p id="clickCount">Clicks: 0</p>\n</div>',
        css: '.container {\n  text-align: center;\n  padding: 40px;\n}\n\n.interactive-btn {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 15px 40px;\n  font-size: 18px;\n  font-weight: bold;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.3s;\n  box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n}\n\n.interactive-btn:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 12px rgba(0,0,0,0.2);\n}\n\n.interactive-btn.clicked {\n  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\n  transform: scale(0.95);\n}\n\n#clickCount {\n  margin-top: 20px;\n  font-size: 20px;\n  font-weight: bold;\n  color: #667eea;\n}',
        js: 'var count = 0;\nvar button = document.getElementById(\'myButton\');\nvar countDisplay = document.getElementById(\'clickCount\');\n\nbutton.addEventListener(\'click\', function() {\n  count++;\n  countDisplay.textContent = \'Clicks: \' + count;\n  \n  button.classList.add(\'clicked\');\n  \n  setTimeout(function() {\n    button.classList.remove(\'clicked\');\n  }, 200);\n});',
        keyPoints: {
            en: [
                'Use addEventListener() to handle user interactions',
                'classList.add() and classList.remove() to toggle CSS classes',
                'setTimeout() to create timed effects',
                'Combine CSS transitions with JavaScript for smooth animations'
            ],
            vi: [
                'Dùng addEventListener() để xử lý tương tác người dùng',
                'classList.add() và classList.remove() để bật/tắt CSS classes',
                'setTimeout() để tạo hiệu ứng theo thời gian',
                'Kết hợp CSS transitions với JavaScript để tạo hoạt ảnh mượt'
            ]
        },
        challenge: {
            en: 'Try adding a reset button that sets the count back to zero!',
            vi: 'Thử thêm nút reset để đặt lại số đếm về không!'
        }
    },
    'dynamic-theme': {
        id: 'dynamic-theme',
        level: 'advanced',
        title: {
            en: 'Dynamic Theme Switcher',
            vi: 'Bộ Chuyển Giao Diện Động'
        },
        description: {
            en: 'Build a theme switcher using CSS variables and JavaScript. Learn how to change multiple styles at once by updating CSS custom properties.',
            vi: 'Xây dựng bộ chuyển giao diện bằng CSS variables và JavaScript. Học cách thay đổi nhiều kiểu cùng lúc bằng cách cập nhật CSS custom properties.'
        },
        html: '<div class="theme-container">\n  <div class="content-box">\n    <h2>Dynamic Theming</h2>\n    <p>Click the buttons below to change the theme!</p>\n    <div class="theme-buttons">\n      <button onclick="setTheme(\'blue\')">Blue</button>\n      <button onclick="setTheme(\'purple\')">Purple</button>\n      <button onclick="setTheme(\'green\')">Green</button>\n    </div>\n  </div>\n</div>',
        css: ':root {\n  --theme-primary: #3b82f6;\n  --theme-secondary: #60a5fa;\n  --theme-text: #1e40af;\n}\n\n.theme-container {\n  min-height: 300px;\n  background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  border-radius: 12px;\n  transition: all 0.5s ease;\n}\n\n.content-box {\n  background: white;\n  padding: 40px;\n  border-radius: 12px;\n  text-align: center;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.2);\n}\n\n.content-box h2 {\n  color: var(--theme-text);\n  margin-bottom: 15px;\n}\n\n.theme-buttons {\n  display: flex;\n  gap: 10px;\n  margin-top: 20px;\n  justify-content: center;\n}\n\n.theme-buttons button {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: bold;\n  transition: all 0.3s;\n}\n\n.theme-buttons button:hover {\n  transform: translateY(-2px);\n}',
        js: 'function setTheme(theme) {\n  var root = document.documentElement;\n  \n  if (theme === \'blue\') {\n    root.style.setProperty(\'--theme-primary\', \'#3b82f6\');\n    root.style.setProperty(\'--theme-secondary\', \'#60a5fa\');\n    root.style.setProperty(\'--theme-text\', \'#1e40af\');\n  } else if (theme === \'purple\') {\n    root.style.setProperty(\'--theme-primary\', \'#8b5cf6\');\n    root.style.setProperty(\'--theme-secondary\', \'#a78bfa\');\n    root.style.setProperty(\'--theme-text\', \'#6d28d9\');\n  } else if (theme === \'green\') {\n    root.style.setProperty(\'--theme-primary\', \'#10b981\');\n    root.style.setProperty(\'--theme-secondary\', \'#34d399\');\n    root.style.setProperty(\'--theme-text\', \'#047857\');\n  }\n}',
        keyPoints: {
            en: [
                'CSS variables (--variable-name) can be changed with JavaScript',
                'document.documentElement targets the :root element',
                'style.setProperty() updates CSS custom properties',
                'All elements using the variable update automatically'
            ],
            vi: [
                'CSS variables (--variable-name) có thể thay đổi bằng JavaScript',
                'document.documentElement nhắm đến phần tử :root',
                'style.setProperty() cập nhật CSS custom properties',
                'Tất cả phần tử dùng biến sẽ tự động cập nhật'
            ]
        },
        challenge: {
            en: 'Add a new theme color or create a random theme generator!',
            vi: 'Thêm một màu giao diện mới hoặc tạo bộ tạo giao diện ngẫu nhiên!'
        }
    }
};

// Initialize app
function initApp() {
    loadSettings();
    updateLanguage(); // Update language FIRST before showing any UI
    detectInAppBrowser();
    loadLesson();
    updateThemeButtons();
}

// Load settings from storage
function loadSettings() {
    try {
        var savedLang = localStorage.getItem('cssLearningLang');
        var savedTheme = localStorage.getItem('cssLearningTheme');
        
        if (savedLang) {
            currentLang = savedLang;
        }
        if (savedTheme) {
            currentTheme = savedTheme;
            document.documentElement.setAttribute('data-theme', currentTheme);
        }
    } catch (e) {
        // LocalStorage not available, use defaults
    }
}

// Save settings to storage
function saveSettings() {
    try {
        localStorage.setItem('cssLearningLang', currentLang);
        localStorage.setItem('cssLearningTheme', currentTheme);
    } catch (e) {
        // LocalStorage not available, ignore
    }
}

// Detect in-app browser
function detectInAppBrowser() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    var isInApp = false;

    if (/FBAN|FBAV|Instagram|Line|Zalo|Twitter|Viber/i.test(ua)) {
        isInApp = true;
    }

    if (/WebView|wv/.test(ua) || window.navigator.standalone === false) {
        isInApp = true;
    }

    if (isInApp) {
        var warning = document.getElementById('compatWarning');
        if (warning) {
            warning.classList.add('show');
        }
    }
}

// Dismiss warning
function dismissWarning() {
    var warning = document.getElementById('compatWarning');
    if (warning) {
        warning.classList.remove('show');
    }
}

// Get URL parameter
function getUrlParameter(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Load lesson
function loadLesson() {
    var lessonId = getUrlParameter('id');
    
    if (!lessonId || !lessonsData[lessonId]) {
        // Redirect to index if no valid lesson
        window.location.href = 'index.html';
        return;
    }

    currentLesson = lessonsData[lessonId];
    renderLesson();
}

// Render lesson
function renderLesson() {
    if (!currentLesson) return;

    // Set title
    document.title = currentLesson.title[currentLang] + ' - CSS Learning Hub';

    // Set lesson title
    var titleEl = document.getElementById('lessonTitle');
    if (titleEl) {
        titleEl.textContent = currentLesson.title[currentLang];
    }

    // Set level
    var levelEl = document.getElementById('lessonLevel');
    if (levelEl) {
        levelEl.textContent = currentLesson.level;
        levelEl.className = 'lesson-level level-' + currentLesson.level;
    }

    // Set description
    var descEl = document.getElementById('lessonDescription');
    if (descEl) {
        descEl.textContent = currentLesson.description[currentLang];
    }

    // Render key points
    renderKeyPoints();

    // Render challenge
    renderChallenge();

    // Setup editors
    setupEditors();

    // Run code initially
    runCode();
}

// Render key points
function renderKeyPoints() {
    var container = document.getElementById('keyPointsContainer');
    if (!container || !currentLesson.keyPoints) return;

    var html = '<h3>' + translations[currentLang].keyPointsTitle + '</h3>';
    html += '<ul>';
    
    var points = currentLesson.keyPoints[currentLang];
    for (var i = 0; i < points.length; i++) {
        html += '<li>' + points[i] + '</li>';
    }
    
    html += '</ul>';
    container.innerHTML = html;
}

// Render challenge
function renderChallenge() {
    var container = document.getElementById('challengeContainer');
    if (!container || !currentLesson.challenge) return;

    var html = '<h3>' + translations[currentLang].challengeTitle + '</h3>';
    html += '<p>' + currentLesson.challenge[currentLang] + '</p>';
    container.innerHTML = html;
}

// Setup editors
function setupEditors() {
    var htmlEditor = document.getElementById('htmlEditor');
    var cssEditor = document.getElementById('cssEditor');
    var jsEditor = document.getElementById('jsEditor');
    var jsPanel = document.getElementById('jsPanel');
    var editorsContainer = document.getElementById('editorsContainer');

    // Set initial values
    if (htmlEditor) {
        htmlEditor.value = currentLesson.html || '';
    }
    if (cssEditor) {
        cssEditor.value = currentLesson.css || '';
    }

    // Show/hide JavaScript panel
    if (currentLesson.js) {
        if (jsEditor) {
            jsEditor.value = currentLesson.js;
        }
        if (jsPanel) {
            jsPanel.style.display = 'block';
        }
        if (editorsContainer) {
            editorsContainer.className = 'editors-container has-js';
        }
    } else {
        if (jsPanel) {
            jsPanel.style.display = 'none';
        }
        if (editorsContainer) {
            editorsContainer.className = 'editors-container';
        }
    }

    // Add auto-run on input
    if (htmlEditor) {
        htmlEditor.addEventListener('input', runCode);
    }
    if (cssEditor) {
        cssEditor.addEventListener('input', runCode);
    }
    if (jsEditor && currentLesson.js) {
        jsEditor.addEventListener('input', runCode);
    }
}

// Run code
function runCode() {
    var htmlEditor = document.getElementById('htmlEditor');
    var cssEditor = document.getElementById('cssEditor');
    var jsEditor = document.getElementById('jsEditor');
    var previewFrame = document.getElementById('previewFrame');

    if (!previewFrame) return;

    var html = htmlEditor ? htmlEditor.value : '';
    var css = cssEditor ? cssEditor.value : '';
    var js = (jsEditor && currentLesson.js) ? jsEditor.value : '';

    var fullHTML = '<!DOCTYPE html>\n<html>\n<head>\n<style>\n' + css + '\n</style>\n</head>\n<body>\n' + html;
    
    if (js) {
        fullHTML += '\n<script>\n' + js + '\n<\/script>';
    }
    
    fullHTML += '\n</body>\n</html>';

    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write(fullHTML);
    preview.close();
}

// Reset code
function resetCode() {
    var htmlEditor = document.getElementById('htmlEditor');
    var cssEditor = document.getElementById('cssEditor');
    var jsEditor = document.getElementById('jsEditor');

    if (htmlEditor) {
        htmlEditor.value = currentLesson.html || '';
    }
    if (cssEditor) {
        cssEditor.value = currentLesson.css || '';
    }
    if (jsEditor && currentLesson.js) {
        jsEditor.value = currentLesson.js;
    }

    runCode();
}

// Update language
function updateLanguage() {
    // Update all text elements
    var textElements = [
        { id: 'headerTitle', key: 'headerTitle' },
        { id: 'settingsBtnText', key: 'settingsBtn' },
        { id: 'backBtnText', key: 'backBtn' },
        { id: 'playgroundTitle', key: 'playgroundTitle' },
        { id: 'resetBtnText', key: 'resetBtn' },
        { id: 'runBtnText', key: 'runBtn' },
        { id: 'previewHeaderText', key: 'previewHeader' },
        { id: 'settingsModalTitle', key: 'settingsTitle' },
        { id: 'languageLabel', key: 'languageLabel' },
        { id: 'themeLabel', key: 'themeLabel' },
        { id: 'themeLightText', key: 'themeLight' },
        { id: 'themeDarkText', key: 'themeDark' },
        { id: 'footerText', key: 'footerText' },
        { id: 'compatWarningText', key: 'compatWarning' },
        { id: 'compatWarningBtn', key: 'compatWarningBtn' }
    ];

    for (var i = 0; i < textElements.length; i++) {
        var item = textElements[i];
        var el = document.getElementById(item.id);
        if (el && translations[currentLang][item.key]) {
            el.textContent = translations[currentLang][item.key];
        }
    }

    // Update language buttons
    var langEnBtn = document.getElementById('langEnBtn');
    var langViBtn = document.getElementById('langViBtn');
    
    if (langEnBtn) {
        langEnBtn.className = 'setting-option' + (currentLang === 'en' ? ' active' : '');
    }
    if (langViBtn) {
        langViBtn.className = 'setting-option' + (currentLang === 'vi' ? ' active' : '');
    }

    // Re-render lesson content if lesson is loaded
    if (currentLesson) {
        renderLesson();
    }
}

// Change language
function changeLanguage(lang) {
    currentLang = lang;
    updateLanguage();
    saveSettings();
}

// Update theme buttons
function updateThemeButtons() {
    var lightBtn = document.getElementById('themeLightBtn');
    var darkBtn = document.getElementById('themeDarkBtn');
    
    if (lightBtn) {
        lightBtn.className = 'setting-option' + (currentTheme === 'light' ? ' active' : '');
    }
    if (darkBtn) {
        darkBtn.className = 'setting-option' + (currentTheme === 'dark' ? ' active' : '');
    }
}

// Change theme
function changeTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButtons();
    saveSettings();
}

// Open settings modal
function openSettings() {
    var modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// Close settings modal
function closeSettings() {
    var modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Close settings if clicking overlay
function closeSettingsIfOverlay(event) {
    if (event.target.id === 'settingsModal') {
        closeSettings();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}