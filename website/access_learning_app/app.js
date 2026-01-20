/* ========================================
   Microsoft Access Learning Simulator
   Advanced Interactive Application
   ======================================== */

'use strict';

/* ========================================
   APPLICATION STATE MANAGEMENT
   ======================================== */
const AppState = {
    currentLanguage: 'en',
    currentLesson: null,
    currentTab: 'lessons',
    completedLessons: [],
    
    // Table Design State
    currentTable: {
        name: 'Table1',
        fields: [],
        selectedFieldIndex: null
    },
    
    // Relationships State
    relationships: [],
    tablePositions: {},
    
    // Query Design State
    currentQuery: {
        tables: [],
        fields: [],
        criteria: []
    },
    
    init() {
        const saved = localStorage.getItem('accessSimulatorState');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.currentLanguage = data.currentLanguage || 'en';
                this.completedLessons = data.completedLessons || [];
            } catch (e) {
                console.error('Failed to load state:', e);
            }
        }
    },
    
    save() {
        const data = {
            currentLanguage: this.currentLanguage,
            completedLessons: this.completedLessons
        };
        localStorage.setItem('accessSimulatorState', JSON.stringify(data));
    },
    
    completeLesson(lessonId) {
        if (!this.completedLessons.includes(lessonId)) {
            this.completedLessons.push(lessonId);
            this.save();
            UI.updateProgress();
        }
    }
};

/* ========================================
   LANGUAGE SYSTEM
   ======================================== */
