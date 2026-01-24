const Languages = {
    en: {
        // App
        appTitle: "⚡ CSS Effects Studio",
        searchPlaceholder: "Search effects...",
        selectEffect: "Select an Effect",
        selectEffectLearn: "Select an effect to learn how it works.",
        
        // Tags
        tagAll: "All",
        tagHover: "Hover",
        tagClick: "Click",
        tagAnimation: "Animated",
        
        // Tabs
        tabPreview: "Preview",
        tabCustomize: "Customize",
        tabLearn: "How it Works",
        tabCode: "Code",
        
        // Buttons
        btnReset: "Reset",
        btnExport: "📤 Export",
        btnCopy: "📋 Copy",
        btnCopied: "✓ Copied!",
        
        // Sections
        presetsTitle: "Presets",
        controlsTitle: "Controls",
        learnTitle: "📚 How It Works",
        
        // Presets
        presetMinimal: "Minimal",
        presetSoft: "Soft",
        presetStrong: "Strong",
        presetNeon: "Neon",
        
        // Controls
        labelDuration: "Duration",
        labelPrimaryColor: "Primary Color",
        labelSecondaryColor: "Secondary Color",
        labelBlur: "Blur",
        labelOpacity: "Opacity",
        labelIntensity: "Intensity",
        
        // Performance
        perfLow: "Low Impact",
        perfMedium: "Medium Impact",
        perfHigh: "High Impact",
        performanceMode: "Performance Mode",
        toggleTheme: "Toggle Theme",
        
        // Categories
        catButtons: "BUTTONS",
        catCards: "CARDS",
        catMicro: "MICRO-INTERACTIONS",
        
        // Effect Names & Descriptions (see projects.js for full list)
    },
    vi: {
        appTitle: "⚡ Phòng Thí Nghiệm CSS",
        searchPlaceholder: "Tìm kiếm hiệu ứng...",
        selectEffect: "Chọn Hiệu Ứng",
        selectEffectLearn: "Chọn hiệu ứng để tìm hiểu cách hoạt động.",
        
        tagAll: "Tất cả",
        tagHover: "Di chuột",
        tagClick: "Nhấp",
        tagAnimation: "Hoạt cảnh",
        
        tabPreview: "Xem trước",
        tabCustomize: "Tùy chỉnh",
        tabLearn: "Cách hoạt động",
        tabCode: "Mã nguồn",
        
        btnReset: "Đặt lại",
        btnExport: "📤 Xuất",
        btnCopy: "📋 Sao chép",
        btnCopied: "✓ Đã sao chép!",
        
        presetsTitle: "Cài đặt sẵn",
        controlsTitle: "Điều khiển",
        learnTitle: "📚 Cách hoạt động",
        
        presetMinimal: "Tối giản",
        presetSoft: "Nhẹ nhàng",
        presetStrong: "Mạnh mẽ",
        presetNeon: "Neon",
        
        labelDuration: "Thời lượng",
        labelPrimaryColor: "Màu chính",
        labelSecondaryColor: "Màu phụ",
        labelBlur: "Độ mờ",
        labelOpacity: "Độ trong suốt",
        labelIntensity: "Cường độ",
        
        perfLow: "Ảnh hưởng thấp",
        perfMedium: "Ảnh hưởng trung bình",
        perfHigh: "Ảnh hưởng cao",
        performanceMode: "Chế độ hiệu suất",
        toggleTheme: "Đổi giao diện",
        
        catButtons: "NÚT BẤM",
        catCards: "THẺ",
        catMicro: "VI TƯƠNG TÁC",
    },
    ja: {
        appTitle: "⚡ CSSエフェクトスタジオ",
        searchPlaceholder: "エフェクトを検索...",
        selectEffect: "エフェクトを選択",
        selectEffectLearn: "エフェクトを選択して仕組みを学びます。",
        
        tagAll: "すべて",
        tagHover: "ホバー",
        tagClick: "クリック",
        tagAnimation: "アニメーション",
        
        tabPreview: "プレビュー",
        tabCustomize: "カスタマイズ",
        tabLearn: "仕組み",
        tabCode: "コード",
        
        btnReset: "リセット",
        btnExport: "📤 エクスポート",
        btnCopy: "📋 コピー",
        btnCopied: "✓ コピーしました!",
        
        presetsTitle: "プリセット",
        controlsTitle: "コントロール",
        learnTitle: "📚 仕組み",
        
        presetMinimal: "ミニマル",
        presetSoft: "ソフト",
        presetStrong: "ストロング",
        presetNeon: "ネオン",
        
        labelDuration: "期間",
        labelPrimaryColor: "プライマリカラー",
        labelSecondaryColor: "セカンダリカラー",
        labelBlur: "ぼかし",
        labelOpacity: "不透明度",
        labelIntensity: "強度",
        
        perfLow: "低影響",
        perfMedium: "中影響",
        perfHigh: "高影響",
        performanceMode: "パフォーマンスモード",
        toggleTheme: "テーマ切替",
        
        catButtons: "ボタン",
        catCards: "カード",
        catMicro: "マイクロインタラクション",
    }
};

const i18nManager = {
    current: localStorage.getItem('cssStudioLang') || 'en',
    
    setLanguage(lang) {
        this.current = lang;
        localStorage.setItem('cssStudioLang', lang);
        this.updateUI();
        Studio.ui.renderEffects();
        if (Studio.currentEffect) {
            Studio.loadEffect(Studio.currentEffect);
        }
    },

    t(key, effect) {
        if (effect && effect[key]) {
            return effect[key][this.current] || effect[key].en;
        }
        return Languages[this.current][key] || key;
    },

    updateUI() {
        // Update all [data-i18n] elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        // Update titles
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = this.t(key);
        });

        // Update active language option
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.remove('active');
        });
        const langMap = { en: 0, vi: 1, ja: 2 };
        const options = document.querySelectorAll('.lang-option');
        if (options[langMap[this.current]]) {
            options[langMap[this.current]].classList.add('active');
        }
    }
};
