/**
 * ============================================
 * PROJECTS.JS - Project Data
 * ============================================
 * Contains all project information
 * Add new projects by adding objects to the projectsData array
 * 
 * Project Object Structure:
 * {
 *     category: 'website' | 'game' | 'css',
 *     icon: 'emoji',
 *     image: 'path/to/image.png' (optional),
 *     title: 'Vietnamese Title',
 *     titleEn: 'English Title',
 *     titleKo: 'Korean Title',
 *     titleJa: 'Japanese Title',
 *     titleZh: 'Chinese Title',
 *     desc: 'Vietnamese Description',
 *     descEn: 'English Description',
 *     descKo: 'Korean Description',
 *     descJa: 'Japanese Description',
 *     descZh: 'Chinese Description',
 *     tags: ['Tag1', 'Tag2', 'Tag3'],
 *     badge: 'NEW' | 'UPDATE' | 'MAINTENANCE' | '',
 *     link: './path/to/project.html'
 * }
 */

const projectsData = [
    // ============================================
    // WEBSITE PROJECTS
    // ============================================
    {
        category: 'website',
        icon: '🗄️',
        image: './img/learning-SQL.png',
        title: 'Web Học SQL Server',
        titleEn: 'SQL Server Learning Web App',
        titleKo: 'SQL Server 학습 웹사이트',
        titleJa: 'SQL Server 学習ウェブアプリ',
        titleZh: 'SQL Server 学习网站',
        desc: 'Website học SQL Server với môi trường giả lập truy vấn SQL, bài học từ cơ bản đến nâng cao và thực hành theo tình huống thực tế.',
        descEn: 'A SQL Server learning website with a simulated SQL query environment and practical lessons from basic to advanced.',
        descKo: 'SQL 쿼리 시뮬레이션 환경을 제공하며 기초부터 고급까지 실습 중심으로 학습할 수 있는 SQL Server 학습 웹사이트입니다.',
        descJa: 'SQLクエリのシミュレーション環境を備え、基礎から応用まで実践的に学べるSQL Server学習サイトです。',
        descZh: '一个提供 SQL 查询模拟环境、从基础到高级进行实践学习的 SQL Server 学习网站。',
        tags: ['SQL Server', 'SQL', 'Database', 'Backend'],
        badge: 'NEW',
        link: './website/sql-learning-platform.html'
    },

    {
        category: 'website',
        icon: '🗄️',
        image: './img/access.png',
        title: 'Web Học Microsoft Access',
        titleEn: 'Microsoft Access Learning Web App',
        titleKo: 'Microsoft Access 학습 웹사이트',
        titleJa: 'Microsoft Access 学習ウェブアプリ',
        titleZh: 'Microsoft Access 学习网站',
        desc: 'Website học Microsoft Access cơ bản với giao diện giả lập Access, hướng dẫn từng bước về bảng, truy vấn, mối quan hệ dữ liệu, bài tập thực hành và hỗ trợ đa ngôn ngữ.',
        descEn: 'A Microsoft Access learning website featuring an Access-like simulator, step-by-step lessons on tables, queries, data relationships, hands-on exercises, and multi-language support.',
        descKo: 'Access와 유사한 시뮬레이터 인터페이스를 통해 테이블, 쿼리, 데이터 관계를 단계별로 학습하고 실습할 수 있는 다국어 지원 Microsoft Access 학습 웹사이트입니다.',
        descJa: 'Access風のシミュレーションUIを用いて、テーブル、クエリ、リレーションシップを段階的に学習し、実践演習と多言語対応を備えたMicrosoft Access学習サイトです。',
        descZh: '一个用于学习 Microsoft Access 的网站，提供 Access 风格的模拟界面、表、查询、数据关系的分步教学、实践练习以及多语言支持。',
        tags: ['HTML', 'CSS', 'JavaScript', 'Database', 'SQL'],
        badge: 'NEW',
        link: './website/access_learning_app/index.html'
    },

    {
        category: 'website',
        icon: '📊',
        image: './img/Excel.jpg',
        title: 'Web Học Excel',
        titleEn: 'Excel Learning Web App',
        titleKo: '엑셀 학습 웹사이트',
        titleJa: 'Excel学習ウェブアプリ',
        titleZh: 'Excel 学习网站',
        desc: 'Website học Excel tương tác với giao diện giả lập Excel, bài tập thực hành, kiểm tra công thức tự động và hỗ trợ đa ngôn ngữ.',
        descEn: 'An interactive Excel learning website featuring a simulated Excel interface, hands-on exercises, automatic formula validation, and multi-language support.',
        descKo: '엑셀 시뮬레이션 인터페이스, 실습 문제, 자동 수식 검사 및 다국어 지원을 제공하는 인터랙티브 엑셀 학습 웹사이트입니다.',
        descJa: 'Excel風のシミュレーションUI、実践的な演習、自動数式チェック、多言語対応を備えたインタラクティブなExcel学習サイトです。',
        descZh: '一个交互式 Excel 学习网站，具有 Excel 模拟界面、实践练习、自动公式校验和多语言支持。',
        tags: ['HTML', 'CSS', 'JavaScript', 'Luckysheet'],
        badge: 'UPDATE',
        link: './website/excel_learning/index.html'
    },

    {
        category: 'website',
        icon: '📦',
        image: './img/css_box_model.png',
        title: 'CSS Box Model',
        titleEn: 'CSS Box Model',
        titleKo: 'CSS 박스 모델',
        titleJa: 'CSS ボックスモデル',
        titleZh: 'CSS 盒模型',
        desc: 'Bài học giúp bạn hiểu rõ margin, border, padding và content — nền tảng quan trọng của CSS.',
        descEn: 'Learn how margin, border, padding, and content work together in the CSS Box Model.',
        descKo: 'CSS 박스 모델에서 margin, border, padding, content의 작동 방식을 배웁니다.',
        descJa: 'CSSボックスモデルにおけるmargin・border・padding・contentの仕組みを学びます。',
        descZh: '学习 CSS 盒模型中 margin、border、padding 和 content 的工作方式。',
        tags: ['CSS', 'Box Model', 'Layout', 'Beginner'],
        badge: '',
        link: './website/css-learning-hub/index.html'
    },

    {
        category: 'website',
        icon: '🛠️',
        image: './img/javascript.png',
        title: 'Hàm trong JavaScript',
        titleEn: 'JavaScript Functions',
        titleKo: '자바스크립트 함수',
        titleJa: 'JavaScript の関数',
        titleZh: 'JavaScript 函数',
        desc: 'Học cách tạo và sử dụng hàm để tái sử dụng code và tổ chức logic hiệu quả.',
        descEn: 'Learn how to create and use functions to reuse code and organize logic effectively.',
        descKo: '코드를 재사용하고 로직을 효율적으로 구성하기 위해 함수를 만드는 방법을 배웁니다.',
        descJa: 'コードを再利用し、ロジックを整理するための関数の作り方を学びます。',
        descZh: '学习如何创建和使用函数来复用代码并组织逻辑。',
        tags: ['JavaScript', 'Function', 'Beginner'],
        badge: 'NEW',
        link: './website/js-learning-hub/index.html'
    },

    {
        category: 'website',
        icon: '🌍',
        image: './img/minimal-tech-banner.png',
        title: 'Website Cá nhân',
        titleEn: 'Personal Website',
        titleKo: '개인 웹사이트',
        titleJa: '個人ウェブサイト',
        titleZh: '个人网站',
        desc: 'Website portfolio chuyên nghiệp với thiết kế hiện đại, hỗ trợ đa ngôn ngữ và dark mode.',
        descEn: 'Professional portfolio website with modern design, multi-language support and dark mode.',
        descKo: '현대적인 디자인과 다국어 및 다크 모드를 지원하는 전문 포트폴리오 웹사이트입니다.',
        descJa: 'モダンなデザインで、多言語対応とダークモードを備えたプロフェッショナルなポートフォリオサイトです。',
        descZh: '具有现代设计的专业作品集网站，支持多语言和深色模式。',
        tags: ['HTML', 'CSS', 'JavaScript'],
        badge: '',
        link: '#'
    },

    // ============================================
    // GAME PROJECTS
    // ============================================
    {
        category: 'game',
        icon: '🏰',
        image: './img/fortress-defense-img.png',
        title: 'Game Thủ Thành',
        titleEn: 'Fortress Defense',
        titleKo: '요새 방어',
        titleJa: '要塞防衛',
        titleZh: '要塞防御',
        desc: 'Game thủ thành chiến thuật, xây dựng pháo đài và nâng cấp để chống lại làn sóng quái vật.',
        descEn: 'Strategic tower defense game where you build and upgrade fortresses to survive enemy waves.',
        descKo: '요새를 건설하고 업그레이드하여 적의 웨이브를 막아내는 전략 디펜스 게임입니다.',
        descJa: '要塞を建設・強化し、敵のウェーブを迎え撃つ戦略型タワーディフェンスゲーム。',
        descZh: '建造并升级要塞，抵御一波波敌人进攻的策略塔防游戏。',
        tags: ['JavaScript', 'Game Logic', 'Tower Defense', 'Strategy'],
        badge: 'NEW',
        link: './game/thu-thanh.htm'
    },

    {
        category: 'game',
        icon: '♟️',
        image: './img/master-chess-img.png',
        title: 'Cờ vua',
        titleEn: 'Chess',
        titleKo: '체스',
        titleJa: 'チェス',
        titleZh: '国际象棋',
        desc: 'Game cờ vua với AI, hỗ trợ nhiều chế độ chơi và giao diện trực quan.',
        descEn: 'Chess game with AI, supporting multiple game modes and intuitive interface.',
        descKo: 'AI가 포함되어 있으며 다양한 게임 모드와 직관적인 인터페이스를 지원하는 체스 게임입니다.',
        descJa: 'AIを搭載し、複数のゲームモードと直感的なインターフェースを備えたチェスゲームです。',
        descZh: '包含 AI 的国际象棋游戏，支持多种游戏模式和直观的界面。',
        tags: ['JavaScript', 'Game Logic', 'AI'],
        badge: '',
        link: './game/chess_master.html'
    },

    {
        category: 'game',
        icon: '🐍',
        image: './img/ran-san-moi-img.png',
        title: 'Rắn săn mồi',
        titleEn: 'Snake Game',
        titleKo: '스네이크 게임',
        titleJa: 'スネークゲーム',
        titleZh: '贪吃蛇',
        desc: 'Game kinh điển với đồ họa mượt mà và nhiều level độ khó.',
        descEn: 'Classic game with smooth graphics and multiple difficulty levels.',
        descKo: '부드러운 그래픽과 다양한 난이도를 갖춘 클래식 게임입니다.',
        descJa: '滑らかなグラフィックと複数の難易度を備えたクラシックゲームです。',
        descZh: '经典的贪吃蛇游戏，拥有流畅的画面和多种难度等级。',
        tags: ['Canvas', 'Animation'],
        badge: '',
        link: './game/Ran-san-moi.html'
    },

    {
        category: 'game',
        icon: '⭕',
        image: './img/Co-caro.png',
        title: 'Cờ caro',
        titleEn: 'Tic Tac Toe',
        titleKo: '틱택토',
        titleJa: '三目並べ',
        titleZh: '井字棋',
        desc: 'Game cờ caro với chế độ 2 người chơi và responsive design.',
        descEn: 'Tic Tac Toe game with 2-player mode and responsive design.',
        descKo: '2인 플레이 모드와 반응형 디자인을 지원하는 틱택토 게임입니다.',
        descJa: '2人対戦モードとレスポンシブデザインを備えた三目並べゲームです。',
        descZh: '支持双人模式并具有响应式设计的井字棋游戏。',
        tags: ['JavaScript', 'Game'],
        badge: '',
        link: './game/X-O.html'
    },

    {
        category: 'game',
        icon: '🧩',
        image: './img/Xep-hinh.jpg',
        title: 'Xếp hình',
        titleEn: 'Puzzle',
        titleKo: '퍼즐',
        titleJa: 'パズル',
        titleZh: '拼图',
        desc: 'Game xếp hình thử thách trí nhớ và khả năng giải quyết vấn đề.',
        descEn: 'Puzzle game that challenges memory and problem-solving skills.',
        descKo: '기억력과 문제 해결 능력을 도전하는 퍼즐 게임입니다.',
        descJa: '記憶力と問題解決能力を試すパズルゲームです。',
        descZh: '挑战记忆力和问题解决能力的拼图游戏。',
        tags: ['Puzzle', 'Logic'],
        badge: '',
        link: './game/xep-hinh.html'
    },

    {
        category: 'game',
        icon: '🐇',
        image: './img/Co-tuong.jpg',
        title: 'Cờ tướng',
        titleEn: 'Chinese Chess',
        titleKo: '중국 장기',
        titleJa: '中国将棋（シャンチー）',
        titleZh: '中国象棋',
        desc: 'Game cờ tướng Việt Nam với luật chơi chính xác và AI thông minh.',
        descEn: 'Vietnamese Chinese Chess game with accurate rules and smart AI.',
        descKo: '정확한 규칙과 지능형 AI를 갖춘 베트남식 중국 장기 게임입니다.',
        descJa: '正確なルールと賢いAIを備えたベトナム式中国将棋ゲームです。',
        descZh: '具有准确规则和智能 AI 的越南版中国象棋游戏。',
        tags: ['JavaScript', 'Strategy'],
        badge: '',
        link: './game/co-tuong.html'
    },

    // ============================================
    // CSS PROJECTS
    // ============================================
    {
        category: 'css',
        icon: '🛒',
        image: './img/LuxeShop.png',
        title: 'Giao diện web bán hàng',
        titleEn: 'Modern E-Commerce UI',
        titleKo: '모던 이커머스 웹 UI',
        titleJa: 'モダンECサイトUI',
        titleZh: '现代电商网站界面',
        desc: 'Giao diện web bán hàng hiện đại, tập trung vào trải nghiệm người dùng, hiệu ứng hover, animation mượt và tương tác trực quan.',
        descEn: 'A modern e-commerce website interface focused on user experience, smooth animations, hover effects, and interactive UI.',
        descKo: '부드러운 애니메이션과 호버 효과, 직관적인 상호작용에 중점을 둔 현대적인 이커머스 웹 인터페이스.',
        descJa: '滑らかなアニメーション、ホバー効果、直感的な操作性を重視したモダンなECサイトUI。',
        descZh: '注重用户体验，拥有流畅动画、悬停特效和直观交互的现代电商界面。',
        tags: ['CSS', 'UI', 'Ecommerce', 'Shop', 'Animation', 'Interaction', 'Responsive'],
        badge: 'NEW',
        link: './CSS-web/LuxeShop.html'
    },

    {
        category: 'css',
        icon: '✨',
        image: './img/NEXUS.png',
        title: 'Giao diện đăng nhập',
        titleEn: 'Login & Register UI',
        titleKo: '로그인 & 회원가입 UI',
        titleJa: 'ログイン・登録UI',
        titleZh: '登录与注册界面',
        desc: 'Giao diện đăng nhập & đăng ký cao cấp với hiệu ứng glassmorphism, animation mượt, validate form và social login.',
        descEn: 'A premium login & register interface featuring glassmorphism, smooth animations, form validation, and social login.',
        descKo: '글래스모피즘 효과, 부드러운 애니메이션, 폼 검증 및 소셜 로그인을 갖춘 고급 로그인 및 회원가입 인터페이스.',
        descJa: 'グラスモーフィズム、滑らかなアニメーション、フォーム検証、ソーシャルログインを備えた高品質なログイン・登録UI。',
        descZh: '采用玻璃拟态设计，拥有流畅动画、表单校验和社交登录的高端登录注册界面。',
        tags: ['CSS', 'UI', 'Login', 'Register', 'Animation', 'Glassmorphism'],
        badge: 'NEW',
        link: './CSS-web/NEXUS.html'
    },

    {
        category: 'css',
        icon: '✨',
        image: './img/css-effects-studio.png',
        title: 'CSS Effects Studio',
        titleEn: 'CSS Effects Studio',
        titleKo: 'CSS 효과 스튜디오',
        titleJa: 'CSSエフェクトスタジオ',
        titleZh: 'CSS 特效工作室',
        desc: 'Studio tương tác khám phá và tùy biến các hiệu ứng CSS hiện đại.',
        descEn: 'An interactive studio to explore and customize modern CSS effects.',
        descKo: '현대적인 CSS 효과를 탐색하고 커스터마이즈할 수 있는 인터랙티브 스튜디오.',
        descJa: '最新のCSSエフェクトを探索・カスタマイズできるインタラクティブなスタジオ。',
        descZh: '用于探索和自定义现代 CSS 特效的交互式工作室。',
        tags: ['CSS', 'Effects', 'Studio'],
        badge: 'NEW',
        link: './CSS-web/css-effects-studio.html'
    },

    {
        category: 'css',
        icon: '🔑',
        image: './img/website_1.png',
        title: 'Giao diện đăng nhập',
        titleEn: 'Login & Register Interface',
        titleKo: '로그인 및 회원가입 인터페이스',
        titleJa: 'ログイン・新規登録画面',
        titleZh: '登录与注册界面',
        desc: 'Giao diện đăng nhập và đăng ký đơn giản, trung tính, dễ dàng tích hợp với mọi nền giao diện phía sau.',
        descEn: 'A simple and neutral login & register interface that can be easily integrated with any background.',
        descKo: '어떤 배경과도 쉽게 통합할 수 있는 심플하고 중립적인 로그인 및 회원가입 인터페이스.',
        descJa: 'あらゆる背景に簡単に統合できる、シンプルで中立的なログイン・登録画面。',
        descZh: '简洁、中性的登录与注册界面，可轻松集成到任何背景中。',
        tags: ['CSS', 'UI', 'Login', 'Register', 'Form'],
        badge: '',
        link: './CSS-web/wbsite_1.html'
    },

    {
        category: 'css',
        icon: '🔑',
        image: './img/giao-dien-web_tim-trang.png',
        title: 'Giao diện đăng nhập',
        titleEn: 'Login Interface',
        titleKo: '로그인 인터페이스',
        titleJa: 'ログイン画面',
        titleZh: '登录界面',
        desc: 'Giao diện đăng nhập hiện đại, tối giản, tập trung vào trải nghiệm người dùng.',
        descEn: 'A modern and minimal login interface focused on user experience.',
        descKo: '사용자 경험에 중점을 둔 현대적이고 미니멀한 로그인 인터페이스.',
        descJa: 'ユーザー体験を重視したモダンでシンプルなログイン画面。',
        descZh: '注重用户体验的现代简约登录界面。',
        tags: ['CSS', 'UI', 'Login', 'Form'],
        badge: '',
        link: './CSS-web/Website_trang-tim.html'
    }
];

/**
 * Export for use in app.js
 */