const Languages = {
    available: {
        en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', enabled: true },
        vi: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', enabled: true },
        fr: { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', enabled: false },
        es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', enabled: false },
        de: { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', enabled: false },
        ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', enabled: false }
    },
    
    translations: {}, // Loaded dynamically
    
    async loadTranslations(lang) {
        if (this.translations[lang]) return this.translations[lang];
        
        // For demo, we'll use embedded translations
        return this.getEmbeddedTranslations(lang);
    },
    
    getEmbeddedTranslations(lang) {
        const translations = {
            en: {
                app: { title: 'Access Learning Simulator' },
                tabs: {
                    lessons: 'Lessons',
                    tableDesign: 'Table Design',
                    relationships: 'Relationships',
                    queryDesign: 'Query Design'
                },
                progress: { label: 'Progress:' },
                sidebar: { title: 'Learning Path' },
                tableDesign: {
                    tableName: 'Table:',
                    fieldName: 'Field Name',
                    dataType: 'Data Type',
                    description: 'Description'
                },
                fieldProperties: {
                    general: 'General',
                    lookup: 'Lookup',
                    noSelection: 'Select a field to view its properties',
                    fieldSize: 'Field Size',
                    required: 'Required',
                    defaultValue: 'Default Value',
                    validationRule: 'Validation Rule'
                },
                relationships: {
                    addTable: 'Add Table',
                    clear: 'Clear All',
                    practiceMode: 'Practice Mode',
                    createRelationship: 'Create Relationship',
                    sourceTable: 'Source Table',
                    targetTable: 'Target Table',
                    options: 'Relationship Options',
                    enforceIntegrity: 'Enforce Referential Integrity',
                    cascadeUpdate: 'Cascade Update Related Fields',
                    cascadeDelete: 'Cascade Delete Related Records'
                },
                query: {
                    run: 'Run',
                    viewSql: 'View SQL',
                    clear: 'Clear',
                    addTable: 'Add Table',
                    field: 'Field',
                    table: 'Table',
                    sort: 'Sort',
                    show: 'Show',
                    criteria: 'Criteria',
                    or: 'Or',
                    sqlExplanation: 'This is the SQL code generated from your query design:'
                },
                actions: {
                    save: 'Save',
                    new: 'New',
                    create: 'Create',
                    cancel: 'Cancel'
                },
                dataTypes: {
                    'Short Text': 'Short Text - Up to 255 characters',
                    'Long Text': 'Long Text - Large amounts of text',
                    'Number': 'Number - Numeric values',
                    'Date/Time': 'Date/Time - Dates and times',
                    'Currency': 'Currency - Monetary values',
                    'AutoNumber': 'AutoNumber - Automatically incremented',
                    'Yes/No': 'Yes/No - Boolean values',
                    'Hyperlink': 'Hyperlink - Web addresses'
                },
                language: { search: 'Search languages...' }
            },
            vi: {
                app: { title: 'Mô Phỏng Access' },
                tabs: {
                    lessons: 'Bài Học',
                    tableDesign: 'Thiết Kế Bảng',
                    relationships: 'Quan Hệ',
                    queryDesign: 'Thiết Kế Truy Vấn'
                },
                progress: { label: 'Tiến Độ:' },
                sidebar: { title: 'Lộ Trình Học' },
                tableDesign: {
                    tableName: 'Bảng:',
                    fieldName: 'Tên Trường',
                    dataType: 'Kiểu Dữ Liệu',
                    description: 'Mô Tả'
                },
                fieldProperties: {
                    general: 'Chung',
                    lookup: 'Tra Cứu',
                    noSelection: 'Chọn trường để xem thuộc tính',
                    fieldSize: 'Kích Thước Trường',
                    required: 'Bắt Buộc',
                    defaultValue: 'Giá Trị Mặc Định',
                    validationRule: 'Quy Tắc Xác Thực'
                },
                relationships: {
                    addTable: 'Thêm Bảng',
                    clear: 'Xóa Tất Cả',
                    practiceMode: 'Chế Độ Thực Hành',
                    createRelationship: 'Tạo Quan Hệ',
                    sourceTable: 'Bảng Nguồn',
                    targetTable: 'Bảng Đích',
                    options: 'Tùy Chọn Quan Hệ',
                    enforceIntegrity: 'Ép Buộc Toàn Vẹn Tham Chiếu',
                    cascadeUpdate: 'Cập Nhật Tầng Trên',
                    cascadeDelete: 'Xóa Tầng Trên'
                },
                query: {
                    run: 'Chạy',
                    viewSql: 'Xem SQL',
                    clear: 'Xóa',
                    addTable: 'Thêm Bảng',
                    field: 'Trường',
                    table: 'Bảng',
                    sort: 'Sắp Xếp',
                    show: 'Hiển Thị',
                    criteria: 'Tiêu Chí',
                    or: 'Hoặc',
                    sqlExplanation: 'Đây là mã SQL được tạo từ thiết kế truy vấn:'
                },
                actions: {
                    save: 'Lưu',
                    new: 'Mới',
                    create: 'Tạo',
                    cancel: 'Hủy'
                },
                dataTypes: {
                    'Short Text': 'Văn Bản Ngắn - Tối đa 255 ký tự',
                    'Long Text': 'Văn Bản Dài - Lượng lớn văn bản',
                    'Number': 'Số - Giá trị số',
                    'Date/Time': 'Ngày/Giờ - Ngày và giờ',
                    'Currency': 'Tiền Tệ - Giá trị tiền tệ',
                    'AutoNumber': 'Số Tự Động - Tự động tăng',
                    'Yes/No': 'Có/Không - Giá trị Boolean',
                    'Hyperlink': 'Liên Kết - Địa chỉ web'
                },
                language: { search: 'Tìm ngôn ngữ...' }
            }
        };
        
        this.translations[lang] = translations[lang] || translations.en;
        return this.translations[lang];
    },
    
    translate(key, lang) {
        lang = lang || AppState.currentLanguage;
        const trans = this.translations[lang] || this.translations.en;
        const keys = key.split('.');
        let value = trans;
        
        for (const k of keys) {
            value = value?.[k];
            if (!value) break;
        }
        
        return value || key;
    }
};

/* ========================================
   DATABASE SAMPLE DATA
   ======================================== */
const SampleDatabase = {
    tables: {
        Students: {
            name: 'Students',
            fields: [
                { name: 'StudentID', dataType: 'AutoNumber', isPrimary: true, isRequired: true, size: null },
                { name: 'FirstName', dataType: 'Short Text', isPrimary: false, isRequired: true, size: 50 },
                { name: 'LastName', dataType: 'Short Text', isPrimary: false, isRequired: true, size: 50 },
                { name: 'Email', dataType: 'Short Text', isPrimary: false, isRequired: false, size: 100 },
                { name: 'BirthDate', dataType: 'Date/Time', isPrimary: false, isRequired: false, size: null }
            ],
            records: [
                { StudentID: 1, FirstName: 'John', LastName: 'Doe', Email: 'john@example.com', BirthDate: '2000-05-15' },
                { StudentID: 2, FirstName: 'Jane', LastName: 'Smith', Email: 'jane@example.com', BirthDate: '2001-08-22' },
                { StudentID: 3, FirstName: 'Mike', LastName: 'Johnson', Email: 'mike@example.com', BirthDate: '1999-12-10' }
            ]
        },
        Courses: {
            name: 'Courses',
            fields: [
                { name: 'CourseID', dataType: 'AutoNumber', isPrimary: true, isRequired: true, size: null },
                { name: 'CourseName', dataType: 'Short Text', isPrimary: false, isRequired: true, size: 100 },
                { name: 'Credits', dataType: 'Number', isPrimary: false, isRequired: true, size: null }
            ],
            records: [
                { CourseID: 1, CourseName: 'Database Design', Credits: 3 },
                { CourseID: 2, CourseName: 'Web Development', Credits: 4 },
                { CourseID: 3, CourseName: 'Data Structures', Credits: 3 }
            ]
        },
        Enrollments: {
            name: 'Enrollments',
            fields: [
                { name: 'EnrollmentID', dataType: 'AutoNumber', isPrimary: true, isRequired: true, size: null },
                { name: 'StudentID', dataType: 'Number', isPrimary: false, isRequired: true, size: null },
                { name: 'CourseID', dataType: 'Number', isPrimary: false, isRequired: true, size: null },
                { name: 'Grade', dataType: 'Short Text', isPrimary: false, isRequired: false, size: 2 }
            ],
            records: [
                { EnrollmentID: 1, StudentID: 1, CourseID: 1, Grade: 'A' },
                { EnrollmentID: 2, StudentID: 1, CourseID: 2, Grade: 'B+' },
                { EnrollmentID: 3, StudentID: 2, CourseID: 1, Grade: 'A-' }
            ]
        }
    }
};

/* ========================================
   LESSON SYSTEM (now loaded from lessons.js)
   ======================================== */
const LessonSystem = {
    get lessons() {
        return window.LessonContent || [];
    },
    
    get categories() {
        return window.LessonCategories || [];
    },
    
    renderLesson(lessonId) {
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (!lesson) return '';
        
        const lang = AppState.currentLanguage;
        let html = `<div class="lesson-container">`;
        
        lesson.steps.forEach((step, index) => {
            html += `
                <div class="lesson-step ${step.type}">
                    <div class="step-header">
                        <div class="step-number">${index + 1}</div>
                        <div class="step-title">${this.getStepTypeTitle(step.type, lang)}</div>
                    </div>
                    <div class="step-content">${step.content[lang] || step.content.en}</div>
                </div>
            `;
        });
        
        html += `</div>`;
        return html;
    },
    
    getStepTypeTitle(type, lang) {
        const titles = {
            en: { goal: '🎯 Goal', demo: '👀 Demo', practice: '🧪 Practice', mistakes: '❌ Common Mistakes', checkpoint: '✅ Checkpoint' },
            vi: { goal: '🎯 Mục Tiêu', demo: '👀 Demo', practice: '🧪 Thực Hành', mistakes: '❌ Lỗi Thường Gặp', checkpoint: '✅ Kiểm Tra' }
        };
        return titles[lang]?.[type] || titles.en[type];
    }
};

/* ========================================
   TABLE DESIGN MODULE
   ======================================== */
const TableDesigner = {
    init() {
        this.addFieldRow();
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        document.getElementById('saveTableBtn')?.addEventListener('click', () => this.saveTable());
        document.getElementById('newTableBtn')?.addEventListener('click', () => this.newTable());
    },
    
    addFieldRow() {
        const grid = document.getElementById('fieldDefinitionGrid');
        if (!grid) return;
        
        const index = AppState.currentTable.fields.length;
        const row = document.createElement('div');
        row.className = 'field-row';
        row.dataset.fieldIndex = index;
        
        row.innerHTML = `
            <div class="field-cell">
                <button class="primary-key-btn" data-index="${index}">🔑</button>
            </div>
            <div class="field-cell">
                <input type="text" class="field-name-input" placeholder="Field name" data-index="${index}">
            </div>
            <div class="field-cell">
                <select class="data-type-select" data-index="${index}">
                    <option>Short Text</option>
                    <option>Long Text</option>
                    <option>Number</option>
                    <option>Date/Time</option>
                    <option>Currency</option>
                    <option>AutoNumber</option>
                    <option>Yes/No</option>
                    <option>Hyperlink</option>
                </select>
            </div>
            <div class="field-cell">
                <input type="text" class="field-description-input" placeholder="Description" data-index="${index}">
            </div>
        `;
        
        grid.appendChild(row);
        
        // Event listeners
        row.addEventListener('click', () => this.selectField(index));
        row.querySelector('.primary-key-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePrimaryKey(index);
        });
        
        AppState.currentTable.fields.push({
            name: '',
            dataType: 'Short Text',
            description: '',
            isPrimary: false,
            properties: { size: 255, required: false, defaultValue: '' }
        });
    },
    
    selectField(index) {
        AppState.currentTable.selectedFieldIndex = index;
        
        // Update UI
        document.querySelectorAll('.field-row').forEach((row, i) => {
            row.classList.toggle('selected', i === index);
        });
        
        this.showFieldProperties(index);
    },
    
    togglePrimaryKey(index) {
        // Remove primary key from all fields
        AppState.currentTable.fields.forEach(f => f.isPrimary = false);
        document.querySelectorAll('.primary-key-btn').forEach(btn => btn.classList.remove('active'));
        
        // Set new primary key
        AppState.currentTable.fields[index].isPrimary = true;
        const field = AppState.currentTable.fields[index];
        document.querySelector(`[data-index="${index}"].primary-key-btn`).classList.add('active');
        
        // Observe action for learning engine
        if (typeof LearningEngine !== 'undefined') {
            LearningEngine.observe('primary-key-set', {
                fieldName: field.name,
                dataType: field.dataType,
                index: index
            });
        }
        
        UI.showToast('Primary key set successfully', 'success');
    },
    
    showFieldProperties(index) {
        const field = AppState.currentTable.fields[index];
        const container = document.getElementById('fieldPropertiesContent');
        const lang = AppState.currentLanguage;
        
        container.innerHTML = `
            <div class="property-row">
                <div class="property-label">${Languages.translate('fieldProperties.fieldSize')}:</div>
                <input type="text" class="property-input" value="${field.properties.size || ''}">
            </div>
            <div class="property-row">
                <div class="property-label">${Languages.translate('fieldProperties.required')}:</div>
                <select class="property-select">
                    <option ${field.properties.required ? 'selected' : ''}>Yes</option>
                    <option ${!field.properties.required ? 'selected' : ''}>No</option>
                </select>
            </div>
            <div class="property-row">
                <div class="property-label">${Languages.translate('fieldProperties.defaultValue')}:</div>
                <input type="text" class="property-input" value="${field.properties.defaultValue || ''}">
            </div>
            <div class="property-row">
                <div class="property-help">Set properties to control how data is stored and validated</div>
            </div>
        `;
    },
    
    saveTable() {
        const tableName = document.getElementById('currentTableName')?.value.trim();
        if (!tableName) {
            UI.showToast('Please enter a table name', 'error');
            return;
        }
        
        // Collect field data from UI
        const fieldRows = document.querySelectorAll('.field-row:not(.header)');
        const fields = [];
        
        fieldRows.forEach(row => {
            const nameInput = row.querySelector('.field-name-input');
            const typeSelect = row.querySelector('.data-type-select');
            const descInput = row.querySelector('.field-description-input');
            const pkBtn = row.querySelector('.primary-key-btn');
            
            const name = nameInput?.value.trim();
            if (name) {
                fields.push({
                    name: name,
                    dataType: typeSelect?.value || 'Short Text',
                    description: descInput?.value || '',
                    isPrimary: pkBtn?.classList.contains('active') || false,
                    properties: AppState.currentTable.fields.find(f => f.name === name)?.properties || {
                        size: 255,
                        required: false,
                        defaultValue: '',
                        validationRule: ''
                    }
                });
            }
        });
        
        try {
            // Save to LearnerDatabase
            if (LearnerDatabase.getTable(tableName)) {
                LearnerDatabase.updateTable(tableName, fields);
            } else {
                LearnerDatabase.createTable(tableName, fields);
            }
            
            // Update app state
            AppState.currentTable = { name: tableName, fields: fields, selectedFieldIndex: null };
            
            // Save database
            LearnerDatabase.save();
            
            // Observe action for learning engine
            if (typeof LearningEngine !== 'undefined') {
                LearningEngine.observe('table-created', {
                    tableName: tableName,
                    fields: fields
                });
            }
            
            UI.showToast(`✅ Table "${tableName}" saved successfully!`, 'success');
            
            // Update query designer to show new table
            if (typeof QueryDesigner !== 'undefined') {
                QueryDesigner.refreshAvailableTables();
            }
        } catch (error) {
            UI.showToast(`❌ ${error.message}`, 'error');
            
            // Show validation feedback
            if (typeof FeedbackEngine !== 'undefined') {
                FeedbackEngine.displayFeedback({
                    type: 'error',
                    message: error.message,
                    hint: this.getTableErrorHint(error.message)
                });
            }
        }
    },
    
    getTableErrorHint(errorMessage) {
        if (errorMessage.includes('primary key')) {
            return 'Every table needs exactly one primary key. Click the 🔑 icon next to a field to set it as the primary key.';
        }
        if (errorMessage.includes('cannot be used as a primary key')) {
            return 'Primary keys must have unique values. Use AutoNumber, Number, or Short Text instead.';
        }
        if (errorMessage.includes('Duplicate field')) {
            return 'Each field in a table must have a unique name. Check for duplicate field names.';
        }
        if (errorMessage.includes('at least one field')) {
            return 'Tables store data in fields. Add at least one field to your table before saving.';
        }
        return 'Check your table design and try again.';
    },
    
    newTable() {
        AppState.currentTable = { name: 'NewTable', fields: [], selectedFieldIndex: null };
        document.getElementById('currentTableName').value = 'NewTable';
        document.getElementById('fieldDefinitionGrid').innerHTML = '';
        document.getElementById('fieldPropertiesContent').innerHTML = '<div class="no-field-selected">Select a field to view its properties</div>';
        this.addFieldRow();
    },
    
    loadExistingTable(tableName) {
        const table = LearnerDatabase.getTable(tableName);
        if (!table) return;
        
        AppState.currentTable = {
            name: table.name,
            fields: [...table.fields],
            selectedFieldIndex: null
        };
        
        document.getElementById('currentTableName').value = table.name;
        this.renderFields();
    },
    
    renderFields() {
        const grid = document.getElementById('fieldDefinitionGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        AppState.currentTable.fields.forEach((field, index) => {
            const row = this.createFieldRow(field, index);
            grid.appendChild(row);
        });
        
        // Enable drag-to-reorder
        if (typeof FieldReorderManager !== 'undefined') {
            FieldReorderManager.enableReorder(grid);
        }
    },
    
    createFieldRow(field, index) {
        const row = document.createElement('div');
        row.className = 'field-row';
        row.dataset.fieldIndex = index;
        
        row.innerHTML = `
            <div class="field-cell">
                <button class="primary-key-btn ${field.isPrimary ? 'active' : ''}" data-index="${index}">🔑</button>
            </div>
            <div class="field-cell">
                <input type="text" class="field-name-input" value="${field.name}" data-index="${index}">
            </div>
            <div class="field-cell">
                <select class="data-type-select" data-index="${index}">
                    <option ${field.dataType === 'Short Text' ? 'selected' : ''}>Short Text</option>
                    <option ${field.dataType === 'Long Text' ? 'selected' : ''}>Long Text</option>
                    <option ${field.dataType === 'Number' ? 'selected' : ''}>Number</option>
                    <option ${field.dataType === 'Date/Time' ? 'selected' : ''}>Date/Time</option>
                    <option ${field.dataType === 'Currency' ? 'selected' : ''}>Currency</option>
                    <option ${field.dataType === 'AutoNumber' ? 'selected' : ''}>AutoNumber</option>
                    <option ${field.dataType === 'Yes/No' ? 'selected' : ''}>Yes/No</option>
                    <option ${field.dataType === 'Hyperlink' ? 'selected' : ''}>Hyperlink</option>
                </select>
            </div>
            <div class="field-cell">
                <input type="text" class="field-description-input" value="${field.description || ''}" data-index="${index}">
            </div>
        `;
        
        // Event listeners
        row.addEventListener('click', () => this.selectField(index));
        row.querySelector('.primary-key-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePrimaryKey(index);
        });
        
        // Update field data on input
        row.querySelector('.field-name-input').addEventListener('input', (e) => {
            AppState.currentTable.fields[index].name = e.target.value;
        });
        
        row.querySelector('.data-type-select').addEventListener('change', (e) => {
            AppState.currentTable.fields[index].dataType = e.target.value;
        });
        
        row.querySelector('.field-description-input').addEventListener('input', (e) => {
            AppState.currentTable.fields[index].description = e.target.value;
        });
        
        return row;
    },
};

