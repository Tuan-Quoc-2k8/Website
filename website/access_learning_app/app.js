/* ========================================
   Microsoft Access Learning Simulator
   Main JavaScript Application
   ======================================== */

'use strict';

/* ========================================
   A. APPLICATION STATE
   ======================================== */
const AppState = {
    currentLanguage: 'en',
    currentLesson: 'intro-1',
    completedLessons: [],
    currentTab: 'lessons',
    
    // Initialize state from localStorage
    init() {
        const saved = localStorage.getItem('accessLearningProgress');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.completedLessons = data.completedLessons || [];
                this.currentLanguage = data.currentLanguage || 'en';
            } catch (e) {
                console.error('Failed to load saved progress:', e);
            }
        }
    },
    
    // Save state to localStorage
    save() {
        const data = {
            completedLessons: this.completedLessons,
            currentLanguage: this.currentLanguage
        };
        localStorage.setItem('accessLearningProgress', JSON.stringify(data));
    },
    
    // Mark lesson as complete
    completeLesson(lessonId) {
        if (!this.completedLessons.includes(lessonId)) {
            this.completedLessons.push(lessonId);
            this.save();
            UI.updateProgress();
            UI.updateCompletedUI();
        }
    }
};

/* ========================================
   B. TRANSLATION DATA (MULTILINGUAL)
   ======================================== */
const Translations = {
    en: {
        app: {
            title: "Microsoft Access Learning Simulator"
        },
        tabs: {
            lessons: "Lessons",
            tables: "Tables",
            queries: "Queries",
            relationships: "Relationships"
        },
        progress: {
            label: "Progress:"
        },
        category: {
            intro: "Introduction",
            tables: "Tables & Data",
            queries: "Queries",
            relationships: "Relationships",
            forms: "Forms & Reports"
        },
        lesson: {
            intro1: "What is Microsoft Access?",
            intro2: "Database Fundamentals",
            intro3: "Relational Database Concepts",
            table1: "Creating Your First Table",
            table2: "Understanding Data Types",
            table3: "Primary Keys Explained",
            table4: "Field Properties",
            query1: "Introduction to Queries",
            query2: "SELECT Statements",
            query3: "WHERE Clause Filtering",
            query4: "Sorting with ORDER BY",
            rel1: "Table Relationships",
            rel2: "Foreign Keys",
            rel3: "One-to-Many Relationships",
            form1: "Introduction to Forms",
            report1: "Basic Reports"
        },
        buttons: {
            validate: "Validate Task",
            execute: "Execute Query",
            addField: "Add Field",
            next: "Next Lesson",
            clear: "Clear",
            createRelationship: "Create Relationship"
        },
        messages: {
            tableName: "Table Name:",
            enterTableName: "Enter table name",
            fieldName: "Field Name",
            dataType: "Data Type",
            primaryKey: "Primary Key",
            required: "Required",
            actions: "Actions",
            queryPlaceholder: "Enter your SQL query here...",
            sourceTable: "Source Table",
            targetTable: "Target Table",
            selectTable: "Select a table"
        }
    },
    vi: {
        app: {
            title: "Chương Trình Học Microsoft Access"
        },
        tabs: {
            lessons: "Bài Học",
            tables: "Bảng",
            queries: "Truy Vấn",
            relationships: "Quan Hệ"
        },
        progress: {
            label: "Tiến Độ:"
        },
        category: {
            intro: "Giới Thiệu",
            tables: "Bảng & Dữ Liệu",
            queries: "Truy Vấn",
            relationships: "Quan Hệ",
            forms: "Biểu Mẫu & Báo Cáo"
        },
        lesson: {
            intro1: "Microsoft Access Là Gì?",
            intro2: "Cơ Bản Về Cơ Sở Dữ Liệu",
            intro3: "Khái Niệm Cơ Sở Dữ Liệu Quan Hệ",
            table1: "Tạo Bảng Đầu Tiên",
            table2: "Hiểu Về Kiểu Dữ Liệu",
            table3: "Giải Thích Khóa Chính",
            table4: "Thuộc Tính Trường",
            query1: "Giới Thiệu Truy Vấn",
            query2: "Câu Lệnh SELECT",
            query3: "Lọc Với Mệnh Đề WHERE",
            query4: "Sắp Xếp Với ORDER BY",
            rel1: "Quan Hệ Giữa Các Bảng",
            rel2: "Khóa Ngoại",
            rel3: "Quan Hệ Một-Nhiều",
            form1: "Giới Thiệu Biểu Mẫu",
            report1: "Báo Cáo Cơ Bản"
        },
        buttons: {
            validate: "Kiểm Tra",
            execute: "Thực Thi",
            addField: "Thêm Trường",
            next: "Bài Tiếp Theo",
            clear: "Xóa",
            createRelationship: "Tạo Quan Hệ"
        },
        messages: {
            tableName: "Tên Bảng:",
            enterTableName: "Nhập tên bảng",
            fieldName: "Tên Trường",
            dataType: "Kiểu Dữ Liệu",
            primaryKey: "Khóa Chính",
            required: "Bắt Buộc",
            actions: "Thao Tác",
            queryPlaceholder: "Nhập truy vấn SQL của bạn tại đây...",
            sourceTable: "Bảng Nguồn",
            targetTable: "Bảng Đích",
            selectTable: "Chọn bảng"
        }
    }
};

/* ========================================
   C. SIMULATED DATABASE MODEL
   ======================================== */
