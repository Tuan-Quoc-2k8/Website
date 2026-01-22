/**
 * ============================================
 * LANGUAGES.JS - Translation System
 * ============================================
 * Contains all UI text in multiple languages
 * Add new languages by adding new keys to the translations object
 */

const translations = {
    // ============================================
    // VIETNAMESE
    // ============================================
    vi: {
        // Site & Navigation
        'site-title': 'Tuấn Quốc',
        'nav-about': 'Giới thiệu',
        'nav-skills': 'Kỹ năng',
        'nav-projects': 'Dự án',
        'nav-contact': 'Liên hệ',
        'nav-settings': '⚙️ Cài đặt',

        // Settings Modal
        'settings-title': '⚙️ Cài đặt',
        'theme-section': '🎨 Giao diện',
        'mode-section': '🌓 Chế độ hiển thị',
        'dark-mode': 'Chế độ tối',
        'lang-section': '🌍 Ngôn ngữ',

        // Theme Names
        'theme-blue': 'Xanh dương',
        'theme-purple': 'Tím',
        'theme-green': 'Xanh lá',
        'theme-orange': 'Cam',
        'theme-pink': 'Hồng',
        'theme-yellow': 'Vàng',
        'theme-red': 'Đỏ',
        'theme-gradient-premium': 'Gradient Cao Cấp',
        'theme-gradient-exclusive': 'Pink Exclusive',
        'theme-rainbow': 'Cầu Vồng',
        'theme-sunset': 'Hoàng Hôn',
        'theme-ocean': 'Đại Dương',
        'theme-fire': 'Lửa',
        'theme-aurora': 'Aurora',
        'theme-neon': 'Neon',

        // Hero Section
        'hero-badge': '💻 Web Developer',
        'hero-title': 'Xin chào, tôi là Tuấn Quốc',
        'hero-subtitle': 'Tôi đang học thiết kế & lập trình web, xây dựng các dự án sáng tạo và chuyên nghiệp',
        'hero-cta1': 'Xem dự án',
        'hero-cta2': 'Liên hệ',

        // Stats
        'stat-projects': 'Dự án',
        'stat-years': 'Năm kinh nghiệm',
        'stat-visits': 'Lượt truy cập',

        // About Section
        'about-title': 'Giới thiệu',
        'about-subtitle': 'Tìm hiểu thêm về tôi và hành trình phát triển web của tôi',
        'about-heading': 'Chào mừng đến với Portfolio của tôi',
        'about-p1': 'Tôi là một web developer đam mê, hiện đang xây dựng các dự án để học hỏi và chia sẻ kiến thức về phát triển web.',
        'about-p2': 'Tôi tin vào việc học tập liên tục và luôn tìm kiếm những thử thách mới để cải thiện kỹ năng của mình. Mỗi dự án là một cơ hội để khám phá công nghệ mới.',
        'about-p3': 'Mục tiêu của tôi là tạo ra những website hiện đại, thân thiện với người dùng và mang lại giá trị thực tế.',

        // Skills Section
        'skills-title': 'Kỹ năng & Công nghệ',
        'skills-subtitle': 'Các công nghệ tôi sử dụng để xây dựng dự án',
        'skill-html': 'Xây dựng cấu trúc website với HTML semantic và tạo giao diện đẹp, responsive với CSS3, Flexbox, Grid và animations.',
        'skill-js': 'Thao tác DOM, xử lý sự kiện, tạo tương tác động và xây dựng các tính năng phức tạp với vanilla JavaScript.',
        'skill-design-title': 'Responsive Design',
        'skill-design': 'Thiết kế website hoạt động tốt trên mọi thiết bị, từ mobile đến desktop với mobile-first approach.',
        'skill-optimization-title': 'Tối ưu hiệu suất',
        'skill-optimization': 'Tối ưu code, giảm thời gian tải trang và cải thiện trải nghiệm người dùng thông qua các kỹ thuật optimization.',

        // Projects Section
        'projects-title': 'Dự án của tôi',
        'projects-subtitle': 'Các dự án tôi đã xây dựng và đang phát triển',
        'filter-all': 'Tất cả',
        'filter-website': 'Website',
        'filter-game': 'Game',
        'filter-css': 'CSS',
        'filter-tags': 'Thẻ',
        'filter-clear': 'Xóa bộ lọc',
        'access-project': 'Truy cập dự án',
        'badge-new': 'Mới',
        'badge-update': 'Cập nhật',
        'badge-maintenance': 'Bảo trì',

        // Contact Section
        'contact-title': 'Liên hệ với tôi',
        'contact-subtitle': 'Hãy liên hệ nếu bạn muốn làm việc cùng hoặc có câu hỏi',
        'contact-text': 'Email',
        'phone-label': 'Điện thoại',
        'phone-text': 'Liên hệ qua email',
        'location-label': 'Địa chỉ',
        'location-text': 'Tỉnh Đồng Nai, Việt Nam',
        'form-name': 'Tên của bạn',
        'form-message': 'Tin nhắn',
        'form-submit': 'Gửi tin nhắn',
        'placeholder-name': 'Nguyễn Văn A',
        'placeholder-email': 'example@email.com',
        'placeholder-message': 'Nhập tin nhắn của bạn...',

        // Footer
        'footer-text': '© 2025 Tuấn Quốc. Made with ❤️ using HTML, CSS & JavaScript',

        // Premium Unlock
        'unlock-premium-title': '🔒 Chủ đề Premium',
        'unlock-exclusive-title': '🔒 Chủ đề Độc Quyền',
        'unlock-rainbow-title': '🔒 Chủ đề Cầu Vồng',
        'unlock-sunset-title': '🔒 Chủ đề Hoàng Hôn',
        'unlock-ocean-title': '🔒 Chủ đề Đại Dương',
        'unlock-premium-desc': 'Nhập mã để mở khóa chủ đề Gradient Premium:',
        'unlock-exclusive-desc': 'Nhập mã để mở khóa chủ đề Gradient Độc Quyền:',
        'unlock-rainbow-desc': 'Nhập mã để mở khóa chủ đề Cầu Vồng:',
        'unlock-sunset-desc': 'Nhập mã để mở khóa chủ đề Hoàng Hôn:',
        'unlock-ocean-desc': 'Nhập mã để mở khóa chủ đề Đại Dương:',
        'unlock-key-placeholder': 'Nhập mã...',
        'unlock-cancel': 'Hủy',
        'unlock-button': 'Mở khóa',
        'unlock-success': '✓ Đã mở khóa chủ đề thành công!',
        'unlock-error': '✗ Mã không hợp lệ. Vui lòng thử lại.'
    },

    // ============================================
    // ENGLISH
    // ============================================
    en: {
        // Site & Navigation
        'site-title': 'Tuan Quoc',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-projects': 'Projects',
        'nav-contact': 'Contact',
        'nav-settings': '⚙️ Settings',

        // Settings Modal
        'settings-title': '⚙️ Settings',
        'theme-section': '🎨 Theme',
        'mode-section': '🌓 Display Mode',
        'dark-mode': 'Dark Mode',
        'lang-section': '🌍 Language',

        // Theme Names
        'theme-blue': 'Blue',
        'theme-purple': 'Purple',
        'theme-green': 'Green',
        'theme-orange': 'Orange',
        'theme-pink': 'Pink',
        'theme-yellow': 'Yellow',
        'theme-red': 'Red',
        'theme-gradient-premium': 'Premium Gradient',
        'theme-gradient-exclusive': 'Exclusive Gradient',
        'theme-rainbow': 'Rainbow',
        'theme-sunset': 'Sunset',
        'theme-ocean': 'Ocean',
        'theme-fire': 'Fire',
        'theme-aurora': 'Aurora',
        'theme-neon': 'Neon',

        // Hero Section
        'hero-badge': '💻 Web Developer',
        'hero-title': 'Hi, I\'m Tuan Quoc',
        'hero-subtitle': 'I\'m learning web design & development, building creative and professional projects',
        'hero-cta1': 'View Projects',
        'hero-cta2': 'Contact',

        // Stats
        'stat-projects': 'Projects',
        'stat-years': 'Years Experience',
        'stat-visits': 'Visits',

        // About Section
        'about-title': 'About Me',
        'about-subtitle': 'Learn more about me and my web development journey',
        'about-heading': 'Welcome to My Portfolio',
        'about-p1': 'I\'m a passionate web developer, currently building projects to learn and share knowledge about web development.',
        'about-p2': 'I believe in continuous learning and always seek new challenges to improve my skills. Each project is an opportunity to explore new technologies.',
        'about-p3': 'My goal is to create modern, user-friendly websites that deliver real value.',

        // Skills Section
        'skills-title': 'Skills & Technologies',
        'skills-subtitle': 'Technologies I use to build projects',
        'skill-html': 'Building website structure with semantic HTML and creating beautiful, responsive interfaces with CSS3, Flexbox, Grid, and animations.',
        'skill-js': 'DOM manipulation, event handling, creating dynamic interactions and building complex features with vanilla JavaScript.',
        'skill-design-title': 'Responsive Design',
        'skill-design': 'Designing websites that work well on all devices, from mobile to desktop with mobile-first approach.',
        'skill-optimization-title': 'Performance Optimization',
        'skill-optimization': 'Optimizing code, reducing page load time and improving user experience through optimization techniques.',

        // Projects Section
        'projects-title': 'My Projects',
        'projects-subtitle': 'Projects I\'ve built and am developing',
        'filter-all': 'All',
        'filter-website': 'Website',
        'filter-game': 'Game',
        'filter-css': 'CSS',
        'filter-tags': 'Tags',
        'filter-clear': 'Clear',
        'access-project': 'Access Project',
        'badge-new': 'New',
        'badge-update': 'Updated',
        'badge-maintenance': 'Maintenance',

        // Contact Section
        'contact-title': 'Contact Me',
        'contact-subtitle': 'Get in touch if you want to work together or have questions',
        'contact-text': 'Email',
        'phone-label': 'Phone',
        'phone-text': 'Contact via email',
        'location-label': 'Location',
        'location-text': 'Dong Nai Province, Vietnam',
        'form-name': 'Your Name',
        'form-message': 'Message',
        'form-submit': 'Send Message',
        'placeholder-name': 'John Doe',
        'placeholder-email': 'example@email.com',
        'placeholder-message': 'Enter your message...',

        // Footer
        'footer-text': '© 2025 Tuan Quoc. Made with ❤️ using HTML, CSS & JavaScript',

        // Premium Unlock
        'unlock-premium-title': '🔒 Premium Theme',
        'unlock-exclusive-title': '🔒 Exclusive Theme',
        'unlock-rainbow-title': '🔒 Rainbow Theme',
        'unlock-sunset-title': '🔒 Sunset Theme',
        'unlock-ocean-title': '🔒 Ocean Theme',
        'unlock-premium-desc': 'Enter the unlock key to access the Premium Gradient theme:',
        'unlock-exclusive-desc': 'Enter the unlock key to access the Exclusive Pink Gradient theme:',
        'unlock-rainbow-desc': 'Enter the unlock key to access the Rainbow theme:',
        'unlock-sunset-desc': 'Enter the unlock key to access the Sunset theme:',
        'unlock-ocean-desc': 'Enter the unlock key to access the Ocean theme:',
        'unlock-key-placeholder': 'Enter key...',
        'unlock-cancel': 'Cancel',
        'unlock-button': 'Unlock',
        'unlock-success': '✓ Theme unlocked successfully!',
        'unlock-error': '✗ Invalid key. Please try again.'
    },

    // ============================================
    // KOREAN (한국어)
    // ============================================
    ko: {
        'site-title': '투안 꾸옥',
        'nav-about': '소개',
        'nav-skills': '기술',
        'nav-projects': '프로젝트',
        'nav-contact': '연락처',
        'nav-settings': '⚙️ 설정',
        'settings-title': '⚙️ 설정',
        'theme-section': '🎨 테마',
        'theme-blue': '파란색',
        'theme-purple': '보라색',
        'theme-green': '초록색',
        'theme-orange': '주황색',
        'theme-pink': '분홍색',
        'theme-yellow': '노란색',
        'theme-red': '빨간색',
        'theme-gradient-premium': '프리미엄 그라디언트',
        'theme-gradient-exclusive': '독점 그라디언트',
        'mode-section': '🌓 디스플레이 모드',
        'dark-mode': '다크 모드',
        'lang-section': '🌍 언어',
        'hero-badge': '💻 웹 개발자',
        'hero-title': '안녕하세요, 저는 투안 꾸옥입니다',
        'hero-subtitle': '웹 디자인 및 개발을 배우며 창의적이고 전문적인 프로젝트를 구축하고 있습니다',
        'hero-cta1': '프로젝트 보기',
        'hero-cta2': '연락하기',
        'stat-projects': '프로젝트',
        'stat-years': '경력 연수',
        'stat-visits': '방문 수',
        'about-title': '소개',
        'about-subtitle': '저와 제 웹 개발 여정에 대해 더 알아보세요',
        'about-heading': '포트폴리오에 오신 것을 환영합니다',
        'about-p1': '저는 웹 개발에 열정을 가진 개발자로, 지식을 배우고 공유하기 위해 프로젝트를 만들고 있습니다.',
        'about-p2': '지속적인 학습을 중요하게 생각하며, 항상 새로운 도전을 통해 기술을 향상시키고 있습니다.',
        'about-p3': '사용자 친화적이고 실제 가치를 제공하는 현대적인 웹사이트를 만드는 것이 목표입니다.',
        'skills-title': '기술 및 기술 스택',
        'skills-subtitle': '프로젝트를 구축할 때 사용하는 기술',
        'skill-html': '시맨틱 HTML로 구조를 구성하고 CSS3, Flexbox, Grid 및 애니메이션으로 반응형 UI를 제작합니다.',
        'skill-js': 'DOM 조작, 이벤트 처리, 동적 인터랙션 및 순수 JavaScript로 복잡한 기능을 구현합니다.',
        'skill-design-title': '반응형 디자인',
        'skill-design': '모바일 퍼스트 접근 방식으로 모든 기기에서 잘 동작하는 웹사이트를 설계합니다.',
        'skill-optimization-title': '성능 최적화',
        'skill-optimization': '코드 최적화를 통해 로딩 속도를 개선하고 사용자 경험을 향상시킵니다.',
        'projects-title': '내 프로젝트',
        'projects-subtitle': '제가 구축했거나 개발 중인 프로젝트',
        'filter-all': '전체',
        'filter-website': '웹사이트',
        'filter-game': '게임',
        'filter-css': 'CSS',
        'filter-tags': '태그',
        'filter-clear': '필터 초기화',
        'access-project': '프로젝트 접속',
        'badge-new': '신규',
        'badge-update': '업데이트',
        'badge-maintenance': '점검 중',
        'contact-title': '연락하기',
        'contact-subtitle': '함께 일하고 싶거나 질문이 있으면 연락해 주세요',
        'contact-text': '이메일',
        'phone-label': '전화',
        'phone-text': '이메일로 연락',
        'location-label': '위치',
        'location-text': '베트남 동나이성',
        'form-name': '이름',
        'form-message': '메시지',
        'form-submit': '메시지 보내기',
        'placeholder-name': '홍길동',
        'placeholder-email': 'example@email.com',
        'placeholder-message': '메시지를 입력하세요...',
        'footer-text': '© 2025 투안 꾸옥. HTML, CSS & JavaScript로 ❤️를 담아 제작'
    },

    // ============================================
    // JAPANESE (日本語)
    // ============================================
    ja: {
        'site-title': 'トゥアン・クオック',
        'nav-about': '紹介',
        'nav-skills': 'スキル',
        'nav-projects': 'プロジェクト',
        'nav-contact': 'お問い合わせ',
        'nav-settings': '⚙️ 設定',
        'settings-title': '⚙️ 設定',
        'theme-section': '🎨 テーマ',
        'theme-blue': '青',
        'theme-purple': '紫',
        'theme-green': '緑',
        'theme-orange': 'オレンジ',
        'theme-pink': 'ピンク',
        'theme-yellow': '黄色',
        'theme-red': '赤',
        'mode-section': '🌓 表示モード',
        'dark-mode': 'ダークモード',
        'lang-section': '🌍 言語',
        'hero-badge': '💻 ウェブ開発者',
        'hero-title': 'こんにちは、トゥアン・クオックです',
        'hero-subtitle': 'ウェブデザインと開発を学び、創造的でプロフェッショナルなプロジェクトを構築しています',
        'hero-cta1': 'プロジェクトを見る',
        'hero-cta2': 'お問い合わせ',
        'stat-projects': 'プロジェクト',
        'stat-years': '経験年数',
        'stat-visits': '訪問数',
        'about-title': '紹介',
        'about-subtitle': '私とウェブ開発の旅についてもっと知る',
        'about-heading': 'ポートフォリオへようこそ',
        'about-p1': '私は情熱的なウェブ開発者で、ウェブ開発について学び、知識を共有するためにプロジェクトを構築しています。',
        'about-p2': '継続的な学習を信じており、常に新しい挑戦を求めてスキルを向上させています。',
        'about-p3': '私の目標は、ユーザーフレンドリーで実際の価値を提供する現代的なウェブサイトを作成することです。',
        'footer-text': '© 2025 トゥアン・クオック. HTMLとCSSとJavaScriptで❤️を込めて作成'
    },

    // ============================================
    // CHINESE (中文简体)
    // ============================================
    zh: {
        'site-title': 'Tuấn Quốc',
        'nav-about': '关于我',
        'nav-skills': '技能',
        'nav-projects': '项目',
        'nav-contact': '联系',
        'nav-settings': '⚙️ 设置',
        'settings-title': '⚙️ 设置',
        'theme-section': '🎨 界面主题',
        'theme-blue': '蓝色',
        'theme-purple': '紫色',
        'theme-green': '绿色',
        'theme-orange': '橙色',
        'theme-pink': '粉色',
        'theme-yellow': '黄色',
        'theme-red': '红色',
        'mode-section': '🌓 显示模式',
        'dark-mode': '深色模式',
        'lang-section': '🌍 语言',
        'hero-badge': '💻 Web 开发者',
        'hero-title': '你好，我是 Tuấn Quốc',
        'hero-subtitle': '我正在学习网页设计与开发，构建富有创意且专业的项目',
        'hero-cta1': '查看项目',
        'hero-cta2': '联系我',
        'stat-projects': '项目',
        'stat-years': '经验年数',
        'stat-visits': '访问次数',
        'about-title': '关于我',
        'about-subtitle': '了解我以及我的 Web 开发之路',
        'about-heading': '欢迎来到我的作品集',
        'about-p1': '我是一名热爱 Web 开发的开发者，目前正在通过构建项目来学习并分享 Web 开发知识。',
        'about-p2': '我相信持续学习，并不断寻找新的挑战来提升自己的技能。',
        'about-p3': '我的目标是创建现代化、用户友好且具有实际价值的网站。',
        'footer-text': '© 2025 Tuấn Quốc. 使用 HTML, CSS & JavaScript ❤️制作'
    }
};

/**
 * Export for use in app.js
 * Usage: translations[lang]['key-name']
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}