/* ========================================
   RELATIONSHIPS MODULE
   ======================================== */
const RelationshipsDesigner = {
    draggedField: null,
    draggedTable: null,
    
    init() {
        this.setupEventListeners();
        this.loadExistingTables();
    },
    
    setupEventListeners() {
        document.getElementById('addTableToCanvas')?.addEventListener('click', () => this.showTableSelector());
        document.getElementById('clearRelationships')?.addEventListener('click', () => this.clearAll());
    },
    
    showTableSelector() {
        const tables = LearnerDatabase.getAllTables();
        
        if (tables.length === 0) {
            UI.showToast('No tables available. Create tables first in Table Design view.', 'info');
            return;
        }
        
        // Show modal to select tables
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add Tables to Canvas</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <p>Select tables to add to the relationships diagram:</p>
                    <div class="table-checkbox-list">
                        ${tables.map(t => `
                            <label class="table-checkbox-item">
                                <input type="checkbox" value="${t.name}">
                                <span>${t.name}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="RelationshipsDesigner.addSelectedTables(this)">Add Tables</button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    addSelectedTables(button) {
        const modal = button.closest('.modal');
        const checkboxes = modal.querySelectorAll('input[type="checkbox"]:checked');
        const container = document.getElementById('tableBoxesContainer');
        
        checkboxes.forEach((checkbox, index) => {
            const tableName = checkbox.value;
            const existing = container.querySelector(`[data-table="${tableName}"]`);
            
            if (!existing) {
                const table = LearnerDatabase.getTable(tableName);
                const x = 50 + (index * 220);
                const y = 50 + (index * 50);
                const box = this.createTableBox(table, x, y);
                container.appendChild(box);
            }
        });
        
        modal.remove();
        this.redrawRelationshipLines();
    },
    
    loadExistingTables() {
        const container = document.getElementById('tableBoxesContainer');
        if (!container) return;
        
        const tables = LearnerDatabase.getAllTables();
        tables.forEach((table, i) => {
            const x = 50 + (i * 220);
            const y = 50 + (i * 50);
            const box = this.createTableBox(table, x, y);
            container.appendChild(box);
        });
        
        this.redrawRelationshipLines();
    },
    
    createTableBox(table, x, y) {
        const box = document.createElement('div');
        box.className = 'table-box';
        box.dataset.table = table.name;
        box.style.left = x + 'px';
        box.style.top = y + 'px';
        
        box.innerHTML = `
            <div class="table-box-header">${table.name}</div>
            <div class="table-box-fields">
                ${table.fields.map(f => `
                    <div class="table-field-item ${f.isPrimary ? 'primary-key' : ''}" 
                         data-table="${table.name}" 
                         data-field="${f.name}"
                         data-type="${f.dataType}"
                         data-is-primary="${f.isPrimary}">
                        <span class="field-icon">${f.isPrimary ? '🔑' : '📝'}</span>
                        ${f.name} <span class="field-type">(${f.dataType})</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.makeDraggable(box);
        this.setupFieldDragDrop(box);
        
        return box;
    },
    
    makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = element.querySelector('.table-box-header');
        
        header.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + 'px';
            element.style.left = (element.offsetLeft - pos1) + 'px';
            
            // Redraw relationship lines
            RelationshipsDesigner.redrawRelationshipLines();
        }
        
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    },
    
    setupFieldDragDrop(box) {
        const fields = box.querySelectorAll('.table-field-item');
        fields.forEach(field => {
            field.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                this.draggedField = {
                    table: field.dataset.table,
                    field: field.dataset.field,
                    dataType: field.dataset.type,
                    isPrimary: field.dataset.isPrimary === 'true'
                };
                field.classList.add('dragging');
            });
            
            field.addEventListener('mouseup', (e) => {
                e.stopPropagation();
                if (this.draggedField && this.draggedField.table !== field.dataset.table) {
                    this.attemptCreateRelationship(
                        this.draggedField,
                        {
                            table: field.dataset.table,
                            field: field.dataset.field,
                            dataType: field.dataset.type,
                            isPrimary: field.dataset.isPrimary === 'true'
                        }
                    );
                }
                document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
                this.draggedField = null;
            });
        });
    },
    
    attemptCreateRelationship(source, target) {
        try {
            // Create relationship in database
            const relationship = LearnerDatabase.createRelationship(
                source.table,
                source.field,
                target.table,
                target.field,
                { enforceIntegrity: true }
            );
            
            // Save database
            LearnerDatabase.save();
            
            // Show success feedback
            UI.showToast(`✅ Relationship created: ${source.table}.${source.field} → ${target.table}.${target.field}`, 'success');
            
            // Redraw lines
            this.redrawRelationshipLines();
            
            // Observe for learning engine
            if (typeof LearningEngine !== 'undefined') {
                LearningEngine.observe('relationship-created', {
                    sourceTable: source.table,
                    sourceField: source.field,
                    targetTable: target.table,
                    targetField: target.field,
                    enforceIntegrity: true
                });
            }
            
        } catch (error) {
            UI.showToast(`❌ ${error.message}`, 'error');
            
            // Show detailed feedback
            if (typeof FeedbackEngine !== 'undefined') {
                FeedbackEngine.displayFeedback({
                    type: 'error',
                    message: error.message,
                    hint: this.getRelationshipErrorHint(error.message)
                });
            }
        }
    },
    
    getRelationshipErrorHint(errorMessage) {
        if (errorMessage.includes('must be a primary key')) {
            return 'Drag FROM a primary key field (marked with 🔑) TO a foreign key field in another table.';
        }
        if (errorMessage.includes('Data types must match')) {
            return 'Both fields must have the same data type. For example, Number to Number, or AutoNumber to Number.';
        }
        if (errorMessage.includes('already exists')) {
            return 'This relationship is already defined. Delete it first if you want to recreate it.';
        }
        return 'Check the relationship requirements and try again.';
    },
    
    redrawRelationshipLines() {
        const svg = document.getElementById('relationshipsSvg');
        if (!svg) return;
        
        svg.innerHTML = '';
        
        LearnerDatabase.relationships.forEach(rel => {
            const sourceBox = document.querySelector(`[data-table="${rel.sourceTable}"]`);
            const targetBox = document.querySelector(`[data-table="${rel.targetTable}"]`);
            
            if (!sourceBox || !targetBox) return;
            
            const sourceField = sourceBox.querySelector(`[data-field="${rel.sourceField}"]`);
            const targetField = targetBox.querySelector(`[data-field="${rel.targetField}"]`);
            
            if (!sourceField || !targetField) return;
            
            const sourceRect = sourceField.getBoundingClientRect();
            const targetRect = targetField.getBoundingClientRect();
            const canvasRect = svg.getBoundingClientRect();
            
            const x1 = sourceRect.right - canvasRect.left;
            const y1 = sourceRect.top + sourceRect.height / 2 - canvasRect.top;
            const x2 = targetRect.left - canvasRect.left;
            const y2 = targetRect.top + targetRect.height / 2 - canvasRect.top;
            
            // Draw line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const path = `M ${x1} ${y1} L ${x2} ${y2}`;
            line.setAttribute('d', path);
            line.setAttribute('class', 'relationship-line');
            line.setAttribute('stroke', '#DC3545');
            line.setAttribute('stroke-width', '2');
            svg.appendChild(line);
            
            // Draw endpoints (1 and ∞)
            const text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text1.setAttribute('x', x1 - 15);
            text1.setAttribute('y', y1 + 5);
            text1.setAttribute('fill', '#DC3545');
            text1.setAttribute('font-weight', 'bold');
            text1.textContent = '1';
            svg.appendChild(text1);
            
            const textMany = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textMany.setAttribute('x', x2 + 5);
            textMany.setAttribute('y', y2 + 5);
            textMany.setAttribute('fill', '#DC3545');
            textMany.setAttribute('font-weight', 'bold');
            textMany.textContent = '∞';
            svg.appendChild(textMany);
        });
    },
    
    clearAll() {
        if (!confirm('Delete all relationships? This cannot be undone.')) {
            return;
        }
        
        LearnerDatabase.relationships = [];
        LearnerDatabase.save();
        
        document.getElementById('tableBoxesContainer').innerHTML = '';
        document.getElementById('relationshipsSvg').innerHTML = '';
        
        UI.showToast('All relationships cleared', 'info');
    }
};

/* ========================================
   QUERY DESIGN MODULE
   ======================================== */
const QueryDesigner = {
    currentQueryTables: [],
    currentQueryFields: [],
    
    init() {
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        document.getElementById('addTableToQuery')?.addEventListener('click', () => this.showTableSelector());
        document.getElementById('runQueryBtn')?.addEventListener('click', () => this.runQuery());
        document.getElementById('viewSqlBtn')?.addEventListener('click', () => this.toggleSqlView());
        document.getElementById('clearQueryBtn')?.addEventListener('click', () => this.clearQuery());
        
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchView(btn.dataset.view));
        });
    },
    
    showTableSelector() {
        const tables = LearnerDatabase.getAllTables();
        
        if (tables.length === 0) {
            UI.showToast('No tables available. Create tables first in Table Design view.', 'info');
            if (typeof FeedbackEngine !== 'undefined') {
                FeedbackEngine.displayFeedback({
                    type: 'info',
                    message: 'No tables to query',
                    hint: 'You need to create at least one table before you can build queries. Go to the Table Design tab and create a table.'
                });
            }
            return;
        }
        
        // Show modal
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add Tables to Query</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <p>Select tables for your query:</p>
                    <div class="table-checkbox-list">
                        ${tables.map(t => `
                            <label class="table-checkbox-item">
                                <input type="checkbox" value="${t.name}" 
                                    ${this.currentQueryTables.includes(t.name) ? 'checked' : ''}>
                                <span>${t.name}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="QueryDesigner.addSelectedTables(this)">Add Tables</button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    addSelectedTables(button) {
        const modal = button.closest('.modal');
        const checkboxes = modal.querySelectorAll('input[type="checkbox"]:checked');
        const container = document.getElementById('queryTablesArea');
        
        this.currentQueryTables = Array.from(checkboxes).map(cb => cb.value);
        
        container.innerHTML = '';
        
        this.currentQueryTables.forEach((tableName, index) => {
            const table = LearnerDatabase.getTable(tableName);
            const box = this.createQueryTableBox(table, 50 + index * 180, 20);
            container.appendChild(box);
        });
        
        modal.remove();
    },
    
    createQueryTableBox(table, x, y) {
        const box = document.createElement('div');
        box.className = 'query-table-box';
        box.style.left = x + 'px';
        box.style.top = y + 'px';
        
        box.innerHTML = `
            <div class="query-table-header">${table.name}</div>
            <div class="query-table-fields">
                ${table.fields.map(f => `
                    <div class="query-field-item" data-table="${table.name}" data-field="${f.name}" data-type="${f.dataType}">
                        ${f.isPrimary ? '🔑 ' : ''}${f.name}
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add to grid when clicked
        box.querySelectorAll('.query-field-item').forEach(item => {
            item.addEventListener('click', () => {
                this.addFieldToGrid(item.dataset.table, item.dataset.field);
                item.classList.add('selected');
            });
        });
        
        return box;
    },
    
    addFieldToGrid(table, field) {
        // Check if field already added
        if (this.currentQueryFields.some(f => f.table === table && f.field === field)) {
            UI.showToast('Field already added to query', 'warning');
            return;
        }
        
        this.currentQueryFields.push({ table, field });
        
        const grid = document.getElementById('queryGrid');
        const column = document.createElement('div');
        column.className = 'grid-column';
        column.dataset.table = table;
        column.dataset.field = field;
        
        column.innerHTML = `
            <div class="grid-cell"><input type="text" value="${field}" readonly></div>
            <div class="grid-cell"><input type="text" value="${table}" readonly></div>
            <div class="grid-cell">
                <select class="sort-select">
                    <option value=""></option>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
            </div>
            <div class="grid-cell"><input type="checkbox" checked class="show-checkbox"></div>
            <div class="grid-cell"><input type="text" placeholder="Enter criteria" class="criteria-input"></div>
            <div class="grid-cell"><input type="text" placeholder="Or..." class="or-input"></div>
        `;
        
        grid.appendChild(column);
        this.updateSql();
    },
    
    runQuery() {
        try {
            // Build query definition
            const queryDef = this.buildQueryDefinition();
            
            // Execute query
            const result = QueryExecutor.execute(queryDef);
            
            // Display results
            this.displayResults(result);
            
            // Show SQL
            this.updateSql();
            
            // Observe for learning engine
            if (typeof LearningEngine !== 'undefined') {
                LearningEngine.observe('query-executed', {
                    tables: this.currentQueryTables,
                    fields: this.currentQueryFields
                });
            }
            
            UI.showToast(`✅ Query executed: ${result.recordCount} record(s) returned`, 'success');
            
        } catch (error) {
            UI.showToast(`❌ ${error.message}`, 'error');
            
            if (typeof FeedbackEngine !== 'undefined') {
                FeedbackEngine.displayFeedback({
                    type: 'error',
                    message: error.message,
                    hint: this.getQueryErrorHint(error.message)
                });
            }
        }
    },
    
    buildQueryDefinition() {
        const fields = [];
        const criteria = [];
        const sorting = [];
        
        document.querySelectorAll('.grid-column').forEach(column => {
            const field = column.dataset.field;
            const table = column.dataset.table;
            const show = column.querySelector('.show-checkbox').checked;
            
            if (show) {
                fields.push(field);
            }
            
            const criteriaValue = column.querySelector('.criteria-input').value.trim();
            if (criteriaValue) {
                criteria.push({
                    field: field,
                    operator: this.detectOperator(criteriaValue),
                    value: criteriaValue.replace(/[><=]/g, '').trim()
                });
            }
            
            const sortValue = column.querySelector('.sort-select').value;
            if (sortValue) {
                sorting.push({
                    field: field,
                    order: sortValue
                });
            }
        });
        
        return {
            tables: this.currentQueryTables,
            fields: fields,
            criteria: criteria,
            sorting: sorting
        };
    },
    
    detectOperator(value) {
        if (value.startsWith('>=')) return '>=';
        if (value.startsWith('<=')) return '<=';
        if (value.startsWith('>')) return '>';
        if (value.startsWith('<')) return '<';
        if (value.toLowerCase().includes('like')) return 'LIKE';
        return '=';
    },
    
    displayResults(result) {
        const resultsContainer = document.getElementById('queryResults');
        
        if (result.recordCount === 0) {
            resultsContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: #666;">No records found.</p>';
            return;
        }
        
        let html = '<table class="result-table"><thead><tr>';
        
        result.fields.forEach(field => {
            html += `<th>${field}</th>`;
        });
        html += '</tr></thead><tbody>';
        
        result.records.forEach(record => {
            html += '<tr>';
            result.fields.forEach(field => {
                html += `<td>${record[field] !== undefined ? record[field] : ''}</td>`;
            });
            html += '</tr>';
        });
        
        html += '</tbody></table>';
        resultsContainer.innerHTML = html;
    },
    
    updateSql() {
        const sqlTextarea = document.getElementById('sqlTextarea');
        if (!sqlTextarea) return;
        
        const queryDef = this.buildQueryDefinition();
        const sql = QueryExecutor.generateSQL(queryDef);
        sqlTextarea.value = sql;
        
        // Show SQL guide
        const guide = document.getElementById('sqlGuide');
        if (guide) {
            guide.innerHTML = `
                <h4>SQL Explanation:</h4>
                <p><strong>SELECT</strong> - Specifies which fields to retrieve</p>
                <p><strong>FROM</strong> - Specifies which table(s) to query</p>
                ${queryDef.criteria.length > 0 ? '<p><strong>WHERE</strong> - Filters records based on conditions</p>' : ''}
                ${queryDef.sorting.length > 0 ? '<p><strong>ORDER BY</strong> - Sorts results in ascending or descending order</p>' : ''}
            `;
        }
    },
    
    getQueryErrorHint(errorMessage) {
        if (errorMessage.includes('does not exist')) {
            return 'The table you\'re trying to query hasn\'t been created yet. Go to Table Design and create it first.';
        }
        if (errorMessage.includes('not related')) {
            return 'When querying multiple tables, they must be related. Go to the Relationships view and create a relationship between these tables.';
        }
        if (errorMessage.includes('at least one table')) {
            return 'Click "Add Table" to select which tables to include in your query.';
        }
        return 'Check your query design and try again.';
    },
    
    switchView(view) {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        document.querySelectorAll('.query-view').forEach(v => v.classList.remove('active'));
        document.querySelector(`[data-query-view="${view}"]`).classList.add('active');
        
        if (view === 'sql') {
            this.updateSql();
        }
    },
    
    toggleSqlView() {
        const currentView = document.querySelector('.view-btn.active').dataset.view;
        this.switchView(currentView === 'design' ? 'sql' : 'design');
    },
    
    clearQuery() {
        this.currentQueryTables = [];
        this.currentQueryFields = [];
        document.getElementById('queryGrid').innerHTML = '';
        document.getElementById('queryResults').innerHTML = '';
        document.getElementById('queryTablesArea').innerHTML = '<div class="add-table-prompt"><button class="btn btn-add" id="addTableToQuery">➕ Add Table</button></div>';
        document.querySelectorAll('.query-field-item').forEach(item => item.classList.remove('selected'));
        
        // Re-attach event listener
        document.getElementById('addTableToQuery')?.addEventListener('click', () => this.showTableSelector());
    },
    
    refreshAvailableTables() {
        // Called when new tables are created
        if (this.currentQueryTables.length > 0) {
            // Refresh if query is active
            this.addSelectedTables({ closest: () => ({ remove: () => {} }) });
        }
    }
};

/* ========================================
   UI CONTROLLER
   ======================================== */
const UI = {
    async init() {
        await this.loadLanguage(AppState.currentLanguage);
        this.setupEventListeners();
        this.renderLanguageSelector();
        this.renderLessonNavigation();
        this.translatePage();
        this.updateProgress();
        
        // Initialize modules
        TableDesigner.init();
        RelationshipsDesigner.init();
        QueryDesigner.init();
    },
    
    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.ribbon-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
        
        // Language dropdown
        document.getElementById('langDropdownBtn')?.addEventListener('click', () => {
            document.getElementById('langDropdownMenu').classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-selector')) {
                document.getElementById('langDropdownMenu')?.classList.remove('show');
            }
        });
        
        // Sidebar toggle
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebarExpandBtn = document.getElementById('sidebarExpandBtn');
        
        sidebarToggle?.addEventListener('click', () => {
            sidebar?.classList.add('collapsed');
        });
        
        sidebarExpandBtn?.addEventListener('click', () => {
            sidebar?.classList.remove('collapsed');
        });
        
        // Modal close buttons
        document.querySelectorAll('.modal-close, #cancelRelBtn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal').forEach(m => m.classList.remove('show'));
            });
        });
        
        document.getElementById('createRelationshipBtn')?.addEventListener('click', () => {
            const sourceTable = document.getElementById('relSourceTableName')?.textContent;
            const targetTable = document.getElementById('relTargetTableName')?.textContent;
            const sourceField = document.getElementById('relSourceField')?.value;
            const targetField = document.getElementById('relTargetField')?.value;
            
            // Observe action for learning engine
            if (typeof LearningEngine !== 'undefined') {
                LearningEngine.observe('relationship-created', {
                    sourceTable,
                    targetTable,
                    sourceField,
                    targetField,
                    enforceIntegrity: document.getElementById('enforceIntegrity')?.checked
                });
            }
            
            UI.showToast('Relationship created successfully!', 'success');
            document.getElementById('relationshipModal').classList.remove('show');
        });
    },
    
    async loadLanguage(lang) {
        await Languages.loadTranslations(lang);
    },
    
    renderLanguageSelector() {
        const container = document.getElementById('langOptions');
        if (!container) return;
        
        Object.values(Languages.available).forEach(lang => {
            if (!lang.enabled) return;
            
            const option = document.createElement('div');
            option.className = 'lang-option';
            if (lang.code === AppState.currentLanguage) {
                option.classList.add('active');
            }
            
            option.innerHTML = `
                <span class="lang-flag">${lang.flag}</span>
                <span>${lang.nativeName}</span>
            `;
            
            option.addEventListener('click', async () => {
                AppState.currentLanguage = lang.code;
                AppState.save();
                await this.loadLanguage(lang.code);
                this.translatePage();
                document.getElementById('currentLangCode').textContent = lang.code.toUpperCase();
                document.getElementById('langDropdownMenu').classList.remove('show');
                
                // Re-render current content
                if (AppState.currentLesson) {
                    this.loadLesson(AppState.currentLesson);
                }
            });
            
            container.appendChild(option);
        });
    },
    
    renderLessonNavigation() {
        const nav = document.getElementById('lessonNavigation');
        if (!nav) return;
        
        const lang = AppState.currentLanguage;
        
        LessonSystem.categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'lesson-category';
            
            const lessons = LessonSystem.lessons.filter(l => l.category === category.id);
            if (lessons.length === 0) return;
            
            categoryDiv.innerHTML = `
                <div class="category-header">
                    <span class="category-icon">${category.icon}</span>
                    <span class="category-title">${category.title[lang]}</span>
                    <span class="category-toggle">▼</span>
                </div>
                <ul class="lesson-list"></ul>
            `;
            
            const list = categoryDiv.querySelector('.lesson-list');
            lessons.forEach(lesson => {
                const item = document.createElement('li');
                item.className = 'lesson-item';
                item.dataset.lesson = lesson.id;
                
                if (AppState.completedLessons.includes(lesson.id)) {
                    item.classList.add('completed');
                }
                
                item.innerHTML = `
                    <span>${lesson.title[lang]}</span>
                    <span class="lesson-status"></span>
                `;
                
                item.addEventListener('click', () => {
                    this.loadLesson(lesson.id);
                    document.querySelectorAll('.lesson-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                });
                
                list.appendChild(item);
            });
            
            // Category collapse toggle
            categoryDiv.querySelector('.category-header').addEventListener('click', () => {
                categoryDiv.classList.toggle('collapsed');
            });
            
            nav.appendChild(categoryDiv);
        });
        
        // Load first lesson
        if (LessonSystem.lessons.length > 0) {
            this.loadLesson(LessonSystem.lessons[0].id);
        }
    },
    
    loadLesson(lessonId) {
        AppState.currentLesson = lessonId;
        const lesson = LessonSystem.lessons.find(l => l.id === lessonId);
        if (!lesson) return;
        
        // Set lesson in learning engine
        if (typeof LearningEngine !== 'undefined') {
            LearningEngine.setLesson(lessonId);
        }
        
        const container = document.getElementById('lessonContent');
        if (!container) return;
        
        container.innerHTML = LessonSystem.renderLesson(lessonId);
        
        // Add hint button if lesson has hints
        if (lesson.hints && lesson.hints.length > 0) {
            const hintBtn = document.createElement('button');
            hintBtn.className = 'btn btn-secondary hint-request-btn';
            hintBtn.innerHTML = '💡 Need a Hint?';
            hintBtn.onclick = () => {
                if (typeof HintEngine !== 'undefined') {
                    HintEngine.showHint(lessonId);
                }
            };
            container.appendChild(hintBtn);
        }
        
        // Add guided practice button if lesson has guided steps
        if (lesson.guidedSteps && lesson.guidedSteps.length > 0) {
            const guideBtn = document.createElement('button');
            guideBtn.className = 'btn btn-primary guided-practice-btn';
            guideBtn.innerHTML = '🎯 Start Guided Practice';
            guideBtn.onclick = () => {
                if (typeof LearningEngine !== 'undefined') {
                    LearningEngine.enableGuidedMode();
                }
            };
            container.appendChild(guideBtn);
        }
    },
    
    switchTab(tabName) {
        AppState.currentTab = tabName;
        
        // Update ribbon tabs
        document.querySelectorAll('.ribbon-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.dataset.tabContent === tabName);
        });
    },
    
    translatePage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const translation = Languages.translate(key);
            if (translation !== key) {
                if (el.tagName === 'INPUT' && el.placeholder) {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
    },
    
    updateProgress() {
        const total = LessonSystem.lessons.length;
        const completed = AppState.completedLessons.length;
        const percentage = total > 0 ? (completed / total) * 100 : 0;
        
        document.getElementById('progressFill').style.width = percentage + '%';
        document.getElementById('progress-count').textContent = `${completed}/${total}`;
        
        // Update lesson items
        document.querySelectorAll('.lesson-item').forEach(item => {
            const lessonId = item.dataset.lesson;
            if (AppState.completedLessons.includes(lessonId)) {
                item.classList.add('completed');
            }
        });
    },
    
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },
    
    showTooltip(element, message) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = message;
        tooltip.classList.add('show');
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 5) + 'px';
    },
    
    hideTooltip() {
        document.getElementById('tooltip')?.classList.remove('show');
    }
};

/* ========================================
   APPLICATION INITIALIZATION
   ======================================== */
document.addEventListener('DOMContentLoaded', async () => {
    AppState.init();
    await UI.init();
    
    console.log('🎓 Microsoft Access Learning Simulator loaded successfully!');
});