const Database = {
    tables: {
        Students: {
            name: 'Students',
            fields: [
                { name: 'StudentID', type: 'AutoNumber', isPrimaryKey: true, isRequired: true, foreignKey: null },
                { name: 'FirstName', type: 'Short Text', isPrimaryKey: false, isRequired: true, foreignKey: null },
                { name: 'LastName', type: 'Short Text', isPrimaryKey: false, isRequired: true, foreignKey: null },
                { name: 'Email', type: 'Short Text', isPrimaryKey: false, isRequired: false, foreignKey: null }
            ],
            records: [
                { StudentID: 1, FirstName: 'John', LastName: 'Doe', Email: 'john@example.com' },
                { StudentID: 2, FirstName: 'Jane', LastName: 'Smith', Email: 'jane@example.com' },
                { StudentID: 3, FirstName: 'Mike', LastName: 'Johnson', Email: 'mike@example.com' }
            ]
        },
        Products: {
            name: 'Products',
            fields: [
                { name: 'ProductID', type: 'AutoNumber', isPrimaryKey: true, isRequired: true, foreignKey: null },
                { name: 'ProductName', type: 'Short Text', isPrimaryKey: false, isRequired: true, foreignKey: null },
                { name: 'Price', type: 'Currency', isPrimaryKey: false, isRequired: true, foreignKey: null },
                { name: 'Stock', type: 'Number', isPrimaryKey: false, isRequired: false, foreignKey: null }
            ],
            records: [
                { ProductID: 1, ProductName: 'Laptop', Price: 999, Stock: 15 },
                { ProductID: 2, ProductName: 'Mouse', Price: 25, Stock: 50 },
                { ProductID: 3, ProductName: 'Keyboard', Price: 75, Stock: 30 },
                { ProductID: 4, ProductName: 'Monitor', Price: 350, Stock: 12 }
            ]
        },
        Orders: {
            name: 'Orders',
            fields: [
                { name: 'OrderID', type: 'AutoNumber', isPrimaryKey: true, isRequired: true, foreignKey: null },
                { name: 'StudentID', type: 'Number', isPrimaryKey: false, isRequired: true, foreignKey: 'Students.StudentID' },
                { name: 'OrderDate', type: 'Date/Time', isPrimaryKey: false, isRequired: true, foreignKey: null },
                { name: 'TotalAmount', type: 'Currency', isPrimaryKey: false, isRequired: false, foreignKey: null }
            ],
            records: [
                { OrderID: 1, StudentID: 1, OrderDate: '2024-01-15', TotalAmount: 999 },
                { OrderID: 2, StudentID: 2, OrderDate: '2024-01-16', TotalAmount: 100 }
            ]
        }
    },
    
    relationships: [
        {
            sourceTable: 'Students',
            sourceField: 'StudentID',
            targetTable: 'Orders',
            targetField: 'StudentID',
            type: 'one-to-many'
        }
    ],
    
    // Get table by name
    getTable(tableName) {
        return this.tables[tableName] || null;
    },
    
    // Validate table structure
    validateTable(tableName, fields) {
        if (!tableName || tableName.trim() === '') {
            return { valid: false, message: 'Table name is required' };
        }
        
        if (fields.length === 0) {
            return { valid: false, message: 'At least one field is required' };
        }
        
        const hasPrimaryKey = fields.some(f => f.isPrimaryKey);
        if (!hasPrimaryKey) {
            return { valid: false, message: 'A primary key must be defined' };
        }
        
        const emptyFields = fields.filter(f => !f.name || f.name.trim() === '');
        if (emptyFields.length > 0) {
            return { valid: false, message: 'All fields must have names' };
        }
        
        return { valid: true, message: 'Table structure is valid' };
    },
    
    // Validate relationship
    validateRelationship(source, target, sourceField, targetField) {
        const sourceTable = this.getTable(source);
        const targetTable = this.getTable(target);
        
        if (!sourceTable || !targetTable) {
            return { valid: false, message: 'Both tables must exist' };
        }
        
        const sourceFld = sourceTable.fields.find(f => f.name === sourceField);
        const targetFld = targetTable.fields.find(f => f.name === targetField);
        
        if (!sourceFld || !targetFld) {
            return { valid: false, message: 'Both fields must exist' };
        }
        
        if (!sourceFld.isPrimaryKey) {
            return { valid: false, message: 'Source field must be a primary key' };
        }
        
        if (sourceFld.type !== targetFld.type) {
            return { valid: false, message: 'Field types must match' };
        }
        
        return { valid: true, message: 'Relationship is valid' };
    }
};

/* ========================================
   D. LESSON CONTENT DATA
   ======================================== */
