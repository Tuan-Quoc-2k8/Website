/* ========================================
   Centralized Internationalization
   All UI messages, errors, and hints
   ======================================== */

'use strict';

const I18N = {
    currentLanguage: 'en',
    
    messages: {
        en: {
            // Application
            app: {
                title: 'Microsoft Access Learning Simulator'
            },
            
            // Navigation Tabs
            tabs: {
                lessons: 'Lessons',
                tableDesign: 'Table Design',
                relationships: 'Relationships',
                queryDesign: 'Query Design'
            },
            
            // Table Management
            tableManagement: {
                title: 'Tables',
                noTables: 'No tables yet. Create your first table!',
                newTable: 'New Table',
                openDesign: 'Open in Design View',
                openData: 'Open in Data View',
                rename: 'Rename Table',
                delete: 'Delete Table',
                confirmDelete: 'Are you sure you want to delete table "{tableName}"? This cannot be undone.',
                renamePrompt: 'Enter new name for table "{oldName}":',
                contextMenu: 'Right-click for options'
            },
            
            // Table Design
            tableDesign: {
                tableName: 'Table Name',
                fieldName: 'Field Name',
                dataType: 'Data Type',
                description: 'Description',
                primaryKey: 'Primary Key',
                designView: 'Design View',
                dataView: 'Data View',
                enterData: 'Enter sample data to test your queries'
            },
            
            // Field Properties
            fieldProperties: {
                general: 'General',
                lookup: 'Lookup',
                noSelection: 'Select a field to view its properties',
                fieldSize: 'Field Size',
                required: 'Required',
                defaultValue: 'Default Value',
                validationRule: 'Validation Rule',
                validationText: 'Validation Text'
            },
            
            // Relationships
            relationships: {
                title: 'Relationships',
                addTable: 'Add Tables',
                clear: 'Clear All',
                showAll: 'Show All Tables',
                createRelationship: 'Edit Relationships',
                sourceTable: 'Table/Query',
                sourceField: 'Related Field',
                targetTable: 'Related Table/Query',
                targetField: 'Related Field',
                relationshipType: 'Relationship Type',
                options: 'Relationship Options',
                enforceIntegrity: 'Enforce Referential Integrity',
                cascadeUpdate: 'Cascade Update Related Fields',
                cascadeDelete: 'Cascade Delete Related Records',
                oneToMany: 'One-To-Many',
                oneToOne: 'One-To-One',
                dragInstruction: 'Drag a field from one table to another to create a relationship'
            },
            
            // Query Design
            queryDesign: {
                title: 'Query Design',
                addTable: 'Show Table',
                run: 'Run',
                viewSql: 'SQL View',
                viewDesign: 'Design View',
                clear: 'Clear Query',
                field: 'Field',
                table: 'Table',
                sort: 'Sort',
                show: 'Show',
                criteria: 'Criteria',
                or: 'or',
                ascending: 'Ascending',
                descending: 'Descending',
                notSorted: '(not sorted)',
                sqlExplanation: 'SQL code generated from your query design:',
                noResults: 'No records match your criteria',
                recordCount: '{count} record(s) returned'
            },
            
            // Lessons
            lessons: {
                title: 'Learning Path',
                nextLesson: 'Next Lesson',
                guideMe: 'Guide Me',
                tryAgain: 'Try Again',
                checkProgress: 'Check My Work',
                completed: 'Completed',
                locked: 'Complete previous lessons first',
                requirement: 'Complete this task to continue',
                hint: 'Hint',
                showHint: 'Show Hint',
                hideHint: 'Hide Hint'
            },
            
            // Actions
            actions: {
                save: 'Save',
                saveClose: 'Save & Close',
                cancel: 'Cancel',
                create: 'Create',
                delete: 'Delete',
                edit: 'Edit',
                close: 'Close',
                ok: 'OK',
                yes: 'Yes',
                no: 'No',
                apply: 'Apply',
                reset: 'Reset',
                undo: 'Undo',
                new: 'New'
            },
            
            // Validation Errors
            errors: {
                // Table errors
                tableNameRequired: 'Table name is required',
                tableNameInvalid: 'Table name must start with a letter and contain only letters, numbers, and underscores',
                tableExists: 'A table named "{name}" already exists',
                tableNotFound: 'Table "{name}" not found',
                noFields: 'Table must have at least one field',
                noPrimaryKey: 'Every table must have a primary key',
                multiplePrimaryKeys: 'Table can only have one primary key',
                primaryKeyInvalidType: '{type} cannot be used as a primary key',
                duplicateFieldName: 'Duplicate field name: "{name}"',
                fieldNameRequired: 'All fields must have names',
                fieldNameInvalid: 'Field name "{name}" is invalid',
                tableInUse: 'Cannot delete table "{name}" because it has relationships',
                
                // Relationship errors
                relationshipExists: 'This relationship already exists',
                sourceNotPrimaryKey: 'Source field "{field}" must be a primary key',
                dataTypeMismatch: 'Data types must match. "{source}" is {sourceType} but "{target}" is {targetType}',
                selfReference: 'Cannot create a relationship from a table to itself',
                tablesNotFound: 'One or both tables not found',
                fieldsNotFound: 'One or both fields not found',
                
                // Query errors
                noTablesSelected: 'Add at least one table to your query',
                tableNotExists: 'Table "{name}" does not exist. Create it first in Table Design.',
                tablesNotRelated: 'Tables {tables} are not related. Create relationships first.',
                noFieldsSelected: 'Select at least one field for your query',
                invalidCriteria: 'Invalid criteria: {criteria}',
                
                // Data validation errors
                requiredField: '{field} is required',
                invalidDataType: 'Invalid value for {type} field',
                duplicatePrimaryKey: 'Duplicate value in primary key field',
                foreignKeyViolation: 'Value does not exist in related table'
            },
            
            // Hints
            hints: {
                // Table design
                tableName: 'Choose a descriptive name for your table (e.g., Students, Products, Orders)',
                primaryKey: 'Click the 🔑 icon to set a field as the primary key. Every table needs one!',
                dataType: 'Choose the data type that matches your data. Use AutoNumber for IDs.',
                required: 'Set Required to Yes if this field must always have a value',
                
                // Relationships
                dragField: 'Drag FROM a primary key field (🔑) TO a foreign key field in another table',
                enforceIntegrity: 'Enforce Referential Integrity prevents orphaned records',
                cascadeUpdate: 'Cascade Update automatically updates related records when the primary key changes',
                
                // Query design
                addTables: 'Add the tables you want to query. For multiple tables, they must be related.',
                selectFields: 'Double-click fields to add them to your query, or drag them to the grid',
                setCriteria: 'Enter criteria to filter results (e.g., >100, "Smith", Like "A*")',
                
                // General
                saveFirst: 'Save your table before creating relationships or queries',
                createRelationshipsFirst: 'Create relationships before querying multiple tables',
                enterData: 'Enter sample data to see realistic query results'
            },
            
            // Success Messages
            success: {
                tableSaved: 'Table "{name}" saved successfully',
                tableCreated: 'Table "{name}" created',
                tableUpdated: 'Table "{name}" updated',
                tableDeleted: 'Table "{name}" deleted',
                tableRenamed: 'Table renamed to "{name}"',
                relationshipCreated: 'Relationship created: {source}.{sourceField} → {target}.{targetField}',
                relationshipDeleted: 'Relationship deleted',
                queryExecuted: 'Query executed successfully',
                dataSaved: 'Data saved',
                lessonCompleted: 'Lesson completed! Great work!'
            },
            
            // Info Messages
            info: {
                noTablesToAdd: 'No tables available. Create tables in Table Design first.',
                noDataEntered: 'No data entered. Query will use sample data.',
                sampleDataGenerated: 'Sample data generated for demonstration',
                guidedModeActive: 'Guided practice mode active. Follow the highlighted steps.',
                nextStepUnlocked: 'Next step unlocked!'
            },
            
            // Data Types (for tooltips)
            dataTypes: {
                'Short Text': 'Up to 255 characters - Use for names, codes, etc.',
                'Long Text': 'Large amounts of text - Use for notes, descriptions',
                'Number': 'Numeric values - Use for quantities, ages, etc.',
                'Date/Time': 'Dates and times - Use for birthdates, deadlines',
                'Currency': 'Monetary values - Automatically formatted with currency symbol',
                'AutoNumber': 'Automatically incremented unique numbers - Perfect for IDs',
                'Yes/No': 'Boolean true/false values - Use for flags, status',
                'Hyperlink': 'Web addresses or file paths'
            }
        },
        
        vi: {
            // Application
            app: {
                title: 'Mô Phỏng Microsoft Access'
            },
            
            // Navigation Tabs
            tabs: {
                lessons: 'Bài Học',
                tableDesign: 'Thiết Kế Bảng',
                relationships: 'Quan Hệ',
                queryDesign: 'Thiết Kế Truy Vấn'
            },
            
            // Table Management
            tableManagement: {
                title: 'Bảng',
                noTables: 'Chưa có bảng nào. Tạo bảng đầu tiên!',
                newTable: 'Bảng Mới',
                openDesign: 'Mở Chế Độ Thiết Kế',
                openData: 'Mở Chế Độ Dữ Liệu',
                rename: 'Đổi Tên Bảng',
                delete: 'Xóa Bảng',
                confirmDelete: 'Bạn có chắc muốn xóa bảng "{tableName}"? Hành động này không thể hoàn tác.',
                renamePrompt: 'Nhập tên mới cho bảng "{oldName}":',
                contextMenu: 'Nhấp chuột phải để xem tùy chọn'
            },
            
            // Table Design
            tableDesign: {
                tableName: 'Tên Bảng',
                fieldName: 'Tên Trường',
                dataType: 'Kiểu Dữ Liệu',
                description: 'Mô Tả',
                primaryKey: 'Khóa Chính',
                designView: 'Chế Độ Thiết Kế',
                dataView: 'Chế Độ Dữ Liệu',
                enterData: 'Nhập dữ liệu mẫu để kiểm tra truy vấn'
            },
            
            // Field Properties
            fieldProperties: {
                general: 'Chung',
                lookup: 'Tra Cứu',
                noSelection: 'Chọn trường để xem thuộc tính',
                fieldSize: 'Kích Thước Trường',
                required: 'Bắt Buộc',
                defaultValue: 'Giá Trị Mặc Định',
                validationRule: 'Quy Tắc Xác Thực',
                validationText: 'Văn Bản Xác Thực'
            },
            
            // Continue with Vietnamese translations...
            // (abbreviated for space - would include all messages)
            
            errors: {
                tableNameRequired: 'Tên bảng là bắt buộc',
                noPrimaryKey: 'Mỗi bảng phải có khóa chính',
                // ... etc
            }
        }
    },
    
    // Get translated message
    t(key, replacements = {}) {
        const keys = key.split('.');
        let message = this.messages[this.currentLanguage];
        
        // Traverse the key path
        for (const k of keys) {
            message = message?.[k];
            if (!message) break;
        }
        
        // Fallback to English if not found
        if (!message) {
            message = this.messages.en;
            for (const k of keys) {
                message = message?.[k];
                if (!message) break;
            }
        }
        
        // Still not found? Return the key itself
        if (!message) {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }
        
        // Replace placeholders
        if (typeof message === 'string' && Object.keys(replacements).length > 0) {
            Object.keys(replacements).forEach(placeholder => {
                message = message.replace(new RegExp(`{${placeholder}}`, 'g'), replacements[placeholder]);
            });
        }
        
        return message;
    },
    
    // Set language
    setLanguage(lang) {
        if (this.messages[lang]) {
            this.currentLanguage = lang;
            return true;
        }
        return false;
    },
    
    // Get available languages
    getAvailableLanguages() {
        return Object.keys(this.messages);
    }
};

// Export for use
if (typeof window !== 'undefined') {
    window.I18N = I18N;
}