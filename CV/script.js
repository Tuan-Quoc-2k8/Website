// Translation Data
const translations = {
    en: {
        nav: {
            about: "About",
            education: "Education",
            skills: "Skills",
            projects: "Projects",
            languages: "Languages",
            contact: "Contact"
        },
        hero: {
            subtitle: "IT Student & Web Developer Intern",
            tagline: "Computer Science student passionate about building modern web applications and learning new technologies",
            viewProjects: "View Projects",
            downloadCV: "Download CV"
        },
        about: {
            title: "About Me",
            paragraph1: "I am a Computer Science student with a strong passion for web development and creating user-friendly applications. Through coursework and self-directed learning, I have built a solid foundation in HTML, CSS, JavaScript, and modern frameworks like React.",
            paragraph2: "I enjoy solving problems through code and continuously learning new technologies. I have completed several personal and academic projects that demonstrate my ability to build functional web applications from concept to deployment. I am actively seeking internship opportunities where I can contribute to real-world projects while further developing my skills in a professional environment."
        },
        education: {
            title: "Education",
            degree: "Bachelor of Science in Computer Science",
            university: "State University",
            period: "2021 - Present (Expected 2025)",
            gpa: "Current GPA: 3.6/4.0",
            coursework: "Relevant Coursework: Data Structures, Web Development, Database Systems, Software Engineering",
            club: "Active member of Computer Science Club"
        },
        skills: {
            title: "Skills & Technologies",
            frontend: "Frontend",
            backend: "Backend & Database",
            tools: "Tools & Others",
            responsive: "Responsive Design",
            level: {
                intermediate: "Intermediate",
                basic: "Basic",
                familiar: "Familiar"
            }
        },
        projects: {
            title: "Projects",
            personal: "Personal Project",
            academic: "Academic Project",
            ecommerce: {
                title: "E-Commerce Website",
                description: "Built a mock e-commerce website with product listing, shopping cart functionality, and checkout page. Learned to manage state and handle user interactions."
            },
            taskmanager: {
                title: "Task Management App",
                description: "Developed a to-do list application with CRUD operations for a Web Development course. Implemented filtering and sorting features to organize tasks efficiently."
            },
            weather: {
                title: "Weather Dashboard",
                description: "Created a weather app that fetches real-time data from an API and displays current weather and forecasts. Learned API integration and asynchronous JavaScript."
            },
            portfolio: {
                title: "Portfolio Website",
                description: "Designed and built a responsive portfolio website to showcase projects and skills. Implemented smooth scrolling, dark mode toggle, and optimized for mobile devices.",
                responsive: "Responsive Design"
            }
        },
        languagesSection: {
            title: "Languages & Localization",
            intro: "I have practical experience implementing multilingual support for web applications, enabling content to be displayed in multiple languages for international audiences.",
            implementation: {
                title: "Multilingual Website Implementation",
                project: "Personal Portfolio Project",
                item1: "Implemented language support for Vietnamese, English, and Japanese",
                item2: "Built language toggle functionality using vanilla JavaScript without external libraries",
                item3: "Structured translation content in JSON format for easy maintenance and scalability",
                item4: "Ensured smooth user experience with instant language switching",
                item5: "Applied frontend internationalization (i18n) best practices"
            },
            proficiency: {
                title: "Language Proficiency",
                vietnamese: "Vietnamese: Native speaker",
                english: "English: Proficient in reading technical documentation and writing code comments",
                japanese: "Japanese: Basic conversational level"
            }
        },
        contact: {
            title: "Get In Touch",
            email: "Email",
            location: "Location",
            text: "Dong Nai Province, Vietnam",
            form: {
                name: "Name",
                email: "Email",
                message: "Message",
                send: "Send Message",
                success: "Thank you for your message! I will get back to you soon."
            }
        },
        modal: {
            title: "Download CV",
            description: "Select your preferred language version",
            english: "English Version",
            englishDesc: "Standard international format",
            vietnamese: "Vietnamese Version",
            vietnameseDesc: "For Vietnamese employers",
            japanese: "Japanese Version",
            japaneseDesc: "履歴書形式 (Rirekisho format)"
        },
        footer: {
            copyright: "© 2026 Tuan Quoc. All rights reserved."
        }
    },
    vi: {
        nav: {
            about: "Giới thiệu",
            education: "Học vấn",
            skills: "Kỹ năng",
            projects: "Dự án",
            languages: "Ngôn ngữ",
            contact: "Liên hệ"
        },
        hero: {
            subtitle: "Sinh viên CNTT & Thực tập sinh Lập trình Web",
            tagline: "Sinh viên Khoa học Máy tính đam mê xây dựng ứng dụng web hiện đại và học hỏi công nghệ mới",
            viewProjects: "Xem dự án",
            downloadCV: "Tải CV"
        },
        about: {
            title: "Giới thiệu",
            paragraph1: "Tôi là sinh viên Khoa học Máy tính với niềm đam mê mạnh mẽ về phát triển web và tạo ra các ứng dụng thân thiện với người dùng. Thông qua các khóa học và tự học, tôi đã xây dựng nền tảng vững chắc về HTML, CSS, JavaScript và các framework hiện đại như React.",
            paragraph2: "Tôi thích giải quyết vấn đề thông qua code và không ngừng học hỏi công nghệ mới. Tôi đã hoàn thành nhiều dự án cá nhân và học thuật chứng minh khả năng xây dựng ứng dụng web từ ý tưởng đến triển khai. Tôi đang tích cực tìm kiếm cơ hội thực tập để đóng góp vào các dự án thực tế và phát triển kỹ năng trong môi trường chuyên nghiệp."
        },
        education: {
            title: "Học vấn",
            degree: "Cử nhân Khoa học Máy tính",
            university: "Đại học Công lập",
            period: "2021 - Hiện tại (Dự kiến 2025)",
            gpa: "GPA hiện tại: 3.6/4.0",
            coursework: "Các môn học liên quan: Cấu trúc Dữ liệu, Phát triển Web, Hệ thống Cơ sở Dữ liệu, Kỹ thuật Phần mềm",
            club: "Thành viên tích cực của Câu lạc bộ Khoa học Máy tính"
        },
        skills: {
            title: "Kỹ năng & Công nghệ",
            frontend: "Frontend",
            backend: "Backend & Cơ sở Dữ liệu",
            tools: "Công cụ & Khác",
            responsive: "Thiết kế Responsive",
            level: {
                intermediate: "Trung bình",
                basic: "Cơ bản",
                familiar: "Quen thuộc"
            }
        },
        projects: {
            title: "Dự án",
            personal: "Dự án Cá nhân",
            academic: "Dự án Học thuật",
            ecommerce: {
                title: "Website Thương mại điện tử",
                description: "Xây dựng website thương mại điện tử mô phỏng với danh sách sản phẩm, giỏ hàng và trang thanh toán. Học cách quản lý state và xử lý tương tác người dùng."
            },
            taskmanager: {
                title: "Ứng dụng Quản lý Công việc",
                description: "Phát triển ứng dụng danh sách công việc với các thao tác CRUD cho khóa học Phát triển Web. Triển khai tính năng lọc và sắp xếp để tổ chức công việc hiệu quả."
            },
            weather: {
                title: "Bảng điều khiển Thời tiết",
                description: "Tạo ứng dụng thời tiết lấy dữ liệu thời gian thực từ API và hiển thị thời tiết hiện tại và dự báo. Học về tích hợp API và JavaScript bất đồng bộ."
            },
            portfolio: {
                title: "Website Portfolio",
                description: "Thiết kế và xây dựng website portfolio responsive để giới thiệu dự án và kỹ năng. Triển khai cuộn mượt, chế độ tối và tối ưu cho thiết bị di động.",
                responsive: "Thiết kế Responsive"
            }
        },
        languagesSection: {
            title: "Ngôn ngữ & Bản địa hóa",
            intro: "Tôi có kinh nghiệm thực tế triển khai hỗ trợ đa ngôn ngữ cho ứng dụng web, cho phép nội dung được hiển thị bằng nhiều ngôn ngữ khác nhau cho khán giả quốc tế.",
            implementation: {
                title: "Triển khai Website Đa ngôn ngữ",
                project: "Dự án Portfolio Cá nhân",
                item1: "Triển khai hỗ trợ ngôn ngữ cho tiếng Việt, tiếng Anh và tiếng Nhật",
                item2: "Xây dựng chức năng chuyển đổi ngôn ngữ sử dụng JavaScript thuần không cần thư viện bên ngoài",
                item3: "Cấu trúc nội dung dịch thuật dạng JSON để dễ bảo trì và mở rộng",
                item4: "Đảm bảo trải nghiệm người dùng mượt mà với việc chuyển đổi ngôn ngữ tức thì",
                item5: "Áp dụng các phương pháp tốt nhất về quốc tế hóa frontend (i18n)"
            },
            proficiency: {
                title: "Trình độ Ngôn ngữ",
                vietnamese: "Tiếng Việt: Người bản ngữ",
                english: "Tiếng Anh: Thành thạo đọc tài liệu kỹ thuật và viết chú thích code",
                japanese: "Tiếng Nhật: Trình độ hội thoại cơ bản"
            }
        },
        contact: {
            title: "Liên hệ",
            email: "Email",
            location: "Vị trí",
            text: "Tỉnh Đồng Nai, Việt Nam",
            form: {
                name: "Tên",
                email: "Email",
                message: "Tin nhắn",
                send: "Gửi tin nhắn",
                success: "Cảm ơn tin nhắn của bạn! Tôi sẽ phản hồi sớm."
            }
        },
        modal: {
            title: "Tải CV",
            description: "Chọn phiên bản ngôn ngữ ưa thích",
            english: "Phiên bản Tiếng Anh",
            englishDesc: "Định dạng quốc tế chuẩn",
            vietnamese: "Phiên bản Tiếng Việt",
            vietnameseDesc: "Dành cho nhà tuyển dụng Việt Nam",
            japanese: "Phiên bản Tiếng Nhật",
            japaneseDesc: "履歴書形式 (Định dạng Rirekisho)"
        },
        footer: {
            copyright: "© 2026 Tuấn Quốc. Bảo lưu mọi quyền."
        }
    },
    ja: {
        nav: {
            about: "概要",
            education: "学歴",
            skills: "スキル",
            projects: "プロジェクト",
            languages: "言語",
            contact: "お問い合わせ"
        },
        hero: {
            subtitle: "IT学生・Webデベロッパーインターン",
            tagline: "最新のWebアプリケーション構築と新しい技術を学ぶことに情熱を持つコンピュータサイエンス学生",
            viewProjects: "プロジェクトを見る",
            downloadCV: "履歴書をダウンロード"
        },
        about: {
            title: "概要",
            paragraph1: "私はWeb開発とユーザーフレンドリーなアプリケーションの作成に強い情熱を持つコンピュータサイエンス学生です。授業と独学を通じて、HTML、CSS、JavaScript、Reactなどの最新フレームワークの強固な基盤を築きました。",
            paragraph2: "コードを通じて問題を解決し、新しい技術を継続的に学ぶことを楽しんでいます。コンセプトから展開まで機能的なWebアプリケーションを構築する能力を示すいくつかの個人および学術プロジェクトを完成させました。実際のプロジェクトに貢献し、プロフェッショナルな環境でスキルをさらに発展させることができるインターンシップの機会を積極的に探しています。"
        },
        education: {
            title: "学歴",
            degree: "コンピュータサイエンス学士号",
            university: "州立大学",
            period: "2021年 - 現在（2025年卒業予定）",
            gpa: "現在のGPA：3.6/4.0",
            coursework: "関連科目：データ構造、Web開発、データベースシステム、ソフトウェア工学",
            club: "コンピュータサイエンスクラブの活動的なメンバー"
        },
        skills: {
            title: "スキル・技術",
            frontend: "フロントエンド",
            backend: "バックエンド・データベース",
            tools: "ツール・その他",
            responsive: "レスポンシブデザイン",
            level: {
                intermediate: "中級",
                basic: "基礎",
                familiar: "理解"
            }
        },
        projects: {
            title: "プロジェクト",
            personal: "個人プロジェクト",
            academic: "学術プロジェクト",
            ecommerce: {
                title: "Eコマースサイト",
                description: "商品リスト、ショッピングカート機能、チェックアウトページを備えたモックEコマースサイトを構築。状態管理とユーザーインタラクション処理を学習。"
            },
            taskmanager: {
                title: "タスク管理アプリ",
                description: "Web開発コース向けにCRUD操作を持つToDoリストアプリケーションを開発。タスクを効率的に整理するためのフィルタリングとソート機能を実装。"
            },
            weather: {
                title: "天気ダッシュボード",
                description: "APIからリアルタイムデータを取得し、現在の天気と予報を表示する天気アプリを作成。API統合と非同期JavaScriptを学習。"
            },
            portfolio: {
                title: "ポートフォリオサイト",
                description: "プロジェクトとスキルを紹介するレスポンシブポートフォリオサイトを設計・構築。スムーズスクロール、ダークモード切り替えを実装し、モバイルデバイス向けに最適化。",
                responsive: "レスポンシブデザイン"
            }
        },
        languagesSection: {
            title: "言語・ローカライゼーション",
            intro: "国際的なオーディエンス向けに複数の言語でコンテンツを表示できるよう、Webアプリケーションの多言語サポートを実装した実務経験があります。",
            implementation: {
                title: "多言語Webサイト実装",
                project: "個人ポートフォリオプロジェクト",
                item1: "ベトナム語、英語、日本語の言語サポートを実装",
                item2: "外部ライブラリを使用せずにバニラJavaScriptで言語切り替え機能を構築",
                item3: "簡単なメンテナンスと拡張性のためにJSON形式で翻訳コンテンツを構造化",
                item4: "即座の言語切り替えでスムーズなユーザーエクスペリエンスを確保",
                item5: "フロントエンド国際化（i18n）のベストプラクティスを適用"
            },
            proficiency: {
                title: "言語能力",
                vietnamese: "ベトナム語：ネイティブスピーカー",
                english: "英語：技術文書の読解とコードコメントの記述が堪能",
                japanese: "日本語：基本的な会話レベル"
            }
        },
        contact: {
            title: "お問い合わせ",
            email: "メール",
            location: "所在地",
            text: "ベトナム・ドンナイ省",
            form: {
                name: "名前",
                email: "メール",
                message: "メッセージ",
                send: "メッセージを送信",
                success: "メッセージありがとうございます！すぐに返信いたします。"
            }
        },
        modal: {
            title: "履歴書をダウンロード",
            description: "希望する言語バージョンを選択してください",
            english: "英語版",
            englishDesc: "標準的な国際形式",
            vietnamese: "ベトナム語版",
            vietnameseDesc: "ベトナムの雇用主向け",
            japanese: "日本語版",
            japaneseDesc: "履歴書形式（Rirekisho format）"
        },
        footer: {
            copyright: "© 2026 トゥアン・クオック. 無断転載禁止。"
        }
    }
};