const Lessons = {
    'intro-1': {
        en: {
            title: "What is Microsoft Access?",
            content: "Microsoft Access is a database management system (DBMS) developed by Microsoft. It combines the relational Microsoft Jet Database Engine with a graphical user interface and software development tools. Access stores data in its own format based on the Access Jet Database Engine. It can also import or link directly to data stored in other applications and databases.",
            task: "Read and understand the basic concept of Microsoft Access. Click 'Next Lesson' when ready to continue.",
            type: 'info',
            educationalNote: "In Microsoft Access, you can create databases to store and manage information efficiently. Unlike spreadsheets, databases are designed to handle large amounts of structured data and complex relationships between different types of information."
        },
        vi: {
            title: "Microsoft Access Là Gì?",
            content: "Microsoft Access là hệ quản trị cơ sở dữ liệu (DBMS) được phát triển bởi Microsoft. Nó kết hợp công cụ cơ sở dữ liệu quan hệ Microsoft Jet với giao diện đồ họa và công cụ phát triển phần mềm. Access lưu trữ dữ liệu theo định dạng riêng dựa trên Access Jet Database Engine. Nó cũng có thể nhập hoặc liên kết trực tiếp với dữ liệu được lưu trữ trong các ứng dụng và cơ sở dữ liệu khác.",
            task: "Đọc và hiểu khái niệm cơ bản về Microsoft Access. Nhấn 'Bài Tiếp Theo' khi sẵn sàng tiếp tục.",
            type: 'info',
            educationalNote: "Trong Microsoft Access, bạn có thể tạo cơ sở dữ liệu để lưu trữ và quản lý thông tin hiệu quả. Không giống như bảng tính, cơ sở dữ liệu được thiết kế để xử lý lượng lớn dữ liệu có cấu trúc và mối quan hệ phức tạp giữa các loại thông tin khác nhau."
        }
    },
    
    'intro-2': {
        en: {
            title: "Database Fundamentals",
            content: "A database is an organized collection of structured information or data. Key concepts include: Tables (store data in rows and columns), Fields (columns that define the type of data), Records (rows containing actual data), Primary Keys (unique identifiers for each record), and Relationships (connections between tables).",
            task: "Understand these five fundamental database concepts before proceeding to hands-on practice.",
            type: 'info',
            educationalNote: "In Microsoft Access, a well-designed database separates information into subject-based tables to reduce data redundancy. You then use table relationships to bring the information together as needed."
        },
        vi: {
            title: "Cơ Bản Về Cơ Sở Dữ Liệu",
            content: "Cơ sở dữ liệu là tập hợp có tổ chức các thông tin hoặc dữ liệu có cấu trúc. Các khái niệm chính bao gồm: Bảng (lưu trữ dữ liệu theo hàng và cột), Trường (cột xác định loại dữ liệu), Bản ghi (hàng chứa dữ liệu thực tế), Khóa chính (định danh duy nhất cho mỗi bản ghi), và Quan hệ (kết nối giữa các bảng).",
            task: "Hiểu năm khái niệm cơ bản về cơ sở dữ liệu này trước khi tiến hành thực hành.",
            type: 'info',
            educationalNote: "Trong Microsoft Access, một cơ sở dữ liệu được thiết kế tốt sẽ phân tách thông tin thành các bảng theo chủ đề để giảm sự trùng lặp dữ liệu. Sau đó, bạn sử dụng mối quan hệ giữa các bảng để kết hợp thông tin khi cần thiết."
        }
    },
    
    'intro-3': {
        en: {
            title: "Relational Database Concepts",
            content: "A relational database organizes data into tables that can be linked—or related—based on data common to each. This structure allows you to store data efficiently and retrieve it accurately. The relational model was introduced by E.F. Codd in 1970 and has become the standard for database management.",
            task: "Learn about how tables relate to each other through common fields.",
            type: 'info',
            educationalNote: "In Microsoft Access, relationships are established between tables using matching fields. For example, a Customers table and an Orders table can be related through a CustomerID field."
        },
        vi: {
            title: "Khái Niệm Cơ Sở Dữ Liệu Quan Hệ",
            content: "Cơ sở dữ liệu quan hệ tổ chức dữ liệu thành các bảng có thể được liên kết—hoặc có quan hệ—dựa trên dữ liệu chung cho mỗi bảng. Cấu trúc này cho phép bạn lưu trữ dữ liệu hiệu quả và truy xuất nó một cách chính xác. Mô hình quan hệ được giới thiệu bởi E.F. Codd vào năm 1970 và đã trở thành tiêu chuẩn cho quản lý cơ sở dữ liệu.",
            task: "Tìm hiểu về cách các bảng liên quan với nhau thông qua các trường chung.",
            type: 'info',
            educationalNote: "Trong Microsoft Access, mối quan hệ được thiết lập giữa các bảng bằng cách sử dụng các trường khớp. Ví dụ, bảng Customers và bảng Orders có thể được liên kết thông qua trường CustomerID."
        }
    },
    
    'table-1': {
        en: {
            title: "Creating Your First Table",
            content: "Tables are the foundation of any Access database. A table stores data about a specific subject, such as students, products, or orders. Each table consists of fields (columns) that define the type of data to be stored, and records (rows) that contain the actual data.",
            task: "Create a table named 'Students' with at least 3 fields. Remember to set a primary key!",
            type: 'table-designer',
            educationalNote: "In Microsoft Access, you typically create tables in Design View, where you can specify field names, data types, and properties. The table you create here simulates that Design View experience.",
            validation: (data) => {
                if (!data.tableName || data.tableName.toLowerCase() !== 'students') {
                    return { valid: false, message: "Table name must be 'Students'" };
                }
                if (data.fields.length < 3) {
                    return { valid: false, message: "You need at least 3 fields. Think about what information you'd store about students (ID, name, email, etc.)" };
                }
                const hasPrimaryKey = data.fields.some(f => f.isPrimary);
                if (!hasPrimaryKey) {
                    return { valid: false, message: "You must set one field as a primary key. Try using StudentID with AutoNumber data type." };
                }
                return { valid: true, message: "Excellent! You've created your first table correctly! In Access, this table would now appear in the Navigation Pane." };
            }
        },
        vi: {
            title: "Tạo Bảng Đầu Tiên",
            content: "Bảng là nền tảng của bất kỳ cơ sở dữ liệu Access nào. Bảng lưu trữ dữ liệu về một chủ đề cụ thể, chẳng hạn như sinh viên, sản phẩm hoặc đơn hàng. Mỗi bảng bao gồm các trường (cột) xác định loại dữ liệu được lưu trữ và các bản ghi (hàng) chứa dữ liệu thực tế.",
            task: "Tạo bảng tên 'Students' với ít nhất 3 trường. Nhớ đặt khóa chính!",
            type: 'table-designer',
            educationalNote: "Trong Microsoft Access, bạn thường tạo bảng trong Design View, nơi bạn có thể chỉ định tên trường, kiểu dữ liệu và thuộc tính. Bảng bạn tạo ở đây mô phỏng trải nghiệm Design View đó.",
            validation: (data) => {
                if (!data.tableName || data.tableName.toLowerCase() !== 'students') {
                    return { valid: false, message: "Tên bảng phải là 'Students'" };
                }
                if (data.fields.length < 3) {
                    return { valid: false, message: "Bạn cần ít nhất 3 trường. Hãy nghĩ về thông tin bạn muốn lưu trữ về sinh viên (ID, tên, email, v.v.)" };
                }
                const hasPrimaryKey = data.fields.some(f => f.isPrimary);
                if (!hasPrimaryKey) {
                    return { valid: false, message: "Bạn phải đặt một trường làm khóa chính. Thử sử dụng StudentID với kiểu dữ liệu AutoNumber." };
                }
                return { valid: true, message: "Tuyệt vời! Bạn đã tạo bảng đầu tiên đúng cách! Trong Access, bảng này sẽ xuất hiện trong Navigation Pane." };
            }
        }
    },
    
    'table-2': {
        en: {
            title: "Understanding Data Types",
            content: "Each field in an Access table has a data type that determines what kind of information it can store. Common data types include: Short Text (up to 255 characters), Long Text (large amounts of text), Number (numeric values), Date/Time (dates and times), Currency (monetary values), Yes/No (Boolean), and AutoNumber (automatically incremented numbers).",
            task: "Create a table with fields using different data types to understand their purposes.",
            type: 'info',
            educationalNote: "In Microsoft Access, choosing the correct data type is crucial for data integrity. For example, using Number type for a phone number would strip leading zeros, so Short Text is better."
        },
        vi: {
            title: "Hiểu Về Kiểu Dữ Liệu",
            content: "Mỗi trường trong bảng Access có kiểu dữ liệu xác định loại thông tin nó có thể lưu trữ. Các kiểu dữ liệu phổ biến bao gồm: Short Text (tối đa 255 ký tự), Long Text (lượng lớn văn bản), Number (giá trị số), Date/Time (ngày và giờ), Currency (giá trị tiền tệ), Yes/No (Boolean), và AutoNumber (số tự động tăng).",
            task: "Tạo bảng với các trường sử dụng các kiểu dữ liệu khác nhau để hiểu mục đích của chúng.",
            type: 'info',
            educationalNote: "Trong Microsoft Access, việc chọn đúng kiểu dữ liệu là rất quan trọng cho tính toàn vẹn dữ liệu. Ví dụ, sử dụng kiểu Number cho số điện thoại sẽ loại bỏ các số 0 đứng đầu, vì vậy Short Text là lựa chọn tốt hơn."
        }
    },
    
    'table-3': {
        en: {
            title: "Primary Keys Explained",
            content: "A primary key is a field (or combination of fields) that uniquely identifies each record in a table. Primary keys must contain unique values and cannot contain null values. The most common primary key is an AutoNumber field, which Access automatically fills with a unique number for each record.",
            task: "Understand why primary keys are essential for database design.",
            type: 'info',
            educationalNote: "In Microsoft Access, when you create relationships between tables, the primary key from one table is linked to a foreign key in another table. This ensures referential integrity."
        },
        vi: {
            title: "Giải Thích Khóa Chính",
            content: "Khóa chính là một trường (hoặc tổ hợp các trường) định danh duy nhất mỗi bản ghi trong bảng. Khóa chính phải chứa các giá trị duy nhất và không thể chứa giá trị null. Khóa chính phổ biến nhất là trường AutoNumber, mà Access tự động điền số duy nhất cho mỗi bản ghi.",
            task: "Hiểu tại sao khóa chính là cần thiết cho thiết kế cơ sở dữ liệu.",
            type: 'info',
            educationalNote: "Trong Microsoft Access, khi bạn tạo mối quan hệ giữa các bảng, khóa chính từ một bảng được liên kết với khóa ngoại trong bảng khác. Điều này đảm bảo tính toàn vẹn tham chiếu."
        }
    },
    
    'table-4': {
        en: {
            title: "Field Properties",
            content: "Each field in Access has properties that control how data is stored and displayed. Important properties include: Required (whether the field must have a value), Default Value (value automatically entered for new records), Validation Rule (ensures data meets certain criteria), and Field Size (maximum length for text fields).",
            task: "Learn about field properties and their importance in data validation.",
            type: 'info',
            educationalNote: "In Microsoft Access, setting appropriate field properties prevents invalid data from being entered. For example, setting a field as Required ensures no record is saved without that information."
        },
        vi: {
            title: "Thuộc Tính Trường",
            content: "Mỗi trường trong Access có các thuộc tính kiểm soát cách dữ liệu được lưu trữ và hiển thị. Các thuộc tính quan trọng bao gồm: Required (trường có phải có giá trị không), Default Value (giá trị tự động nhập cho bản ghi mới), Validation Rule (đảm bảo dữ liệu đáp ứng tiêu chí nhất định), và Field Size (độ dài tối đa cho trường văn bản).",
            task: "Tìm hiểu về thuộc tính trường và tầm quan trọng của chúng trong xác thực dữ liệu.",
            type: 'info',
            educationalNote: "Trong Microsoft Access, thiết lập thuộc tính trường phù hợp ngăn chặn dữ liệu không hợp lệ được nhập vào. Ví dụ, đặt trường là Required đảm bảo không có bản ghi nào được lưu mà không có thông tin đó."
        }
    },
    
    'query-1': {
        en: {
            title: "Introduction to Queries",
            content: "Queries are used to retrieve, filter, and analyze data from your tables. They allow you to ask questions about your data and get answers in the form of a dataset. Access uses SQL (Structured Query Language) to execute queries, though you can also use the Query Design View for a visual approach.",
            task: "Understand the purpose and power of database queries.",
            type: 'info',
            educationalNote: "In Microsoft Access, queries can do more than just retrieve data. You can also use them to update records, delete records, create new tables, and perform calculations."
        },
        vi: {
            title: "Giới Thiệu Truy Vấn",
            content: "Truy vấn được sử dụng để truy xuất, lọc và phân tích dữ liệu từ các bảng của bạn. Chúng cho phép bạn đặt câu hỏi về dữ liệu của mình và nhận câu trả lời dưới dạng tập dữ liệu. Access sử dụng SQL (Structured Query Language) để thực thi truy vấn, mặc dù bạn cũng có thể sử dụng Query Design View cho cách tiếp cận trực quan.",
            task: "Hiểu mục đích và sức mạnh của truy vấn cơ sở dữ liệu.",
            type: 'info',
            educationalNote: "Trong Microsoft Access, truy vấn có thể làm nhiều hơn chỉ truy xuất dữ liệu. Bạn cũng có thể sử dụng chúng để cập nhật bản ghi, xóa bản ghi, tạo bảng mới và thực hiện tính toán."
        }
    },
    
    'query-2': {
        en: {
            title: "SELECT Statements",
            content: "The SELECT statement is the foundation of querying data. It retrieves data from one or more tables. Basic syntax: SELECT field1, field2 FROM tableName; Use SELECT * to retrieve all fields.",
            task: "Write a SELECT query to retrieve all fields from the 'Products' table.",
            type: 'sql-editor',
            educationalNote: "In Microsoft Access, you can switch between Design View and SQL View. The SQL View shows the actual SQL code that Access generates from your query design.",
            validation: (sql) => {
                const normalized = sql.toLowerCase().trim().replace(/\s+/g, ' ');
                if (normalized.includes('select') && normalized.includes('products')) {
                    if (normalized.includes('*') || normalized.includes('from')) {
                        return { valid: true, message: "Perfect! Your SELECT query is correct. In Access, this would display all products in Datasheet View." };
                    }
                }
                return { valid: false, message: "Try using: SELECT * FROM Products; (The asterisk * means 'all fields')" };
            }
        },
        vi: {
            title: "Câu Lệnh SELECT",
            content: "Câu lệnh SELECT là nền tảng của việc truy vấn dữ liệu. Nó truy xuất dữ liệu từ một hoặc nhiều bảng. Cú pháp cơ bản: SELECT trường1, trường2 FROM tênBảng; Sử dụng SELECT * để truy xuất tất cả các trường.",
            task: "Viết truy vấn SELECT để truy xuất tất cả các trường từ bảng 'Products'.",
            type: 'sql-editor',
            educationalNote: "Trong Microsoft Access, bạn có thể chuyển đổi giữa Design View và SQL View. SQL View hiển thị mã SQL thực tế mà Access tạo từ thiết kế truy vấn của bạn.",
            validation: (sql) => {
                const normalized = sql.toLowerCase().trim().replace(/\s+/g, ' ');
                if (normalized.includes('select') && normalized.includes('products')) {
                    if (normalized.includes('*') || normalized.includes('from')) {
                        return { valid: true, message: "Hoàn hảo! Truy vấn SELECT của bạn đúng. Trong Access, điều này sẽ hiển thị tất cả sản phẩm trong Datasheet View." };
                    }
                }
                return { valid: false, message: "Thử sử dụng: SELECT * FROM Products; (Dấu * nghĩa là 'tất cả các trường')" };
            }
        }
    },
    
    'query-3': {
        en: {
            title: "WHERE Clause Filtering",
            content: "The WHERE clause filters records based on specified conditions. It allows you to retrieve only the data that meets certain criteria. Example: SELECT * FROM Products WHERE Price > 100;",
            task: "Write a query to select products where the price is greater than 50.",
            type: 'sql-editor',
            educationalNote: "In Microsoft Access, the WHERE clause can use various operators: = (equal), > (greater than), < (less than), >= (greater than or equal), <= (less than or equal), <> (not equal), AND, OR, NOT.",
            validation: (sql) => {
                const normalized = sql.toLowerCase().trim().replace(/\s+/g, ' ');
                if (normalized.includes('select') && normalized.includes('products') && 
                    normalized.includes('where') && normalized.includes('price') && 
                    (normalized.includes('> 50') || normalized.includes('>50'))) {
                    return { valid: true, message: "Excellent! You've correctly filtered the data. In Access, only products priced above $50 would appear in the results." };
                }
                return { valid: false, message: "Try: SELECT * FROM Products WHERE Price > 50;" };
            }
        },
        vi: {
            title: "Lọc Với Mệnh Đề WHERE",
            content: "Mệnh đề WHERE lọc các bản ghi dựa trên các điều kiện được chỉ định. Nó cho phép bạn chỉ truy xuất dữ liệu đáp ứng các tiêu chí nhất định. Ví dụ: SELECT * FROM Products WHERE Price > 100;",
            task: "Viết truy vấn để chọn các sản phẩm có giá lớn hơn 50.",
            type: 'sql-editor',
            educationalNote: "Trong Microsoft Access, mệnh đề WHERE có thể sử dụng các toán tử khác nhau: = (bằng), > (lớn hơn), < (nhỏ hơn), >= (lớn hơn hoặc bằng), <= (nhỏ hơn hoặc bằng), <> (không bằng), AND, OR, NOT.",
            validation: (sql) => {
                const normalized = sql.toLowerCase().trim().replace(/\s+/g, ' ');
                if (normalized.includes('select') && normalized.includes('products') && 
                    normalized.includes('where') && normalized.includes('price') && 
                    (normalized.includes('> 50') || normalized.includes('>50'))) {
                    return { valid: true, message: "Tuyệt vời! Bạn đã lọc dữ liệu đúng cách. Trong Access, chỉ các sản phẩm có giá trên $50 mới xuất hiện trong kết quả." };
                }
                return { valid: false, message: "Thử: SELECT * FROM Products WHERE Price > 50;" };
            }
        }
    },
    
    'query-4': {
        en: {
            title: "Sorting with ORDER BY",
            content: "The ORDER BY clause sorts query results in ascending (ASC) or descending (DESC) order. Example: SELECT * FROM Products ORDER BY Price DESC; This would show products from highest to lowest price.",
            task: "Write a query to select all products and sort them by ProductName in ascending order.",
            type: 'sql-editor',
            educationalNote: "In Microsoft Access, you can sort by multiple fields. For example: ORDER BY LastName ASC, FirstName ASC would sort by last name first, then by first name.",
            validation: (sql) => {
                const normalized = sql.toLowerCase().trim().replace(/\s+/g, ' ');
                if (normalized.includes('select') && normalized.includes('products') && 
                    normalized.includes('order by') && normalized.includes('productname')) {
                    return { valid: true, message: "Great! Your sorting query is correct. In Access, products would appear alphabetically by name." };
                }
                return { valid: false, message: "Try: SELECT * FROM Products ORDER BY ProductName ASC;" };
            }
        },
        vi: {
            title: "Sắp Xếp Với ORDER BY",
            content: "Mệnh đề ORDER BY sắp xếp kết quả truy vấn theo thứ tự tăng dần (ASC) hoặc giảm dần (DESC). Ví dụ: SELECT * FROM Products ORDER BY Price DESC; Điều này sẽ hiển thị sản phẩm từ giá cao nhất đến thấp nhất.",
            task: "Viết truy vấn để chọn tất cả sản phẩm và sắp xếp chúng theo ProductName theo thứ tự tăng dần.",
            type: 'sql-editor',
            educationalNote: "Trong Microsoft Access, bạn có thể sắp xếp theo nhiều trường. Ví dụ: ORDER BY LastName ASC, FirstName ASC sẽ sắp xếp theo họ trước, sau đó theo tên.",
            validation: (sql) => {
                const normalized = sql.toLowerCase().trim().replace(/\s+/g, ' ');
                if (normalized.includes('select') && normalized.includes('products') && 
                    normalized.includes('order by') && normalized.includes('productname')) {
                    return { valid: true, message: "Tuyệt vời! Truy vấn sắp xếp của bạn đúng. Trong Access, sản phẩm sẽ xuất hiện theo thứ tự bảng chữ cái theo tên." };
                }
                return { valid: false, message: "Thử: SELECT * FROM Products ORDER BY ProductName ASC;" };
            }
        }
    },
    
    'rel-1': {
        en: {
            title: "Table Relationships",
            content: "Relationships connect tables based on common fields, allowing you to combine data from multiple tables. The three main types are: One-to-One (each record in one table relates to exactly one record in another), One-to-Many (one record in a table can relate to many records in another), and Many-to-Many (many records in one table relate to many in another).",
            task: "Understand how table relationships work and why they're important.",
            type: 'info',
            educationalNote: "In Microsoft Access, you establish relationships in the Relationships window. Access uses these relationships to ensure referential integrity, preventing orphaned records."
        },
        vi: {
            title: "Quan Hệ Giữa Các Bảng",
            content: "Quan hệ kết nối các bảng dựa trên các trường chung, cho phép bạn kết hợp dữ liệu từ nhiều bảng. Ba loại chính là: Một-một (mỗi bản ghi trong một bảng liên quan đến chính xác một bản ghi trong bảng khác), Một-nhiều (một bản ghi trong bảng có thể liên quan đến nhiều bản ghi trong bảng khác), và Nhiều-nhiều (nhiều bản ghi trong một bảng liên quan đến nhiều bản ghi trong bảng khác).",
            task: "Hiểu cách quan hệ giữa các bảng hoạt động và tại sao chúng quan trọng.",
            type: 'info',
            educationalNote: "Trong Microsoft Access, bạn thiết lập mối quan hệ trong cửa sổ Relationships. Access sử dụng các mối quan hệ này để đảm bảo tính toàn vẹn tham chiếu, ngăn chặn các bản ghi mồ côi."
        }
    },
    
    'rel-2': {
        en: {
            title: "Foreign Keys",
            content: "A foreign key is a field in one table that refers to the primary key in another table. Foreign keys are used to establish and enforce relationships between tables. For example, in an Orders table, the CustomerID field would be a foreign key that references the primary key in the Customers table.",
            task: "Create a relationship between Students and Orders using StudentID.",
            type: 'relationship',
            educationalNote: "In Microsoft Access, when you create a relationship, Access can enforce referential integrity. This means you cannot add an order with a StudentID that doesn't exist in the Students table.",
            validation: (data) => {
                if (data.sourceTable === 'Students' && data.targetTable === 'Orders' && 
                    data.sourceField === 'StudentID' && data.targetField === 'StudentID') {
                    return { valid: true, message: "Perfect! You've created a valid one-to-many relationship. In Access, this ensures each order is linked to a valid student." };
                }
                return { valid: false, message: "Link the StudentID primary key from Students to the StudentID foreign key in Orders." };
            }
        },
        vi: {
            title: "Khóa Ngoại",
            content: "Khóa ngoại là một trường trong một bảng tham chiếu đến khóa chính trong bảng khác. Khóa ngoại được sử dụng để thiết lập và thực thi mối quan hệ giữa các bảng. Ví dụ, trong bảng Orders, trường CustomerID sẽ là khóa ngoại tham chiếu đến khóa chính trong bảng Customers.",
            task: "Tạo mối quan hệ giữa Students và Orders bằng StudentID.",
            type: 'relationship',
            educationalNote: "Trong Microsoft Access, khi bạn tạo mối quan hệ, Access có thể thực thi tính toàn vẹn tham chiếu. Điều này có nghĩa là bạn không thể thêm đơn hàng với StudentID không tồn tại trong bảng Students.",
            validation: (data) => {
                if (data.sourceTable === 'Students' && data.targetTable === 'Orders' && 
                    data.sourceField === 'StudentID' && data.targetField === 'StudentID') {
                    return { valid: true, message: "Hoàn hảo! Bạn đã tạo mối quan hệ một-nhiều hợp lệ. Trong Access, điều này đảm bảo mỗi đơn hàng được liên kết với sinh viên hợp lệ." };
                }
                return { valid: false, message: "Liên kết khóa chính StudentID từ Students với khóa ngoại StudentID trong Orders." };
            }
        }
    },
    
    'rel-3': {
        en: {
            title: "One-to-Many Relationships",
            content: "One-to-Many is the most common type of relationship. It means one record in the first table can be associated with multiple records in the second table. For example, one customer can have many orders, but each order belongs to only one customer.",
            task: "Understand how one-to-many relationships organize data efficiently.",
            type: 'info',
            educationalNote: "In Microsoft Access, the 'one' side of the relationship is indicated by a '1' and the 'many' side by an infinity symbol (∞) in the Relationships window."
        },
        vi: {
            title: "Quan Hệ Một-Nhiều",
            content: "Một-nhiều là loại quan hệ phổ biến nhất. Nó có nghĩa là một bản ghi trong bảng đầu tiên có thể được liên kết với nhiều bản ghi trong bảng thứ hai. Ví dụ, một khách hàng có thể có nhiều đơn hàng, nhưng mỗi đơn hàng chỉ thuộc về một khách hàng.",
            task: "Hiểu cách quan hệ một-nhiều tổ chức dữ liệu hiệu quả.",
            type: 'info',
            educationalNote: "Trong Microsoft Access, phía 'một' của quan hệ được biểu thị bằng '1' và phía 'nhiều' bằng ký hiệu vô hạn (∞) trong cửa sổ Relationships."
        }
    },
    
    'form-1': {
        en: {
            title: "Introduction to Forms",
            content: "Forms provide a user-friendly interface for entering and viewing data in your database. Instead of working directly with tables, forms allow you to create custom layouts with labels, text boxes, buttons, and other controls. Forms make data entry easier and more accurate.",
            task: "Learn about the role of forms in database applications.",
            type: 'info',
            educationalNote: "In Microsoft Access, forms can be bound to tables or queries. When you enter data in a form, it's automatically saved to the underlying table."
        },
        vi: {
            title: "Giới Thiệu Biểu Mẫu",
            content: "Biểu mẫu cung cấp giao diện thân thiện với người dùng để nhập và xem dữ liệu trong cơ sở dữ liệu của bạn. Thay vì làm việc trực tiếp với bảng, biểu mẫu cho phép bạn tạo bố cục tùy chỉnh với nhãn, hộp văn bản, nút và các điều khiển khác. Biểu mẫu làm cho việc nhập dữ liệu dễ dàng và chính xác hơn.",
            task: "Tìm hiểu về vai trò của biểu mẫu trong ứng dụng cơ sở dữ liệu.",
            type: 'info',
            educationalNote: "Trong Microsoft Access, biểu mẫu có thể được ràng buộc với bảng hoặc truy vấn. Khi bạn nhập dữ liệu vào biểu mẫu, nó tự động được lưu vào bảng cơ bản."
        }
    },
    
    'report-1': {
        en: {
            title: "Basic Reports",
            content: "Reports are used to present data in a formatted, organized way for printing or viewing. Unlike forms, reports are read-only and designed for presenting information rather than data entry. You can group data, add calculations, and create professional-looking documents.",
            task: "Understand how reports differ from forms and their purpose.",
            type: 'info',
            educationalNote: "In Microsoft Access, reports can include headers, footers, grouping levels, and calculated fields. They're perfect for creating invoices, summaries, and analytical documents."
        },
        vi: {
            title: "Báo Cáo Cơ Bản",
            content: "Báo cáo được sử dụng để trình bày dữ liệu theo cách có định dạng, có tổ chức để in hoặc xem. Không giống như biểu mẫu, báo cáo là chỉ đọc và được thiết kế để trình bày thông tin thay vì nhập dữ liệu. Bạn có thể nhóm dữ liệu, thêm tính toán và tạo tài liệu trông chuyên nghiệp.",
            task: "Hiểu cách báo cáo khác với biểu mẫu và mục đích của chúng.",
            type: 'info',
            educationalNote: "Trong Microsoft Access, báo cáo có thể bao gồm tiêu đề, chân trang, mức nhóm và các trường được tính toán. Chúng hoàn hảo để tạo hóa đơn, tóm tắt và tài liệu phân tích."
        }
    }
};

