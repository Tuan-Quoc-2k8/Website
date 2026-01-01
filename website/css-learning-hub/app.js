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
    'todo-list': {
        id: 'todo-list',
        level: 'advanced',
        title: {
            en: 'Todo List App',
            vi: 'Ứng Dụng Todo List'
        },
        description: {
            en: 'Build a complete todo list application with add, complete, and delete functionality using CSS and JavaScript.',
            vi: 'Xây dựng ứng dụng todo list hoàn chỉnh với chức năng thêm, hoàn thành và xóa bằng CSS và JavaScript.'
        },
        html: '<div class="todo-app">\n  <h2>📝 My Todo List</h2>\n  <div class="todo-input">\n    <input type="text" id="taskInput" placeholder="Add a new task...">\n    <button onclick="addTask()">Add</button>\n  </div>\n  <ul id="taskList" class="task-list"></ul>\n  <div class="todo-stats">\n    <span id="taskCount">0 tasks</span>\n  </div>\n</div>',
        css: '.todo-app {\n  max-width: 500px;\n  background: white;\n  border-radius: 12px;\n  padding: 30px;\n  box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n}\n\n.todo-app h2 {\n  margin-bottom: 20px;\n  color: #1f2937;\n}\n\n.todo-input {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 20px;\n}\n\n.todo-input input {\n  flex: 1;\n  padding: 12px;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  font-size: 14px;\n}\n\n.todo-input button {\n  padding: 12px 24px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: bold;\n  cursor: pointer;\n}\n\n.task-list {\n  list-style: none;\n}\n\n.task-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px;\n  background: #f9fafb;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  transition: all 0.3s;\n}\n\n.task-item.completed {\n  opacity: 0.6;\n}\n\n.task-item.completed .task-text {\n  text-decoration: line-through;\n}\n\n.task-checkbox {\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n}\n\n.task-text {\n  flex: 1;\n  color: #374151;\n}\n\n.task-delete {\n  background: #ef4444;\n  color: white;\n  border: none;\n  padding: 6px 12px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 12px;\n}\n\n.todo-stats {\n  margin-top: 15px;\n  text-align: center;\n  color: #6b7280;\n  font-weight: bold;\n}',
        js: 'var tasks = [];\n\nfunction addTask() {\n  var input = document.getElementById(\'taskInput\');\n  var text = input.value.trim();\n  \n  if (text === \'\') return;\n  \n  tasks.push({\n    id: Date.now(),\n    text: text,\n    completed: false\n  });\n  \n  input.value = \'\';\n  renderTasks();\n}\n\nfunction toggleTask(id) {\n  for (var i = 0; i < tasks.length; i++) {\n    if (tasks[i].id === id) {\n      tasks[i].completed = !tasks[i].completed;\n      break;\n    }\n  }\n  renderTasks();\n}\n\nfunction deleteTask(id) {\n  tasks = tasks.filter(function(task) {\n    return task.id !== id;\n  });\n  renderTasks();\n}\n\nfunction renderTasks() {\n  var list = document.getElementById(\'taskList\');\n  var count = document.getElementById(\'taskCount\');\n  \n  list.innerHTML = \'\';\n  \n  for (var i = 0; i < tasks.length; i++) {\n    var task = tasks[i];\n    var li = document.createElement(\'li\');\n    li.className = \'task-item\' + (task.completed ? \' completed\' : \'\');\n    \n    li.innerHTML = \'<input type="checkbox" class="task-checkbox" \' +\n      (task.completed ? \'checked\' : \'\') + \' onchange="toggleTask(\' + task.id + \')">\' +\n      \'<span class="task-text">\' + task.text + \'</span>\' +\n      \'<button class="task-delete" onclick="deleteTask(\' + task.id + \')">Delete</button>\';\n    \n    list.appendChild(li);\n  }\n  \n  count.textContent = tasks.length + \' task\' + (tasks.length !== 1 ? \'s\' : \'\');\n}\n\n// Allow Enter key to add task\ndocument.getElementById(\'taskInput\').addEventListener(\'keypress\', function(e) {\n  if (e.key === \'Enter\') {\n    addTask();\n  }\n});',
        keyPoints: {
            en: [
                'Array methods: push(), filter() for data management',
                'Dynamic DOM creation with createElement()',
                'Event delegation for dynamically created elements',
                'State management with JavaScript arrays',
                'innerHTML for complex element creation',
                'Keyboard events (Enter key) for better UX'
            ],
            vi: [
                'Phương thức Array: push(), filter() để quản lý dữ liệu',
                'Tạo DOM động với createElement()',
                'Event delegation cho phần tử tạo động',
                'Quản lý state với JavaScript arrays',
                'innerHTML để tạo phần tử phức tạp',
                'Sự kiện bàn phím (phím Enter) cho UX tốt hơn'
            ]
        },
        challenge: {
            en: 'Try adding a "Clear Completed" button or sorting tasks!',
            vi: 'Thử thêm nút "Xóa Hoàn Thành" hoặc sắp xếp tasks!'
        }
    },

    'form-validation': {
        id: 'form-validation',
        level: 'advanced',
        title: {
            en: 'Form Validation',
            vi: 'Xác Thực Form'
        },
        description: {
            en: 'Create interactive form validation with real-time feedback using CSS and JavaScript. Learn to validate user input dynamically.',
            vi: 'Tạo xác thực form tương tác với phản hồi thời gian thực bằng CSS và JavaScript. Học cách xác thực input người dùng động.'
        },
        html: '<form class="validation-form" id="myForm">\n  <div class="form-group">\n    <label>Email:</label>\n    <input type="text" id="email" placeholder="Enter email">\n    <span class="error" id="emailError"></span>\n  </div>\n  \n  <div class="form-group">\n    <label>Password:</label>\n    <input type="password" id="password" placeholder="Min 6 characters">\n    <span class="error" id="passwordError"></span>\n  </div>\n  \n  <button type="submit">Submit</button>\n  <div class="success" id="successMsg"></div>\n</form>',
        css: '.validation-form {\n  max-width: 400px;\n  padding: 30px;\n  background: #f9fafb;\n  border-radius: 12px;\n}\n\n.form-group {\n  margin-bottom: 20px;\n}\n\nlabel {\n  display: block;\n  font-weight: bold;\n  margin-bottom: 5px;\n  color: #374151;\n}\n\ninput {\n  width: 100%;\n  padding: 12px;\n  border: 2px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n  transition: border-color 0.3s;\n}\n\ninput:focus {\n  outline: none;\n  border-color: #3b82f6;\n}\n\ninput.invalid {\n  border-color: #ef4444;\n}\n\ninput.valid {\n  border-color: #10b981;\n}\n\n.error {\n  display: block;\n  color: #ef4444;\n  font-size: 12px;\n  margin-top: 5px;\n  min-height: 18px;\n}\n\n.success {\n  color: #10b981;\n  font-weight: bold;\n  margin-top: 15px;\n  min-height: 20px;\n}\n\nbutton {\n  width: 100%;\n  padding: 12px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n\nbutton:hover {\n  transform: translateY(-2px);\n}',
        js: 'var form = document.getElementById(\'myForm\');\nvar emailInput = document.getElementById(\'email\');\nvar passwordInput = document.getElementById(\'password\');\nvar emailError = document.getElementById(\'emailError\');\nvar passwordError = document.getElementById(\'passwordError\');\nvar successMsg = document.getElementById(\'successMsg\');\n\nfunction validateEmail(email) {\n  var re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return re.test(email);\n}\n\nemailInput.addEventListener(\'blur\', function() {\n  if (!validateEmail(this.value)) {\n    this.classList.add(\'invalid\');\n    this.classList.remove(\'valid\');\n    emailError.textContent = \'Please enter a valid email\';\n  } else {\n    this.classList.add(\'valid\');\n    this.classList.remove(\'invalid\');\n    emailError.textContent = \'\';\n  }\n});\n\npasswordInput.addEventListener(\'blur\', function() {\n  if (this.value.length < 6) {\n    this.classList.add(\'invalid\');\n    this.classList.remove(\'valid\');\n    passwordError.textContent = \'Password must be at least 6 characters\';\n  } else {\n    this.classList.add(\'valid\');\n    this.classList.remove(\'invalid\');\n    passwordError.textContent = \'\';\n  }\n});\n\nform.addEventListener(\'submit\', function(e) {\n  e.preventDefault();\n  if (validateEmail(emailInput.value) && passwordInput.value.length >= 6) {\n    successMsg.textContent = \'✓ Form submitted successfully!\';\n  }\n});',
        keyPoints: {
            en: [
                'Use blur event to validate on field exit',
                'Regular expressions for email validation',
                'classList to add/remove validation classes',
                'preventDefault() to stop form submission',
                'Real-time feedback improves UX',
                'Visual indicators (colors) show validation state'
            ],
            vi: [
                'Dùng sự kiện blur để xác thực khi rời field',
                'Regular expressions để xác thực email',
                'classList để thêm/xóa classes xác thực',
                'preventDefault() để dừng gửi form',
                'Phản hồi thời gian thực cải thiện UX',
                'Chỉ báo trực quan (màu) hiển thị trạng thái xác thực'
            ]
        },
        challenge: {
            en: 'Try adding validation for a phone number or confirming password!',
            vi: 'Thử thêm xác thực cho số điện thoại hoặc xác nhận mật khẩu!'
        }
    },

    'image-gallery': {
        id: 'image-gallery',
        level: 'intermediate',
        title: {
            en: 'Interactive Image Gallery',
            vi: 'Thư Viện Ảnh Tương Tác'
        },
        description: {
            en: 'Build an interactive image gallery with CSS Grid and JavaScript. Learn to handle click events and update the DOM dynamically.',
            vi: 'Xây dựng thư viện ảnh tương tác với CSS Grid và JavaScript. Học cách xử lý sự kiện click và cập nhật DOM động.'
        },
        html: '<div class="gallery">\n  <div class="thumbnail" data-img="1">📷 Image 1</div>\n  <div class="thumbnail" data-img="2">📷 Image 2</div>\n  <div class="thumbnail" data-img="3">📷 Image 3</div>\n  <div class="thumbnail" data-img="4">📷 Image 4</div>\n</div>\n<div id="viewer" class="viewer">\n  <div class="viewer-content">Click an image above</div>\n</div>',
        css: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 15px;\n  margin-bottom: 20px;\n}\n\n.thumbnail {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 60px 20px;\n  border-radius: 12px;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.3s;\n  font-size: 24px;\n}\n\n.thumbnail:hover {\n  transform: scale(1.05);\n  box-shadow: 0 8px 16px rgba(0,0,0,0.2);\n}\n\n.thumbnail.active {\n  border: 4px solid #10b981;\n}\n\n.viewer {\n  background: #f3f4f6;\n  border-radius: 12px;\n  padding: 40px;\n  text-align: center;\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.viewer-content {\n  font-size: 24px;\n  font-weight: bold;\n  color: #6b7280;\n}',
        js: 'var thumbnails = document.querySelectorAll(\'.thumbnail\');\nvar viewer = document.getElementById(\'viewer\');\n\nfor (var i = 0; i < thumbnails.length; i++) {\n  thumbnails[i].addEventListener(\'click\', function() {\n    // Remove active class from all\n    for (var j = 0; j < thumbnails.length; j++) {\n      thumbnails[j].classList.remove(\'active\');\n    }\n    \n    // Add active to clicked\n    this.classList.add(\'active\');\n    \n    // Update viewer\n    var imgNum = this.getAttribute(\'data-img\');\n    viewer.innerHTML = \'<div class="viewer-content">Viewing Image \' + imgNum + \'<br>🖼️</div>\';\n  });\n}',
        keyPoints: {
            en: [
                'querySelectorAll() to select multiple elements',
                'addEventListener() to handle clicks',
                'getAttribute() to read data attributes',
                'classList.add/remove() to toggle classes',
                'Loop through elements with for loop',
                'Update DOM with innerHTML'
            ],
            vi: [
                'querySelectorAll() để chọn nhiều phần tử',
                'addEventListener() để xử lý clicks',
                'getAttribute() để đọc data attributes',
                'classList.add/remove() để bật/tắt classes',
                'Lặp qua các phần tử với for loop',
                'Cập nhật DOM với innerHTML'
            ]
        },
        challenge: {
            en: 'Try adding more images or creating a slideshow with next/previous buttons!',
            vi: 'Thử thêm nhiều ảnh hơn hoặc tạo slideshow với nút tiếp/lùi!'
        }
    },

    'advanced-selectors': {
        id: 'advanced-selectors',
        level: 'advanced',
        title: {
            en: 'Advanced Selectors',
            vi: 'Bộ Chọn Nâng Cao'
        },
        description: {
            en: 'Master complex CSS selectors including attribute selectors, combinators, and advanced pseudo-classes for precise element targeting.',
            vi: 'Làm chủ các bộ chọn CSS phức tạp bao gồm attribute selectors, combinators và pseudo-classes nâng cao để nhắm phần tử chính xác.'
        },
        html: '<div class="selector-demo">\n  <input type="text" placeholder="Text input">\n  <input type="email" placeholder="Email input">\n  <div class="parent">\n    <p>First paragraph</p>\n    <p>Second paragraph</p>\n    <span>Not a paragraph</span>\n    <p>Third paragraph</p>\n  </div>\n  <a href="https://example.com">External Link</a>\n  <a href="/internal">Internal Link</a>\n</div>',
        css: '.selector-demo {\n  padding: 20px;\n}\n\n/* Attribute Selectors */\ninput[type="text"] {\n  border: 2px solid #3b82f6;\n  padding: 10px;\n  border-radius: 6px;\n  margin: 5px 0;\n  display: block;\n}\n\ninput[type="email"] {\n  border: 2px solid #10b981;\n  padding: 10px;\n  border-radius: 6px;\n  margin: 5px 0;\n  display: block;\n}\n\n/* Child Combinator */\n.parent > p {\n  background: #dbeafe;\n  padding: 10px;\n  margin: 8px 0;\n  border-radius: 6px;\n}\n\n/* Adjacent Sibling */\np + p {\n  border-left: 4px solid #3b82f6;\n}\n\n/* Attribute Contains */\na[href^="https"] {\n  color: #10b981;\n  font-weight: bold;\n}\n\na[href^="/"] {\n  color: #8b5cf6;\n  font-weight: bold;\n}\n\n/* Not Selector */\n.parent > *:not(p) {\n  background: #fef3c7;\n  padding: 10px;\n  margin: 8px 0;\n  border-radius: 6px;\n}',
        js: null,
        keyPoints: {
            en: [
                '[attribute] - selects elements with specific attribute',
                '[attribute="value"] - exact match',
                '[attribute^="value"] - starts with',
                '[attribute$="value"] - ends with',
                'parent > child - direct child combinator',
                'element + element - adjacent sibling',
                ':not(selector) - negation pseudo-class'
            ],
            vi: [
                '[attribute] - chọn phần tử có thuộc tính cụ thể',
                '[attribute="value"] - khớp chính xác',
                '[attribute^="value"] - bắt đầu với',
                '[attribute$="value"] - kết thúc với',
                'parent > child - con trực tiếp',
                'element + element - anh chị em kề nhau',
                ':not(selector) - pseudo-class phủ định'
            ]
        },
        challenge: {
            en: 'Try creating styles that target specific types of links or form inputs!',
            vi: 'Thử tạo kiểu nhắm các loại liên kết hoặc input form cụ thể!'
        }
    },

    'css-variables': {
        id: 'css-variables',
        level: 'advanced',
        title: {
            en: 'CSS Variables',
            vi: 'CSS Variables'
        },
        description: {
            en: 'CSS Custom Properties (variables) allow you to store and reuse values throughout your stylesheet, making themes and design systems easy.',
            vi: 'CSS Custom Properties (biến) cho phép bạn lưu trữ và tái sử dụng giá trị trong stylesheet, giúp themes và design systems dễ dàng.'
        },
        html: '<div class="theme-demo">\n  <div class="var-card">Primary Card</div>\n  <div class="var-card secondary">Secondary Card</div>\n  <div class="var-card accent">Accent Card</div>\n</div>',
        css: ':root {\n  --primary-color: #667eea;\n  --secondary-color: #764ba2;\n  --accent-color: #f093fb;\n  --spacing: 20px;\n  --border-radius: 12px;\n  --shadow: 0 4px 6px rgba(0,0,0,0.1);\n}\n\n.theme-demo {\n  display: flex;\n  gap: var(--spacing);\n  padding: var(--spacing);\n  flex-wrap: wrap;\n}\n\n.var-card {\n  background: var(--primary-color);\n  color: white;\n  padding: calc(var(--spacing) * 2);\n  border-radius: var(--border-radius);\n  font-weight: bold;\n  flex: 1;\n  min-width: 150px;\n  text-align: center;\n  transition: transform 0.3s;\n  box-shadow: var(--shadow);\n}\n\n.var-card:hover {\n  transform: translateY(-5px);\n}\n\n.secondary {\n  background: var(--secondary-color);\n}\n\n.accent {\n  background: var(--accent-color);\n}',
        js: null,
        keyPoints: {
            en: [
                'Define variables in :root with --variable-name',
                'Use variables with var(--variable-name)',
                'Variables cascade and can be overridden',
                'Use calc() for mathematical operations',
                'Perfect for creating theme systems',
                'Can be changed with JavaScript for dynamic themes'
            ],
            vi: [
                'Định nghĩa biến trong :root với --variable-name',
                'Dùng biến với var(--variable-name)',
                'Biến có thể cascade và ghi đè',
                'Dùng calc() cho các phép toán',
                'Hoàn hảo để tạo theme systems',
                'Có thể thay đổi bằng JavaScript cho themes động'
            ]
        },
        challenge: {
            en: 'Try changing the CSS variable values to create a different color theme!',
            vi: 'Thử thay đổi giá trị CSS variable để tạo một theme màu khác!'
        }
    },

    'transforms-transitions': {
        id: 'transforms-transitions',
        level: 'intermediate',
        title: {
            en: 'Transforms & Transitions',
            vi: 'Transforms & Transitions'
        },
        description: {
            en: 'Add smooth animations and transformations to your elements for better user experience and visual appeal.',
            vi: 'Thêm hoạt ảnh mượt mà và biến đổi cho các phần tử để có trải nghiệm người dùng và hấp dẫn trực quan tốt hơn.'
        },
        html: '<div class="transform-demo">\n  <div class="card rotate">Hover to Rotate</div>\n  <div class="card scale">Hover to Scale</div>\n  <div class="card slide">Hover to Slide</div>\n  <div class="card flip">Hover to Flip</div>\n</div>',
        css: '.transform-demo {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 20px;\n  padding: 20px;\n}\n\n.card {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 40px 20px;\n  border-radius: 12px;\n  font-weight: bold;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.4s ease;\n}\n\n.rotate:hover {\n  transform: rotate(10deg);\n  box-shadow: 0 15px 30px rgba(0,0,0,0.3);\n}\n\n.scale:hover {\n  transform: scale(1.15);\n  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\n}\n\n.slide:hover {\n  transform: translateX(15px);\n  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);\n}\n\n.flip:hover {\n  transform: rotateY(180deg);\n}',
        js: null,
        keyPoints: {
            en: [
                'transform: rotate(45deg) - rotates element',
                'transform: scale(1.5) - makes element larger/smaller',
                'transform: translate(x, y) - moves element',
                'transform: skew(x, y) - skews element',
                'transition: property duration timing-function',
                'You can combine multiple transforms'
            ],
            vi: [
                'transform: rotate(45deg) - xoay phần tử',
                'transform: scale(1.5) - làm phần tử lớn hơn/nhỏ hơn',
                'transform: translate(x, y) - di chuyển phần tử',
                'transform: skew(x, y) - nghiêng phần tử',
                'transition: property duration timing-function',
                'Bạn có thể kết hợp nhiều transforms'
            ]
        },
        challenge: {
            en: 'Create a card that rotates and changes color on hover!',
            vi: 'Tạo một thẻ xoay và đổi màu khi hover!'
        }
    },

    'pseudo-classes': {
        id: 'pseudo-classes',
        level: 'intermediate',
        title: {
            en: 'Pseudo-classes & Pseudo-elements',
            vi: 'Pseudo-classes & Pseudo-elements'
        },
        description: {
            en: 'Add special effects to elements based on their state or position using pseudo-classes and pseudo-elements.',
            vi: 'Thêm hiệu ứng đặc biệt cho các phần tử dựa trên trạng thái hoặc vị trí của chúng bằng pseudo-classes và pseudo-elements.'
        },
        html: '<button class="fancy-button">Hover Me!</button>\n<ul class="styled-list">\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n  <li>Fourth item</li>\n</ul>\n<p class="decorated">This text has decorative elements</p>',
        css: '.fancy-button {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 15px 30px;\n  font-size: 16px;\n  font-weight: bold;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.3s;\n  margin: 20px 0;\n}\n\n.fancy-button:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.2);\n}\n\n.fancy-button:active {\n  transform: translateY(0);\n}\n\n.styled-list {\n  list-style: none;\n}\n\n.styled-list li {\n  padding: 12px;\n  margin: 8px 0;\n  border-radius: 6px;\n  background: #f3f4f6;\n}\n\n.styled-list li:first-child {\n  background: #dbeafe;\n  font-weight: bold;\n}\n\n.styled-list li:nth-child(even) {\n  background: #fef3c7;\n}\n\n.styled-list li::before {\n  content: "✓ ";\n  color: #10b981;\n  font-weight: bold;\n}\n\n.decorated::before {\n  content: "→ ";\n  color: #3b82f6;\n}\n\n.decorated::after {\n  content: " ←";\n  color: #3b82f6;\n}',
        js: null,
        keyPoints: {
            en: [
                ':hover - when user hovers over element',
                ':active - when element is being clicked',
                ':focus - when element has keyboard focus',
                ':first-child, :last-child - first or last child',
                ':nth-child(n) - select specific child elements',
                '::before, ::after - insert content before or after'
            ],
            vi: [
                ':hover - khi người dùng di chuột qua phần tử',
                ':active - khi phần tử đang được click',
                ':focus - khi phần tử có focus từ bàn phím',
                ':first-child, :last-child - con đầu tiên hoặc cuối cùng',
                ':nth-child(n) - chọn phần tử con cụ thể',
                '::before, ::after - chèn nội dung trước hoặc sau'
            ]
        },
        challenge: {
            en: 'Create a button with a custom hover effect and a list with alternating colors!',
            vi: 'Tạo một nút với hiệu ứng hover tùy chỉnh và danh sách với màu xen kẽ!'
        }
    },

    'responsive-design': {
        id: 'responsive-design',
        level: 'intermediate',
        title: {
            en: 'Responsive Design',
            vi: 'Thiết Kế Responsive'
        },
        description: {
            en: 'Make your designs work on all screen sizes using media queries and responsive units. Build websites that look great everywhere.',
            vi: 'Làm cho thiết kế hoạt động trên mọi kích thước màn hình bằng media queries và đơn vị responsive. Xây dựng website đẹp ở mọi nơi.'
        },
        html: '<div class="responsive-container">\n  <div class="responsive-box">📱 Mobile First</div>\n  <div class="responsive-box">💻 Desktop Ready</div>\n  <div class="responsive-box">📐 Fluid Layout</div>\n</div>\n<p class="info">Resize your browser to see the magic!</p>',
        css: '.responsive-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n  padding: 20px;\n}\n\n.responsive-box {\n  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\n  color: white;\n  padding: 40px 20px;\n  border-radius: 12px;\n  text-align: center;\n  font-weight: bold;\n  min-height: 150px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 18px;\n}\n\n.info {\n  text-align: center;\n  color: #6b7280;\n  font-style: italic;\n  margin-top: 20px;\n}\n\n@media (max-width: 768px) {\n  .responsive-box {\n    padding: 30px 15px;\n    font-size: 16px;\n    min-height: 120px;\n  }\n}\n\n@media (max-width: 480px) {\n  .responsive-box {\n    font-size: 14px;\n    padding: 20px 10px;\n  }\n}',
        js: null,
        keyPoints: {
            en: [
                'Use relative units: %, em, rem, vw, vh',
                'Media queries: @media (max-width: 768px) { }',
                'Mobile-first approach: start with mobile, add desktop',
                'auto-fit and minmax() for responsive grids',
                'Common breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop)'
            ],
            vi: [
                'Dùng đơn vị tương đối: %, em, rem, vw, vh',
                'Media queries: @media (max-width: 768px) { }',
                'Tiếp cận mobile-first: bắt đầu với mobile, thêm desktop',
                'auto-fit và minmax() cho grid responsive',
                'Breakpoint phổ biến: 480px (mobile), 768px (tablet), 1024px (desktop)'
            ]
        },
        challenge: {
            en: 'Try resizing your browser window to see the responsive layout in action!',
            vi: 'Thử thay đổi kích thước cửa sổ trình duyệt để xem bố cục responsive hoạt động!'
        }
    },

    'css-grid': {
        id: 'css-grid',
        level: 'intermediate',
        title: {
            en: 'CSS Grid Layout',
            vi: 'Bố Cục CSS Grid'
        },
        description: {
            en: 'CSS Grid is a two-dimensional layout system perfect for creating complex layouts with rows and columns.',
            vi: 'CSS Grid là hệ thống bố cục hai chiều hoàn hảo để tạo các bố cục phức tạp với hàng và cột.'
        },
        html: '<div class="grid-container">\n  <div class="grid-item header">Header</div>\n  <div class="grid-item sidebar">Sidebar</div>\n  <div class="grid-item main">Main Content</div>\n  <div class="grid-item footer">Footer</div>\n</div>',
        css: '.grid-container {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-rows: auto 1fr auto;\n  gap: 15px;\n  min-height: 400px;\n}\n\n.grid-item {\n  background: #dbeafe;\n  padding: 20px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  color: #1e40af;\n}\n\n.header {\n  grid-column: 1 / -1;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n}\n\n.main {\n  background: #fef3c7;\n  color: #92400e;\n}\n\n.footer {\n  grid-column: 1 / -1;\n  background: #f3f4f6;\n  color: #6b7280;\n}',
        js: null,
        keyPoints: {
            en: [
                'display: grid - creates a grid container',
                'grid-template-columns - defines column tracks',
                'grid-template-rows - defines row tracks',
                'gap - spacing between grid items',
                'grid-column / grid-row - makes items span multiple tracks',
                'fr unit - represents a fraction of available space'
            ],
            vi: [
                'display: grid - tạo một grid container',
                'grid-template-columns - định nghĩa các cột',
                'grid-template-rows - định nghĩa các hàng',
                'gap - khoảng cách giữa các grid item',
                'grid-column / grid-row - làm item trải dài nhiều track',
                'đơn vị fr - đại diện cho một phần không gian có sẵn'
            ]
        },
        challenge: {
            en: 'Create a photo gallery layout with different sized items!',
            vi: 'Tạo bố cục thư viện ảnh với các item có kích thước khác nhau!'
        }
    },

    'display-position': {
        id: 'display-position',
        level: 'beginner',
        title: {
            en: 'Display & Position',
            vi: 'Display & Position'
        },
        description: {
            en: 'Control how elements are displayed and positioned on the page. These properties are essential for creating layouts.',
            vi: 'Điều khiển cách các phần tử được hiển thị và định vị trên trang. Các thuộc tính này rất quan trọng để tạo bố cục.'
        },
        html: '<div class="container-demo">\n  <div class="inline-box">Inline Block 1</div>\n  <div class="inline-box">Inline Block 2</div>\n  <div class="block-box">Block Element</div>\n  <div class="relative-box">\n    Relative Parent\n    <span class="absolute-box">Absolute Child</span>\n  </div>\n</div>',
        css: '.container-demo {\n  border: 2px dashed #cbd5e1;\n  padding: 20px;\n}\n\n.inline-box {\n  display: inline-block;\n  background: #bfdbfe;\n  padding: 15px;\n  margin: 5px;\n  border-radius: 6px;\n}\n\n.block-box {\n  display: block;\n  background: #fcd34d;\n  padding: 15px;\n  margin: 10px 0;\n  border-radius: 6px;\n}\n\n.relative-box {\n  position: relative;\n  background: #d1fae5;\n  padding: 40px 15px;\n  margin: 10px 0;\n  border-radius: 6px;\n}\n\n.absolute-box {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  background: #fca5a5;\n  padding: 5px 10px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: bold;\n}',
        js: null,
        keyPoints: {
            en: [
                'display: block - takes full width, starts on new line',
                'display: inline - flows with text, no width/height',
                'display: inline-block - flows with text but accepts width/height',
                'position: relative - positioned relative to normal position',
                'position: absolute - positioned relative to nearest positioned ancestor',
                'position: fixed - positioned relative to viewport'
            ],
            vi: [
                'display: block - chiếm toàn bộ chiều rộng, bắt đầu dòng mới',
                'display: inline - chảy với văn bản, không có width/height',
                'display: inline-block - chảy với văn bản nhưng có width/height',
                'position: relative - định vị tương đối so với vị trí bình thường',
                'position: absolute - định vị tương đối so với tổ tiên gần nhất được định vị',
                'position: fixed - định vị tương đối so với viewport'
            ]
        },
        challenge: {
            en: 'Try creating a card with a badge in the corner using absolute positioning!',
            vi: 'Thử tạo một thẻ với huy hiệu ở góc bằng absolute positioning!'
        }
    },

    'typography': {
        id: 'typography',
        level: 'beginner',
        title: {
            en: 'Typography & Text Styling',
            vi: 'Typography & Tạo Kiểu Chữ'
        },
        description: {
            en: 'Style your text with different fonts, sizes, weights, and decorations. Typography is crucial for readable and beautiful designs.',
            vi: 'Tạo kiểu cho văn bản với font, kích thước, độ đậm và trang trí khác nhau. Typography rất quan trọng cho thiết kế đẹp và dễ đọc.'
        },
        html: '<h1 class="title">Main Heading</h1>\n<p class="paragraph">This is a paragraph with custom styling. Notice the font family, size, and spacing.</p>\n<p class="highlight">Highlighted text with different properties</p>\n<blockquote class="quote">"Design is not just what it looks like. Design is how it works."</blockquote>',
        css: '.title {\n  font-family: Georgia, serif;\n  font-size: 36px;\n  font-weight: bold;\n  color: #1e40af;\n  text-align: center;\n  letter-spacing: -1px;\n  margin-bottom: 20px;\n}\n\n.paragraph {\n  font-family: Arial, sans-serif;\n  font-size: 16px;\n  line-height: 1.8;\n  color: #4b5563;\n  margin-bottom: 15px;\n}\n\n.highlight {\n  font-weight: 600;\n  font-style: italic;\n  text-decoration: underline;\n  color: #7c3aed;\n  margin-bottom: 15px;\n}\n\n.quote {\n  font-family: Georgia, serif;\n  font-size: 20px;\n  font-style: italic;\n  color: #6b7280;\n  border-left: 4px solid #3b82f6;\n  padding-left: 20px;\n  margin: 20px 0;\n}',
        js: null,
        keyPoints: {
            en: [
                'font-family: sets the typeface (serif, sans-serif, monospace)',
                'font-size: controls text size (px, em, rem)',
                'font-weight: controls thickness (normal, bold, 100-900)',
                'line-height: controls spacing between lines',
                'text-align: aligns text (left, center, right, justify)',
                'letter-spacing and word-spacing adjust spacing'
            ],
            vi: [
                'font-family: đặt kiểu chữ (serif, sans-serif, monospace)',
                'font-size: điều khiển kích thước chữ (px, em, rem)',
                'font-weight: điều khiển độ đậm (normal, bold, 100-900)',
                'line-height: điều khiển khoảng cách giữa các dòng',
                'text-align: căn chỉnh văn bản (left, center, right, justify)',
                'letter-spacing và word-spacing điều chỉnh khoảng cách'
            ]
        },
        challenge: {
            en: 'Create a stylish heading with custom font properties and a quote box!',
            vi: 'Tạo một tiêu đề phong cách với thuộc tính font tùy chỉnh và hộp trích dẫn!'
        }
    },

    'box-model': {
        id: 'box-model',
        level: 'beginner',
        title: {
            en: 'Box Model & Spacing',
            vi: 'Box Model & Khoảng Cách'
        },
        description: {
            en: 'Understanding the CSS box model is fundamental. Every element is a box with content, padding, border, and margin.',
            vi: 'Hiểu về CSS box model là nền tảng. Mọi phần tử là một hộp với nội dung, padding, border và margin.'
        },
        html: '<div class="box-demo">Box Model Demo</div>\n<div class="box-demo outlined">With Border</div>\n<div class="box-demo spaced">Extra Margin</div>',
        css: '.box-demo {\n  background: #dbeafe;\n  color: #1e40af;\n  padding: 20px;\n  margin: 20px 0;\n  border: 4px solid #3b82f6;\n  border-radius: 8px;\n  text-align: center;\n  font-weight: bold;\n}\n\n.outlined {\n  border-style: dashed;\n  background: #fef3c7;\n  color: #92400e;\n  border-color: #f59e0b;\n}\n\n.spaced {\n  margin: 40px 0;\n  padding: 30px;\n  background: #d1fae5;\n  color: #065f46;\n  border-color: #10b981;\n}',
        js: null,
        keyPoints: {
            en: [
                'Content: the actual content of the box',
                'Padding: space between content and border',
                'Border: a line around the padding',
                'Margin: space outside the border',
                'box-sizing: border-box includes padding and border in width'
            ],
            vi: [
                'Content: nội dung thực tế của hộp',
                'Padding: khoảng cách giữa nội dung và border',
                'Border: đường viền quanh padding',
                'Margin: khoảng cách bên ngoài border',
                'box-sizing: border-box bao gồm padding và border trong chiều rộng'
            ]
        },
        challenge: {
            en: 'Try adjusting padding, margin, and border values to see how they affect spacing!',
            vi: 'Thử điều chỉnh padding, margin và border để xem chúng ảnh hưởng đến khoảng cách như thế nào!'
        }
    },
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