// I18n Class
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.translations = translations;
        this.init();
    }

    init() {
        this.updateLanguage(this.currentLang);
        this.updateLanguageToggle(this.currentLang);
    }

    translate(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        return value || key;
    }

    updateLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        this.updateLanguageToggle(lang);
    }

    updateLanguageToggle(lang) {
        const langCodes = { en: 'EN', vi: 'VI', ja: 'JA' };
        const currentLangSpan = document.querySelector('.current-lang');
        if (currentLangSpan) {
            currentLangSpan.textContent = langCodes[lang];
        }
        
        // Update active state in dropdown
        document.querySelectorAll('.language-option').forEach(option => {
            const optionLang = option.getAttribute('data-lang');
            if (optionLang === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
}

// Initialize i18n
const i18n = new I18n();

// Language Selector
const languageToggle = document.getElementById('language-toggle');
const languageDropdown = document.getElementById('language-dropdown');
const languageOptions = document.querySelectorAll('.language-option');

languageToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('active');
});

languageOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.getAttribute('data-lang');
        i18n.updateLanguage(lang);
        languageDropdown.classList.remove('active');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.classList.remove('active');
    }
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Navigation Background on Scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 0 ? 'var(--shadow)' : 'none';
});

// CV Download Modal
const downloadCvBtn = document.getElementById('download-cv-btn');
const cvModal = document.getElementById('cv-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

function openModal() {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
}

downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal.classList.contains('active')) {
        closeModal();
    }
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    const successMessage = i18n.translate('contact.form.success');
    alert(successMessage);
    contactForm.reset();
});

// Intersection Observer for Animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});