/* ========================================
   E. UI RENDERING MODULE
   ======================================== */
const UI = {
    // Update all translatable text on the page
    translatePage() {
        const lang = AppState.currentLanguage;
        const trans = Translations[lang];
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const keys = key.split('.');
            let value = trans;
            
            keys.forEach(k => {
                value = value?.[k];
            });
            
            if (value) {
                el.textContent = value;
            }
        });
    },
    
    // Update progress indicator
    updateProgress() {
        const total = Object.keys(Lessons).length;
        const completed = AppState.completedLessons.length;
        document.getElementById('progress-count').textContent = `${completed}/${total}`;
    },
    
    // Update completed lesson checkmarks
    updateCompletedUI() {
        document.querySelectorAll('.lesson-item').forEach(item => {
            const lessonId = item.dataset.lesson;
            if (AppState.completedLessons.includes(lessonId)) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }
        });
    },
    
    // Load and display a lesson
    loadLesson(lessonId) {
        const lesson = Lessons[lessonId];
        if (!lesson) return;
        
        const lang = AppState.currentLanguage;
        const content = lesson[lang];
        const workspace = document.getElementById('workspace');
        
        let html = `
            <div class="lesson-content">
                <h2 class="lesson-title">${content.title}</h2>
                
                <div class="lesson-section">
                    <h3 class="section-title">${lang === 'en' ? 'Explanation' : 'Giải Thích'}</h3>
                    <p class="lesson-text">${content.content}</p>
                </div>
        `;
        
        if (content.educationalNote) {
            html += `
                <div class="educational-note">
                    <strong>${lang === 'en' ? '💡 Access Note:' : '💡 Lưu Ý Về Access:'}</strong>
                    ${content.educationalNote}
                </div>
            `;
        }
        
        html += `
            <div class="task-box">
                <div class="task-title">${lang === 'en' ? 'Your Task' : 'Nhiệm Vụ Của Bạn'}</div>
                <p>${content.task}</p>
            </div>
        `;
        
        if (content.type === 'table-designer') {
            html += this.renderTableDesigner();
        } else if (content.type === 'sql-editor') {
            html += this.renderSQLEditor();
        } else if (content.type === 'relationship') {
            html += this.renderRelationshipDesigner();
        } else {
            html += `
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="LessonController.nextLesson()">
                        ${Translations[lang].buttons.next}
                    </button>
                </div>
            `;
        }
        
        html += `<div class="feedback" id="feedback"></div></div>`;
        workspace.innerHTML = html;
        
        // Add initial field row for table designer
        if (content.type === 'table-designer') {
            TableDesigner.addField();
        }
    },
    
    // Render table designer interface
    renderTableDesigner() {
        const lang = AppState.currentLanguage;
        const trans = Translations[lang].messages;
        
        return `
            <div class="simulator-workspace">
                <h3 class="simulator-title">${lang === 'en' ? '🛠️ Table Design View' : '🛠️ Chế Độ Thiết Kế Bảng'}</h3>
                
                <div class="table-name-input">
                    <label>${trans.tableName}</label>
                    <input type="text" id="tableName" placeholder="${trans.enterTableName}">
                </div>
                
                <div class="table-designer">
                    <div class="field-grid">
                        <div class="field-row header">
                            <div>${trans.fieldName}</div>
                            <div>${trans.dataType}</div>
                            <div>${trans.primaryKey}</div>
                            <div>${trans.required}</div>
                            <div>${trans.actions}</div>
                        </div>
                        <div id="fields-container"></div>
                    </div>
                    <button class="btn btn-add" onclick="TableDesigner.addField()">
                        + ${Translations[lang].buttons.addField}
                    </button>
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="TableDesigner.validate()">
                        ${Translations[lang].buttons.validate}
                    </button>
                </div>
            </div>
        `;
    },
    
    // Render SQL editor interface
    renderSQLEditor() {
        const lang = AppState.currentLanguage;
        const trans = Translations[lang].messages;
        
        return `
            <div class="simulator-workspace">
                <h3 class="simulator-title">${lang === 'en' ? '📝 SQL Query Editor' : '📝 Trình Soạn Truy Vấn SQL'}</h3>
                
                <div class="sql-editor">
                    <textarea id="sqlQuery" class="sql-textarea" placeholder="${trans.queryPlaceholder}"></textarea>
                    <div class="sql-controls">
                        <button class="btn btn-primary" onclick="QuerySimulator.execute()">
                            ${Translations[lang].buttons.execute}
                        </button>
                        <button class="btn btn-secondary" onclick="QuerySimulator.clear()">
                            ${Translations[lang].buttons.clear}
                        </button>
                    </div>
                </div>
                
                <div id="queryResults"></div>
            </div>
        `;
    },
    
    // Render relationship designer interface
    renderRelationshipDesigner() {
        const lang = AppState.currentLanguage;
        const trans = Translations[lang].messages;
        
        const tableOptions = Object.keys(Database.tables).map(name => 
            `<option value="${name}">${name}</option>`
        ).join('');
        
        return `
            <div class="simulator-workspace">
                <h3 class="simulator-title">${lang === 'en' ? '🔗 Relationship Designer' : '🔗 Thiết Kế Quan Hệ'}</h3>
                
                <div class="relationship-designer">
                    <div class="relationship-selector">
                        <div class="table-selector">
                            <label>${trans.sourceTable}:</label>
                            <select id="sourceTable" class="field-select" onchange="RelationshipDesigner.updateFields('source')">
                                <option value="">${trans.selectTable}</option>
                                ${tableOptions}
                            </select>
                            <select id="sourceField" class="field-select" style="margin-top: 8px;">
                                <option value="">Select field</option>
                            </select>
                        </div>
                        
                        <div class="relationship-arrow">→</div>
                        
                        <div class="table-selector">
                            <label>${trans.targetTable}:</label>
                            <select id="targetTable" class="field-select" onchange="RelationshipDesigner.updateFields('target')">
                                <option value="">${trans.selectTable}</option>
                                ${tableOptions}
                            </select>
                            <select id="targetField" class="field-select" style="margin-top: 8px;">
                                <option value="">Select field</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="relationship-visual" id="relationshipVisual">
                        <p style="color: #999;">${lang === 'en' ? 'Select tables to visualize relationship' : 'Chọn bảng để hiển thị quan hệ'}</p>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="RelationshipDesigner.validate()">
                        ${Translations[lang].buttons.createRelationship}
                    </button>
                </div>
            </div>
        `;
    },
    
    // Show feedback message
    showFeedback(type, message) {
        const feedback = document.getElementById('feedback');
        if (!feedback) return;
        
        feedback.className = `feedback ${type} show`;
        feedback.textContent = message;
        
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 5000);
    }
};

/* ========================================
   F. TABLE DESIGNER MODULE
   ======================================== */
const TableDesigner = {
    fieldCounter: 0,
    
    // Add a new field row
    addField() {
        const container = document.getElementById('fields-container');
        if (!container) return;
        
        const fieldId = ++this.fieldCounter;
        const lang = AppState.currentLanguage;
        const trans = Translations[lang].messages;
        
        const fieldHTML = `
            <div class="field-row" data-field-id="${fieldId}">
                <input type="text" class="field-input field-name" placeholder="${trans.fieldName}">
                <select class="field-select field-type">
                    <option value="Short Text">Short Text</option>
                    <option value="Long Text">Long Text</option>
                    <option value="Number">Number</option>
                    <option value="Date/Time">Date/Time</option>
                    <option value="Currency">Currency</option>
                    <option value="AutoNumber">AutoNumber</option>
                    <option value="Yes/No">Yes/No</option>
                </select>
                <input type="checkbox" class="field-checkbox field-primary">
                <input type="checkbox" class="field-checkbox field-required">
                <button class="btn btn-remove" onclick="TableDesigner.removeField(${fieldId})">×</button>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', fieldHTML);
    },
    
    // Remove a field row
    removeField(fieldId) {
        const field = document.querySelector(`[data-field-id="${fieldId}"]`);
        if (field) field.remove();
    },
    
    // Validate table design
    validate() {
        const tableName = document.getElementById('tableName')?.value.trim();
        const fieldRows = document.querySelectorAll('.field-row:not(.header)');
        
        const fields = [];
        fieldRows.forEach(row => {
            const name = row.querySelector('.field-name')?.value.trim();
            const type = row.querySelector('.field-type')?.value;
            const isPrimary = row.querySelector('.field-primary')?.checked;
            const isRequired = row.querySelector('.field-required')?.checked;
            
            if (name) {
                fields.push({ name, type, isPrimary, isRequired });
            }
        });
        
        const data = { tableName, fields };
        const lesson = Lessons[AppState.currentLesson][AppState.currentLanguage];
        
        if (lesson.validation) {
            const result = lesson.validation(data);
            UI.showFeedback(result.valid ? 'success' : 'error', result.message);
            
            if (result.valid) {
                AppState.completeLesson(AppState.currentLesson);
            }
        }
    }
};

/* ========================================
   G. QUERY SIMULATOR MODULE
   ======================================== */
const QuerySimulator = {
    // Execute SQL query
    execute() {
        const sql = document.getElementById('sqlQuery')?.value.trim();
        
        if (!sql) {
            UI.showFeedback('error', 'Please enter a SQL query');
            return;
        }
        
        const lesson = Lessons[AppState.currentLesson][AppState.currentLanguage];
        
        if (lesson.validation) {
            const result = lesson.validation(sql);
            UI.showFeedback(result.valid ? 'success' : 'error', result.message);
            
            if (result.valid) {
                this.displayResults(sql);
                AppState.completeLesson(AppState.currentLesson);
            }
        }
    },
    
    // Display simulated query results
    displayResults(sql) {
        const resultsDiv = document.getElementById('queryResults');
        if (!resultsDiv) return;
        
        // Determine which table is being queried
        const normalized = sql.toLowerCase();
        let tableName = 'Products'; // Default
        
        if (normalized.includes('students')) tableName = 'Students';
        else if (normalized.includes('orders')) tableName = 'Orders';
        
        const table = Database.getTable(tableName);
        if (!table) return;
        
        let records = [...table.records];
        
        // Simple WHERE filtering
        if (normalized.includes('where') && normalized.includes('price') && normalized.includes('> 50')) {
            records = records.filter(r => r.Price > 50);
        }
        
        // Simple ORDER BY
        if (normalized.includes('order by productname')) {
            records.sort((a, b) => (a.ProductName || '').localeCompare(b.ProductName || ''));
        }
        
        // Build result table
        if (records.length === 0) {
            resultsDiv.innerHTML = '<p>No results found.</p>';
            return;
        }
        
        const headers = Object.keys(records[0]);
        let html = '<table class="result-table"><thead><tr>';
        
        headers.forEach(h => {
            html += `<th>${h}</th>`;
        });
        html += '</tr></thead><tbody>';
        
        records.forEach(record => {
            html += '<tr>';
            headers.forEach(h => {
                html += `<td>${record[h]}</td>`;
            });
            html += '</tr>';
        });
        
        html += '</tbody></table>';
        resultsDiv.innerHTML = html;
    },
    
    // Clear query and results
    clear() {
        const queryField = document.getElementById('sqlQuery');
        const resultsDiv = document.getElementById('queryResults');
        
        if (queryField) queryField.value = '';
        if (resultsDiv) resultsDiv.innerHTML = '';
    }
};

/* ========================================
   H. RELATIONSHIP DESIGNER MODULE
   ======================================== */
const RelationshipDesigner = {
    // Update field dropdowns when table is selected
    updateFields(side) {
        const tableSelect = document.getElementById(`${side}Table`);
        const fieldSelect = document.getElementById(`${side}Field`);
        
        if (!tableSelect || !fieldSelect) return;
        
        const tableName = tableSelect.value;
        fieldSelect.innerHTML = '<option value="">Select field</option>';
        
        if (tableName) {
            const table = Database.getTable(tableName);
            if (table) {
                table.fields.forEach(field => {
                    const option = document.createElement('option');
                    option.value = field.name;
                    option.textContent = `${field.name} (${field.type})${field.isPrimaryKey ? ' - PK' : ''}`;
                    fieldSelect.appendChild(option);
                });
            }
        }
        
        this.visualize();
    },
    
    // Visualize the relationship
    visualize() {
        const sourceTable = document.getElementById('sourceTable')?.value;
        const targetTable = document.getElementById('targetTable')?.value;
        const visual = document.getElementById('relationshipVisual');
        
        if (!visual || !sourceTable || !targetTable) return;
        
        const source = Database.getTable(sourceTable);
        const target = Database.getTable(targetTable);
        
        if (!source || !target) return;
        
        const html = `
            <div style="display: flex; gap: 40px; align-items: center; justify-content: center;">
                <div class="table-box">
                    <div class="table-box-title">${source.name}</div>
                    <div class="table-box-fields">
                        ${source.fields.map(f => `${f.name}${f.isPrimaryKey ? ' (PK)' : ''}`).join('<br>')}
                    </div>
                </div>
                <div style="font-size: 32px; color: var(--primary-red); font-weight: bold;">
                    1 → ∞
                </div>
                <div class="table-box">
                    <div class="table-box-title">${target.name}</div>
                    <div class="table-box-fields">
                        ${target.fields.map(f => `${f.name}${f.foreignKey ? ' (FK)' : ''}`).join('<br>')}
                    </div>
                </div>
            </div>
        `;
        
        visual.innerHTML = html;
    },
    
    // Validate relationship
    validate() {
        const sourceTable = document.getElementById('sourceTable')?.value;
        const targetTable = document.getElementById('targetTable')?.value;
        const sourceField = document.getElementById('sourceField')?.value;
        const targetField = document.getElementById('targetField')?.value;
        
        if (!sourceTable || !targetTable || !sourceField || !targetField) {
            UI.showFeedback('error', 'Please select all fields');
            return;
        }
        
        const data = { sourceTable, targetTable, sourceField, targetField };
        const lesson = Lessons[AppState.currentLesson][AppState.currentLanguage];
        
        if (lesson.validation) {
            const result = lesson.validation(data);
            UI.showFeedback(result.valid ? 'success' : 'error', result.message);
            
            if (result.valid) {
                AppState.completeLesson(AppState.currentLesson);
            }
        }
    }
};

/* ========================================
   I. LESSON CONTROLLER
   ======================================== */
const LessonController = {
    lessonOrder: [
        'intro-1', 'intro-2', 'intro-3',
        'table-1', 'table-2', 'table-3', 'table-4',
        'query-1', 'query-2', 'query-3', 'query-4',
        'rel-1', 'rel-2', 'rel-3',
        'form-1', 'report-1'
    ],
    
    // Navigate to next lesson
    nextLesson() {
        AppState.completeLesson(AppState.currentLesson);
        
        const currentIndex = this.lessonOrder.indexOf(AppState.currentLesson);
        
        if (currentIndex < this.lessonOrder.length - 1) {
            const nextLessonId = this.lessonOrder[currentIndex + 1];
            const nextLessonItem = document.querySelector(`[data-lesson="${nextLessonId}"]`);
            
            if (nextLessonItem) {
                nextLessonItem.click();
            }
        } else {
            const lang = AppState.currentLanguage;
            const message = lang === 'en' 
                ? '🎉 Congratulations! You have completed all lessons!' 
                : '🎉 Chúc mừng! Bạn đã hoàn thành tất cả các bài học!';
            UI.showFeedback('success', message);
        }
    }
};

/* ========================================
   J. EVENT HANDLERS
   ======================================== */
const EventHandlers = {
    init() {
        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                AppState.currentLanguage = btn.dataset.lang;
                AppState.save();
                
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                UI.translatePage();
                UI.loadLesson(AppState.currentLesson);
            });
        });
        
        // Lesson navigation
        document.querySelectorAll('.lesson-item').forEach(item => {
            item.addEventListener('click', () => {
                if (!item.classList.contains('locked')) {
                    AppState.currentLesson = item.dataset.lesson;
                    
                    document.querySelectorAll('.lesson-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    
                    UI.loadLesson(AppState.currentLesson);
                }
            });
        });
        
        // Ribbon tabs (for future expansion)
        document.querySelectorAll('.ribbon-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                AppState.currentTab = tab.dataset.tab;
                
                document.querySelectorAll('.ribbon-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Future: Switch between different views
            });
        });
    }
};

/* ========================================
   K. APPLICATION INITIALIZATION
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize application state
    AppState.init();
    
    // Set up event handlers
    EventHandlers.init();
    
    // Translate page to current language
    UI.translatePage();
    
    // Load first lesson
    UI.loadLesson(AppState.currentLesson);
    
    // Update UI
    UI.updateProgress();
    UI.updateCompletedUI();
    
    console.log('Microsoft Access Learning Simulator initialized successfully!');
});